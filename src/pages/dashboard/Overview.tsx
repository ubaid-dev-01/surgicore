import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Clock, TrendingUp, AlertTriangle, Scissors, Bed, Wrench, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { surgeryKPIs, orUtilizationTrend, todaysSurgeries, surgeonLeaderboard, equipmentAlerts, postOpRecovery } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const card = "dashboard-card";

export default function DashboardOverview() {
  const { isAdmin, user } = useAuth();

  // Doctor sees limited view
  if (!isAdmin) {
    const mySurgeries = todaysSurgeries.filter(s => s.surgeon === user?.name);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Welcome, {user?.name}</h1>
          <p className="text-sm text-muted-foreground">Your surgical dashboard — today's schedule and profile</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={card}>
            <p className="text-sm text-muted-foreground">My Surgeries Today</p>
            <p className="text-3xl font-bold font-heading text-foreground">{mySurgeries.length}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={card}>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="text-lg font-bold font-heading text-foreground">{user?.department || "N/A"}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={card}>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="text-lg font-bold font-heading text-foreground capitalize">{user?.role}</p>
          </motion.div>
        </div>
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">My Today's Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["ID", "Patient", "Procedure", "OR", "Time", "Status"].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mySurgeries.length > 0 ? mySurgeries.map(s => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="py-3 px-3 font-medium text-foreground">{s.patient}</td>
                    <td className="py-3 px-3 text-muted-foreground">{s.procedure}</td>
                    <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{s.or}</span></td>
                    <td className="py-3 px-3 text-muted-foreground">{s.time}</td>
                    <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.status === "Completed" ? "bg-success/10 text-success" : s.status === "In Progress" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>{s.status}</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">No surgeries scheduled for today</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Admin full view
  const kpis = [
    { label: "Today's Surgeries", value: surgeryKPIs.todaySurgeries, icon: Scissors, color: "text-primary" },
    { label: "OR Utilization", value: `${surgeryKPIs.orUtilization}%`, icon: Activity, color: "text-info" },
    { label: "Avg. Case Duration", value: `${surgeryKPIs.avgCaseDuration} min`, icon: Clock, color: "text-warning" },
    { label: "Complication Rate", value: `${surgeryKPIs.complicationRate}%`, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Surgical Command Center</h1>
        <p className="text-sm text-muted-foreground">Real-time overview of all surgical operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={card}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p className="text-3xl font-bold font-heading text-foreground">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${card} lg:col-span-2`}>
          <h3 className="text-base font-semibold text-foreground mb-4">OR Utilization Trend (30 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={orUtilizationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="utilization" stroke="hsl(173, 78%, 26%)" fill="hsl(173, 78%, 26%)" fillOpacity={0.1} strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="hsl(var(--destructive))" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Add New Surgery", href: "/dashboard/surgeries" },
              { label: "Schedule OR Booking", href: "/dashboard/schedule" },
              { label: "Add Patient", href: "/dashboard/patients" },
              { label: "Create Invoice", href: "/dashboard/billing" },
              { label: "Manage Staff", href: "/dashboard/staff" },
              { label: "View Analytics", href: "/dashboard/analytics" },
            ].map(a => (
              <a key={a.label} href={a.href} className="block px-4 py-2.5 rounded-lg bg-muted/30 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors">{a.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={card}>
        <h3 className="text-base font-semibold text-foreground mb-4">Today's Surgical Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["ID", "Patient", "Procedure", "Surgeon", "OR", "Time", "Duration", "Status"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {todaysSurgeries.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{s.patient}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.procedure}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.surgeon}</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{s.or}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{s.time}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.duration}</td>
                  <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.status === "Completed" ? "bg-success/10 text-success" : s.status === "In Progress" ? "bg-info/10 text-info" : s.status === "Pre-Op" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Surgeon Performance</h3>
          <div className="space-y-3">
            {surgeonLeaderboard.map((s, i) => (
              <div key={s.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{s.surgeries} cases</p>
                  <p className="text-xs text-success">{s.successRate}% success</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2"><Wrench className="w-4 h-4" /> Equipment Alerts</h3>
            <div className="space-y-3">
              {equipmentAlerts.map(a => (
                <div key={a.equipment} className={`p-3 rounded-lg border ${a.severity === "warning" ? "border-warning/30 bg-warning/5" : a.severity === "success" ? "border-success/30 bg-success/5" : "border-info/30 bg-info/5"}`}>
                  <p className="text-sm font-medium text-foreground">{a.equipment}</p>
                  <p className="text-xs text-muted-foreground">{a.status} — {a.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2"><Bed className="w-4 h-4" /> Post-Op Recovery</h3>
            <div className="space-y-3">
              {postOpRecovery.map(p => (
                <div key={p.patient} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.patient}</p>
                    <p className="text-xs text-muted-foreground">{p.procedure} — {p.recoveryBed}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.vitalStatus === "Stable" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{p.vitalStatus}</span>
                    <p className="text-xs text-muted-foreground mt-1">{p.timeInRecovery}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
