/*  Bento grid — each lg row must add to 6, each sm row to 4
    Row 1 (lg): 4 + 2 = 6       sm: 2 + 2 = 4
    Row 2 (lg): 2 + 2 + 2 = 6   sm: 2 + 2 = 4 (3rd wraps)
    Row 3 (lg): 2 + 4 = 6       sm: 2 + 2 = 4
    Row 4 (lg): 2 + 2 + 2 = 6   sm: 2 + 2 = 4  (3rd wraps)
    Row 5 (lg): 3 + 3 = 6       sm: 2 + 2 = 4                   */
const skills = [
  // --- row 1 (lg) ---
  {
    name: "React",
    category: "Frontend",
    description:
      "I use it for building interactive user interfaces and single-page applications",
    span: "sm:col-span-2 lg:col-span-4",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "I use it for writing type-safe code across the full stack",
    span: "sm:col-span-2 lg:col-span-2",
  },
  // --- row 2 (lg) ---
  {
    name: "Laravel",
    category: "Backend",
    description:
      "I use it for building REST APIs, authentication, and server-side logic",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description:
      "I use it for rapid, utility-first styling and responsive layouts",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description:
      "I use it for adding interactivity and dynamic behavior to web apps",
    span: "sm:col-span-2 lg:col-span-2",
  },
  // --- row 3 (lg) ---
  {
    name: "PHP",
    category: "Backend",
    description:
      "I use it for server-side development within the Laravel ecosystem",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description:
      "I use it for managing relational data, writing queries, and indexing",
    span: "sm:col-span-2 lg:col-span-4",
  },
  // --- row 4 (lg) ---
  {
    name: "Git",
    category: "Tools",
    description:
      "I use it for version control, branching, and team collaboration",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "I use it for running JavaScript on the server and tooling",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    name: "HTML & CSS",
    category: "Frontend",
    description:
      "I use it for semantic markup, accessibility, and modern layouts",
    span: "sm:col-span-2 lg:col-span-2",
  },
  // --- row 5 (lg) ---
  {
    name: "MySQL",
    category: "Database",
    description: "I use it for relational data modeling and database queries",
    span: "sm:col-span-2 lg:col-span-3",
  },
  {
    name: "Figma",
    category: "Tools",
    description: "I use it for UI design references and prototyping",
    span: "sm:col-span-2 lg:col-span-3",
  },
];

function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            02
          </span>
          <div className="w-8 h-px bg-accent/40" />
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-text-muted)] font-medium">
            Skills
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-14">
          Technologies I <span className="text-accent">work with</span>.
        </h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`group p-5 rounded-xl bg-bg-2 border border-[var(--color-card-border)]
                         hover:border-accent/20 hover:bg-bg-3 transition-all duration-300
                         ${skill.span}`}
            >
              {/* Name */}
              <h3 className="text-sm font-medium text-[var(--color-text)] mb-2 group-hover:text-accent transition-colors duration-200">
                {skill.name}
              </h3>

              {/* Category */}
              <span className="text-[10px] tracking-widest uppercase text-[var(--color-text-faint)] font-medium">
                {skill.category}
              </span>

              {/* Description */}
              <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
