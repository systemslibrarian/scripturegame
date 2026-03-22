"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useTranslation } from "@/lib/translation-context";

const NAV_LINKS = [
  { href: "/play", label: "Today's Verse" },
  { href: "/profile", label: "Profile" },
  { href: "/auth", label: "Sign In" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { translationKey, switchTranslation } = useTranslation();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="topbar" role="banner">
      <div className="brand-row">
        <div className="brand">Scripture Journey</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Translation toggle — always visible */}
          <div className="translation-toggle" role="radiogroup" aria-label="Bible translation">
            <button
              type="button"
              role="radio"
              aria-checked={translationKey === "niv"}
              aria-label="New International Version"
              onClick={() => switchTranslation("niv")}
            >
              NIV
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={translationKey === "kjv"}
              aria-label="King James Version"
              onClick={() => switchTranslation("kjv")}
            >
              KJV
            </button>
          </div>
          <button
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span aria-hidden="true" className="menu-toggle-icon">
              <span className="menu-toggle-bar" />
              <span className="menu-toggle-bar" />
              <span className="menu-toggle-bar" />
            </span>
            <span className="menu-toggle-text">Menu</span>
          </button>
        </div>
      </div>
      <nav aria-label="Primary" className={`nav ${menuOpen ? "open" : ""}`} id="primary-navigation">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}