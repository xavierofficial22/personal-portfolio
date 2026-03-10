import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdminKey } from "../services/api";
import { Lock, Eye, EyeOff, AlertCircle, Shield } from "lucide-react";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await verifyAdminKey(key.trim());
      if (res.authenticated) {
        sessionStorage.setItem("admin_key", key.trim());
        navigate("/admin/dashboard");
      }
    } catch {
      setError("Invalid admin key. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center px-4">
      {/* Subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#2da6fd]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#111113] border border-white/[0.06] mb-6">
            <Shield className="w-8 h-8 text-[#2da6fd]" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Admin Access
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Enter your API key to continue
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8"
        >
          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}

          {/* Key input */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
              API Key
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type={showKey ? "text" : "password"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your admin key"
                className="w-full bg-[#0a0a0b] border border-white/[0.08] rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#2da6fd]/40 focus:ring-1 focus:ring-[#2da6fd]/20 transition-all font-mono"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !key.trim()}
            className="w-full bg-[#2da6fd] hover:bg-[#2da6fd]/90 disabled:bg-neutral-800 disabled:text-neutral-500 text-white text-sm font-medium py-3.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Authenticate"}
          </button>

          {/* Security note */}
          <p className="text-[11px] text-neutral-600 text-center mt-4">
            Rate limited to 5 attempts per minute. Session clears on tab close.
          </p>
        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
