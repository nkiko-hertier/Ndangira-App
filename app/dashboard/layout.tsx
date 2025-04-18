import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </ThemeProvider>
  )
}
