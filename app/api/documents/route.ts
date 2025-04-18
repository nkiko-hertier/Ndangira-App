import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit") as string) : undefined

    const documents = await prisma.document.findMany({
      take: limit,
      include: {
        Station: {
          select: {
            station_name: true,
            location: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { station_id, document_type, owner_full_names, document_code, gender, doc_location, comment } = body

    const newDocument = await prisma.document.create({
      data: {
        station_id,
        document_type,
        owner_full_names,
        document_code,
        gender,
        doc_location,
        comment,
      },
    })

    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}
