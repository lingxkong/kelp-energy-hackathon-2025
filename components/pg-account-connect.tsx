"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building, ExternalLink, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PGAccountConnect() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [onboardingLink, setOnboardingLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [formCompleted, setFormCompleted] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const handleConnectPG = () => {
    setIsLoading(true)

    // Simulate loading for a brief moment
    setTimeout(() => {
      // Navigate directly to the electricity trends page
      router.push("/electricity-trends")
    }, 1000)
  }

  const handleFormCompleted = () => {
    setIsLoading(true)

    // Simulate loading for a brief moment
    setTimeout(() => {
      // Navigate directly to the electricity trends page
      router.push("/electricity-trends")
    }, 1000)
  }

  const handleSkip = () => {
    // Redirect to Electricity Trends page
    router.push("/electricity-trends")
  }

  const handleShowFallback = () => {
    setShowFallback(true)
    setError(null)
  }

  // Update the CardContent section to show a fallback option when there's an error
  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle>Connect Your PG&E Account</CardTitle>
        <CardDescription>
          Connect to your PG&E utility account to get personalized energy recommendations based on your actual usage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              {!showFallback && (
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-destructive-foreground underline mt-2"
                  onClick={handleShowFallback}
                >
                  Continue without connecting
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {showFallback ? (
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle>Continue without connecting</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  You can still get general energy recommendations without connecting your PG&E account.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        ) : onboardingLink ? (
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <ExternalLink className="h-4 w-4 text-blue-600" />
              <AlertTitle>Complete PG&E Login</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Please click the link below to complete your PG&E login:</p>
                <a
                  href={onboardingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  PG&E Login Form <ExternalLink className="h-3 w-3" />
                </a>
                <p className="mt-2 text-sm">Once completed, click the "I've Completed the Form" button below.</p>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <Building className="h-16 w-16 text-teal-600 mb-2" />
            <p className="text-center text-muted-foreground">
              Connect your PG&E account to get personalized energy recommendations based on your actual usage data.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {showFallback ? (
          <Button onClick={handleSkip} className="w-full bg-teal-600 hover:bg-teal-700">
            Continue to Kelp Rating
          </Button>
        ) : onboardingLink ? (
          <Button onClick={handleFormCompleted} className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "I've Completed the Form"
            )}
          </Button>
        ) : (
          <Button onClick={handleConnectPG} className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect PG&E Account"
            )}
          </Button>
        )}
        {!showFallback && (
          <Button variant="outline" onClick={handleSkip} className="w-full" disabled={isLoading}>
            Skip for Now
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
