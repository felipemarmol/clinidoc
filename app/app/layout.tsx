import { Sidebar } from '@/components/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <main className="min-h-screen px-4 pb-28 pt-5 lg:ml-72 lg:px-10 lg:pb-10 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
