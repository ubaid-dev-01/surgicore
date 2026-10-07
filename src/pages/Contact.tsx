import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { CTASection } from "@/components/SharedSections";

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeInUp}>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Contact Us</p>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">Get in Touch</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Whether you're ready to transform your surgical operations or just exploring, our team is here to help.
              </p>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Headquarters", value: "450 Surgical Center Blvd, Suite 200, Boston, MA 02115" },
                  { icon: Phone, label: "Phone", value: "(617) 555-0192" },
                  { icon: Mail, label: "Email", value: "sales@surgicorepro.com" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="card-surface p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-2">Send Us a Message</h3>
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
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <input type="email" required className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                    <input required className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                    <textarea required rows={5} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
