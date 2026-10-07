import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Doctors from "@/pages/Doctors";
import Book from "@/pages/Book";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import StaffLogin from "@/pages/StaffLogin";
import DashboardOverview from "@/pages/dashboard/Overview";
import Surgeries from "@/pages/dashboard/Surgeries";
import Schedule from "@/pages/dashboard/Schedule";
import Patients from "@/pages/dashboard/Patients";
import Billing from "@/pages/dashboard/Billing";
import Staff from "@/pages/dashboard/Staff";
import Inventory from "@/pages/dashboard/Inventory";
import Analytics from "@/pages/dashboard/Analytics";
import Settings from "@/pages/dashboard/Settings";
import UserManagement from "@/pages/dashboard/UserManagement";
import AuditLog from "@/pages/dashboard/AuditLog";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/book" element={<Book />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="surgeries" element={<Surgeries />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="patients" element={<ProtectedRoute allowedRoles={["admin"]}><Patients /></ProtectedRoute>} />
              <Route path="billing" element={<ProtectedRoute allowedRoles={["admin"]}><Billing /></ProtectedRoute>} />
              <Route path="staff" element={<ProtectedRoute allowedRoles={["admin"]}><Staff /></ProtectedRoute>} />
              <Route path="inventory" element={<ProtectedRoute allowedRoles={["admin"]}><Inventory /></ProtectedRoute>} />
              <Route path="analytics" element={<ProtectedRoute allowedRoles={["admin"]}><Analytics /></ProtectedRoute>} />
              <Route path="users" element={<ProtectedRoute allowedRoles={["admin"]}><UserManagement /></ProtectedRoute>} />
              <Route path="audit-log" element={<ProtectedRoute allowedRoles={["admin"]}><AuditLog /></ProtectedRoute>} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
