import { useState } from "react";
import { ShieldCheck, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const card = "dashboard-card";

const initialUsers = [
  { id: "USR-001", name: "Admin SurgiCore", email: "admin@surgicore.com", role: "Admin", status: "Active", lastLogin: "2024-01-15 09:00" },
  { id: "USR-002", name: "Dr. Sarah Chen", email: "surgeon@surgicore.com", role: "Doctor", status: "Active", lastLogin: "2024-01-15 08:30" },
  { id: "USR-003", name: "Dr. James Wilson", email: "james.wilson@surgicore.com", role: "Doctor", status: "Active", lastLogin: "2024-01-14 14:00" },
  { id: "USR-004", name: "Nurse Rachel Green", email: "rachel.green@surgicore.com", role: "Nurse", status: "Active", lastLogin: "2024-01-15 07:00" },
  { id: "USR-005", name: "Dr. Aisha Patel", email: "aisha.patel@surgicore.com", role: "Doctor", status: "Inactive", lastLogin: "2024-01-10 12:00" },
];

const roleOptions = ["Admin", "Doctor", "Nurse"];
const emptyForm = { name: "", email: "", role: "Doctor", status: "Active" };

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialUsers[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (u: typeof initialUsers[0]) => { setEditItem(u); setForm(u); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error("Name and email required"); return; }
    if (editItem) {
      setUsers(prev => prev.map(u => u.id === editItem.id ? { ...u, ...form } : u));
      toast.success("User updated");
    } else {
      setUsers(prev => [...prev, { ...form, id: `USR-${String(prev.length + 1).padStart(3, "0")}`, lastLogin: "Never" }]);
      toast.success("User created");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setUsers(prev => prev.filter(u => u.id !== id)); setDeleteConfirm(null); toast.success("User deleted"); };
  const handleBulkDelete = () => { setUsers(prev => prev.filter(u => !selected.includes(u.id))); setSelected([]); toast.success(`${selected.length} users deleted`); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-primary" /> User Management</h1>
          <p className="text-sm text-muted-foreground">Manage users and assign roles (Admin / Doctor / Nurse)</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && <button onClick={handleBulkDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete ({selected.length})</button>}
          <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Add User</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length },
          { label: "Admins", value: users.filter(u => u.role === "Admin").length },
          { label: "Doctors", value: users.filter(u => u.role === "Doctor").length },
          { label: "Nurses", value: users.filter(u => u.role === "Nurse").length },
        ].map(s => (
          <div key={s.label} className={card}><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold font-heading text-foreground">{s.value}</p></div>
        ))}
      </div>

      <div className={card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="py-3 px-3"><input type="checkbox" checked={selected.length === users.length && users.length > 0} onChange={() => setSelected(selected.length === users.length ? [] : users.map(u => u.id))} /></th>
              {["ID", "Name", "Email", "Role", "Status", "Last Login", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3"><input type="checkbox" checked={selected.includes(u.id)} onChange={() => setSelected(prev => prev.includes(u.id) ? prev.filter(x => x !== u.id) : [...prev, u.id])} /></td>
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{u.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{u.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{u.email}</td>
                  <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.role === "Admin" ? "bg-primary/10 text-primary" : u.role === "Doctor" ? "bg-info/10 text-info" : "bg-warning/10 text-warning"}`}>{u.role}</span></td>
                  <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{u.status}</span></td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{u.lastLogin}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => setDeleteConfirm(u.id)} className="p-1.5 rounded-lg hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{editItem ? "Edit User" : "Add User"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div><label className="block text-sm font-medium mb-1">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium mb-1">Email *</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">{roleOptions.map(r => <option key={r}>{r}</option>)}</select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"><option>Active</option><option>Inactive</option></select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">{editItem ? "Update" : "Create"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Delete this user?</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
