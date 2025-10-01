import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div>{children}</div>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[270px] max-[940px]:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-4 bg-background h-full">
          {/* Replace this with <Outlet /> if using nested routing */}
          {children}
        </div>
      </div>
    </div>
  );
}
