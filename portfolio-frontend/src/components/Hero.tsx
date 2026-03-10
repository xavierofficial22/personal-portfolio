function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Single soft glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Status */}
        <div
          className="flex items-center gap-2 mb-10 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] font-medium">
            Available for work
          </span>
        </div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-5 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Gian Xavier <span className="text-accent">Aquino</span>
        </h1>

        {/* Role */}
        <p
          className="text-lg sm:text-xl text-[var(--color-text-secondary)] font-light mb-5 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Software Developer
        </p>

        {/* Divider */}
        <div
          className="w-10 h-px bg-accent/30 mb-6 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Tagline */}
        <p
          className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed max-w-md mb-10 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          I build clean, fast web applications with a focus on thoughtful design
          and reliable code.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#skills"
            className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg
                       hover:bg-accent/90 transition-colors duration-200"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-[var(--color-text-secondary)] text-sm font-medium
                       hover:text-[var(--color-text)] transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Scroll */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="w-5 h-8 rounded-full border border-[var(--color-card-border)] flex items-start justify-center p-1.5">
          <span className="block w-0.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
