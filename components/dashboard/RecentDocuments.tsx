"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Document {
  id: number
  document_type: string
  owner_full_names: string
  document_code: string
  Station: {
    station_name: string
  }
}

export function RecentDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch("/api/dashboard/stats")
        const data = await response.json()
        setDocuments(data.recentDocuments || [])
      } catch (error) {
        console.error("Error fetching documents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[25px_1fr_120px_120px_80px] items-center gap-4 rounded-lg border px-4 py-3"
          >
            <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            <div>
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse mt-2"></div>
            </div>
            <div className="h-3 w-20 bg-muted rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
            <div className="h-5 w-12 bg-muted rounded animate-pulse ml-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "national id":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "student card":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "insurance card":
        return <CreditCard className="h-4 w-4 text-yellow-500" />
      case "passport":
        return <CreditCard className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="grid grid-cols-[25px_1fr_120px_120px_80px] items-center gap-4 rounded-lg border px-4 py-3"
        >
          {getDocumentIcon(doc.document_type)}
          <div>
            <div className="font-medium">{doc.document_type}</div>
            <div className="text-sm text-muted-foreground">{doc.owner_full_names}</div>
          </div>
          <div className="text-sm text-muted-foreground">{doc.Station.station_name}</div>
          <div className="text-sm text-muted-foreground">Recently</div>
          <Badge variant="outline" className="ml-auto">
            New
          </Badge>
        </div>
      ))}

      <Link href="/dashboard/documents">
        <Button variant="outline" className="w-full">
          View All Documents
        </Button>
      </Link>
    </div>
  )
}
