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
    // First check if the customer's bills are ready
    const statusResponse = await fetch(`${BAYOU_BASE_URL}/customers/${customerId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${BAYOU_API_KEY}:`).toString("base64")}`,
      },
    })

    if (!statusResponse.ok) {
      const errorData = await statusResponse.json()
      console.error("Bayou API error:", errorData)
      return NextResponse.json({ error: "Failed to check customer status" }, { status: statusResponse.status })
    }

    const customerStatus = await statusResponse.json()

    // If bills are not ready yet, return an appropriate message
    if (!customerStatus.bills_are_ready) {
      return NextResponse.json(
        { error: "Utility data is still being processed. Please try again later." },
        { status: 202 },
      )
    }

    // Get the customer's bills
    const billsResponse = await fetch(`${BAYOU_BASE_URL}/customers/${customerId}/bills`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${BAYOU_API_KEY}:`).toString("base64")}`,
      },
    })

    if (!billsResponse.ok) {
      const errorData = await billsResponse.json()
      console.error("Bayou API error:", errorData)
      return NextResponse.json({ error: "Failed to get customer bills" }, { status: billsResponse.status })
    }

    const bills = await billsResponse.json()

    // Return the bills data
    return NextResponse.json({ bayouData: { bills } })
  } catch (error) {
    console.error("Error getting customer data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
