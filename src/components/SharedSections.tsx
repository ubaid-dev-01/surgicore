import { motion } from "framer-motion";
import { Shield, CheckCircle, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

export function TrustBadges() {
  const badges = [
    { label: "HIPAA Compliant", desc: "Full data protection" },
    { label: "ISO 27001", desc: "Information security" },
    { label: "SOC 2 Type II", desc: "Trust & compliance" },
    { label: "200+ Centers", desc: "Worldwide trust" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
          <Shield className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs font-semibold text-foreground">{badge.label}</p>
            <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { value: "200+", label: "Surgical Centers" },
    { value: "1.2M+", label: "Surgeries Managed" },
    { value: "99.7%", label: "System Uptime" },
    { value: "23%", label: "Avg. Efficiency Gain" },
  ];

  return (
    <section className="section-padding bg-foreground">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-background/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Trusted by Leading Surgical Teams</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface p-6"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              <p className="text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">{t.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-main text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
            Ready to Transform Your Surgical Operations?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join 200+ surgical centers that have improved OR utilization by an average of 23% with SurgiCore Pro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/book" className="px-8 py-3.5 rounded-lg bg-background text-primary font-semibold hover:bg-background/90 transition-colors shadow-lg">
              Schedule Free Demo
            </a>
            <a href="/contact" className="px-8 py-3.5 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
              Contact Sales
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            {["No credit card required", "14-day free trial", "HIPAA compliant"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                <CheckCircle className="w-4 h-4" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
