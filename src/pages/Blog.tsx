import { motion } from "framer-motion";
import { Clock, ArrowRight, User, CalendarDays } from "lucide-react";
import { blogPosts } from "@/data/mockData";
import { CTASection } from "@/components/SharedSections";
import { Link } from "react-router-dom";

import blog1 from "@/assets/blog/blog-1.jpg";
import blog2 from "@/assets/blog/blog-2.jpg";
import blog3 from "@/assets/blog/blog-3.jpg";
import blog4 from "@/assets/blog/blog-4.jpg";
import blog5 from "@/assets/blog/blog-5.jpg";
import blog6 from "@/assets/blog/blog-6.jpg";

const blogImages = [blog1, blog2, blog3, blog4, blog5, blog6];

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function Blog() {
  const featured = blogPosts[0];

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container-main">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Insights & Resources</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-6 leading-tight">
              SurgiCore Pro <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Expert insights on surgical operations management, OR optimization, compliance best practices, and the latest in healthcare technology innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-8 md:pb-12">
        <div className="container-main">
          <Link to={`/blog/${featured.id}`}>
            <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="card-surface-hover overflow-hidden grid md:grid-cols-2 gap-0 group cursor-pointer">
              <div className="h-64 md:h-auto overflow-hidden">
                <img src={blogImages[0]} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={512} />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{featured.category}</span>
                  <span className="text-xs text-muted-foreground font-medium">Featured</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="section-padding pt-8">
        <div className="container-main">
          <motion.div {...fadeInUp} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Latest Articles</h2>
            <p className="text-muted-foreground mt-2">Stay ahead with the latest in surgical management and healthcare innovation.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, i) => (
              <Link to={`/blog/${post.id}`} key={post.id}>
                <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="card-surface-hover overflow-hidden group cursor-pointer flex flex-col h-full">
                  <div className="h-52 overflow-hidden">
                    <img src={blogImages[i + 1]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={512} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">{post.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-background">
        <div className="container-main">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">Get the latest surgical operations insights delivered to your inbox. No spam, unsubscribe anytime.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your work email" className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
