import { motion } from "framer-motion";
import { Monitor, Calendar, Users, BarChart3, Package, DollarSign, Shield, UserCheck, ArrowRight } from "lucide-react";
import { services } from "@/data/mockData";
import { StatsSection, TestimonialsSection, CTASection } from "@/components/SharedSections";

const iconMap: Record<string, any> = { Monitor, Calendar, Users, BarChart3, Package, DollarSign, UserCheck, Shield };
const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function Services() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-background to-primary/5">
        <div className="container-main">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Platform Services</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">Complete Surgical Management Suite</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every tool your surgical center needs — from operating room management to billing analytics — unified in one enterprise platform.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main space-y-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Monitor;
            const isEven = i % 2 === 0;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className={`card-surface p-8 md:p-10 flex flex-col md:flex-row items-start gap-6 ${!isEven ? "md:flex-row-reverse" : ""}`}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <a href="/book" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
