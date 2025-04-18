import { StatsCards } from "@/components/dashboard/StatsCards"
import { RecentDocuments } from "@/components/dashboard/RecentDocuments"
import { DocumentTypesChart } from "@/components/dashboard/DocumentTypesChart"
import { TopStations } from "@/components/dashboard/TopStations"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="grid gap-4">
            <DocumentTypesChart />
            <TopStations />
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid gap-4">
            <RecentDocuments />
          </div>
        </div>
      </div>
    </div>
  )
}
