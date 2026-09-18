import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentArena — Red-Team Your AI Agents',
  description: 'Automated penetration testing for AI agents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-arena-bg text-white selection:bg-arena-purple/30")}>
        {children}
      </body>
    </html>
  )
}
