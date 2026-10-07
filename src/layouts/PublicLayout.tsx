import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoToTop from "@/components/GoToTop";
import ScheduleModal from "@/components/ScheduleModal";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      <GoToTop />
      <ScheduleModal />
    </div>
  );
}
