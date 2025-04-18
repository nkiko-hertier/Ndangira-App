import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentsTable } from "../components/documents/DocumentsTable"

export default function DocumentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>
            A list of all documents in the system. You can search, filter, and manage documents here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentsTable />
        </CardContent>
      </Card>
    </div>
  )
}
