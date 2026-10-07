import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity, LayoutDashboard, Scissors, CalendarDays, Users, Receipt,
  UserCog, Package, BarChart3, Settings, ChevronLeft, ChevronRight, LogOut, ShieldCheck, ScrollText
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const allMenuItems = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard, roles: ["admin", "doctor"] },
  { label: "Surgeries", path: "/dashboard/surgeries", icon: Scissors, roles: ["admin", "doctor"] },
  { label: "Schedule", path: "/dashboard/schedule", icon: CalendarDays, roles: ["admin", "doctor"] },
  { label: "Patients", path: "/dashboard/patients", icon: Users, roles: ["admin"] },
  { label: "Billing", path: "/dashboard/billing", icon: Receipt, roles: ["admin"] },
  { label: "Staff", path: "/dashboard/staff", icon: UserCog, roles: ["admin"] },
  { label: "Inventory", path: "/dashboard/inventory", icon: Package, roles: ["admin"] },
  { label: "Analytics", path: "/dashboard/analytics", icon: BarChart3, roles: ["admin"] },
  { label: "User Management", path: "/dashboard/users", icon: ShieldCheck, roles: ["admin"] },
  { label: "Audit Log", path: "/dashboard/audit-log", icon: ScrollText, roles: ["admin"] },
  { label: "Settings", path: "/dashboard/settings", icon: Settings, roles: ["admin", "doctor"] },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({ collapsed, onToggle }: Props) {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = allMenuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-40"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold font-heading text-sidebar-foreground">SurgiCore Pro</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        <button onClick={onToggle} className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors hidden md:block">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && user && (
        <div className="px-4 py-2 border-b border-sidebar-border">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            user.role === "admin" ? "bg-primary/20 text-primary" : "bg-info/20 text-info"
          }`}>
            {user.role}
          </span>
        </div>
      )}

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-destructive hover:bg-sidebar-accent transition-all w-full ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
