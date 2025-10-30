import AppHeader from "@/components/app/AppHeader";
import AppSidebar from "@/components/app/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Footer from "@/components/app/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
              <div className="mx-auto w-full max-w-7xl">
                  {children}
              </div>
          </main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
