import { NextResponse } from "next/server"
import { healthCheck } from "@/lib/db"

export async function GET() {
  try {
    const isHealthy = await healthCheck()

    if (isHealthy) {
      return NextResponse.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
      })
    } else {
      return NextResponse.json(
        {
          status: "unhealthy",
          timestamp: new Date().toISOString(),
          database: "disconnected",
        },
        { status: 503 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 500 },
    )
  }
}
