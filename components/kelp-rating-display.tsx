"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Leaf, Lightbulb, Loader2, ThermometerSun, Wind, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface KelpRatingDisplayProps {
  customerId: string
  address: string
}

export default function KelpRatingDisplay({ customerId, address }: KelpRatingDisplayProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading the rating
    const timer = setTimeout(() => {
      // Generate a rating between 65 and 85 based on the address or customerId
      // This would be replaced with a real API call in production
      const seed = (address || customerId || "default").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const generatedRating = 65 + (seed % 20)
      setRating(generatedRating)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [address, customerId])

  const handleViewRecommendations = () => {
    // Navigate to recommendations page with the address and customerId
    const params = new URLSearchParams()
    if (address) params.append("address", address)
    if (customerId) params.append("customerId", customerId)

    router.push(`/recommendations?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 text-teal-600 animate-spin mb-4" />
        <p className="text-lg font-medium">Calculating your Kelp Rating...</p>
        <p className="text-muted-foreground mt-2">Analyzing building characteristics and energy patterns</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Kelp Energy Rating</CardTitle>
          <CardDescription>
            This rating represents your building's energy efficiency compared to similar buildings
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-bold text-teal-600">{rating}%</div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#0d9488"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * rating) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="text-center max-w-md">
            <p className="text-lg font-medium mb-2">
              {rating >= 80
                ? "Excellent! Your building is highly energy efficient."
                : rating >= 70
                  ? "Good! Your building performs better than average."
                  : "Your building has potential for energy efficiency improvements."}
            </p>
            <p className="text-muted-foreground">
              We've analyzed your building's characteristics and energy usage patterns to generate this rating.
              {customerId && " Your connected PG&E account data has been included in this analysis."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 flex-wrap">
          <Button onClick={handleViewRecommendations} className="bg-teal-600 hover:bg-teal-700">
            View Personalized Recommendations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href={`/electricity-trends?customerId=${customerId}&address=${encodeURIComponent(address)}`}>
              <LineChart className="h-4 w-4" />
              View Electricity Trends
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center gap-4">
            <Lightbulb className="h-8 w-8 text-teal-600" />
            <div className="grid gap-1">
              <CardTitle>Lighting</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span>{rating - 5}%</span>
              </div>
              <Progress value={rating - 5} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              LED lighting upgrades could improve your energy efficiency and reduce costs.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center gap-4">
            <ThermometerSun className="h-8 w-8 text-teal-600" />
            <div className="grid gap-1">
              <CardTitle>HVAC</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span>{rating - 10}%</span>
              </div>
              <Progress value={rating - 10} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your HVAC system has room for improvement with modern, energy-efficient upgrades.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center gap-4">
            <Wind className="h-8 w-8 text-teal-600" />
            <div className="grid gap-1">
              <CardTitle>Insulation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span>{rating - 8}%</span>
              </div>
              <Progress value={rating - 8} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Better insulation could significantly reduce your energy consumption.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Leaf className="h-4 w-4 text-blue-600" />
        <AlertTitle>Want to improve your rating?</AlertTitle>
        <AlertDescription>
          View your personalized recommendations to see how you can improve your building's energy efficiency and reduce
          costs.
        </AlertDescription>
      </Alert>
    </div>
  )
}
