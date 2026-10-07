import { motion } from "framer-motion";
import { Target, Heart, Award, Users, Globe, ShieldCheck } from "lucide-react";
import { StatsSection, TestimonialsSection, CTASection } from "@/components/SharedSections";

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function About() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-background to-primary/5">
        <div className="container-main">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">About SurgiCore Pro</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              Redefining Surgical Operations Management
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2018 by a team of surgeons, healthcare IT specialists, and enterprise software engineers, SurgiCore Pro was born from a singular vision: to bring the precision of surgery to the management of surgical operations themselves.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold font-heading text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To empower surgical centers and hospitals with technology that optimizes every aspect of the surgical workflow — from pre-operative planning to post-operative recovery. We believe that better surgical management leads directly to better patient outcomes.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Target, text: "Precision-focused surgical workflow optimization" },
                  { icon: Heart, text: "Patient safety and outcomes as our north star" },
                  { icon: Award, text: "Enterprise-grade reliability and compliance" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-foreground mt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { value: "2018", label: "Founded" },
                { value: "200+", label: "Surgical Centers" },
                { value: "47", label: "Countries" },
                { value: "350+", label: "Team Members" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <p className="text-2xl font-bold font-heading text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-foreground">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Uncompromising Security", desc: "Every data point is encrypted, every access is audited, every system is hardened. We treat patient data with the gravity it deserves." },
              { icon: Globe, title: "Global Reliability", desc: "99.7% uptime across all regions. Our distributed infrastructure ensures your surgical center never misses a beat." },
              { icon: Users, title: "Surgeon-Centric Design", desc: "Built with direct input from 500+ surgeons worldwide. Every feature is designed to reduce friction and enhance clinical focus." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-surface p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
