import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex h-screen w-screen flex-col bg-white">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
