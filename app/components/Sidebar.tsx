"use client"

import { cn } from "@/lib/utils"
import { BarChart2, FileText, Home, LogOut, MapPin, Menu, Settings, Users, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BiBugAlt } from "react-icons/bi"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Stations",
    href: "/stations",
    icon: MapPin,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed right-4 top-4 z-50 block rounded-full p-2 text-white bg-black md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-black text-white transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-white/10 px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BiBugAlt className="h-6 w-6" />
              <span className="text-xl font-bold">Ndagira</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <Users size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-white/70">admin@ndagira.com</p>
              </div>
            </div>
            <button className="mt-4 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
