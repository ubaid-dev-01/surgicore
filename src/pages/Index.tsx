import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Monitor, Calendar, Users, BarChart3,
  Package, DollarSign, Shield, Zap, Clock, TrendingUp, Activity, Play, Star
} from "lucide-react";
import { TrustBadges, StatsSection, TestimonialsSection, CTASection } from "@/components/SharedSections";
import { services } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";

const iconMap: Record<string, any> = {
  Monitor, Calendar, Users, BarChart3, Package, DollarSign, UserCheck: Users, Shield,
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/30" />
        </div>

        <div className="container-main relative z-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold backdrop-blur-sm border border-primary/20">
                  Enterprise Surgical Platform
                </span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SOC 2 Certified
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-[1.08] mb-6">
                Precision in Every<br />
                <span className="text-primary">Procedure.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                The enterprise-grade surgical management platform trusted by <span className="text-white font-semibold">200+ multi-specialty hospitals</span> and surgical centers worldwide. Optimize OR utilization, streamline scheduling, and elevate patient outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/book" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5">
                  Request Demo <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-base hover:bg-white/10 backdrop-blur-sm transition-all">
                  <Play className="w-4 h-4" /> Watch Overview
                </Link>
              </div>

              {/* Trust Row */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex -space-x-2">
                  {["SC", "JW", "AP", "MB"].map((initials, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-primary/30 border-2 border-foreground/80 flex items-center justify-center text-[10px] font-bold text-white backdrop-blur-sm">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-white/50">Trusted by <span className="text-white/80 font-medium">2,400+ surgeons</span> worldwide</p>
                </div>
              </div>
            </motion.div>

            {/* Right side — floating stats cards */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex flex-col gap-4 items-end">
              {[
                { label: "OR Utilization", value: "87%", change: "+12%", icon: TrendingUp },
                { label: "Avg. Case Duration", value: "2h 22m", change: "-18min", icon: Clock },
                { label: "Active Surgical Centers", value: "200+", change: "+34 this year", icon: Activity },
                { label: "Patient Satisfaction", value: "4.9/5", change: "Top 1%", icon: Star },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.12 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-5 w-72 flex items-center gap-4 hover:bg-white/15 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/50">{stat.label}</p>
                    <p className="text-xl font-bold text-white font-heading">{stat.value}</p>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{stat.change}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Bar */}
      <section className="bg-card border-y border-border">
        <div className="container-main py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { label: "HIPAA Compliant", icon: Shield },
              { label: "ISO 27001 Certified", icon: CheckCircle },
              { label: "SOC 2 Type II", icon: CheckCircle },
              { label: "99.99% Uptime SLA", icon: Zap },
              { label: "256-bit Encryption", icon: Shield },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Why SurgiCore Pro</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">Built for Surgical Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything your surgical center needs to operate at peak performance — from OR scheduling to post-op analytics.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Real-Time OR Tracking", desc: "Monitor every operating room in real-time with live status updates, duration tracking, and automated turnover management." },
              { icon: TrendingUp, title: "23% Efficiency Gains", desc: "Our clients see an average 23% improvement in OR utilization within the first 90 days of deployment." },
              { icon: Shield, title: "Enterprise Security", desc: "HIPAA compliant, ISO 27001 certified, SOC 2 Type II audited. Your patient data is protected by military-grade encryption." },
              { icon: Zap, title: "Intelligent Scheduling", desc: "AI-assisted scheduling with conflict detection, surgeon availability heatmaps, and automatic optimization suggestions." },
              { icon: Activity, title: "Outcome Analytics", desc: "Track surgical outcomes, complication rates, readmission patterns, and surgeon performance benchmarks." },
              { icon: Users, title: "Team Coordination", desc: "Coordinate surgical teams across multiple theaters with real-time availability, credential tracking, and workload balancing." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-surface-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Go Live in 72 Hours</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect & Configure", desc: "Integrate with your existing EMR/EHR systems. Our team handles the migration and configuration of your surgical workflows." },
              { step: "02", title: "Train & Onboard", desc: "Comprehensive training for surgeons, nurses, and admin staff. Most teams are proficient within 48 hours." },
              { step: "03", title: "Optimize & Scale", desc: "Start seeing efficiency gains immediately. Our analytics engine continuously identifies optimization opportunities." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold font-heading mx-auto mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold font-heading text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Platform Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Complete Surgical Management Suite</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Monitor;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card-surface-hover p-5">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-base font-semibold font-heading text-foreground mb-1.5">{service.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
