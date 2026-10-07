import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const card = "dashboard-card";

const initialSurgeries = [
  { id: "SRG-2024-001", patient: "Robert Mitchell", procedure: "Total Knee Arthroplasty", surgeon: "Dr. Sarah Chen", or: "OR-1", time: "07:30 AM", status: "In Progress", duration: "2h 15m" },
  { id: "SRG-2024-002", patient: "Maria Santos", procedure: "Laparoscopic Cholecystectomy", surgeon: "Dr. James Wilson", or: "OR-2", time: "08:00 AM", status: "Completed", duration: "1h 45m" },
  { id: "SRG-2024-003", patient: "David Johnson", procedure: "Coronary Artery Bypass", surgeon: "Dr. Aisha Patel", or: "OR-3", time: "08:30 AM", status: "In Progress", duration: "4h 30m" },
  { id: "SRG-2024-004", patient: "Jennifer Lee", procedure: "Spinal Fusion L4-L5", surgeon: "Dr. Michael Brooks", or: "OR-4", time: "09:00 AM", status: "Scheduled", duration: "3h 00m" },
  { id: "SRG-2024-005", patient: "Thomas Wright", procedure: "Rotator Cuff Repair", surgeon: "Dr. Sarah Chen", or: "OR-5", time: "10:30 AM", status: "Scheduled", duration: "2h 00m" },
  { id: "SRG-2024-006", patient: "Lisa Anderson", procedure: "Hip Replacement", surgeon: "Dr. James Wilson", or: "OR-1", time: "11:00 AM", status: "Scheduled", duration: "2h 30m" },
  { id: "SRG-2024-007", patient: "Carlos Rivera", procedure: "Appendectomy", surgeon: "Dr. Emily Nakamura", or: "OR-6", time: "07:45 AM", status: "Completed", duration: "0h 55m" },
  { id: "SRG-2024-008", patient: "Patricia Moore", procedure: "Cataract Surgery", surgeon: "Dr. Richard Kim", or: "OR-7", time: "09:30 AM", status: "Cancelled", duration: "0h 40m" },
];

const emptyForm = { patient: "", procedure: "", surgeon: "", or: "OR-1", time: "", status: "Scheduled", duration: "" };
const statuses = ["Scheduled", "In Progress", "Completed", "Cancelled"];

