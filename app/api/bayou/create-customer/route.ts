import { NextResponse } from "next/server"

const BAYOU_API_KEY = process.env.BAYOU_API_KEY
const BAYOU_DOMAIN = process.env.BAYOU_DOMAIN || "staging.bayou.energy"
const BAYOU_BASE_URL = `https://${BAYOU_DOMAIN}/api/v2`

export async function POST() {
  if (!BAYOU_API_KEY) {
    return NextResponse.json({ error: "Bayou API key is not configured" }, { status: 500 })
  }

  try {
    // Create a new customer in Bayou
    const response = await fetch(`${BAYOU_BASE_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${BAYOU_API_KEY}:`).toString("base64")}`,
      },
      body: JSON.stringify({
        utility: "pacific_gas_and_electric",
        email: `user_${Date.now()}@example.com`, // Generate a unique email
      }),
    })

    // Check if response is ok and has the expected content type
    const contentType = response.headers.get("content-type")

    if (!response.ok) {
      // Try to parse error as JSON if possible
      if (contentType && contentType.includes("application/json")) {
        try {
          const errorData = await response.json()
          console.error("Bayou API error:", errorData)
          return NextResponse.json({ error: "Failed to create Bayou customer" }, { status: response.status })
        } catch (parseError) {
          // If parsing fails, return the status text
          console.error("Bayou API error (non-JSON):", await response.text().catch(() => "Unable to read response"))
          return NextResponse.json(
            { error: `API Error: ${response.status} ${response.statusText}` },
            { status: response.status },
          )
        }
      } else {
        // If not JSON, just return the status
        console.error("Bayou API error (non-JSON):", await response.text().catch(() => "Unable to read response"))
        return NextResponse.json(
          { error: `API Error: ${response.status} ${response.statusText}` },
          { status: response.status },
        )
      }
    }

    // For successful responses, verify it's JSON before parsing
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Unexpected content type from Bayou API:", contentType)
      return NextResponse.json({ error: "Invalid response from Bayou API" }, { status: 500 })
    }

    try {
      const customer = await response.json()
      return NextResponse.json({ customer })
    } catch (parseError) {
      console.error("Error parsing Bayou API response:", parseError)
      return NextResponse.json({ error: "Invalid JSON response from Bayou API" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating Bayou customer:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
