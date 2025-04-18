import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: any) {
  const { email, password } = await request.json()
  const user = await prisma.admin.findUnique({ where: { email } })
  if (user && (await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ message: "Login successful", user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } else {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
