import React, { useState } from "react";
import { CalendarDays, List, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const card = "dashboard-card";
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const initialBookings = [
  { id: "BK-001", patient: "Robert Mitchell", procedure: "Total Knee Arthroplasty", surgeon: "Dr. Sarah Chen", or: "OR-1", day: "Mon", time: "07:00", status: "Confirmed" },
  { id: "BK-002", patient: "Maria Santos", procedure: "Lap. Cholecystectomy", surgeon: "Dr. James Wilson", or: "OR-2", day: "Mon", time: "08:00", status: "Confirmed" },
  { id: "BK-003", patient: "David Johnson", procedure: "CABG", surgeon: "Dr. Aisha Patel", or: "OR-3", day: "Tue", time: "08:00", status: "Pending" },
  { id: "BK-004", patient: "Jennifer Lee", procedure: "Spinal Fusion", surgeon: "Dr. Michael Brooks", or: "OR-4", day: "Wed", time: "09:00", status: "Confirmed" },
  { id: "BK-005", patient: "Thomas Wright", procedure: "Rotator Cuff Repair", surgeon: "Dr. Sarah Chen", or: "OR-5", day: "Thu", time: "10:00", status: "Confirmed" },
  { id: "BK-006", patient: "Lisa Anderson", procedure: "Hip Replacement", surgeon: "Dr. James Wilson", or: "OR-1", day: "Fri", time: "07:00", status: "Pending" },
];

const emptyForm = { patient: "", procedure: "", surgeon: "", or: "OR-1", day: "Mon", time: "07:00", status: "Pending" };

export default function Schedule() {
  const { isAdmin } = useAuth();
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [bookings, setBookings] = useState(initialBookings);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialBookings[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = (day?: string, time?: string) => {
    setEditItem(null);
    setForm({ ...emptyForm, day: day || "Mon", time: time || "07:00" });
    setModalOpen(true);
  };
  const openEdit = (b: typeof initialBookings[0]) => { setEditItem(b); setForm(b); setModalOpen(true); };

  const handleSave = () => {
    if (!form.patient || !form.procedure) { toast.error("Fill required fields"); return; }
    if (editItem) {
      setBookings(prev => prev.map(b => b.id === editItem.id ? { ...b, ...form } : b));
      toast.success("Booking updated");
    } else {
      setBookings(prev => [...prev, { ...form, id: `BK-${String(prev.length + 1).padStart(3, "0")}` }]);
      toast.success("Booking added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    setDeleteConfirm(null);
    toast.success("Booking deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">OR Schedule</h1>
          <p className="text-sm text-muted-foreground">Operating room scheduling and management</p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button onClick={() => openAdd()} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Booking
            </button>
          )}
          <button onClick={() => setView("calendar")} className={`p-2 rounded-lg transition-colors ${view === "calendar" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <CalendarDays className="w-4 h-4" />
          </button>
          <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: bookings.length },
          { label: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length },
          { label: "Pending", value: bookings.filter(b => b.status === "Pending").length },
          { label: "ORs in Use", value: new Set(bookings.map(b => b.or)).size },
        ].map(s => (
          <div key={s.label} className={card}>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {view === "calendar" ? (
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Weekly OR Calendar</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                <div className="bg-card p-2" />
                {weekDays.map(d => <div key={d} className="bg-card p-2 text-center text-xs font-semibold text-muted-foreground">{d}</div>)}
                {timeSlots.map(time => (
                  <React.Fragment key={time}>
                    <div className="bg-card p-2 text-xs text-muted-foreground text-right pr-3">{time}</div>
                    {weekDays.map(day => {
                      const booking = bookings.find(b => b.day === day && b.time === time);
                      return (
                        <div key={`${time}-${day}`} className={`bg-card p-1 min-h-[48px] cursor-pointer hover:bg-muted/30 transition-colors ${isAdmin ? "" : ""}`}
                          onClick={() => isAdmin && !booking && openAdd(day, time)}>
                          {booking && (
                            <div className={`px-1.5 py-1 rounded text-[10px] font-medium truncate ${booking.status === "Confirmed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}
                              onClick={(e) => { e.stopPropagation(); if (isAdmin) openEdit(booking); }}>
                              {booking.or} · {booking.surgeon.replace("Dr. ", "")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Bookings List</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["ID", "Patient", "Procedure", "Surgeon", "OR", "Day", "Time", "Status", ...(isAdmin ? ["Actions"] : [])].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                    <td className="py-3 px-3 font-medium text-foreground">{b.patient}</td>
                    <td className="py-3 px-3 text-muted-foreground">{b.procedure}</td>
                    <td className="py-3 px-3 text-muted-foreground">{b.surgeon}</td>
                    <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{b.or}</span></td>
                    <td className="py-3 px-3 text-muted-foreground">{b.day}</td>
                    <td className="py-3 px-3 text-muted-foreground">{b.time}</td>
                    <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.status === "Confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{b.status}</span></td>
                    {isAdmin && (
                      <td className="py-3 px-3">
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                          <button onClick={() => setDeleteConfirm(b.id)} className="p-1.5 rounded-lg hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Edit Booking" : "Add Booking"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Patient *</label><input value={form.patient} onChange={e => setForm({ ...form, patient: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Procedure *</label><input value={form.procedure} onChange={e => setForm({ ...form, procedure: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Surgeon</label><input value={form.surgeon} onChange={e => setForm({ ...form, surgeon: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">OR</label>
                <select value={form.or} onChange={e => setForm({ ...form, or: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {Array.from({ length: 10 }, (_, i) => <option key={i}>OR-{i+1}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Day</label>
                <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {weekDays.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Time</label>
                <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {timeSlots.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  <option>Pending</option><option>Confirmed</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">{editItem ? "Update" : "Add"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Delete this booking?</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


