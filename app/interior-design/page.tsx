import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Sofa } from "lucide-react"
import Link from "next/link"

export default function InteriorDesignPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="flex min-h-[80vh] items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <Sofa className="h-10 w-10 text-accent" />
              </div>
            </div>
            <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl text-balance">Interior Design</h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed text-pretty">
              This section is coming soon. We're creating a dedicated space for interior design projects, materials
              library, and design inspiration.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
