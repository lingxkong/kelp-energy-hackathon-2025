"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { ArrowDown, Download, Zap } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  electricity2022Data,
  electricity2023Data,
  processElectricityData,
  calculateYearOverYearComparison,
} from "@/lib/electricity-data"

interface ElectricityTrendsDisplayProps {
  customerId: string
  address: string
}

export default function ElectricityTrendsDisplay({ customerId, address }: ElectricityTrendsDisplayProps) {
  const [activeTab, setActiveTab] = useState("2023")

  // Calculate trend line data for 2023
  const calculateTrendLine = (data: any[]) => {
    const n = data.length

    // Simple linear regression
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXX = 0

    data.forEach((point, index) => {
      sumX += index
      sumY += point.consumption
      sumXY += index * point.consumption
      sumXX += index * index
    })

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    return data.map((point, index) => ({
      ...point,
      trend: intercept + slope * index,
    }))
  }

  // Process data for charts
  const data2023 = calculateTrendLine(processElectricityData(electricity2023Data))
  const data2022 = processElectricityData(electricity2022Data)

  // Calculate year-over-year comparison
  const comparison = calculateYearOverYearComparison(electricity2022Data, electricity2023Data)

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-teal-600">{`Consumption: ${payload[0].value.toLocaleString()} kW`}</p>
          <p className="text-xs text-muted-foreground">
            {`Period: ${new Date(payload[0].payload.periodStart).toLocaleDateString()} - ${new Date(payload[0].payload.periodEnd).toLocaleDateString()}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Electricity Consumption Trends</CardTitle>
          <CardDescription>
            View your electricity consumption over time and compare year-over-year changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="2023" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-blue-100">
              <TabsTrigger value="2023">2023 Data</TabsTrigger>
              <TabsTrigger value="2022">2022 Data</TabsTrigger>
            </TabsList>
            <TabsContent value="2023" className="mt-4">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data2023} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: "Consumption (kW)", angle: -90, position: "insideLeft" }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="consumption"
                      name="Electricity Consumption (kW)"
                      stroke="var(--color-teal-600)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="trend"
                      name="Consumption Trend"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={false}
                      activeDot={false}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium mb-2">2023 Consumption Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Total annual consumption:{" "}
                  <span className="font-medium">{comparison.total2023.toLocaleString()} kW</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Average monthly consumption:{" "}
                  <span className="font-medium">{(comparison.total2023 / data2023.length).toLocaleString()} kW</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Peak consumption:{" "}
                  <span className="font-medium">
                    {Math.max(...data2023.map((d) => d.consumption)).toLocaleString()} kW
                  </span>{" "}
                  (in {data2023.find((d) => d.consumption === Math.max(...data2023.map((d) => d.consumption)))?.month})
                </p>
              </div>
            </TabsContent>
            <TabsContent value="2022" className="mt-4">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data2022} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: "Consumption (kW)", angle: -90, position: "insideLeft" }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="consumption"
                      name="Electricity Consumption (kW)"
                      stroke="#9333ea"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium mb-2">2022 Consumption Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Total annual consumption:{" "}
                  <span className="font-medium">{comparison.total2022.toLocaleString()} kW</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Average monthly consumption:{" "}
                  <span className="font-medium">{(comparison.total2022 / data2022.length).toLocaleString()} kW</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Peak consumption:{" "}
                  <span className="font-medium">
                    {Math.max(...data2022.map((d) => d.consumption)).toLocaleString()} kW
                  </span>{" "}
                  (in {data2022.find((d) => d.consumption === Math.max(...data2022.map((d) => d.consumption)))?.month})
                </p>
              </div>
            </TabsContent>
          </Tabs>
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
            <Zap className="h-5 w-5 text-teal-600" />
            Year-Over-Year Comparison
          </CardTitle>
          <CardDescription>See how your electricity consumption has changed from 2022 to 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { year: "2022", consumption: comparison.total2022 },
                    { year: "2023", consumption: comparison.total2023 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: "Total Consumption (kW)", angle: -90, position: "insideLeft" }} width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" name="Total Consumption (kW)">
                    <Cell fill="#9333ea" />
                    <Cell fill="var(--color-teal-600)" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center">
              <Alert className="bg-teal-50 border-teal-200">
                <ArrowDown className="h-4 w-4 text-teal-600" />
                <AlertTitle>Electricity Usage Reduction</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">
                    You've reduced your electricity consumption by{" "}
                    <span className="font-bold text-teal-600">{comparison.percentChange.toFixed(1)}%</span> compared to
                    last year!
                  </p>
                  <p className="text-sm">
                    That's a savings of <span className="font-medium">{comparison.difference.toLocaleString()} kW</span>{" "}
                    of electricity.
                  </p>
                </AlertDescription>
              </Alert>
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">What contributed to your savings?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-teal-100 p-1 mt-0.5">
                      <Zap className="h-3 w-3 text-teal-600" />
                    </div>
                    <span>Energy-efficient lighting upgrades reduced consumption during peak hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-teal-100 p-1 mt-0.5">
                      <Zap className="h-3 w-3 text-teal-600" />
                    </div>
                    <span>Improved HVAC system efficiency lowered summer cooling costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-teal-100 p-1 mt-0.5">
                      <Zap className="h-3 w-3 text-teal-600" />
                    </div>
                    <span>Better insulation reduced energy loss during winter months</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href={`/kelp-rating?customerId=${customerId}&address=${encodeURIComponent(address)}`}>
            See Your Kelp Rating
          </Link>
        </Button>
      </div>
    </div>
  )
}
