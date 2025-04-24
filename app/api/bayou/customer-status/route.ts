import { NextResponse } from "next/server"

const BAYOU_API_KEY = process.env.BAYOU_API_KEY
const BAYOU_DOMAIN = process.env.BAYOU_DOMAIN || "staging.bayou.energy"
const BAYOU_BASE_URL = `https://${BAYOU_DOMAIN}/api/v2`

export async function GET(request: Request) {
  if (!BAYOU_API_KEY) {
    return NextResponse.json({ error: "Bayou API key is not configured" }, { status: 500 })
  }

  // Get customerId from query params
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")

  if (!customerId) {
    return NextResponse.json({ error: "Customer ID is required" }, { status: 400 })
  }

  try {
    // Check customer status in Bayou
    const response = await fetch(`${BAYOU_BASE_URL}/customers/${customerId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${BAYOU_API_KEY}:`).toString("base64")}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Bayou API error:", errorData)
      return NextResponse.json({ error: "Failed to check customer status" }, { status: response.status })
    }

    const customer = await response.json()
    return NextResponse.json({ customer })
  } catch (error) {
    console.error("Error checking customer status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
