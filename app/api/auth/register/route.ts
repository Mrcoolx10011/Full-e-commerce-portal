import { type NextRequest, NextResponse } from "next/server"
import { createUser, generateToken } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyName, email, password, description, website } = body

    // Validate required fields
    if (!companyName || !email || !password) {
      return NextResponse.json({ error: "Company name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await query("SELECT id FROM companies WHERE email = $1", [email])
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "A company with this email already exists" }, { status: 409 })
    }

    // Create user
    const user = await createUser({
      companyName,
      email,
      password,
      description,
      website,
    })

    // Generate token
    const token = generateToken(user.id)

    const response = NextResponse.json({
      user,
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
