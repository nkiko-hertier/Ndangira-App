"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"

interface Station {
  id: number
  station_name: string
  location: string
  manager: string
  call_number: string
  email: string
  _count: {
    documents: number
  }
}

export function StationsTable() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await fetch("/api/stations")
        const data = await response.json()
        setStations(data)
      } catch (error) {
        console.error("Error fetching stations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStations()
  }, [])

  const filteredStations = stations.filter(
    (station) =>
      station.station_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stations..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Add Station</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2">Loading stations...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No stations found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStations.map((station) => (
                  <TableRow key={station.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        {station.station_name}
                      </div>
                    </TableCell>
                    <TableCell>{station.location}</TableCell>
                    <TableCell>{station.manager}</TableCell>
                    <TableCell>{station.call_number}</TableCell>
                    <TableCell>{station._count.documents}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/stations/${station.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
