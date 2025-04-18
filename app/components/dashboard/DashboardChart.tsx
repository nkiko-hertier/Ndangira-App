"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", found: 65, claimed: 42 },
  { name: "Feb", found: 78, claimed: 51 },
  { name: "Mar", found: 91, claimed: 73 },
  { name: "Apr", found: 84, claimed: 62 },
  { name: "May", found: 102, claimed: 79 },
  { name: "Jun", found: 95, claimed: 68 },
  { name: "Jul", found: 110, claimed: 82 },
]

export function DashboardChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorFound" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorClaimed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke={isDark ? "#6b7280" : "#9ca3af"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={isDark ? "#6b7280" : "#9ca3af"} fontSize={12} tickLine={false} axisLine={false} />
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Area
          type="monotone"
          dataKey="found"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorFound)"
          name="Documents Found"
        />
        <Area
          type="monotone"
          dataKey="claimed"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorClaimed)"
          name="Documents Claimed"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
