import { NextRequest, NextResponse } from "next/server";

import { hasSupabase } from "@/lib/env";

export const dynamic = "force-dynamic";
import { authenticatedUserFromRequest } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const VALID_TRANSLATIONS = new Set(["niv", "kjv", "nkjv", "esv"]);

export async function PUT(request: NextRequest) {
  let body: { translation?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const translation = body.translation;
  if (!translation || !VALID_TRANSLATIONS.has(translation)) {
    return NextResponse.json({ error: "Invalid translation. Supported: niv, kjv, nkjv, esv." }, { status: 400 });
  }

  if (!hasSupabase) {
    return NextResponse.json({ saved: false, reason: "local-only" });
  }

  const user = await authenticatedUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ saved: false, reason: "not-authenticated" });
  }

  /* Store in user_metadata */
  const supabase = createSupabaseAdminClient();
  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: { preferred_translation: translation },
  });

  if (updateError) {
    return NextResponse.json({ saved: false, reason: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ saved: true, translation });
}
