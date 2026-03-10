import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAdminAuthenticated,
  adminLogout,
  getAdminCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAdminUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
  getMetrics,
  BACKEND_URL,
} from "../services/api";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Award,
  FileText,
  Shield,
  X,
  Check,
  ImagePlus,
  Send,
  Clock,
  BarChart3,
  Eye,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Tab = "certificates" | "updates" | "metrics";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("certificates");

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin");
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "certificates",
      label: "Certificates",
      icon: <Award className="w-4 h-4" />,
    },
    {
      key: "updates",
      label: "Updates",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      key: "metrics",
      label: "Metrics",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#2da6fd]" />
            <span className="text-sm font-semibold tracking-tight">
              Admin Panel
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Tab nav */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-[#111113] rounded-xl p-1 w-fit border border-white/[0.06]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                tab === t.key
                  ? "bg-[#2da6fd] text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {tab === "certificates" && <CertificatesPanel />}
        {tab === "updates" && <UpdatesPanel />}
        {tab === "metrics" && <MetricsPanel />}
      </div>
    </div>
  );
}

/* ── Certificates Panel ──────────────────────────────────────── */

interface Certificate {
  id: number;
  name: string;
  full_name: string;
  issuer: string;
  image: string;
  issue_date: string;
  certificate_no?: string;
  score?: string;
  skills?: string;
  description?: string;
  is_visible: boolean;
}

function CertificatesPanel() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const data = await getAdminCertificates();
      setCerts(data);
    } catch (err) {
      console.error("Failed to fetch certificates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this certificate?")) return;
    try {
      await deleteCertificate(id);
      setCerts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleEdit = (cert: Certificate) => {
    setEditing(cert);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditing(null);
    fetchCerts();
  };

  if (loading) {
    return <p className="text-neutral-500 text-sm">Loading certificates...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Certificates ({certs.length})</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#2da6fd] hover:bg-[#2da6fd]/90 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {showForm && (
        <CertificateForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      )}

      <div className="space-y-3">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="flex items-center justify-between bg-[#111113] border border-white/[0.06] rounded-xl px-5 py-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  cert.is_visible ? "bg-emerald-400" : "bg-neutral-600"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {cert.full_name || cert.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {cert.issuer} · {cert.issue_date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleEdit(cert)}
                className="p-2 text-neutral-500 hover:text-[#2da6fd] transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-2 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Certificate Form ────────────────────────────────────────── */

function CertificateForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: Certificate | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    full_name: initial?.full_name || "",
    issuer: initial?.issuer || "",
    image: initial?.image || "",
    issue_date: initial?.issue_date || "",
    certificate_no: initial?.certificate_no || "",
    score: initial?.score || "",
    skills: initial?.skills || "",
    description: initial?.description || "",
    is_visible: initial?.is_visible ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (initial) {
        await updateCertificate(initial.id, form);
      } else {
        await createCertificate(form);
      }
      onSaved();
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  const fields: {
    name: string;
    label: string;
    required?: boolean;
    type?: string;
  }[] = [
    { name: "name", label: "Short Name", required: true },
    { name: "full_name", label: "Full Name", required: true },
    { name: "issuer", label: "Issuer", required: true },
    { name: "image", label: "Image Path", required: true },
    { name: "issue_date", label: "Issue Date", required: true, type: "date" },
    { name: "certificate_no", label: "Certificate No." },
    { name: "score", label: "Score" },
    { name: "skills", label: "Skills (comma-separated)" },
  ];

  return (
    <div className="bg-[#18181b] border border-white/[0.06] rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold">
          {initial ? "Edit Certificate" : "New Certificate"}
        </h3>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-[11px] text-neutral-500 uppercase tracking-wider mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                name={f.name}
                value={(form as any)[f.name]}
                onChange={handleChange}
                required={f.required}
                className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#2da6fd]/40 transition-all"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-[11px] text-neutral-500 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#2da6fd]/40 transition-all resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({ ...prev, is_visible: !prev.is_visible }))
            }
            className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${
              form.is_visible ? "bg-[#2da6fd]" : "bg-neutral-700"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${
                form.is_visible ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-xs text-neutral-400">Visible on portfolio</span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-accent hover:bg-[#2da6fd]/90 disabled:opacity-50 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            {saving ? "Saving..." : initial ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-white px-4 py-2.5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Updates Panel (Facebook-style) ──────────────────────────── */

interface Update {
  id: number;
  title: string;
  description?: string;
  category?: string;
  images?: string[];
  is_published?: boolean;
  created_at?: string;
}

function UpdatesPanel() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);
  const [editing, setEditing] = useState<Update | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const data = await getAdminUpdates();
      setUpdates(data);
    } catch (err) {
      console.error("Failed to fetch updates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteUpdate(id);
      setUpdates((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleSaved = () => {
    setShowComposer(false);
    setEditing(null);
    fetchUpdates();
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return <p className="text-neutral-500 text-sm">Loading posts...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create post trigger */}
      {!showComposer && !editing && (
        <div
          onClick={() => setShowComposer(true)}
          className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 mb-6 cursor-pointer hover:border-white/[0.12] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2da6fd] to-[#0f70de] flex items-center justify-center text-white text-sm font-bold shrink-0">
              G
            </div>
            <div className="flex-1 bg-[#1c1c1f] rounded-full px-5 py-3 text-sm text-neutral-500">
              What's on your mind, Gian?
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/[0.04]">
            <button className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
              <ImagePlus className="w-4 h-4" />
              Photo
            </button>
            <button className="flex items-center gap-2 text-xs text-[#2da6fd] hover:text-[#2da6fd]/80 transition-colors cursor-pointer">
              <FileText className="w-4 h-4" />
              Category
            </button>
          </div>
        </div>
      )}

      {/* Composer */}
      {(showComposer || editing) && (
        <PostComposer
          initial={editing}
          onClose={() => {
            setShowComposer(false);
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      )}

      {/* Posts feed */}
      <div className="space-y-4">
        {updates.map((post) => (
          <article
            key={post.id}
            className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden"
          >
            {/* Post header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2da6fd] to-[#0f70de] flex items-center justify-center text-white text-sm font-bold">
                  G
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Gian Xavier Aquino
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-neutral-600" />
                    <span className="text-[11px] text-neutral-500">
                      {post.created_at ? timeAgo(post.created_at) : "Draft"}
                    </span>
                    {post.category && (
                      <>
                        <span className="text-neutral-700">·</span>
                        <span className="text-[11px] text-[#2da6fd]">
                          {post.category}
                        </span>
                      </>
                    )}
                    {post.is_published === false && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">
                        Unpublished
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditing(post)}
                  className="p-2 text-neutral-500 hover:text-[#2da6fd] rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Post content */}
            <div className="px-5 pb-4">
              <h3 className="text-[15px] font-semibold text-white mb-1">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                  {post.description}
                </p>
              )}
            </div>

            {/* Post images */}
            {post.images && post.images.length > 0 && (
              <div
                className={`border-t border-white/[0.04] ${
                  post.images.length === 1
                    ? ""
                    : post.images.length === 2
                      ? "grid grid-cols-2"
                      : "grid grid-cols-2"
                }`}
              >
                {post.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setLightboxImages(
                        post.images!.map((im) => `${BACKEND_URL}${im}`),
                      );
                      setLightboxIndex(i);
                    }}
                    className={`relative overflow-hidden cursor-pointer ${
                      post.images!.length === 1
                        ? ""
                        : post.images!.length === 3 && i === 0
                          ? "col-span-2"
                          : ""
                    }`}
                  >
                    <img
                      src={`${BACKEND_URL}${img}`}
                      alt={`${post.title} ${i + 1}`}
                      className="w-full h-[250px] object-cover hover:opacity-90 transition-opacity"
                    />
                    {i === 3 && post.images!.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          +{post.images!.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
        {updates.length === 0 && (
          <p className="text-sm text-neutral-600 text-center py-12">
            No posts yet. Create your first update!
          </p>
        )}
      </div>

      {/* Image Lightbox */}
      {lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxImages([])}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImages([]);
            }}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer z-10"
          >
            <X className="w-6 h-6" />
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (prev) =>
                      (prev - 1 + lightboxImages.length) %
                      lightboxImages.length,
                  );
                }}
                className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all cursor-pointer z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (prev) => (prev + 1) % lightboxImages.length,
                  );
                }}
                className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all cursor-pointer z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <img
            src={lightboxImages[lightboxIndex]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-6 text-white/50 text-xs">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Post Composer (Facebook-style) ──────────────────────────── */

function PostComposer({
  initial,
  onClose,
  onSaved,
}: {
  initial: Update | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initial?.images
      ? initial.images.map((img) => `${BACKEND_URL}${img}`)
      : [],
  );
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const categorySuggestions = [
    "Project",
    "Achievement",
    "Blog",
    "Learning",
    "Milestone",
  ];

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const remaining = 7 - imagePreviews.length;
    if (remaining <= 0) return;
    const allowed = files.slice(0, remaining);
    setImageFiles((prev) => [...prev, ...allowed]);
    setImagePreviews((prev) => [
      ...prev,
      ...allowed.map((f) => URL.createObjectURL(f)),
    ]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;
    setSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (category) formData.append("category", category);
    imageFiles.forEach((file) => formData.append("images[]", file));
    formData.append("is_published", "1");

    try {
      if (initial) {
        await updateUpdate(initial.id, formData);
      } else {
        await createUpdate(formData);
      }
      onSaved();
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">
          {initial ? "Edit Post" : "Create Post"}
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 px-5 pt-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2da6fd] to-[#0f70de] flex items-center justify-center text-white text-sm font-bold shrink-0">
          G
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Gian Xavier Aquino</p>
          <p className="text-[11px] text-neutral-500">Posting publicly</p>
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full bg-transparent text-lg font-semibold text-white placeholder:text-neutral-600 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div className="px-5 pt-2 pb-3">
        <textarea
          ref={textareaRef}
          value={description}
          onChange={handleTextareaInput}
          placeholder="What's on your mind, Gian?"
          rows={3}
          className="w-full bg-transparent text-sm text-neutral-300 placeholder:text-neutral-600 focus:outline-none resize-none leading-relaxed"
        />
      </div>

      {/* Image previews */}
      {imagePreviews.length > 0 && (
        <div
          className={`mx-5 mb-4 rounded-xl overflow-hidden border border-white/[0.06] ${
            imagePreviews.length === 1
              ? ""
              : imagePreviews.length === 2
                ? "grid grid-cols-2 gap-0.5"
                : "grid grid-cols-2 gap-0.5"
          }`}
        >
          {imagePreviews.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${
                imagePreviews.length === 3 && i === 0
                  ? "col-span-2"
                  : imagePreviews.length === 1
                    ? ""
                    : ""
              }`}
            >
              <img
                src={src}
                alt={`Preview ${i + 1}`}
                className={`w-full object-cover ${imagePreviews.length === 1 ? "max-h-[300px]" : "h-[180px]"}`}
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1.5 rounded-full transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Category: pills + editable input */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {categorySuggestions.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? "" : cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer border ${
                category === cat
                  ? "bg-[#2da6fd]/15 text-[#2da6fd] border-[#2da6fd]/30"
                  : "bg-transparent text-neutral-500 border-white/[0.08] hover:border-white/[0.15] hover:text-neutral-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setShowCategoryInput(!showCategoryInput)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer border ${
              showCategoryInput ||
              (category && !categorySuggestions.includes(category))
                ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                : "bg-transparent text-neutral-500 border-white/[0.08] hover:border-white/[0.15] hover:text-neutral-300"
            }`}
          >
            <Pencil className="w-3 h-3 inline mr-1" />
            Custom
          </button>
        </div>
        {(showCategoryInput ||
          (category && !categorySuggestions.includes(category))) && (
          <div className="mt-3">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Type a custom category..."
              className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#2da6fd]/40 transition-all"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Actions bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06] bg-[#0e0e10]">
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={imagePreviews.length >= 7}
            className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/[0.06] disabled:text-neutral-600 disabled:hover:bg-transparent px-3 py-2 rounded-lg transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <ImagePlus className="w-4 h-4" />
            Photos ({imagePreviews.length}/7)
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving || !title.trim() || !description.trim()}
          className="flex items-center gap-2 bg-[#2da6fd] hover:bg-[#2da6fd]/90 disabled:bg-neutral-800 disabled:text-neutral-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          {saving ? "Posting..." : initial ? "Update" : "Post"}
        </button>
      </div>
    </div>
  );
}

/* ── Metrics Panel ───────────────────────────────────────────── */

interface Metrics {
  page_views: {
    total: number;
    today: number;
    this_week: number;
    this_month: number;
  };
  visitors: { total: number; today: number; this_week: number };
  posts: {
    total: number;
    published: number;
    this_week: number;
    this_month: number;
  };
  certificates: { total: number; visible: number };
  categories: { category: string; count: number }[];
  daily_views: { date: string; day: string; views: number; unique: number }[];
  top_pages: { page: string; views: number }[];
}

function MetricsPanel() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-neutral-500 text-sm py-12">
        <span className="w-4 h-4 border-2 border-[#2da6fd]/30 border-t-[#2da6fd] rounded-full animate-spin" />
        Loading metrics...
      </div>
    );
  }

  if (!metrics) {
    return <p className="text-neutral-500 text-sm">Failed to load metrics.</p>;
  }

  const maxDailyViews = Math.max(...metrics.daily_views.map((d) => d.views), 1);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          label="Page Views"
          value={metrics.page_views.total}
          sub={`${metrics.page_views.today} today`}
          color="blue"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Unique Visitors"
          value={metrics.visitors.total}
          sub={`${metrics.visitors.today} today`}
          color="emerald"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Total Posts"
          value={metrics.posts.total}
          sub={`${metrics.posts.published} published`}
          color="violet"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Certificates"
          value={metrics.certificates.total}
          sub={`${metrics.certificates.visible} visible`}
          color="amber"
        />
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2da6fd]" />
            Weekly Activity
          </h3>
          <span className="text-xs text-neutral-500">
            {metrics.page_views.this_week} views this week
          </span>
        </div>
        <p className="text-[11px] text-neutral-600 mb-6">
          Page views over the last 7 days
        </p>
        <div className="flex items-end gap-3 h-[160px]">
          {metrics.daily_views.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-neutral-500 font-medium">
                {day.views}
              </span>
              <div
                className="w-full rounded-t-lg relative overflow-hidden transition-all duration-500"
                style={{
                  height: `${Math.max((day.views / maxDailyViews) * 100, 6)}%`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#2da6fd] to-[#2da6fd]/40 rounded-t-lg" />
              </div>
              <div className="text-center">
                <span className="text-[10px] text-neutral-500 block">
                  {day.day}
                </span>
                <span className="text-[9px] text-neutral-700">{day.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Breakdown */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">
            Posts by Category
          </h3>
          {metrics.categories.length > 0 ? (
            <div className="space-y-3.5">
              {metrics.categories.map((cat) => {
                const pct =
                  metrics.posts.total > 0
                    ? (cat.count / metrics.posts.total) * 100
                    : 0;
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-neutral-300">{cat.category}</span>
                      <span className="text-neutral-500">
                        {cat.count} posts
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2da6fd] to-[#0f70de] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-neutral-600">
              No categorized posts yet.
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <QuickStat
              label="Posts this week"
              value={metrics.posts.this_week}
            />
            <QuickStat
              label="Posts this month"
              value={metrics.posts.this_month}
            />
            <QuickStat
              label="Views this week"
              value={metrics.page_views.this_week}
            />
            <QuickStat
              label="Views this month"
              value={metrics.page_views.this_month}
            />
            <QuickStat
              label="Visitors this week"
              value={metrics.visitors.this_week}
            />
          </div>
        </div>
      </div>

      {/* Top Pages */}
      {metrics.top_pages.length > 0 && (
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-2.5">
            {metrics.top_pages.map((p, i) => (
              <div
                key={p.page}
                className="flex items-center justify-between text-xs py-2 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-neutral-600 w-5 text-right">
                    {i + 1}.
                  </span>
                  <span className="text-neutral-300 font-mono">{p.page}</span>
                </div>
                <span className="text-neutral-500">{p.views} views</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Stat Card ───────────────────────────────────────────────── */

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub: string;
  color: "blue" | "emerald" | "violet" | "amber";
}) {
  const colorMap = {
    blue: "text-[#2da6fd] bg-[#2da6fd]/10",
    emerald: "text-emerald-400 bg-emerald-400/10",
    violet: "text-violet-400 bg-violet-400/10",
    amber: "text-amber-400 bg-amber-400/10",
  };

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
      <div
        className={`w-10 h-10 rounded-xl ${colorMap[color]} flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">
        {value.toLocaleString()}
      </p>
      <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
      <p className="text-[11px] text-neutral-600 mt-1">{sub}</p>
    </div>
  );
}

/* ── Quick Stat Row ──────────────────────────────────────────── */

function QuickStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-neutral-400">{label}</span>
      <span className="text-sm font-semibold text-white">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
