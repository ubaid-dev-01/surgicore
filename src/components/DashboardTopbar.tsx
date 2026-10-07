import { useState, useRef, useEffect } from "react";
import { Search, Bell, X } from "lucide-react";

interface Props {
  user: { name: string; role: string; avatar: string } | null;
}

const mockNotifications = [
  { id: 1, title: "Surgery SRG-2024-003 completed", desc: "Dr. Aisha Patel — CABG procedure finished successfully.", time: "2 min ago", read: false },
  { id: 2, title: "Low stock alert: Bone Cement", desc: "Only 3 units remaining. Minimum threshold is 10.", time: "15 min ago", read: false },
  { id: 3, title: "New patient pre-op clearance", desc: "Jennifer Lee cleared for Spinal Fusion L4-L5.", time: "1 hour ago", read: false },
  { id: 4, title: "Schedule change: OR-5", desc: "Dr. Sarah Chen's 10:30 AM case moved to 11:00 AM.", time: "2 hours ago", read: true },
  { id: 5, title: "Staff credential expiry", desc: "Dr. James Wilson's board certification expires in 30 days.", time: "3 hours ago", read: true },
];

export default function DashboardTopbar({ user }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search surgeries, patients, staff..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={ref}>
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 md:w-96 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No notifications</p>
                ) : notifications.map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                    </div>
                    <button onClick={() => dismiss(n.id)} className="p-1 rounded hover:bg-muted shrink-0"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              {user.avatar}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
