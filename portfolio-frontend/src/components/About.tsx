import { ArrowRight } from "lucide-react";

function About() {
  const highlights = [
    { label: "Years Learning", value: "3+" },
    { label: "Projects Built", value: "4+" },
    { label: "Tech Stacks", value: "3+" },
    { label: "Certificates", value: "10+" },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            01
          </span>
          <div className="w-8 h-px bg-accent/40" />
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-text-muted)] font-medium">
            About
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Left — text (3 cols) */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              Building things for the web with{" "}
              <span className="text-accent">passion</span> and{" "}
              <span className="text-accent">purpose</span>.
            </h2>

            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
              I'm a software developer based in the Philippines with a strong
              foundation in web development. I enjoy building applications that
              are not only functional but also visually clean and intuitive to
              use.
            </p>

            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
              My toolkit includes React, TypeScript, and Tailwind CSS on the
              frontend, paired with Laravel with PHP and PostgreSQL on the
              backend.
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm text-accent font-medium
                           hover:text-accent/80 transition-colors duration-200 group"
              >
                Let's work together
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right — stats (2 cols) */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl bg-bg-2 border border-[var(--color-card-border)]
                             hover:border-accent/20 transition-colors duration-300"
                >
                  <span className="block text-3xl sm:text-4xl font-semibold text-[var(--color-text)] mb-1">
                    {item.value}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] tracking-wide uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick tech list */}
            <div className="mt-6 p-5 rounded-xl bg-bg-2 border border-[var(--color-card-border)]">
              <span className="text-xs text-[var(--color-text-muted)] tracking-wide uppercase block mb-3">
                Core stack
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Laravel",
                  "Tailwind",
                  "PostgreSQL",
                  "Git",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium text-accent/60 bg-accent/[0.05]
                                 border border-accent/10 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
