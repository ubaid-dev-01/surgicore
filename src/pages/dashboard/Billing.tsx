import { useState } from "react";
import { DollarSign, TrendingUp, Clock, AlertCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { revenueByProcedure } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const card = "dashboard-card";
const COLORS = ["#0f766e", "#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4"];

const initialInvoices = [
  { id: "INV-5001", patient: "Robert Mitchell", procedure: "Total Knee Arthroplasty", amount: 45200, insurance: "BlueCross PPO", status: "Paid", date: "2024-01-10" },
  { id: "INV-5002", patient: "Maria Santos", procedure: "Lap. Cholecystectomy", amount: 18500, insurance: "Aetna HMO", status: "Pending", date: "2024-01-14" },
  { id: "INV-5003", patient: "David Johnson", procedure: "CABG", amount: 125000, insurance: "Medicare", status: "In Review", date: "2024-01-15" },
  { id: "INV-5004", patient: "Anna Chen", procedure: "Knee Arthroscopy", amount: 12800, insurance: "UnitedHealth", status: "Paid", date: "2024-01-08" },
  { id: "INV-5005", patient: "Carlos Rivera", procedure: "Appendectomy", amount: 22100, insurance: "Cigna", status: "Paid", date: "2024-01-14" },
];

const emptyForm = { patient: "", procedure: "", amount: 0, insurance: "", status: "Pending", date: "" };
const payStatuses = ["Pending", "Paid", "In Review", "Denied"];

export default function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialInvoices[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const totalRevenue = invoices.reduce((a, b) => a + b.amount, 0);
  const paid = invoices.filter(b => b.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const pending = invoices.filter(b => b.status !== "Paid").reduce((a, b) => a + b.amount, 0);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (inv: typeof initialInvoices[0]) => { setEditItem(inv); setForm(inv); setModalOpen(true); };

  const handleSave = () => {
    if (!form.patient || !form.procedure) { toast.error("Fill required fields"); return; }
    if (editItem) {
      setInvoices(prev => prev.map(i => i.id === editItem.id ? { ...i, ...form } : i));
      toast.success("Invoice updated");
    } else {
      setInvoices(prev => [...prev, { ...form, id: `INV-${5000 + prev.length + 1}` }]);
      toast.success("Invoice created");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setInvoices(prev => prev.filter(i => i.id !== id)); setDeleteConfirm(null); toast.success("Invoice deleted"); };
  const handleBulkDelete = () => { setInvoices(prev => prev.filter(i => !selected.includes(i.id))); setSelected([]); toast.success(`${selected.length} invoices deleted`); };
  const handleStatusChange = (id: string, status: string) => { setInvoices(prev => prev.map(i => i.id === id ? { ...i, status } : i)); toast.success(`Status → ${status}`); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Billing & Revenue</h1>
          <p className="text-sm text-muted-foreground">Invoices, claims tracking, and revenue analytics</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && <button onClick={handleBulkDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete ({selected.length})</button>}
          <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> New Invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-primary" },
          { label: "Collected", value: `$${(paid / 1000).toFixed(0)}K`, icon: TrendingUp, color: "text-success" },
          { label: "Outstanding", value: `$${(pending / 1000).toFixed(0)}K`, icon: Clock, color: "text-warning" },
          { label: "Total Invoices", value: invoices.length, icon: AlertCircle, color: "text-info" },
        ].map(s => (
          <div key={s.label} className={card}>
            <div className="flex items-center justify-between mb-2"><p className="text-sm text-muted-foreground">{s.label}</p><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Revenue by Procedure</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByProcedure}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="procedure" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `$${v / 1000000}M`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
              <Bar dataKey="revenue" fill="hsl(173, 78%, 26%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={revenueByProcedure} dataKey="revenue" nameKey="procedure" cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={2}>
                {revenueByProcedure.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={card}>
        <h3 className="text-base font-semibold text-foreground mb-4">Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="py-3 px-3"><input type="checkbox" checked={selected.length === invoices.length && invoices.length > 0} onChange={() => setSelected(selected.length === invoices.length ? [] : invoices.map(i => i.id))} /></th>
              {["Invoice", "Patient", "Procedure", "Amount", "Insurance", "Date", "Status", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {invoices.map(b => (
                <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3"><input type="checkbox" checked={selected.includes(b.id)} onChange={() => setSelected(prev => prev.includes(b.id) ? prev.filter(x => x !== b.id) : [...prev, b.id])} /></td>
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{b.patient}</td>
                  <td className="py-3 px-3 text-muted-foreground">{b.procedure}</td>
                  <td className="py-3 px-3 font-semibold text-foreground">${b.amount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{b.insurance}</td>
                  <td className="py-3 px-3 text-muted-foreground">{b.date}</td>
                  <td className="py-3 px-3">
                    <select value={b.status} onChange={e => handleStatusChange(b.id, e.target.value)} className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${b.status === "Paid" ? "bg-success/10 text-success" : b.status === "Pending" ? "bg-warning/10 text-warning" : b.status === "Denied" ? "bg-destructive/10 text-destructive" : "bg-info/10 text-info"}`}>
                      {payStatuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => setDeleteConfirm(b.id)} className="p-1.5 rounded-lg hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
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
          <DialogHeader><DialogTitle>{editItem ? "Edit Invoice" : "New Invoice"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Patient *</label><input value={form.patient} onChange={e => setForm({ ...form, patient: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Procedure *</label><input value={form.procedure} onChange={e => setForm({ ...form, procedure: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Amount ($)</label><input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Insurance</label><input value={form.insurance} onChange={e => setForm({ ...form, insurance: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">{payStatuses.map(s => <option key={s}>{s}</option>)}</select>
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
          <p className="text-sm text-muted-foreground">Delete this invoice?</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
