import { Link } from "react-router-dom";
import { Activity, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold font-heading">SurgiCore</span>
                <span className="text-lg font-bold font-heading text-primary"> Pro</span>
              </div>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              Precision in Every Procedure. Enterprise-grade surgical management trusted by 200+ surgical centers worldwide.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {["HIPAA", "ISO 27001", "SOC 2"].map((badge) => (
                <span key={badge} className="px-2.5 py-1 rounded text-xs font-medium bg-primary/20 text-primary">{badge}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {["OR Management", "Scheduling", "Analytics", "Billing", "Inventory", "Staff Management"].map((item) => (
                <li key={item}><Link to="/services" className="text-sm text-background/60 hover:text-primary transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[{ l: "About Us", p: "/about" }, { l: "Our Doctors", p: "/doctors" }, { l: "Blog", p: "/blog" }, { l: "Contact", p: "/contact" }, { l: "Book Demo", p: "/book" }].map((item) => (
                <li key={item.l}><Link to={item.p} className="text-sm text-background/60 hover:text-primary transition-colors">{item.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/60"><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />450 Surgical Center Blvd, Suite 200, Boston, MA 02115</li>
              <li className="flex items-center gap-3 text-sm text-background/60"><Phone className="w-4 h-4 text-primary shrink-0" />(617) 555-0192</li>
              <li className="flex items-center gap-3 text-sm text-background/60"><Mail className="w-4 h-4 text-primary shrink-0" />info@surgicorepro.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">© 2024 SurgiCore Pro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "HIPAA Notice"].map((item) => (
              <a key={item} href="#" className="text-sm text-background/40 hover:text-primary transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
