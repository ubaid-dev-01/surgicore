import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Shield, Clock, Phone } from "lucide-react";
import { TrustBadges } from "@/components/SharedSections";

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function Book() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeInUp}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Book a Consultation</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
              See SurgiCore Pro in Action
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Schedule a personalized demo with our surgical operations team. We'll show you exactly how SurgiCore Pro can transform your facility.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: Clock, text: "30-minute personalized walkthrough" },
                { icon: Calendar, text: "Custom demo of your surgical workflow" },
                { icon: Shield, text: "HIPAA-compliant secure meeting" },
                { icon: Phone, text: "Direct access to surgical operations experts" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <TrustBadges />
          </motion.div>

          <motion.div {...fadeInUp} className="card-surface p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-foreground mb-2">Demo Scheduled!</h3>
                <p className="text-muted-foreground">Our team will contact you within 24 hours to confirm your session.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <h3 className="text-xl font-semibold font-heading text-foreground mb-2">Request Your Demo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                    <input required className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                    <input required className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Work Email</label>
                  <input type="email" required className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Organization</label>
                  <input required className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Number of Operating Rooms</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>1-5</option><option>6-10</option><option>11-20</option><option>20+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message (Optional)</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>
                <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  Schedule Demo
                </button>
                <p className="text-xs text-muted-foreground text-center">By submitting, you agree to our Privacy Policy. HIPAA compliant.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
