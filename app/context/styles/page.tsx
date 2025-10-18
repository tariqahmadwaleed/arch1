"use client"

import { useState } from "react"
import { Building2, Palette, Ruler, ArrowRight, Sun, Search, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { StyleComparisonDialog } from "@/components/style-comparison-dialog"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SocialInteractions } from "@/components/social-interactions"
import { ComparePanel } from "@/components/compare-panel"

const stylesDatabase = [
  {
    id: 1,
    name: "Nabataean Architecture",
    period: "Ancient",
    years: "312 BCE - 106 CE",
    region: "Petra, Southern Jordan",
    characteristics: ["Rock-cut facades", "Hellenistic influences", "Hydraulic engineering", "Decorative capitals"],
    examples: ["Petra Treasury", "Monastery at Petra", "Little Petra"],
    image: "/petra-visitor-center-architecture.jpg",
  },
  {
    id: 2,
    name: "Roman Architecture",
    period: "Ancient",
    years: "106 CE - 395 CE",
    region: "Jerash, Umm Qais",
    characteristics: ["Colonnaded streets", "Theaters and amphitheaters", "Temples", "Public baths"],
    examples: ["Jerash Oval Plaza", "Artemis Temple", "South Theater"],
    image: "/modern-museum-architecture-jordan.jpg",
  },
  {
    id: 3,
    name: "Umayyad Architecture",
    period: "Islamic",
    years: "661 CE - 750 CE",
    region: "Desert Castles",
    characteristics: ["Desert palaces", "Geometric patterns", "Frescoes and mosaics", "Defensive structures"],
    examples: ["Qasr Amra", "Qasr Kharana", "Qasr al-Hallabat"],
    image: "/archaeological-pavilion-design.jpg",
  },
  {
    id: 4,
    name: "Mamluk Architecture",
    period: "Islamic",
    years: "1250 CE - 1517 CE",
    region: "Ajloun, Kerak",
    characteristics: ["Military fortifications", "Stone masonry", "Pointed arches", "Defensive towers"],
    examples: ["Ajloun Castle", "Kerak Castle"],
    image: "/ajloun-castle.jpg",
  },
  {
    id: 5,
    name: "Ottoman Architecture",
    period: "Ottoman",
    years: "1516 CE - 1918 CE",
    region: "Salt, Amman",
    characteristics: ["Central dome structures", "Pointed arches", "Stone masonry", "Wooden balconies"],
    examples: ["Salt Historic Center", "Amman Old Town"],
    image: "/salt-jordan-historic.jpg",
  },
  {
    id: 6,
    name: "Contemporary Modernism",
    period: "Modern",
    years: "1950 CE - Present",
    region: "Amman, Aqaba",
    characteristics: ["International style", "Local materials", "Climate-responsive", "Contextual design"],
    examples: ["Jordan Museum", "King Abdullah Mosque", "Modern Amman"],
    image: "/modern-museum-architecture.jpg",
  },
]

