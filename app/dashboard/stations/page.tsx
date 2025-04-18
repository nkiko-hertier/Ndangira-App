import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StationsTable } from "@/components/dashboard/stations/StationsTable"

export default function StationsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Stations</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Stations</CardTitle>
          <CardDescription>
            A list of all stations in the system. You can search, filter, and manage stations here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StationsTable />
        </CardContent>
      </Card>
    </div>
  )
}
