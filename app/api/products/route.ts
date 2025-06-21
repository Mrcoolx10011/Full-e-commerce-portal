import { type NextRequest, NextResponse } from "next/server"
import { getAllProducts, createProduct, getPriceRange, getCategories } from "@/lib/products"
import { verifyToken, findUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : undefined,
      search: searchParams.get("search") || undefined,
      sortBy: (searchParams.get("sortBy") as any) || "newest",
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 20,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0,
    }

    const result = await getAllProducts(filters)

    // Also get metadata for filters
    const [priceRange, categories] = await Promise.all([getPriceRange(), getCategories()])

    return NextResponse.json({
      ...result,
      metadata: {
        priceRange,
        categories,
      },
    })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { name, description, price, category, imageUrl } = body

    // Validate required fields
    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: "Name, description, price, and category are required" }, { status: 400 })
    }

    // Validate price
    if (price < 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 })
    }

    const product = await createProduct({
      name,
      description,
      price: Number.parseFloat(price),
      category,
      imageUrl,
      companyId: user.id,
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
