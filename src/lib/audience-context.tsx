"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type AudienceMode = "adults" | "kids";

type AudienceContextValue = {
  audienceMode: AudienceMode;
  switchAudience: (mode: AudienceMode) => void;
};

const AudienceContext = createContext<AudienceContextValue>({
  audienceMode: "adults",
  switchAudience: () => {},
});

const STORAGE_KEY = "sg_audience";

export function AudienceProvider({ children }: { children: ReactNode }) {
  /* Start with the default so SSR and the first client render agree, then
     hydrate from localStorage in an effect to avoid a hydration mismatch. */
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("adults");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "kids") setAudienceMode("kids");
  }, []);

  const switchAudience = useCallback((mode: AudienceMode) => {
    setAudienceMode(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, []);

  return (
    <AudienceContext.Provider value={{ audienceMode, switchAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
