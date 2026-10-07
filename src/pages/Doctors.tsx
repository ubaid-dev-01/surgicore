import { motion } from "framer-motion";
import { Award, Clock, GraduationCap } from "lucide-react";
import { doctors } from "@/data/mockData";
import { CTASection, TestimonialsSection } from "@/components/SharedSections";

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function Doctors() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-background to-primary/5">
        <div className="container-main">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Surgeons</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">World-Class Surgical Team</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Meet the board-certified surgeons powering our platform with real clinical expertise and leadership.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc, i) => (
              <motion.div key={doc.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-surface-hover p-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4">
                  {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                </div>
                <h3 className="text-lg font-semibold font-heading text-foreground">{doc.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{doc.specialty}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{doc.bio}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {doc.experience} experience
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="w-3.5 h-3.5" /> {doc.education}
                  </div>
                  {doc.certifications.map(cert => (
                    <div key={cert} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Award className="w-3.5 h-3.5 text-primary" /> {cert}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </>
  );
}
