import Link from "next/link";

export default function HomePage() {
  return (
    <main className="grid spacious">
      <section className="hero hero-journey">
        <h1 style={{ marginTop: 0 }}>A calm daily companion to hide God&apos;s Word in your heart.</h1>
        <p className="hero-rhythm">Read · Reflect · Memorize · Live</p>

        <blockquote className="scripture-anchor">
          &ldquo;Your word I have hidden in my heart, that I might not sin against You.&rdquo;
          <cite>— Psalm 119:11</cite>
        </blockquote>

        <div className="row hero-actions">
          <Link className="btn primary large" href="/play">
            Begin today&apos;s journey
          </Link>
        </div>
        <div className="row hero-secondary">
          <Link className="btn text" href="/auth">Sign in</Link>
          <span className="muted">or</span>
          <Link className="btn text" href="/play">Continue as guest</Link>
        </div>
      </section>

      <section className="grid three home-grid">
        <article className="card pillar-card">
          <div className="soft-label">1. Read it</div>
          <h3>Start with today&apos;s verse</h3>
          <p className="muted">A featured passage, its theme, and a short devotional frame the day before the practice begins.</p>
        </article>
        <article className="card pillar-card">
          <div className="soft-label">2. Practice it</div>
          <h3>Place the missing words</h3>
          <p className="muted">Hide the verse in your heart through a calm word-tile exercise — no timers, no pressure.</p>
        </article>
        <article className="card pillar-card">
          <div className="soft-label">3. Live it</div>
          <h3>Carry one response forward</h3>
          <p className="muted">Finish with a short application prompt so the passage moves from memory into obedience, trust, or rest.</p>
        </article>
      </section>
    </main>
  );
}
