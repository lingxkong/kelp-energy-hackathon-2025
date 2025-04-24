// Bayou API integration for P&G utility data

const BAYOU_API_KEY = process.env.BAYOU_API_KEY
const BAYOU_DOMAIN = process.env.BAYOU_DOMAIN || "staging.bayou.energy"
const BAYOU_BASE_URL = `https://${BAYOU_DOMAIN}/api/v2`

interface BayouCustomer {
  id: string
  onboarding_link: string
  has_filled_credentials?: boolean
  bills_are_ready?: boolean
}

interface BayouBill {
  meters: Array<{
    type: string
    address?: {
      line_1: string
      line_2?: string
      city: string
      state: string
      postal_code: string
    }
    billing_period_from?: string
    billing_period_to?: string
  }>
  electricity_consumption?: number
}

interface BayouData {
  bills: BayouBill[]
}

export async function createBayouCustomer() {
  try {
    const response = await fetch(`${BAYOU_BASE_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("$$$$$$$$$");
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      const contentType = response.headers.get("content-type")
      let errorMessage

      if (contentType && contentType.includes("application/json")) {
        // If it's JSON, parse it
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || `Error: ${response.status} ${response.statusText}`
        } catch (parseError) {
          errorMessage = `Error: ${response.status} ${response.statusText}`
        }
      } else {
        // If it's not JSON, just use the status text
        errorMessage = `Error: ${response.status} ${response.statusText}`
      }

      return { customer: null, error: errorMessage }
    }

    // If response is ok, safely try to parse JSON
    try {
      const data = await response.json()
      return { customer: data.customer as BayouCustomer, error: null }
    } catch (parseError) {
      return { customer: null, error: "Invalid response format from server" }
    }
  } catch (error) {
    console.error("Error creating Bayou customer:", error)
    return { customer: null, error: "Failed to connect to P&G. Please try again." }
  }
}

export async function checkBayouCustomerStatus(customerId: string) {
  try {
    const response = await fetch(`${BAYOU_BASE_URL}/customers/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { status: null, error: errorData.error || "Failed to check customer status" }
    }

    const data = await response.json()
    return { status: data.customer as BayouCustomer, error: null }
  } catch (error) {
    console.error("Error checking Bayou customer status:", error)
    return { status: null, error: "Failed to check P&G connection status. Please try again." }
  }
}

export async function getBayouData(customerId: string) {
  try {
    const response = await fetch(`${BAYOU_BASE_URL}/customers/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { data: null, error: errorData.error || "Failed to get customer data" }
    }

    const data = await response.json()
    return { data: data.bayouData as BayouData, error: null }
  } catch (error) {
    console.error("Error getting Bayou data:", error)
    return { data: null, error: "Failed to get P&G utility data. Please try again." }
  }
}
