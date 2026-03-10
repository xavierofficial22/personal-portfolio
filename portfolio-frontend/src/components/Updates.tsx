import { useEffect, useState } from "react";
import { getUpdates, BACKEND_URL } from "../services/api";
import {
  Clock,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  description: string | null;
  images: string[] | null;
  category: string | null;
  is_published: boolean;
  created_at: string;
}

function Updates() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    getUpdates()
      .then((res) => setPosts(res.data ?? res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return "Today";
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images.map((img) => `${BACKEND_URL}${img}`));
    setLightboxIndex(index);
  };

  const renderImages = (images: string[]) => {
    const count = images.length;
    if (count === 1) {
      return (
        <div
          className="border-t border-neutral-800/50 cursor-pointer"
          onClick={() => openLightbox(images, 0)}
        >
          <img
            src={`${BACKEND_URL}${images[0]}`}
            alt=""
            className="w-full max-h-[420px] object-cover hover:opacity-90 transition-opacity"
          />
        </div>
      );
    }
    if (count === 2) {
      return (
        <div className="border-t border-neutral-800/50 grid grid-cols-2 gap-0.5">
          {images.map((img, i) => (
            <img
              key={i}
              src={`${BACKEND_URL}${img}`}
              alt=""
              onClick={() => openLightbox(images, i)}
              className="w-full h-[220px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      );
    }
    if (count === 3) {
      return (
        <div className="border-t border-neutral-800/50 grid grid-cols-2 gap-0.5">
          <img
            src={`${BACKEND_URL}${images[0]}`}
            alt=""
            onClick={() => openLightbox(images, 0)}
            className="col-span-2 w-full h-[260px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
          />
          {images.slice(1).map((img, i) => (
            <img
              key={i}
              src={`${BACKEND_URL}${img}`}
              alt=""
              onClick={() => openLightbox(images, i + 1)}
              className="w-full h-[180px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      );
    }
    // 4+
    const shown = images.slice(0, 4);
    const remaining = count - 4;
    return (
      <div className="border-t border-neutral-800/50 grid grid-cols-2 gap-0.5">
        {shown.map((img, i) => (
          <div
            key={i}
            className="relative cursor-pointer"
            onClick={() => openLightbox(images, i)}
          >
            <img
              src={`${BACKEND_URL}${img}`}
              alt=""
              className="w-full h-[180px] object-cover hover:opacity-90 transition-opacity"
            />
            {i === 3 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  +{remaining}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="updates" className="relative py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            05
          </span>
          <div className="w-8 h-px bg-accent/40" />
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Updates
          </span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-3">
            What's <span className="text-accent">new</span>.
          </h2>
          <p className="text-neutral-500 text-sm flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Posts refresh every 24 hours
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex items-center gap-3 text-neutral-500 text-sm">
            <span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="w-10 h-10 text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-500 text-sm">No recent updates.</p>
            <p className="text-neutral-600 text-xs mt-1">
              Check back later for new posts.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className="bg-bg-2 border border-neutral-800/50 rounded-2xl overflow-hidden
                           hover:border-accent/15 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fade-up 0.5s ease-out both",
                }}
              >
                {/* Post header */}
                <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2da6fd] to-[#0f70de] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    GX
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Gian Xavier Aquino
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-500">
                        {timeAgo(post.created_at)}
                      </span>
                      {post.category && (
                        <>
                          <span className="text-neutral-700">Â·</span>
                          <span className="text-[11px] text-accent/70">
                            {post.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="px-5 pb-4">
                  <h3 className="text-[15px] font-semibold text-white mb-1.5">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                      {post.description}
                    </p>
                  )}
                </div>

                {/* Post images */}
                {post.images &&
                  post.images.length > 0 &&
                  renderImages(post.images)}

                {/* Timestamp footer */}
                <div className="px-5 py-3 border-t border-neutral-800/50">
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(post.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
    </section>
  );
}

export default Updates;
