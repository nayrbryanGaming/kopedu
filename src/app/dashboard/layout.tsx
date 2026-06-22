import { Sidebar, MobileTabbar } from "@/components/sidebar";
import { ScrollProgress } from "@/components/motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ScrollProgress />
      <Sidebar />
      <div className="flex-1 pb-16 md:pb-0">{children}</div>
      <MobileTabbar />
    </div>
  );
}
