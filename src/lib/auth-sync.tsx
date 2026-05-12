"use client";

import { useEffect } from "react";

import { hasSupabaseClient } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Keeps localStorage in sync with Supabase's auth state.
 *
 * The Supabase JS client refreshes access tokens in the background, but the
 * app stores the token in `sg_access_token` and reads it from localStorage on
 * every API call. Without this listener the stored token would go stale after
 * ~1 hour and authenticated requests would start failing silently.
 */
export function AuthSync() {
  useEffect(() => {
    if (!hasSupabaseClient) return;

    const supabase = getSupabaseBrowserClient();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        localStorage.removeItem("sg_access_token");
        return;
      }
      if (session.access_token) {
        localStorage.setItem("sg_access_token", session.access_token);
      }
      if (session.user?.id) {
        localStorage.setItem("sg_user_id", session.user.id);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return null;
}
