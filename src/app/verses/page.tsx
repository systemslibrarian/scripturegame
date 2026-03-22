import Link from "next/link";

import { LOCAL_VERSES } from "@/lib/verses-local";

export default function VersesPage() {
  return (
    <main className="grid" style={{ gap: "1rem" }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Browse Verses</h1>
        <p className="muted" style={{ marginBottom: 0 }}>
          Review the verse catalog on its own page so the play screen stays focused on memorization.
        </p>
      </section>

      <section aria-label="Verse catalog" className="grid two">
        {LOCAL_VERSES.map((verse) => (
          <article className="card" key={verse.id}>
            <h2 style={{ marginBottom: "0.5rem", marginTop: "0.25rem" }}>{verse.reference} <span className="muted" style={{ fontSize: "0.85rem", fontWeight: 400 }}>({verse.translation})</span></h2>
            <p className="muted" style={{ marginTop: 0 }}>
              Theme: {verse.themeId} | Blanks: {verse.answers.length}
            </p>
            <p className="verse-preview">{verse.parts.join("_____")}</p>
            <Link className="btn secondary" href="/play">
              Practice this set
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}