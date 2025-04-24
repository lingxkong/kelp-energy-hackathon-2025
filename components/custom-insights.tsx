"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Download, Lightbulb, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getBayouData } from "@/lib/bayou-api"

interface CustomInsightsProps {
  customerId: string
}

interface MonthlyInsight {
  name: string
  usage: number
}

export default function CustomInsights({ customerId }: CustomInsightsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [insights, setInsights] = useState<Record<string, number> | null>(null)
  const [chartData, setChartData] = useState<MonthlyInsight[]>([])
  const [annualTotal, setAnnualTotal] = useState(0)

  useEffect(() => {
    async function fetchInsights() {
      setIsLoading(true)
      setError(null)

      try {
        // First get the Bayou data
        const { data: bayouData, error: bayouError } = await getBayouData(customerId)

        if (bayouError) {
          setError(bayouError)
          setIsLoading(false)
          return
        }

        if (!bayouData) {
          setError("No utility data available")
          setIsLoading(false)
          return
        }

        // Then get the Palmetto insights
        const response = await fetch("/api/palmetto/insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bayouData }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.error || "Failed to get energy insights")

          // If we have fallback insights, use them
          if (errorData.insights) {
            setInsights(errorData.insights)
          }
        } else {
          const data = await response.json()
          setInsights(data.insights)
        }
      } catch (err) {
        setError("Failed to get energy insights. Please try again.")
        console.error("Error fetching insights:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsights()
  }, [customerId])

  useEffect(() => {
    if (insights) {
      // Convert insights object to array for chart
      const monthOrder = [
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

      const data = monthOrder
        .filter((month) => month in insights)
        .map((month) => ({
          name: month,
          usage: insights[month],
        }))

      setChartData(data)

      // Calculate annual total
      const total = Object.values(insights).reduce((sum, value) => sum + value, 0)
      setAnnualTotal(total)
    }
  }, [insights])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your personalized energy insights...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Annual Energy Usage</CardTitle>
              <CardDescription>Your predicted annual energy consumption based on your utility data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-teal-600">{annualTotal.toLocaleString()} kWh</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This is an estimate based on your historical usage patterns
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Monthly Energy Usage Prediction</CardTitle>
              <CardDescription>Projected energy consumption for each month of the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 3)} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} kWh`, "Energy Usage"]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Bar dataKey="usage" name="Energy Usage (kWh)" fill="var(--color-teal-600)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Data
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-teal-600" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Based on your energy usage patterns, here are some tailored recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium mb-2">Peak Usage Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Your usage peaks during summer months. Consider implementing smart thermostats and scheduling
                    energy-intensive operations during off-peak hours to reduce costs.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium mb-2">Seasonal Efficiency</h4>
                  <p className="text-sm text-muted-foreground">
                    Your winter energy usage suggests potential insulation improvements. Upgrading insulation could
                    reduce heating costs by up to 15%.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium mb-2">Energy Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider installing energy monitoring systems to identify specific areas of high consumption and
                    track improvements over time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
