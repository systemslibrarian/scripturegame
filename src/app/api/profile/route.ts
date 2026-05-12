import { NextRequest, NextResponse } from "next/server";

import { hasSupabase } from "@/lib/env";

export const dynamic = "force-dynamic";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (!hasSupabase) {
    return NextResponse.json({
      source: "local",
      profile: {
        userId,
        totalPoints: 0,
        bestSession: 0,
        versesCompleted: 0,
        currentStreak: 0,
      },
    });
  }

  try {
    const supabase = createSupabaseAdminClient();

    const [{ data: score }, { data: distinctVerses }, { data: streak }] = await Promise.all([
      supabase.from("scores").select("total_points, best_session").eq("user_id", userId).maybeSingle(),
      supabase.from("attempts").select("verse_id").eq("user_id", userId),
      supabase.from("streaks").select("current_streak").eq("user_id", userId).maybeSingle(),
    ]);

    const uniqueVerseCount = new Set((distinctVerses ?? []).map((row) => row.verse_id)).size;

    return NextResponse.json({
      source: "supabase",
      profile: {
        userId,
        totalPoints: score?.total_points ?? 0,
        bestSession: score?.best_session ?? 0,
        versesCompleted: uniqueVerseCount,
        currentStreak: streak?.current_streak ?? 0,
      },
    });
  } catch {
    return NextResponse.json({
      source: "local-fallback",
      profile: {
        userId,
        totalPoints: 0,
        bestSession: 0,
        versesCompleted: 0,
        currentStreak: 0,
      },
    });
  }
}
