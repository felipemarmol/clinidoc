import { Sidebar } from '@/components/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div><Sidebar /><main className="min-h-screen px-5 py-6 lg:ml-72 lg:px-10">{children}</main></div>
}
