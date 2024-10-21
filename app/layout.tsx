import './globals.css'
import { Inter } from 'next/font/google'
// import Header from '@/components/Header'
import { DollarSign, PieChart, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Financial Dashboard',
  description: 'A comprehensive financial management tool',
}

const SidebarIcon = ({ icon: Icon, href = "#" }) => (
  <Link href={href} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer">
    <Icon size={20} />
  </Link>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-900 text-white">
          {/* Sidebar */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* <Header /> */}
            <div className="flex-1 overflow-auto p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}