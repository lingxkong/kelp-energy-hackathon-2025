import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import ElectricityTrendsDisplay from "@/components/electricity-trends-display"

export default function ElectricityTrendsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const customerId = (searchParams.customerId as string) || ""
  const address = (searchParams.address as string) || ""

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-blue-50/95 backdrop-blur supports-[backdrop-filter]:bg-blue-50/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-lg font-bold">
            <Leaf className="h-5 w-5 text-teal-600" />
            <span>Kelp</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Button size="sm">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/kelp-rating?customerId=${customerId}&address=${encodeURIComponent(address)}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Kelp Rating
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Electricity Consumption Trends</h1>
          <p className="text-muted-foreground mt-2">
            Track your electricity usage over time and see how it has changed year-over-year
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-6xl">
          <Suspense fallback={<div>Loading electricity trends...</div>}>
            <ElectricityTrendsDisplay customerId={customerId} address={address} />
          </Suspense>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0 bg-blue-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kelp. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
