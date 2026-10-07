import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, CalendarDays } from "lucide-react";
import { blogPosts } from "@/data/mockData";
import { CTASection } from "@/components/SharedSections";

import blog1 from "@/assets/blog/blog-1.jpg";
import blog2 from "@/assets/blog/blog-2.jpg";
import blog3 from "@/assets/blog/blog-3.jpg";
import blog4 from "@/assets/blog/blog-4.jpg";
import blog5 from "@/assets/blog/blog-5.jpg";
import blog6 from "@/assets/blog/blog-6.jpg";

const blogImages = [blog1, blog2, blog3, blog4, blog5, blog6];

const blogContent: Record<number, string> = {
  1: `Operating room utilization is one of the most critical metrics in surgical management. Studies show that the average OR utilization rate across US hospitals hovers around 68%, leaving significant room for improvement.\n\nBy implementing data-driven scheduling algorithms, facilities can identify gaps in their OR schedules, predict case durations more accurately, and reduce turnover times between procedures.\n\n## Key Strategies for Optimization\n\n**1. Real-Time Dashboard Monitoring**\nImplement live dashboards that show current OR status, upcoming cases, and utilization percentages. This allows charge nurses and surgical coordinators to make real-time adjustments.\n\n**2. Predictive Case Duration Modeling**\nUsing historical data, machine learning models can predict actual case durations with 85-90% accuracy, far exceeding traditional block scheduling estimates.\n\n**3. Automated Turnover Management**\nTrack and optimize the time between cases. Even reducing turnover by 5 minutes per case can add 1-2 additional procedures per OR per day.\n\n**4. Surgeon Performance Analytics**\nProvide surgeons with their own performance metrics — average case duration, start-time compliance, and cancellation rates — to drive accountability and improvement.\n\n## Results from Early Adopters\n\nFacilities using SurgiCore Pro's analytics suite have reported:\n- 23% improvement in OR utilization\n- 18% reduction in case cancellations\n- 12% decrease in overtime costs\n- 95%+ surgeon satisfaction with scheduling`,
  2: `Artificial intelligence is rapidly transforming how surgical centers approach scheduling. From predicting case durations to optimizing resource allocation, AI-powered tools are becoming indispensable.\n\n## The Evolution of Surgical Scheduling\n\nTraditional block scheduling — where surgeons are assigned fixed time blocks — has been the standard for decades. However, this approach leads to significant inefficiencies:\n\n- **Over-allocation**: Surgeons who don't fully utilize their blocks waste valuable OR time\n- **Under-allocation**: High-performing surgeons can't access additional time when needed\n- **Poor prediction**: Manual estimates of case duration are often inaccurate by 20-30%\n\n## How AI Changes the Game\n\n**Predictive Analytics**: Machine learning models analyze thousands of historical cases to predict duration, complications, and resource needs with unprecedented accuracy.\n\n**Dynamic Scheduling**: AI can automatically adjust schedules in real-time based on case progress, delays, and cancellations.\n\n**Resource Optimization**: Intelligent algorithms ensure the right staff, equipment, and instruments are available for each case.\n\n## Looking Ahead\n\nThe next frontier includes natural language processing for surgical notes, computer vision for OR workflow analysis, and digital twin simulations for capacity planning.`,
  3: `HIPAA compliance is non-negotiable in healthcare technology. Modern surgical management systems must implement robust security measures while maintaining usability for clinical staff.\n\n## Core HIPAA Requirements for Surgical Platforms\n\n**Access Controls**: Role-based access ensuring staff only see data relevant to their role. Surgeons see their patients; administrators see operational data; billing staff see financial records.\n\n**Audit Trails**: Every access to patient data must be logged with timestamps, user identification, and the specific records accessed.\n\n**Encryption**: Data must be encrypted both at rest and in transit. This includes database encryption, TLS/SSL for web traffic, and encrypted backups.\n\n**Business Associate Agreements**: All third-party vendors handling PHI must have signed BAAs.\n\n## Best Practices\n\n1. Implement multi-factor authentication for all users\n2. Conduct regular security audits and penetration testing\n3. Train staff on security awareness quarterly\n4. Maintain incident response plans\n5. Use automated compliance monitoring tools`,
  4: `Surgical site infections (SSIs) remain one of the most common healthcare-associated infections, affecting approximately 2-5% of surgical patients. Better inventory and sterilization tracking can significantly reduce these rates.\n\n## The Connection Between Inventory Management and SSI Prevention\n\n**Sterilization Cycle Tracking**: Every instrument must go through verified sterilization cycles. Automated tracking ensures no unsterilized instrument reaches the OR.\n\n**Expiry Management**: Consumables and implants have expiration dates. Automated alerts prevent the use of expired materials.\n\n**Lot Tracking**: In the event of a recall, lot-level tracking allows immediate identification of affected patients and procedures.\n\n## Implementation Guidelines\n\n1. Barcode or RFID tag all surgical instruments\n2. Implement automated sterilization verification\n3. Set up multi-level stock alerts (low, critical, out-of-stock)\n4. Create digital instrument set lists for each procedure type\n5. Track instrument usage per case for wear analysis`,
  5: `Building a high-performance surgical team requires more than just hiring talented individuals. It demands a data-driven approach to performance management, clear metrics, and a culture of continuous improvement.\n\n## Key Performance Indicators for Surgical Teams\n\n**Clinical Metrics**:\n- Case volume and complexity scores\n- Complication and readmission rates\n- First-case on-time start rates\n- Average case duration vs. scheduled duration\n\n**Operational Metrics**:\n- OR utilization rates per surgeon\n- Turnover time between cases\n- Case cancellation rates\n- Equipment/instrument readiness\n\n**Patient Outcomes**:\n- Patient satisfaction scores\n- Length of stay vs. benchmarks\n- 30-day readmission rates\n- Surgical site infection rates\n\n## Creating a Culture of Excellence\n\nTransparency in metrics drives improvement. When surgeons and staff can see their performance alongside benchmarks, they naturally strive to improve. The key is making data accessible, actionable, and non-punitive.`,
  6: `Revenue cycle management (RCM) is the financial backbone of any ambulatory surgical center. Optimizing this process can dramatically improve profitability and cash flow.\n\n## Common Revenue Cycle Challenges\n\n- **Coding Errors**: Incorrect CPT codes lead to claim denials and delayed payments\n- **Prior Authorization Delays**: Incomplete auth processes cause last-minute cancellations\n- **Undercoding**: Failure to capture all billable services leaves money on the table\n- **Slow Claims Processing**: Manual workflows create bottlenecks\n\n## Optimization Strategies\n\n**1. Automated Charge Capture**: Link surgical scheduling directly to billing to ensure every procedure is captured and coded correctly.\n\n**2. Real-Time Eligibility Verification**: Verify insurance coverage before the day of surgery to prevent day-of cancellations.\n\n**3. Analytics-Driven Denial Management**: Track denial patterns to identify root causes and implement preventive measures.\n\n**4. Integrated Financial Reporting**: Connect surgical volume data with revenue data to identify the most profitable service lines and optimize case mix.`,
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const postIndex = blogPosts.findIndex(p => p.id === Number(id));
  const post = blogPosts[postIndex];

  if (!post) {
    return (
      <section className="section-padding">
        <div className="container-main text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </section>
    );
  }

  const content = blogContent[post.id] || post.excerpt;

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container-main">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mt-4 mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-lg">
            <img src={blogImages[postIndex]} alt={post.title} className="w-full h-64 md:h-96 object-cover" loading="lazy" width={1200} height={600} />
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="container-main">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
            {content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-xl md:text-2xl font-bold font-heading text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('**') && paragraph.includes('**:')) {
                return <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />;
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(paragraph)) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-1 mb-4">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j} className="text-muted-foreground">{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />;
            })}
          </motion.article>
        </div>
      </section>

      <CTASection />
    </>
  );
}
