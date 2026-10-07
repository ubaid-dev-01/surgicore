import { useState } from "react";
import { Shield, Bell, User, Lock, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const card = "dashboard-card";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
    phone: "(617) 555-0134",
    license: "MD-2024-78921",
  });

  // Security
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome — macOS", location: "Boston, MA", time: "Current session" },
    { id: 2, device: "Safari — iPhone", location: "Boston, MA", time: "2 hours ago" },
  ]);

  // Notifications
  const [notifSettings, setNotifSettings] = useState([
    { id: "schedule", label: "Surgery schedule changes", desc: "Get notified when your surgery schedule is modified", enabled: true },
    { id: "equipment", label: "Equipment alerts", desc: "Sterilization cycles, calibration reminders", enabled: true },
    { id: "patients", label: "Patient updates", desc: "Pre-op clearance status changes, lab results", enabled: true },
    { id: "announcements", label: "Staff announcements", desc: "System-wide announcements and updates", enabled: false },
    { id: "billing", label: "Billing notifications", desc: "Invoice updates, claim status changes", enabled: false },
  ]);

  // Org
  const [orgForm, setOrgForm] = useState({
    orgName: "Boston Surgical Center",
    facilityType: "Multi-Specialty Surgical Center",
    operatingRooms: "10",
    npi: "1234567890",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "organization", label: "Organization", icon: Building },
    { id: "compliance", label: "Compliance", icon: Shield },
  ];

  const handleSaveProfile = () => {
    if (!profileForm.name || !profileForm.email) { toast.error("Name and email are required"); return; }
    updateUser({ name: profileForm.name, email: profileForm.email, department: profileForm.department });
    toast.success("Profile updated successfully");
  };

  const handleUpdatePassword = () => {
    if (!passwords.current || !passwords.newPass) { toast.error("Fill in all password fields"); return; }
    if (passwords.newPass.length < 6) { toast.error("New password must be at least 6 characters"); return; }
    if (passwords.newPass !== passwords.confirm) { toast.error("Passwords don't match"); return; }
    setPasswords({ current: "", newPass: "", confirm: "" });
    toast.success("Password updated successfully");
  };

  const toggleNotif = (id: string) => {
    setNotifSettings(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
    toast.success("Notification preference updated");
  };

  const handleSaveOrg = () => {
    if (!orgForm.orgName) { toast.error("Organization name is required"); return; }
    toast.success("Organization details updated");
  };

  const revokeSession = (id: number) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    toast.success("Session revoked");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account, security, and platform preferences</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-6">Profile Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div><label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <input value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input value={profileForm.email} onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Role</label>
              <input value={user?.role || ""} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" disabled /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Department</label>
              <input value={profileForm.department} onChange={e => setProfileForm(p => ({ ...p, department: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Phone</label>
              <input value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">License Number</label>
              <input value={profileForm.license} onChange={e => setProfileForm(p => ({ ...p, license: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
          </div>
          <button onClick={handleSaveProfile} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Save Changes</button>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-4">
          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4">Password</h3>
            <div className="max-w-md space-y-3">
              <div><label className="block text-sm font-medium text-foreground mb-1">Current Password</label>
                <input type="password" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">New Password</label>
                <input type="password" value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1">Confirm New Password</label>
                <input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
              <button onClick={handleUpdatePassword} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Update Password</button>
            </div>
          </div>
          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account.</p>
            <button onClick={() => { setTwoFAEnabled(!twoFAEnabled); toast.success(twoFAEnabled ? "2FA disabled" : "2FA enabled successfully"); }}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${twoFAEnabled ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
            </button>
          </div>
          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4">Active Sessions</h3>
            <div className="space-y-2">
              {sessions.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.device}</p>
                    <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                  </div>
                  {s.time !== "Current session" && <button onClick={() => revokeSession(s.id)} className="text-xs text-destructive hover:underline">Revoke</button>}
                </div>
              ))}
              {sessions.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No active sessions</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Notification Preferences</h3>
          <div className="space-y-4 max-w-lg">
            {notifSettings.map(n => (
              <div key={n.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <button onClick={() => toggleNotif(n.id)} className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${n.enabled ? "bg-primary" : "bg-muted-foreground/30"}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow transition-transform ${n.enabled ? "left-5" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "organization" && (
        <div className={card}>
          <h3 className="text-base font-semibold text-foreground mb-4">Organization Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div><label className="block text-sm font-medium text-foreground mb-1">Organization Name</label>
              <input value={orgForm.orgName} onChange={e => setOrgForm(p => ({ ...p, orgName: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Facility Type</label>
              <input value={orgForm.facilityType} onChange={e => setOrgForm(p => ({ ...p, facilityType: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Operating Rooms</label>
              <input value={orgForm.operatingRooms} onChange={e => setOrgForm(p => ({ ...p, operatingRooms: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">NPI Number</label>
              <input value={orgForm.npi} onChange={e => setOrgForm(p => ({ ...p, npi: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" /></div>
          </div>
          <button onClick={handleSaveOrg} className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Update Organization</button>
        </div>
      )}

      {activeTab === "compliance" && (
        <div className="space-y-4">
          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4">Compliance Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { badge: "HIPAA", status: "Compliant", expires: "2025-06-30" },
                { badge: "ISO 27001", status: "Certified", expires: "2025-09-15" },
                { badge: "SOC 2 Type II", status: "Certified", expires: "2025-03-20" },
              ].map(c => (
                <div key={c.badge} className="p-4 rounded-lg bg-success/5 border border-success/20 text-center">
                  <Shield className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">{c.badge}</p>
                  <p className="text-xs text-success font-medium">{c.status}</p>
                  <p className="text-xs text-muted-foreground mt-1">Expires: {c.expires}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={card}>
            <h3 className="text-base font-semibold text-foreground mb-4">Audit Log (Recent)</h3>
            <div className="space-y-2">
              {[
                { action: "Patient record accessed", user: "Dr. Sarah Chen", time: "2 min ago" },
                { action: "Surgery schedule modified", user: "Admin", time: "15 min ago" },
                { action: "User login", user: "Dr. James Wilson", time: "1 hour ago" },
                { action: "Report exported", user: "Dr. Sarah Chen", time: "3 hours ago" },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between p-2 text-sm">
                  <span className="text-foreground">{a.action}</span>
                  <span className="text-xs text-muted-foreground">{a.user} · {a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
