"use client"

import { Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function BackToHomeButton() {
  const router = useRouter()

  const handleClick = () => {
    // Smooth transition back to homepage
    router.push("/")
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <Button
          onClick={handleClick}
          variant="outline"
          className="group gap-2 border-accent/20 bg-accent/5 text-accent transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
