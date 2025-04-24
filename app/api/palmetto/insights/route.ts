import { NextResponse } from "next/server"

const PALMETTO_API_KEY = process.env.PALMETTO_API_KEY
const PALMETTO_BASE_URL = "https://ei.palmetto.com/api/v0/bem/calculate"

// Parse Bayou data into Palmetto format
function parseBayouToPalmetto(bayouData: any) {
  if (!bayouData || !bayouData.bills || bayouData.bills.length === 0) {
    return null
  }

  try {
    // Get address from the first bill's electric meter
    const firstBill = bayouData.bills[0]
    if (!firstBill.meters) {
      return null
    }

    // Find the electric meter for address
    let electricMeter = null
    for (const meter of firstBill.meters) {
      if (meter.type === "electric" && meter.address) {
        electricMeter = meter
        break
      }
    }

    if (!electricMeter || !electricMeter.address) {
      return null
    }

    const address = electricMeter.address
    // Format the full address string
    let addressStr = address.line_1
    if (address.line_2) {
      addressStr += ` ${address.line_2}`
    }
    addressStr += `, ${address.city}, ${address.state} ${address.postal_code}`

    // Create the base payload structure
    const payload = {
      parameters: {
        from_datetime: "2025-01-01T00:00:00",
        to_datetime: "2025-12-31T23:59:59",
        variables: ["consumption.electricity"],
        group_by: "month",
      },
      location: {
        address: addressStr,
      },
    }

    // Add consumption data
    const actuals: any[] = []
    for (const bill of bayouData.bills) {
      if (bill.electricity_consumption) {
        // Find the electric meter in each bill
        for (const meter of bill.meters || []) {
          if (meter.type === "electric" && meter.billing_period_from && meter.billing_period_to) {
            actuals.push({
              from_datetime: meter.billing_period_from,
              to_datetime: meter.billing_period_to,
              variable: "consumption.electricity",
              value: Number.parseFloat(bill.electricity_consumption) / 1000,
            })
            break // Only take the first electric meter reading
          }
        }
      }
    }

    if (actuals.length > 0) {
      payload.consumption = {
        actuals,
      }
    }

    return payload
  } catch (error) {
    console.error("Error parsing Bayou data:", error)
    return null
  }
}

// Parse the Palmetto API response
function parseResponse(data: any) {
  if (!data || !data.data || !data.data.intervals) {
    return {}
  }

  const predictions: Record<string, number> = {}
  for (const prediction of data.data.intervals) {
    const date = new Date(prediction.from_datetime)
    const month = date.toLocaleString("default", { month: "long" })
    predictions[month] = prediction.value
  }

  return predictions
}

export async function POST(request: Request) {
  if (!PALMETTO_API_KEY) {
    return NextResponse.json({ error: "Palmetto API key is not configured" }, { status: 500 })
  }

  try {
    const { bayouData } = await request.json()

    // Parse Bayou data into Palmetto format
    const payload = parseBayouToPalmetto(bayouData)

    if (!payload) {
      return NextResponse.json({ error: "Could not parse utility data" }, { status: 400 })
    }

    // Call Palmetto API
    const response = await fetch(PALMETTO_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": PALMETTO_API_KEY,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Palmetto API error:", errorData)

      // Return mock data if the API call fails
      return NextResponse.json({
        insights: generateMockInsights(),
        error: "Could not get real insights, showing sample data",
      })
    }

    const data = await response.json()
    const insights = parseResponse(data)

    return NextResponse.json({ insights })
  } catch (error) {
    console.error("Error getting energy insights:", error)

    // Return mock data if there's an error
    return NextResponse.json({
      insights: generateMockInsights(),
      error: "Could not get real insights, showing sample data",
    })
  }
}

// Generate mock insights for fallback
function generateMockInsights() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const insights: Record<string, number> = {}

  // Base value with seasonal variation
  const baseValue = 1000

  months.forEach((month, index) => {
    // Summer months have higher usage
    let seasonalFactor = 1.0
    if (index >= 5 && index <= 7) {
      // June, July, August
      seasonalFactor = 1.5
    } else if (index >= 11 || index <= 1) {
      // December, January, February
      seasonalFactor = 1.3
    }

    // Add some randomness
    const randomFactor = 0.9 + Math.random() * 0.2 // 0.9 to 1.1

    insights[month] = Math.round(baseValue * seasonalFactor * randomFactor)
  })

  return insights
}
