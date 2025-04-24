import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import PGAccountConnect from "@/components/pg-account-connect"

export default function ConnectPage() {
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
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Connect Your Utility Account</h1>
          <p className="text-muted-foreground mt-2">
            Get personalized energy recommendations based on your actual usage
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <PGAccountConnect />
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
