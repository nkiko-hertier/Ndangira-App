"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Station {
  id: number
  station_name: string
  location: string
  _count: {
    documents: number
  }
}

export function TopStations() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard/stats")
        const stats = await response.json()
        setStations(stats.topStations || [])
      } catch (error) {
        console.error("Error fetching top stations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Stations</CardTitle>
        <CardDescription>Stations with the most documents</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : stations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No stations data available</p>
        ) : (
          <div className="space-y-2">
            {stations.map((station) => (
              <div key={station.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{station.station_name}</div>
                  <div className="text-xs text-muted-foreground">{station.location}</div>
                </div>
                <div className="text-sm font-medium">{station._count.documents} docs</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
