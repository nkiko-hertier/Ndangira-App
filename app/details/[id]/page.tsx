"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, FileText, MapPin } from "lucide-react"
import Link from "next/link"

interface Document {
  id: number
  document_type: string
  owner_full_names: string
  document_code: string
  gender: string
  doc_location: string
  comment?: string
  Station: {
    station_name: string
    location: string
  }
}

export default function DocumentDetails({ params }: { params: { id: string } }) {
  const { id } = params
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocument() {
      try {
        const response = await fetch(`/api/documents/${id}`)
        const data = await response.json()
        setDocument(data)
      } catch (error) {
        console.error("Error fetching document:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  const getDocumentIcon = (type: string) => {
    if (!type) return <FileText className="h-8 w-8 text-gray-500" />

    switch (type.toLowerCase()) {
      case "national id":
        return <CreditCard className="h-8 w-8 text-green-500" />
      case "student card":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "insurance card":
        return <CreditCard className="h-8 w-8 text-yellow-500" />
      case "passport":
        return <CreditCard className="h-8 w-8 text-purple-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center space-x-2">
          <Link href="/documents">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Loading...</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center space-x-2">
          <Link href="/documents">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Document Not Found</h2>
        </div>
        <p>The document you are looking for does not exist or has been removed.</p>
        <Link href="/documents">
          <Button>Back to Documents</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center space-x-2">
        <Link href="/documents">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Document Details</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            {getDocumentIcon(document.document_type)}
            <div>
              <CardTitle>{document.document_type}</CardTitle>
              <CardDescription>Document ID: {document.id}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Owner Name:</span>
                <span>{document.owner_full_names}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Document Code:</span>
                <span>{document.document_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Gender:</span>
                <span>{document.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Location Found:</span>
                <span>{document.doc_location}</span>
              </div>
              {document.comment && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Comment:</span>
                  <span>{document.comment}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <MapPin className="h-8 w-8 text-muted-foreground" />
            <div>
              <CardTitle>Station Information</CardTitle>
              <CardDescription>Where the document was found</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Station Name:</span>
                <span>{document.Station?.station_name || "Unknown"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Location:</span>
                <span>{document.Station?.location || "Unknown"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Mark as Claimed</Button>
        <Button>Contact Station</Button>
      </div>
    </div>
  )
}
