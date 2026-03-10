const roles = [
  {
    title: "Internal Vice President",
    organization: "Junior Philippine Computer Society (JPCS) — DWCC Chapter",
    period: "2023 – 2024",
    bullets: [
      "Led 100+ member organization focused on technology education and professional development",
      "Organized 8+ technical workshops and seminars on emerging technologies, reaching 200+ students",
      "Coordinated recruitment drives increasing membership year-over-year",
      "Managed internal operations, event logistics, and member engagement initiatives",
    ],
  },
  {
    title: "First Year Representative",
    organization: "Junior Philippine Computer Society (JPCS) — DWCC Chapter",
    period: "2022 – 2023",
    bullets: [
      "Represented first-year IT students in organizational planning and decision-making",
      "Facilitated communication between students and organization leadership",
      "Assisted in organizing academic support programs and peer mentoring initiatives",
    ],
  },
];

function Leadership() {
  return (
    <section id="leadership" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            03
          </span>
          <div className="w-8 h-px bg-accent/40" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Leadership & Activities
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-14">
          Where I've <span className="text-accent">contributed</span>.
        </h2>

        {/* Roles */}
        <div className="divide-y divide-neutral-800/50">
          {roles.map((role) => (
            <div
              key={role.title}
              className="group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 sm:gap-10 py-10 first:pt-0 last:pb-0"
            >
              {/* Left — date */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-accent tracking-wide">
                  {role.period}
                </span>
                <span className="text-[11px] text-neutral-600 uppercase tracking-widest">
                  JPCS — DWCC
                </span>
              </div>

              {/* Right — details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-accent transition-colors duration-200">
                  {role.title}
                </h3>
                <p className="text-xs text-neutral-500 mb-5">
                  {role.organization}
                </p>

                <ul className="space-y-2.5">
                  {role.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-neutral-400 leading-relaxed"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leadership;
