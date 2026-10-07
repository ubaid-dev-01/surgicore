import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function StaffLogin() {
  const [email, setEmail] = useState("admin@surgicore.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const fillCredentials = (type: "admin" | "doctor") => {
    if (type === "admin") {
      setEmail("admin@surgicore.com");
      setPassword("admin123");
    } else {
      setEmail("surgeon@surgicore.com");
      setPassword("doctor123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="card-surface p-8">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-foreground">SurgiCore</span>
              <span className="text-xl font-bold font-heading text-primary"> Pro</span>
            </div>
          </div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Staff Portal</h1>
            <p className="text-sm text-muted-foreground">Sign in to access the surgical management dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-2">Quick Login:</p>
            <div className="flex gap-2">
              <button onClick={() => fillCredentials("admin")} className="flex-1 py-2 rounded-lg border border-primary/30 text-primary text-xs font-medium hover:bg-primary/5 transition-colors">
                Admin Login
              </button>
              <button onClick={() => fillCredentials("doctor")} className="flex-1 py-2 rounded-lg border border-info/30 text-info text-xs font-medium hover:bg-info/5 transition-colors">
                Doctor Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
