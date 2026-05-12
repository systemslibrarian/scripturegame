"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { TranslationKey } from "@/types/domain";

type TranslationContextValue = {
  translationKey: TranslationKey;
  switchTranslation: (key: TranslationKey) => void;
};

const TranslationContext = createContext<TranslationContextValue>({
  translationKey: "niv",
  switchTranslation: () => {},
});

const STORAGE_KEY = "sg_translation";

const VALID_KEYS = new Set<TranslationKey>(["niv", "kjv", "nkjv", "esv"]);

export function TranslationProvider({ children }: { children: ReactNode }) {
  /* Start with the default so SSR and the first client render agree, then
     hydrate from localStorage in an effect to avoid a hydration mismatch. */
  const [translationKey, setTranslationKey] = useState<TranslationKey>("niv");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_KEYS.has(saved as TranslationKey)) {
      setTranslationKey(saved as TranslationKey);
    }
  }, []);

  const switchTranslation = useCallback((key: TranslationKey) => {
    setTranslationKey(key);
    localStorage.setItem(STORAGE_KEY, key);

    /* Best-effort save for logged-in users */
    const token = typeof window !== "undefined" ? localStorage.getItem("sg_access_token") : null;
    fetch("/api/profile/translation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ translation: key }),
    }).catch(() => {
      /* offline or guest — ignore */
    });
  }, []);

  return (
    <TranslationContext.Provider value={{ translationKey, switchTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
