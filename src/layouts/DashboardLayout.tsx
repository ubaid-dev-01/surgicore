import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopbar from "@/components/DashboardTopbar";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/staff-login" replace />;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"}`}>
        <DashboardTopbar user={user} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
