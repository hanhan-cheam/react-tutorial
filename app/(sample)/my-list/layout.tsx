// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-400 text-center text-sm">Pingspace All rights reserved.</footer>
    </div>
  );
}
