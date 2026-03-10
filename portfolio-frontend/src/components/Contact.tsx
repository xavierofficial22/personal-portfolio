import { Mail, Phone } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";

function Contact() {
  const socials = [
    {
      name: "LinkedIn",
      url: "#",
      icon: <FaLinkedinIn size={18} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/xavierofficial22",
      icon: <FaGithub size={18} />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/gianxavier.aquino",
      icon: <FaFacebookF size={18} />,
    },
  ];

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            06
          </span>
          <div className="w-8 h-px bg-accent/40" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Contact
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-6">
          Let's <span className="text-accent">connect</span>.
        </h2>
        <p className="text-neutral-500 text-sm max-w-lg mb-14">
          Feel free to reach out for collaborations, opportunities, or just to
          say hello. I'm always happy to connect.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {/* Email */}
          <a
            href="mailto:gianxavieraquino.official@gmail.com"
            className="group flex items-start gap-4 p-5 rounded-xl bg-bg-2 border border-neutral-800/50
                       hover:border-accent/20 hover:bg-bg-3 transition-all duration-300"
          >
            <span className="shrink-0 mt-0.5 text-accent/60 group-hover:text-accent transition-colors">
              <Mail size={20} strokeWidth={1.5} />
            </span>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-neutral-600 font-medium block mb-1">
                Email
              </span>
              <span className="text-sm text-white group-hover:text-accent transition-colors duration-200">
                gianxavieraquino.official@gmail.com
              </span>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+639298490815"
            className="group flex items-start gap-4 p-5 rounded-xl bg-bg-2 border border-neutral-800/50
                       hover:border-accent/20 hover:bg-bg-3 transition-all duration-300"
          >
            <span className="shrink-0 mt-0.5 text-accent/60 group-hover:text-accent transition-colors">
              <Phone size={20} strokeWidth={1.5} />
            </span>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-neutral-600 font-medium block mb-1">
                Phone
              </span>
              <span className="text-sm text-white group-hover:text-accent transition-colors duration-200">
                0929 849 0815
              </span>
            </div>
          </a>
        </div>

        {/* Social links */}
        <div>
          <span className="text-[10px] tracking-widest uppercase text-neutral-600 font-medium block mb-4">
            Find me on
          </span>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-bg-2 border border-neutral-800/50
                           text-neutral-400 hover:text-accent hover:border-accent/20 hover:bg-bg-3
                           transition-all duration-300 text-sm"
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-neutral-800/30 text-center">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Gian Xavier Aquino. Built with React,
            TypeScript & Laravel.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
