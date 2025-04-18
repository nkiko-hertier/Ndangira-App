"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, CreditCard } from "lucide-react"
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

export function DocumentsTable() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch("/api/documents")
        const data = await response.json()
        setDocuments(data)
      } catch (error) {
        console.error("Error fetching documents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.owner_full_names.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.document_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.document_type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Add Document</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2">Loading documents...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Document Code</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Station</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No documents found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(doc.document_type)}
                        {doc.document_type}
                      </div>
                    </TableCell>
                    <TableCell>{doc.owner_full_names}</TableCell>
                    <TableCell>{doc.document_code}</TableCell>
                    <TableCell>{doc.gender}</TableCell>
                    <TableCell>{doc.Station.station_name}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard/documents/${doc.id}`}>
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
