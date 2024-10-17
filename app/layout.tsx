import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { DateRangePicker } from '@/components/DateRangePicker'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

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
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
