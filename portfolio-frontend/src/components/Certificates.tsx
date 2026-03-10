import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getCertificates } from "../services/api";

interface Certificate {
  id: number;
  name: string;
  full_name: string | null;
  issuer: string;
  image: string | null;
  issue_date: string;
  certificate_no: string | null;
  score: string | null;
  skills: string | null;
  description: string | null;
  is_visible: boolean;
}

function Certificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    getCertificates()
      .then((res) => setCerts(res.data ?? res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="certificates" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            04
          </span>
          <div className="w-8 h-px bg-accent/40" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Certificates
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            Earned & <span className="text-accent">verified</span>.
          </h2>
          <p className="text-neutral-500 text-sm max-w-sm">
            Professional certifications and credentials that validate my skills
            and continuous learning.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-neutral-500 text-sm">
            <span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Loading certificates...
          </div>
        ) : certs.length === 0 ? (
          <p className="text-neutral-600 text-sm">
            No certificates to display yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelected(cert)}
                className="group text-left p-5 rounded-xl border transition-all duration-300
                           bg-bg-2 border-neutral-800/50 hover:border-accent/20 hover:bg-bg-3"
              >
                {/* Thumbnail preview */}
                {cert.image && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-bg-3 border border-neutral-800/30">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-32 object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                )}

                {/* Issuer + date row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-widest uppercase text-accent/60 font-medium">
                    {cert.issuer}
                  </span>
                  <span className="text-[10px] text-neutral-600">
                    {formatDate(cert.issue_date)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-sm font-medium text-white leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
                  {cert.full_name || cert.name}
                </h3>

                {/* Description preview */}
                {cert.description && (
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                )}

                {/* View hint */}
                <span className="inline-block mt-3 text-[10px] text-accent/40 group-hover:text-accent/80 transition-colors duration-200">
                  Click to view certificate →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelected(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-bg-2 border border-neutral-800/50 overflow-hidden animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-5 border-b border-neutral-800/50">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-accent/60 font-medium">
                  {selected.issuer} · {formatDate(selected.issue_date)}
                </span>
                <h3 className="text-lg font-semibold text-white mt-1">
                  {selected.full_name || selected.name}
                </h3>
                {selected.description && (
                  <p className="text-xs text-neutral-500 mt-1 max-w-lg">
                    {selected.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="shrink-0 p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate image */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-bg-1">
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.full_name || selected.name}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg"
                />
              ) : (
                <p className="text-neutral-600 text-sm">No image available.</p>
              )}
            </div>

            {/* Footer with meta */}
            <div className="flex flex-wrap items-center gap-4 p-4 border-t border-neutral-800/50 text-xs">
              {selected.score && (
                <span className="text-neutral-400">
                  Score: <span className="text-white">{selected.score}</span>
                </span>
              )}
              {selected.certificate_no && (
                <span className="text-neutral-400 font-mono">
                  ID: {selected.certificate_no}
                </span>
              )}
              {selected.skills &&
                selected.skills.split(",").map((skill) => (
                  <span
                    key={skill.trim()}
                    className="px-2 py-0.5 text-[10px] font-medium text-accent/60 bg-accent/[0.05]
                               border border-accent/10 rounded-md"
                  >
                    {skill.trim()}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificates;
