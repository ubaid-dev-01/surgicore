import { useState } from "react";
import { Search, Plus, Pencil, Trash2, AlertTriangle, CheckCircle, Package as PackageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const card = "dashboard-card";

const initialItems = [
  { id: "INV-001", name: "Titanium Knee Implant (Size M)", category: "Implants", stock: 12, minStock: 5, status: "In Stock", sterilized: true, expiry: "2025-06-15", lastUsed: "2024-01-14" },
  { id: "INV-002", name: "Surgical Suture Kit (Vicryl 3-0)", category: "Consumables", stock: 245, minStock: 100, status: "In Stock", sterilized: true, expiry: "2025-03-20", lastUsed: "2024-01-15" },
  { id: "INV-003", name: "Laparoscopic Trocar Set", category: "Instruments", stock: 8, minStock: 4, status: "In Stock", sterilized: true, expiry: "N/A", lastUsed: "2024-01-14" },
  { id: "INV-004", name: "Bone Cement (Simplex P)", category: "Consumables", stock: 3, minStock: 10, status: "Low Stock", sterilized: true, expiry: "2024-09-30", lastUsed: "2024-01-13" },
  { id: "INV-005", name: "Cardiac Stent (DES 3.0x18mm)", category: "Implants", stock: 15, minStock: 8, status: "In Stock", sterilized: true, expiry: "2025-12-01", lastUsed: "2024-01-15" },
  { id: "INV-006", name: "Sterile Drape Pack (Universal)", category: "Consumables", stock: 2, minStock: 20, status: "Critical", sterilized: true, expiry: "2024-08-15", lastUsed: "2024-01-15" },
];

const categories = ["Implants", "Consumables", "Instruments"];
const emptyForm = { name: "", category: "Consumables", stock: 0, minStock: 10, sterilized: true, expiry: "", lastUsed: "" };

function getStatus(stock: number, minStock: number) {
  if (stock <= minStock * 0.2) return "Critical";
  if (stock <= minStock) return "Low Stock";
  return "In Stock";
}

export default function Inventory() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<typeof initialItems[0] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [stockModal, setStockModal] = useState<{ id: string; stock: number } | null>(null);

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: typeof initialItems[0]) => { setEditItem(item); setForm(item); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name) { toast.error("Name required"); return; }
    const status = getStatus(form.stock, form.minStock);
    if (editItem) {
      setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...form, status } : i));
      toast.success("Item updated");
    } else {
      setItems(prev => [...prev, { ...form, id: `INV-${String(prev.length + 1).padStart(3, "0")}`, status }]);
      toast.success("Item added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); setDeleteConfirm(null); toast.success("Item deleted"); };
  const handleBulkDelete = () => { setItems(prev => prev.filter(i => !selected.includes(i.id))); setSelected([]); toast.success(`${selected.length} items deleted`); };

  const handleStockUpdate = () => {
    if (!stockModal) return;
    setItems(prev => prev.map(i => {
      if (i.id !== stockModal.id) return i;
      const newStock = stockModal.stock;
      return { ...i, stock: newStock, status: getStatus(newStock, i.minStock) };
    }));
    toast.success("Stock updated");
    setStockModal(null);
  };

  const lowStockItems = items.filter(i => i.status === "Low Stock" || i.status === "Critical");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">Instruments, implants, consumables & sterilization</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && <button onClick={handleBulkDelete} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete ({selected.length})</button>}
          <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Add Item</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Items", value: items.length },
          { label: "In Stock", value: items.filter(i => i.status === "In Stock").length },
          { label: "Low Stock", value: items.filter(i => i.status === "Low Stock").length, alert: true },
          { label: "Critical", value: items.filter(i => i.status === "Critical").length, alert: true },
        ].map(s => (
          <div key={s.label} className={card}>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold font-heading ${s.alert && s.value > 0 ? "text-destructive" : "text-foreground"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-xl border border-warning/30 bg-warning/5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Low Stock Alert</p>
            <p className="text-xs text-muted-foreground">{lowStockItems.map(i => i.name).join(", ")} — need restocking</p>
          </div>
        </div>
      )}

      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Inventory</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="py-3 px-3"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map(i => i.id))} /></th>
              {["ID", "Item", "Category", "Stock", "Min", "Status", "Sterilized", "Expiry", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])} /></td>
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{item.id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{item.name}</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{item.category}</span></td>
                  <td className="py-3 px-3">
                    <button onClick={() => setStockModal({ id: item.id, stock: item.stock })} className="font-semibold text-foreground hover:text-primary cursor-pointer">{item.stock}</button>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{item.minStock}</td>
                  <td className="py-3 px-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.status === "In Stock" ? "bg-success/10 text-success" : item.status === "Low Stock" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>{item.status}</span></td>
                  <td className="py-3 px-3">{item.sterilized ? <CheckCircle className="w-4 h-4 text-success" /> : <AlertTriangle className="w-4 h-4 text-warning" />}</td>
                  <td className="py-3 px-3 text-xs text-muted-foreground">{item.expiry}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-lg hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive/70" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Edit Item" : "Add Item"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div><label className="block text-sm font-medium mb-1">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">{categories.map(c => <option key={c}>{c}</option>)}</select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Stock</label><input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Min Stock</label><input type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Expiry</label><input value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} placeholder="YYYY-MM-DD or N/A" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" /></div>
              <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.sterilized} onChange={e => setForm({ ...form, sterilized: e.target.checked })} /><label className="text-sm">Sterilized</label></div>
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">{editItem ? "Update" : "Add"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Update */}
      <Dialog open={!!stockModal} onOpenChange={() => setStockModal(null)}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader><DialogTitle>Update Stock</DialogTitle></DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium mb-1">New Stock Quantity</label>
            <input type="number" value={stockModal?.stock || 0} onChange={e => stockModal && setStockModal({ ...stockModal, stock: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
          </div>
          <DialogFooter>
            <button onClick={() => setStockModal(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={handleStockUpdate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Update</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Delete this item?</p>
          <DialogFooter>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
