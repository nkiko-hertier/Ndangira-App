import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get total documents count
    const totalDocuments = await prisma.document.count()

    // Get claimed documents count (for demo purposes, we'll assume 70% of documents are claimed)
    const claimedDocuments = Math.floor(totalDocuments * 0.7)

    // Get stations count
    const totalStations = await prisma.station.count()

    // Get users count
    const totalUsers = await prisma.admin.count()

    // Get document types distribution
    const documentTypes = await prisma.document.groupBy({
      by: ["document_type"],
      _count: {
        document_type: true,
      },
    })

    // Get top stations
    const topStations = await prisma.station.findMany({
      select: {
        id: true,
        station_name: true,
        location: true,
        _count: {
          select: {
            documents: true,
          },
        },
      },
      orderBy: {
        documents: {
          _count: "desc",
        },
      },
      take: 4,
    })

    // Get recent documents
    const recentDocuments = await prisma.document.findMany({
      take: 5,
      orderBy: {
        id: "desc",
      },
      include: {
        Station: {
          select: {
            station_name: true,
          },
        },
      },
    })

    return NextResponse.json({
      totalDocuments,
      claimedDocuments,
      totalStations,
      totalUsers,
      documentTypes,
      topStations,
      recentDocuments,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
