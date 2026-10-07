import { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const card = "dashboard-card";

const initialStaff = [
  { id: "STF-001", name: "Dr. Sarah Chen", role: "Lead Surgeon", department: "Orthopedics", status: "On Duty", shift: "Day", experience: "15 years", surgeriesToday: 3, email: "sarah.chen@surgicore.com" },
  { id: "STF-002", name: "Dr. James Wilson", role: "Surgeon", department: "General Surgery", status: "On Duty", shift: "Day", experience: "12 years", surgeriesToday: 2, email: "james.wilson@surgicore.com" },
  { id: "STF-003", name: "Dr. Aisha Patel", role: "Cardiac Surgeon", department: "Cardiology", status: "In Surgery", shift: "Day", experience: "18 years", surgeriesToday: 1, email: "aisha.patel@surgicore.com" },
  { id: "STF-004", name: "Nurse Rachel Green", role: "OR Nurse Manager", department: "Nursing", status: "On Duty", shift: "Day", experience: "10 years", surgeriesToday: 0, email: "rachel.green@surgicore.com" },
  { id: "STF-005", name: "Dr. Mark Stevens", role: "Anesthesiologist", department: "Anesthesiology", status: "On Duty", shift: "Day", experience: "14 years", surgeriesToday: 4, email: "mark.stevens@surgicore.com" },
  { id: "STF-006", name: "Tech. Lisa Park", role: "Surgical Tech", department: "OR Support", status: "On Duty", shift: "Day", experience: "8 years", surgeriesToday: 3, email: "lisa.park@surgicore.com" },
];

const roles = ["Lead Surgeon", "Surgeon", "Cardiac Surgeon", "Anesthesiologist", "OR Nurse Manager", "Surgical Tech", "Nurse"];
const departments = ["Orthopedics", "General Surgery", "Cardiology", "Nursing", "Anesthesiology", "OR Support", "Neurosurgery"];
const emptyForm = { name: "", role: "Surgeon", department: "General Surgery", status: "On Duty", shift: "Day", experience: "", email: "" };

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialStaff[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (s: typeof initialStaff[0]) => { setEditItem(s); setForm(s); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error("Name and email required"); return; }
    if (editItem) {
      setStaff(prev => prev.map(s => s.id === editItem.id ? { ...s, ...form, surgeriesToday: editItem.surgeriesToday } : s));
      toast.success("Staff updated");
    } else {
      setStaff(prev => [...prev, { ...form, id: `STF-${String(prev.length + 1).padStart(3, "0")}`, surgeriesToday: 0 }]);
      toast.success("Staff member added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setStaff(prev => prev.filter(s => s.id !== id)); setDeleteConfirm(null); toast.success("Staff member removed"); };
  const handleBulkDelete = () => { setStaff(prev => prev.filter(s => !selected.includes(s.id))); setSelected([]); toast.success(`${selected.length} staff removed`); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Staff Management</h1>
          <p className="text-sm text-muted-foreground">Manage surgeons, anesthetists & OT staff</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && <button onClick={handleBulkDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete ({selected.length})</button>}
          <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Add Staff</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Staff", value: staff.length },
          { label: "On Duty", value: staff.filter(s => s.status === "On Duty").length },
          { label: "In Surgery", value: staff.filter(s => s.status === "In Surgery").length },
          { label: "Departments", value: new Set(staff.map(s => s.department)).size },
        ].map(s => (
          <div key={s.label} className={card}><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold font-heading text-foreground">{s.value}</p></div>
        ))}
      </div>

      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Staff Directory</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="py-3 px-3"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map(s => s.id))} /></th>
              {["ID", "Name", "Role", "Department", "Status", "Shift", "Experience", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3"><input type="checkbox" checked={selected.includes(s.id)} onChange={() => setSelected(prev => prev.includes(s.id) ? prev.filter(x => x !== s.id) : [...prev, s.id])} /></td>
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.role}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.department}</td>
                  <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.status === "On Duty" ? "bg-success/10 text-success" : s.status === "In Surgery" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>{s.status}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{s.shift}</td>
                  <td className="py-3 px-3 text-muted-foreground">{s.experience}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => setDeleteConfirm(s.id)} className="p-1.5 rounded-lg hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Edit Staff" : "Add Staff Member"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Email *</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {roles.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Department</label>
                <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Shift</label>
                <select value={form.shift} onChange={e => setForm({ ...form, shift: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  <option>Day</option><option>Night</option><option>Rotational</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  <option>On Duty</option><option>In Surgery</option><option>Off Duty</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Experience</label><input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="10 years" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">{editItem ? "Update" : "Add"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Remove this staff member?</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
