import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar } from "lucide-react";

export default function ScheduleModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("surgicore_modal_shown");
    if (shown) return;
    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem("surgicore_modal_shown", "true");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-2xl max-w-lg w-full p-8 relative border border-border"
          >
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-foreground">Free Strategy Call</h3>
                <p className="text-sm text-muted-foreground">15-Minute Surgical Operations Consultation</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Discover how SurgiCore Pro can optimize your surgical center's operations, improve OR utilization by up to 30%, and streamline your entire surgical workflow.
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              <input type="email" placeholder="Work Email" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Schedule My Free Call
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">No obligation. HIPAA compliant. Your data is secure.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
