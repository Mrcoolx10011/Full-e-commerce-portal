import { type NextRequest, NextResponse } from "next/server"
import { getProductsByCompany } from "@/lib/products"

export async function GET(request: NextRequest, { params }: { params: { companyId: string } }) {
  try {
    const products = await getProductsByCompany(params.companyId)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get company products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
