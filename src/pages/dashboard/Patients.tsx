import { useState } from "react";
import { Search, Filter, Plus, Pencil, Trash2, Eye, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const card = "dashboard-card";

const initialPatients = [
  { id: "PT-10001", name: "Robert Mitchell", age: 67, gender: "Male", bloodType: "O+", allergies: "Penicillin", preOpStatus: "Cleared", surgeries: 2, lastVisit: "2024-01-15", insurance: "BlueCross PPO", phone: "(617) 555-0101" },
  { id: "PT-10002", name: "Maria Santos", age: 45, gender: "Female", bloodType: "A+", allergies: "None", preOpStatus: "Cleared", surgeries: 1, lastVisit: "2024-01-14", insurance: "Aetna HMO", phone: "(617) 555-0102" },
  { id: "PT-10003", name: "David Johnson", age: 72, gender: "Male", bloodType: "B+", allergies: "Latex, Sulfa", preOpStatus: "Pending Labs", surgeries: 3, lastVisit: "2024-01-15", insurance: "Medicare", phone: "(617) 555-0103" },
  { id: "PT-10004", name: "Jennifer Lee", age: 55, gender: "Female", bloodType: "AB-", allergies: "None", preOpStatus: "Cleared", surgeries: 1, lastVisit: "2024-01-13", insurance: "UnitedHealth", phone: "(617) 555-0104" },
  { id: "PT-10005", name: "Thomas Wright", age: 38, gender: "Male", bloodType: "O-", allergies: "Iodine", preOpStatus: "Cleared", surgeries: 1, lastVisit: "2024-01-15", insurance: "Cigna", phone: "(617) 555-0105" },
  { id: "PT-10006", name: "Lisa Anderson", age: 61, gender: "Female", bloodType: "A-", allergies: "None", preOpStatus: "Pending Cardiology", surgeries: 2, lastVisit: "2024-01-12", insurance: "BlueCross PPO", phone: "(617) 555-0106" },
];

const emptyForm = { name: "", age: 0, gender: "Male", bloodType: "O+", allergies: "", preOpStatus: "Pending Labs", insurance: "", phone: "" };

export default function Patients() {
  const { isAdmin } = useAuth();
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [preOpFilter, setPreOpFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialPatients[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewPatient, setViewPatient] = useState<typeof initialPatients[0] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = preOpFilter === "All" || p.preOpStatus === preOpFilter;
    return matchesSearch && matchesFilter;
  });

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p: typeof initialPatients[0]) => { setEditItem(p); setForm(p); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name) { toast.error("Name is required"); return; }
    if (editItem) {
      setPatients(prev => prev.map(p => p.id === editItem.id ? { ...p, ...form, surgeries: editItem.surgeries, lastVisit: editItem.lastVisit } : p));
      toast.success("Patient updated");
    } else {
      setPatients(prev => [...prev, { ...form, id: `PT-${10000 + prev.length + 1}`, surgeries: 0, lastVisit: new Date().toISOString().split("T")[0] }]);
      toast.success("Patient added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setPatients(prev => prev.filter(p => p.id !== id)); setDeleteConfirm(null); toast.success("Patient deleted"); };
  const handleBulkDelete = () => { setPatients(prev => prev.filter(p => !selected.includes(p.id))); setSelected([]); toast.success(`${selected.length} patients deleted`); };
  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Patient Management</h1>
          <p className="text-sm text-muted-foreground">Surgical patient directory and management</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && <button onClick={handleBulkDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete ({selected.length})</button>}
          {isAdmin && <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Add Patient</button>}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: patients.length },
          { label: "Pre-Op Cleared", value: patients.filter(p => p.preOpStatus === "Cleared").length },
          { label: "Pending Labs", value: patients.filter(p => p.preOpStatus.includes("Pending")).length },
          { label: "Scheduled This Week", value: 18 },
        ].map(s => (
          <div key={s.label} className={card}><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold font-heading text-foreground">{s.value}</p></div>
        ))}
      </div>

      <div className={card}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["All", "Cleared", "Pending Labs", "Pending Cardiology"].map(s => (
              <button key={s} onClick={() => setPreOpFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${preOpFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {isAdmin && <th className="py-3 px-3"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id))} /></th>}
              {["ID", "Patient", "Age", "Gender", "Blood", "Pre-Op", "Surgeries", "Insurance", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30">
                  {isAdmin && <td className="py-3 px-3"><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>}
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{p.age}</td>
                  <td className="py-3 px-3 text-muted-foreground">{p.gender}</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-destructive/10 text-destructive text-xs font-medium">{p.bloodType}</span></td>
                  <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.preOpStatus === "Cleared" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{p.preOpStatus}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{p.surgeries}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{p.insurance}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => setViewPatient(p)} className="p-1.5 rounded-lg hover:bg-muted"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                      {isAdmin && <>
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
                      </>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Edit Patient" : "Add Patient"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Age</label><input type="number" value={form.age} onChange={e => setForm({ ...form, age: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Gender</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"><option>Male</option><option>Female</option></select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Blood Type</label>
                <select value={form.bloodType} onChange={e => setForm({ ...form, bloodType: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Pre-Op Status</label>
                <select value={form.preOpStatus} onChange={e => setForm({ ...form, preOpStatus: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  <option>Cleared</option><option>Pending Labs</option><option>Pending Cardiology</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Allergies</label><input value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Insurance</label><input value={form.insurance} onChange={e => setForm({ ...form, insurance: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-1">Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
          </div>
          <DialogFooter>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">{editItem ? "Update" : "Add"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Patient */}
      <Dialog open={!!viewPatient} onOpenChange={() => setViewPatient(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Patient Details</DialogTitle></DialogHeader>
          {viewPatient && (
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">ID:</span> <span className="font-medium">{viewPatient.id}</span></div>
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{viewPatient.name}</span></div>
                <div><span className="text-muted-foreground">Age:</span> <span className="font-medium">{viewPatient.age}</span></div>
                <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium">{viewPatient.gender}</span></div>
                <div><span className="text-muted-foreground">Blood:</span> <span className="font-medium">{viewPatient.bloodType}</span></div>
                <div><span className="text-muted-foreground">Allergies:</span> <span className="font-medium">{viewPatient.allergies}</span></div>
                <div><span className="text-muted-foreground">Insurance:</span> <span className="font-medium">{viewPatient.insurance}</span></div>
                <div><span className="text-muted-foreground">Pre-Op:</span> <span className="font-medium">{viewPatient.preOpStatus}</span></div>
                <div><span className="text-muted-foreground">Total Surgeries:</span> <span className="font-medium">{viewPatient.surgeries}</span></div>
                <div><span className="text-muted-foreground">Last Visit:</span> <span className="font-medium">{viewPatient.lastVisit}</span></div>
              </div>
              <h4 className="text-sm font-semibold mt-4">Surgical History</h4>
              <div className="space-y-2">
                {viewPatient.surgeries > 0 ? Array.from({ length: viewPatient.surgeries }, (_, i) => (
                  <div key={i} className="p-2 rounded-lg bg-muted/30 text-xs">
                    <p className="font-medium text-foreground">Surgery #{i + 1} — Completed</p>
                    <p className="text-muted-foreground">Date: 2024-01-{String(15 - i * 5).padStart(2, "0")}</p>
                  </div>
                )) : <p className="text-xs text-muted-foreground">No prior surgeries</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Delete this patient record?</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
