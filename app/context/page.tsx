"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Palette, ArrowRight, History, Leaf, Building2 } from "lucide-react"
import Link from "next/link"

const contextResources = [
  {
    id: "history-map",
    title: "Architectural Timeline",
    description: "Explore Jordan's architectural evolution through historical eras, ideologies, and notable architects",
    icon: History,
    image: "/petra-visitor-center-architecture.jpg",
    href: "/context/history-map",
    topics: ["Historical Eras", "Architectural Ideologies", "Notable Architects", "Key Projects"],
    color: "text-blue-600",
  },
  {
    id: "plants",
    title: "Natural Environment & Landscape",
    description: "Comprehensive guide to native plants, trees, soil types, and landscape architecture in Jordan",
    icon: Leaf,
    image: "/aleppo-pine.jpg",
    href: "/context/plants",
    topics: ["Native Trees", "Plant Species", "Soil Types", "Plant-Soil Compatibility"],
    color: "text-green-600",
  },
  {
    id: "styles",
    title: "Architectural Styles",
    description: "Discover traditional and contemporary architectural styles that define Jordan's built environment",
    icon: Palette,
    image: "/modern-museum-architecture-jordan.jpg",
    href: "/context/styles",
    topics: ["Traditional Styles", "Modern Movements", "Contemporary Trends", "Regional Variations"],
    color: "text-purple-600",
  },
  {
    id: "structural-systems",
    title: "Structural Systems",
    description: "Complete reference for structural systems, design principles, and construction methods",
    icon: Building2,
    image: "/modern-structural-system-architecture.jpg",
    href: "/context/structural-systems",
    topics: ["Load-Bearing Systems", "Frame Systems", "Seismic Design", "Material Selection"],
    color: "text-orange-600",
  },
]

export default function ContextPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <BookOpen className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Context Resources</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance mb-4">
              Architectural Context of Jordan
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Deepen your understanding of Jordanian architecture through curated resources covering history, natural
              environment, architectural styles, and structural systems
            </p>
          </div>
        </div>
      </section>

      {/* Main Resources - Horizontal Layout */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold mb-3">Explore Context Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Essential knowledge for architects and students working in Jordan's unique architectural landscape
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contextResources.map((resource) => {
                const Icon = resource.icon
                return (
                  <Card
                    key={resource.id}
                    className="group overflow-hidden transition-all duration-200 hover:shadow-xl hover:border-accent/50 flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader className="flex-1">
                      <div className="mb-3 inline-flex items-center justify-center rounded-full bg-accent/10 p-3 w-fit">
                        <Icon className={`h-6 w-6 ${resource.color}`} />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold mb-2">Topics Covered:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {resource.topics.slice(0, 3).map((topic, i) => (
                            <span
                              key={i}
                              className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                        asChild
                      >
                        <Link href={resource.href}>
                          Explore
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Context Matters */}
      <section className="border-t py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">Why Context Matters</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <History className="h-5 w-5 text-accent" />
                    Historical Understanding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understanding Jordan's architectural history helps inform contemporary design decisions and ensures
                    cultural continuity in new projects.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Leaf className="h-5 w-5 text-accent" />
                    Environmental Awareness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Knowledge of native plants, soil types, and climate-responsive design strategies is essential for
                    sustainable architecture in Jordan's arid environment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Palette className="h-5 w-5 text-accent" />
                    Stylistic Awareness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Familiarity with architectural styles helps architects create designs that respect local traditions
                    while embracing innovation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-5 w-5 text-accent" />
                    Structural Knowledge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understanding structural systems and their applications enables architects to make informed
                    decisions about building performance and safety.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Start Exploring</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Dive into our context resources to build a comprehensive understanding of Jordanian architecture
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/context/history-map">
                  <History className="mr-2 h-5 w-5" />
                  Timeline
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/context/plants">
                  <Leaf className="mr-2 h-5 w-5" />
                  Natural Environment
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/context/styles">
                  <Palette className="mr-2 h-5 w-5" />
                  Styles
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/context/structural-systems">
                  <Building2 className="mr-2 h-5 w-5" />
                  Structural Systems
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
