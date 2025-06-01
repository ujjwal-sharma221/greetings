import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/components/dashboard-navbar";

import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex h-screen w-screen flex-col bg-white">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