export default function ArchitecturalStylesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [savedStyles, setSavedStyles] = useState<Record<number, boolean>>({})

  const filteredStyles = stylesDatabase.filter((style) => {
    const matchesSearch =
      style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.characteristics.some((char) => char.toLowerCase().includes(searchQuery.toLowerCase())) ||
      style.examples.some((ex) => ex.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPeriod = selectedPeriod === "all" || style.period === selectedPeriod
    const matchesRegion = selectedRegion === "all" || style.region.includes(selectedRegion)
    return matchesSearch && matchesPeriod && matchesRegion
  })

  const contemporaryApproaches = [
    {
      title: "Climate-Responsive Design",
      description:
        "Modern interpretations of traditional passive cooling strategies, including thick walls, small windows, and courtyard layouts.",
      icon: Sun,
    },
    {
      title: "Material Authenticity",
      description:
        "Use of local limestone, sandstone, and earth materials that connect contemporary buildings to regional heritage.",
      icon: Palette,
    },
    {
      title: "Contextual Modernism",
      description:
        "Blending international modern architecture with local proportions, materials, and spatial concepts.",
      icon: Ruler,
    },
  ]

  const designElements = [
    {
      element: "Materials",
      traditional: "Local limestone, sandstone, mud brick",
      contemporary: "Concrete, glass, steel with stone cladding",
    },
    {
      element: "Forms",
      traditional: "Domes, arches, courtyards, thick walls",
      contemporary: "Clean lines, open plans, large glazing",
    },
    {
      element: "Climate Strategy",
      traditional: "Passive cooling, small openings, thermal mass",
      contemporary: "Active systems with passive principles, shading devices",
    },
    {
      element: "Ornamentation",
      traditional: "Geometric patterns, calligraphy, carved stone",
      contemporary: "Minimal detailing, material expression, subtle references",
    },
    {
      element: "Spatial Organization",
      traditional: "Inward-facing, hierarchical, private courtyards",
      contemporary: "Flexible, open, indoor-outdoor connection",
    },
  ]

  const toggleSaveStyle = (id: number) => {
    setSavedStyles((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToHomeButton />
      <ComparePanel />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-accent">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Context Resource</span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl mb-4">
              Architectural Styles in Jordan
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore the evolution of architectural styles in Jordan — from ancient Nabataean rock-cut facades to
              contemporary contextual modernism. Understand how tradition informs innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search architectural styles, characteristics, or examples..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="Ancient">Ancient</SelectItem>
                  <SelectItem value="Islamic">Islamic</SelectItem>
                  <SelectItem value="Ottoman">Ottoman</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Petra">Petra</SelectItem>
                  <SelectItem value="Jerash">Jerash</SelectItem>
                  <SelectItem value="Amman">Amman</SelectItem>
                  <SelectItem value="Salt">Salt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <StyleComparisonDialog styles={stylesDatabase} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold">Architectural Styles</h2>
          <p className="text-muted-foreground">{filteredStyles.length} styles found</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStyles.map((style) => (
            <Card
              key={style.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-accent"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={style.image || "/placeholder.svg"}
                  alt={style.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{style.period}</Badge>
                    <Badge variant="outline">{style.years.split(" - ")[0]}</Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{style.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{style.region}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">Key Characteristics</p>
                  <div className="flex flex-wrap gap-2">
                    {style.characteristics.map((char, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-semibold mb-2">Notable Examples</p>
                  <ul className="space-y-1">
                    {style.examples.map((example, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSaveStyle(style.id)}
                    className={`${savedStyles[style.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${savedStyles[style.id] ? "fill-current" : ""}`} />
                    {savedStyles[style.id] ? "Saved" : "Save"}
                  </Button>
                  <SocialInteractions
                    contentId={style.id.toString()}
                    contentType="style"
                    showLike={false}
                    showComment={false}
                    showRepost={false}
                    showReport={true}
                    showShare={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contemporary Approaches */}
      <section className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl font-bold mb-8">Contemporary Design Approaches</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {contemporaryApproaches.map((approach, index) => {
              const Icon = approach.icon
              return (
                <div
                  key={index}
                  className="group rounded-lg border bg-background p-6 transition-all duration-200 hover:border-accent hover:shadow-md"
                >
                  <Icon className="h-10 w-10 text-accent mb-4 transition-transform duration-200 group-hover:scale-110" />
                  <h3 className="font-serif text-xl font-bold mb-2">{approach.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Design Elements Comparison */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl font-bold mb-8">Traditional vs. Contemporary Elements</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-serif text-lg font-bold">Element</th>
                  <th className="p-4 text-left font-serif text-lg font-bold">Traditional</th>
                  <th className="p-4 text-left font-serif text-lg font-bold">Contemporary</th>
                </tr>
              </thead>
              <tbody>
                {designElements.map((item, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-accent/5">
                    <td className="p-4 font-semibold">{item.element}</td>
                    <td className="p-4 text-muted-foreground">{item.traditional}</td>
                    <td className="p-4 text-muted-foreground">{item.contemporary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Explore More Context Resources</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Deepen your understanding of Jordanian architecture with our curated context resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/context/history-map">
                <Button variant="outline" className="gap-2 bg-transparent">
                  History Map
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/context/plants">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Natural Environment & Landscape
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/context/structural-systems">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Structural Systems
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