export default function Surgeries() {
  const { isAdmin, user } = useAuth();
  const [surgeries, setSurgeries] = useState(initialSurgeries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialSurgeries[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [viewItem, setViewItem] = useState<typeof initialSurgeries[0] | null>(null);

  const displaySurgeries = isAdmin ? surgeries : surgeries.filter(s => s.surgeon === user?.name);

  const filtered = displaySurgeries.filter(s => {
    const matchesSearch = s.patient.toLowerCase().includes(search.toLowerCase()) || s.procedure.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (s: typeof initialSurgeries[0]) => { setEditItem(s); setForm(s); setModalOpen(true); };

  const handleSave = () => {
    if (!form.patient || !form.procedure || !form.surgeon) { toast.error("Fill all required fields"); return; }
    if (editItem) {
      setSurgeries(prev => prev.map(s => s.id === editItem.id ? { ...s, ...form } : s));
      toast.success("Surgery updated successfully");
    } else {
      const newId = `SRG-2024-${String(surgeries.length + 1).padStart(3, "0")}`;
      setSurgeries(prev => [...prev, { ...form, id: newId }]);
      toast.success("Surgery added successfully");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSurgeries(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
    toast.success("Surgery deleted");
  };

  const handleBulkDelete = () => {
    setSurgeries(prev => prev.filter(s => !selected.includes(s.id)));
    setSelected([]);
    toast.success(`${selected.length} surgeries deleted`);
  };

  const handleStatusChange = (id: string, status: string) => {
    setSurgeries(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast.success(`Status changed to ${status}`);
  };

  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(s => s.id));

  const statusColor = (status: string) =>
    status === "Completed" ? "bg-success/10 text-success" :
    status === "In Progress" ? "bg-info/10 text-info" :
    status === "Cancelled" ? "bg-destructive/10 text-destructive" :
    "bg-muted text-muted-foreground";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Surgeries Management</h1>
          <p className="text-sm text-muted-foreground">{isAdmin ? "Complete surgical records and case management" : "Your surgical cases"}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && selected.length > 0 && (
            <button onClick={handleBulkDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">
              Delete ({selected.length})
            </button>
          )}
          {isAdmin && (
            <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Surgery
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: displaySurgeries.length },
          { label: "Completed", value: displaySurgeries.filter(s => s.status === "Completed").length },
          { label: "In Progress", value: displaySurgeries.filter(s => s.status === "In Progress").length },
          { label: "Scheduled", value: displaySurgeries.filter(s => s.status === "Scheduled").length },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={card}>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className={card}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by patient or procedure..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["All", ...statuses].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {isAdmin && <th className="py-3 px-3"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded" /></th>}
              {["ID", "Patient", "Procedure", "Surgeon", "OR", "Time", "Status", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  {isAdmin && <td className="py-3 px-3"><input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} className="rounded" /></td>}
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{s.patient}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.procedure}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.surgeon}</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{s.or}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{s.time}</td>
                  <td className="py-3 px-3">
                    {isAdmin ? (
                      <select value={s.status} onChange={(e) => handleStatusChange(s.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColor(s.status)}`}>
                        {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(s.status)}`}>{s.status}</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewItem(s)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="View"><Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
                      {isAdmin && (
                        <>
                          <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Edit"><Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
                          <button onClick={() => setDeleteConfirm(s.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-destructive/70 hover:text-destructive" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No surgeries found.</p>}
        </div>
      </div>

      {/* View Detail Modal */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Surgery Details</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Surgery ID</p><p className="text-sm font-medium font-mono text-foreground">{viewItem.id}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(viewItem.status)}`}>{viewItem.status}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground">Patient</p><p className="text-sm font-medium text-foreground">{viewItem.patient}</p></div>
                <div><p className="text-xs text-muted-foreground">Surgeon</p><p className="text-sm font-medium text-foreground">{viewItem.surgeon}</p></div>
              </div>
              <div><p className="text-xs text-muted-foreground">Procedure</p><p className="text-sm font-medium text-foreground">{viewItem.procedure}</p></div>
              <div className="grid grid-cols-3 gap-4">
                <div><p className="text-xs text-muted-foreground">Operating Room</p><p className="text-sm font-medium text-foreground">{viewItem.or}</p></div>
                <div><p className="text-xs text-muted-foreground">Scheduled Time</p><p className="text-sm font-medium text-foreground">{viewItem.time}</p></div>
                <div><p className="text-xs text-muted-foreground">Duration</p><p className="text-sm font-medium text-foreground">{viewItem.duration}</p></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <button onClick={() => setViewItem(null)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Close</button>
            {isAdmin && viewItem && (
              <button onClick={() => { setViewItem(null); openEdit(viewItem); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Edit Surgery</button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Surgery" : "Add New Surgery"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Patient *</label><input value={form.patient} onChange={e => setForm({ ...form, patient: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Procedure *</label><input value={form.procedure} onChange={e => setForm({ ...form, procedure: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Surgeon *</label><input value={form.surgeon} onChange={e => setForm({ ...form, surgeon: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">OR</label>
                <select value={form.or} onChange={e => setForm({ ...form, or: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {Array.from({ length: 10 }, (_, i) => <option key={i} value={`OR-${i+1}`}>OR-{i+1}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Time</label><input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="07:30 AM" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Duration</label><input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="2h 00m" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {statuses.map(st => <option key={st}>{st}</option>)}
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

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to delete this surgery? This action cannot be undone.</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
