import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const stations = await prisma.station.findMany({
      include: {
        _count: {
          select: {
            documents: true,
          },
        },
      },
    })

    return NextResponse.json(stations)
  } catch (error) {
    console.error("Error fetching stations:", error)
    return NextResponse.json({ error: "Failed to fetch stations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { station_name, location, manager, call_number, email, full_names, password, username } = body

    const newStation = await prisma.station.create({
      data: {
        station_name,
        location,
        manager,
        call_number,
        email,
        full_names,
        password,
        username,
      },
    })

    return NextResponse.json(newStation, { status: 201 })
  } catch (error) {
    console.error("Error creating station:", error)
    return NextResponse.json({ error: "Failed to create station" }, { status: 500 })
  }
}
