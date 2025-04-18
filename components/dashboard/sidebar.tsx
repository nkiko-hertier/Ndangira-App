"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, LogOut, MapPin, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: BarChart3,
      title: "Dashboard",
      exact: true,
    },
    {
      href: "/dashboard/documents",
      icon: FileText,
      title: "Documents",
    },
    {
      href: "/dashboard/stations",
      icon: MapPin,
      title: "Stations",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <FileText className="h-6 w-6" />
          <span>Ndagira Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                {
                  "bg-accent text-accent-foreground":
                    route.exact === true
                      ? pathname === route.href
                      : pathname === route.href || pathname.startsWith(`${route.href}/`),
                },
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@ndagira.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
