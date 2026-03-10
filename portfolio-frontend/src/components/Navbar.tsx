import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Home, User, Code2, Award, Bell, Mail, Sun, Moon } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: User, label: "About", href: "#about" },
  { icon: Code2, label: "Skills", href: "#skills" },
  { icon: Award, label: "Certs", href: "#certificates" },
  { icon: Bell, label: "Updates", href: "#updates" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  // Show navbar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-2xl border"
        style={{
          background: "var(--color-glass)",
          borderColor: "var(--color-glass-border)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow:
            theme === "dark"
              ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive =
            href === "#" ? active === "" || active === "#" : active === href;

          return (
            <a
              key={href}
              href={href}
              onClick={() => {
                if (href === "#")
                  window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-accent/15 text-accent"
                  : "text-[var(--color-text-muted)] hover:text-accent hover:bg-accent/[0.06]"
              }`}
              title={label}
            >
              <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />

              {/* Tooltip */}
              <span
                className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: "var(--color-bg-3)",
                  color: "var(--color-text)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </a>
          );
        })}

        {/* Divider */}
        <div
          className="w-px h-6 mx-1 rounded-full"
          style={{ background: "var(--color-glass-border)" }}
        />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-200 cursor-pointer text-[var(--color-text-muted)] hover:text-amber-400 hover:bg-amber-400/[0.06]"
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
          ) : (
            <Moon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
