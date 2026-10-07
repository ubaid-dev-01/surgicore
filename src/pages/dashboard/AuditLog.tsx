import { useState } from "react";
import { ScrollText, Filter } from "lucide-react";

const card = "dashboard-card";

const auditLogs = [
  { id: 1, action: "User Login", user: "Admin SurgiCore", role: "Admin", target: "System", timestamp: "2024-01-15 09:00:12", ip: "192.168.1.100" },
  { id: 2, action: "Patient Record Created", user: "Admin SurgiCore", role: "Admin", target: "PT-10007", timestamp: "2024-01-15 09:15:33", ip: "192.168.1.100" },
  { id: 3, action: "Surgery Scheduled", user: "Admin SurgiCore", role: "Admin", target: "SRG-2024-009", timestamp: "2024-01-15 09:20:45", ip: "192.168.1.100" },
  { id: 4, action: "User Login", user: "Dr. Sarah Chen", role: "Doctor", target: "System", timestamp: "2024-01-15 08:30:00", ip: "192.168.1.105" },
  { id: 5, action: "Patient Record Accessed", user: "Dr. Sarah Chen", role: "Doctor", target: "PT-10001", timestamp: "2024-01-15 08:35:22", ip: "192.168.1.105" },
  { id: 6, action: "Surgery Status Updated", user: "Admin SurgiCore", role: "Admin", target: "SRG-2024-003", timestamp: "2024-01-15 10:00:15", ip: "192.168.1.100" },
  { id: 7, action: "Invoice Created", user: "Admin SurgiCore", role: "Admin", target: "INV-5006", timestamp: "2024-01-15 10:30:00", ip: "192.168.1.100" },
  { id: 8, action: "Staff Member Added", user: "Admin SurgiCore", role: "Admin", target: "STF-007", timestamp: "2024-01-15 11:00:45", ip: "192.168.1.100" },
  { id: 9, action: "Inventory Updated", user: "Admin SurgiCore", role: "Admin", target: "INV-004", timestamp: "2024-01-15 11:15:30", ip: "192.168.1.100" },
  { id: 10, action: "User Logout", user: "Dr. Sarah Chen", role: "Doctor", target: "System", timestamp: "2024-01-15 12:00:00", ip: "192.168.1.105" },
  { id: 11, action: "Patient Record Updated", user: "Admin SurgiCore", role: "Admin", target: "PT-10003", timestamp: "2024-01-15 13:00:22", ip: "192.168.1.100" },
  { id: 12, action: "Report Exported", user: "Admin SurgiCore", role: "Admin", target: "Analytics Report", timestamp: "2024-01-15 14:00:00", ip: "192.168.1.100" },
  { id: 13, action: "User Role Changed", user: "Admin SurgiCore", role: "Admin", target: "USR-004", timestamp: "2024-01-15 14:30:11", ip: "192.168.1.100" },
  { id: 14, action: "Password Changed", user: "Nurse Rachel Green", role: "Nurse", target: "Self", timestamp: "2024-01-15 15:00:00", ip: "192.168.1.110" },
  { id: 15, action: "Billing Status Updated", user: "Admin SurgiCore", role: "Admin", target: "INV-5002", timestamp: "2024-01-15 15:30:45", ip: "192.168.1.100" },
];

const actionTypes = ["All", "User Login", "User Logout", "Patient Record", "Surgery", "Invoice", "Staff", "Inventory", "Report", "Password", "Billing", "User Role"];

export default function AuditLog() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? auditLogs : auditLogs.filter(l => l.action.toLowerCase().includes(filter.toLowerCase()));

  const getActionColor = (action: string) => {
    if (action.includes("Login") || action.includes("Logout")) return "bg-info/10 text-info";
    if (action.includes("Created") || action.includes("Added")) return "bg-success/10 text-success";
    if (action.includes("Updated") || action.includes("Changed")) return "bg-warning/10 text-warning";
    if (action.includes("Deleted")) return "bg-destructive/10 text-destructive";
    if (action.includes("Exported")) return "bg-primary/10 text-primary";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> Audit Log</h1>
        <p className="text-sm text-muted-foreground">System activity log — all actions tracked for compliance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: auditLogs.length },
          { label: "Admin Actions", value: auditLogs.filter(l => l.role === "Admin").length },
          { label: "Doctor Actions", value: auditLogs.filter(l => l.role === "Doctor").length },
          { label: "Today", value: auditLogs.length },
        ].map(s => (
          <div key={s.label} className={card}><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold font-heading text-foreground">{s.value}</p></div>
        ))}
      </div>

      <div className={card}>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {actionTypes.map(a => (
            <button key={a} onClick={() => setFilter(a)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{a}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["#", "Action", "User", "Role", "Target", "Timestamp", "IP Address"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{l.id}</td>
                  <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getActionColor(l.action)}`}>{l.action}</span></td>
                  <td className="py-3 px-3 font-medium text-foreground">{l.user}</td>
                  <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.role === "Admin" ? "bg-primary/10 text-primary" : l.role === "Doctor" ? "bg-info/10 text-info" : "bg-warning/10 text-warning"}`}>{l.role}</span></td>
                  <td className="py-3 px-3 text-muted-foreground font-mono text-xs">{l.target}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{l.timestamp}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground font-mono">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
