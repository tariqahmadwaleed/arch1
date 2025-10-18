"use client"

import { useState } from "react"
import { Building, Columns, Search, Bookmark, ArrowRight, Layers, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SocialInteractions } from "@/components/social-interactions"
import { CompareButton } from "@/components/compare-button"
import { ComparePanel } from "@/components/compare-panel"

const structuralSystemsDatabase = [
  {
    id: 1,
    name: "Load-Bearing Masonry",
    category: "Traditional",
    materials: ["Stone", "Brick", "Concrete Block"],
    spanCapability: "Short spans (3-6m)",
    applications: ["Residential buildings", "Heritage structures", "Low-rise construction"],
    advantages: ["Excellent thermal mass", "Fire resistant", "Durable and long-lasting", "Uses local materials"],
    limitations: [
      "Limited span capability",
      "Thick walls required",
      "Labor intensive",
      "Not suitable for tall buildings",
    ],
    localExamples: ["Traditional Jordanian houses", "Salt historic buildings", "Village architecture"],
    image: "/load-bearing-masonry-stone-wall.jpg",
    description:
      "Traditional structural system where walls carry the building loads directly to the foundation. Common in Jordanian vernacular architecture using local limestone.",
  },
  {
    id: 2,
    name: "Reinforced Concrete Frame",
    category: "Modern",
    materials: ["Concrete", "Steel reinforcement"],
    spanCapability: "Medium to long spans (6-12m)",
    applications: ["Multi-story buildings", "Commercial structures", "Residential towers"],
    advantages: ["Flexible floor plans", "Good for seismic zones", "Fire resistant", "Allows large openings"],
    limitations: ["Requires skilled labor", "Formwork needed", "Longer construction time", "High embodied energy"],
    localExamples: ["Modern Amman buildings", "Commercial towers", "Institutional buildings"],
    image: "/reinforced-concrete-frame-construction.jpg",
    description:
      "Most common modern structural system in Jordan. Consists of columns and beams forming a frame that carries loads, with infill walls for enclosure.",
  },
  {
    id: 3,
    name: "Steel Frame",
    category: "Modern",
    materials: ["Structural steel", "Steel connections"],
    spanCapability: "Long spans (12-30m+)",
    applications: ["Industrial buildings", "Large commercial spaces", "High-rise construction"],
    advantages: ["Fast construction", "Long span capability", "Lightweight", "Prefabricated components"],
    limitations: ["Requires fire protection", "Corrosion concerns", "Higher initial cost", "Specialized labor needed"],
    localExamples: ["Industrial facilities", "Airport terminals", "Exhibition halls"],
    image: "/steel-frame-structure-construction.jpg",
    description:
      "Efficient system for large spans and tall buildings. Steel members are connected to form a structural frame, popular for industrial and commercial projects.",
  },
  {
    id: 4,
    name: "Flat Slab System",
    category: "Modern",
    materials: ["Reinforced concrete"],
    spanCapability: "Medium spans (6-9m)",
    applications: ["Parking structures", "Office buildings", "Residential buildings"],
    advantages: ["Flat ceiling surface", "Reduced floor height", "Simplified formwork", "Flexible layout"],
    limitations: [
      "Punching shear concerns",
      "Limited span",
      "Requires drop panels or capitals",
      "Deflection control needed",
    ],
    localExamples: ["Parking garages", "Modern office buildings", "Residential towers"],
    image: "/flat-slab-concrete-construction.jpg",
    description:
      "Concrete slab directly supported by columns without beams. Provides architectural flexibility and reduced floor-to-floor height.",
  },
  {
    id: 5,
    name: "Vault and Dome Systems",
    category: "Traditional",
    materials: ["Stone", "Brick", "Mud brick"],
    spanCapability: "Medium spans (4-10m)",
    applications: ["Religious buildings", "Historic structures", "Traditional architecture"],
    advantages: ["No need for timber", "Excellent acoustics", "Thermal performance", "Aesthetic appeal"],
    limitations: [
      "Requires skilled masons",
      "Lateral thrust",
      "Complex geometry",
      "Limited to specific building types",
    ],
    localExamples: ["Umayyad palaces", "Historic mosques", "Traditional bathhouses"],
    image: "/vault-dome-traditional-architecture.jpg",
    description:
      "Ancient structural system using curved surfaces to span spaces. Common in Islamic architecture and desert construction where timber was scarce.",
  },
  {
    id: 6,
    name: "Post-Tensioned Concrete",
    category: "Modern",
    materials: ["Concrete", "High-strength steel tendons"],
    spanCapability: "Long spans (12-20m+)",
    applications: ["Bridges", "Long-span floors", "Parking structures", "Transfer structures"],
    advantages: ["Longer spans", "Thinner slabs", "Reduced cracking", "Better deflection control"],
    limitations: ["Specialized equipment", "Higher initial cost", "Requires expertise", "Tendon corrosion risk"],
    localExamples: ["Modern bridges", "Large commercial buildings", "Parking structures"],
    image: "/post-tensioned-concrete-slab.jpg",
    description:
      "Advanced concrete system where high-strength steel tendons are tensioned after concrete curing, allowing for longer spans and thinner slabs.",
  },
  {
    id: 7,
    name: "Shear Wall System",
    category: "Modern",
    materials: ["Reinforced concrete"],
    spanCapability: "Varies with building height",
    applications: ["High-rise buildings", "Seismic zones", "Elevator cores", "Stairwells"],
    advantages: ["Excellent lateral resistance", "Good for tall buildings", "Seismic performance", "Stiffness control"],
    limitations: [
      "Limited architectural flexibility",
      "Fixed wall locations",
      "Complex analysis",
      "Requires careful planning",
    ],
    localExamples: ["Residential towers", "Hotel buildings", "Office high-rises"],
    image: "/shear-wall-concrete-structure.jpg",
    description:
      "Vertical structural elements designed to resist lateral forces from wind and earthquakes. Essential for tall buildings in seismic regions.",
  },
  {
    id: 8,
    name: "Timber Frame",
    category: "Traditional/Sustainable",
    materials: ["Wood", "Timber connections"],
    spanCapability: "Short to medium spans (4-8m)",
    applications: ["Residential buildings", "Sustainable construction", "Roof structures"],
    advantages: ["Renewable material", "Low embodied energy", "Fast construction", "Good insulation"],
    limitations: ["Fire concerns", "Termite susceptibility", "Limited availability in Jordan", "Moisture sensitivity"],
    localExamples: ["Traditional roof structures", "Modern sustainable projects", "Temporary structures"],
    image: "/timber-frame-wood-construction.jpg",
    description:
      "Structural system using wood members. Less common in Jordan due to limited timber resources, but gaining interest for sustainable construction.",
  },
]

const seismicConsiderations = [
  {
    title: "Seismic Design Requirements",
    description:
      "Jordan is located in a moderate seismic zone. Structural systems must be designed to resist earthquake forces according to local building codes.",
    icon: Layers,
  },
  {
    title: "Ductility and Redundancy",
    description:
      "Structural systems should provide ductile behavior and multiple load paths to ensure safety during seismic events.",
    icon: Box,
  },
  {
    title: "Regular Configuration",
    description:
      "Buildings with regular, symmetric layouts perform better during earthquakes. Irregular configurations require special analysis.",
    icon: Building,
  },
]

export default function StructuralSystemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMaterial, setSelectedMaterial] = useState("all")
  const [selectedSpan, setSelectedSpan] = useState("all")
  const [savedSystems, setSavedSystems] = useState<Record<number, boolean>>({})

  const filteredSystems = structuralSystemsDatabase.filter((system) => {
    const matchesSearch =
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || system.category === selectedCategory
    const matchesMaterial = selectedMaterial === "all" || system.materials.some((mat) => mat.includes(selectedMaterial))
    const matchesSpan = selectedSpan === "all" || system.spanCapability.includes(selectedSpan)
    return matchesSearch && matchesCategory && matchesMaterial && matchesSpan
  })

  const toggleSaveSystem = (id: number) => {
    setSavedSystems((prev) => ({ ...prev, [id]: !prev[id] }))
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
              <Columns className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Context Resource</span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl mb-4">Structural Systems Guide</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Comprehensive guide to structural systems used in Jordanian architecture — from traditional load-bearing
              masonry to modern reinforced concrete and steel frames. Understand materials, applications, and design
              considerations.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search structural systems, materials, or applications..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Traditional">Traditional</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Traditional/Sustainable">Sustainable</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="Concrete">Concrete</SelectItem>
                  <SelectItem value="Steel">Steel</SelectItem>
                  <SelectItem value="Stone">Stone</SelectItem>
                  <SelectItem value="Wood">Wood</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSpan} onValueChange={setSelectedSpan}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Span Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Spans</SelectItem>
                  <SelectItem value="Short">Short (3-6m)</SelectItem>
                  <SelectItem value="Medium">Medium (6-12m)</SelectItem>
                  <SelectItem value="Long">Long (12m+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Systems Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold">Structural Systems</h2>
          <p className="text-muted-foreground">{filteredSystems.length} systems found</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSystems.map((system) => (
            <Card
              key={system.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-accent"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={system.image || "/placeholder.svg"}
                  alt={system.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="default">{system.category}</Badge>
                </div>
                <CardTitle className="text-xl">{system.name}</CardTitle>
                <CardDescription>{system.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">Materials</p>
                  <div className="flex flex-wrap gap-2">
                    {system.materials.map((material, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Span Capability</p>
                  <p className="text-sm text-muted-foreground">{system.spanCapability}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Applications</p>
                  <ul className="space-y-1">
                    {system.applications.slice(0, 3).map((app, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-semibold mb-2">Advantages</p>
                  <ul className="space-y-1">
                    {system.advantages.slice(0, 2).map((adv, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="mt-1 h-1 w-1 rounded-full bg-green-500 flex-shrink-0" />
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t">
                  <CompareButton
                    item={{
                      id: system.id.toString(),
                      type: "structural-system",
                      title: system.name,
                      image: system.image,
                      metadata: { category: system.category, spanCapability: system.spanCapability },
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSaveSystem(system.id)}
                    className={`flex-1 ${savedSystems[system.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${savedSystems[system.id] ? "fill-current" : ""}`} />
                    {savedSystems[system.id] ? "Saved" : "Save"}
                  </Button>
                  <SocialInteractions
                    contentId={system.id.toString()}
                    contentType="structural-system"
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

      {/* Seismic Considerations */}
      <section className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl font-bold mb-8">Seismic Design Considerations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {seismicConsiderations.map((consideration, index) => {
              const Icon = consideration.icon
              return (
                <div
                  key={index}
                  className="group rounded-lg border bg-background p-6 transition-all duration-200 hover:border-accent hover:shadow-md"
                >
                  <Icon className="h-10 w-10 text-accent mb-4 transition-transform duration-200 group-hover:scale-110" />
                  <h3 className="font-serif text-xl font-bold mb-2">{consideration.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{consideration.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Material Comparison */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl font-bold mb-8">Material Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-serif text-lg font-bold">Material</th>
                  <th className="p-4 text-left font-serif text-lg font-bold">Strength</th>
                  <th className="p-4 text-left font-serif text-lg font-bold">Durability</th>
                  <th className="p-4 text-left font-serif text-lg font-bold">Cost</th>
                  <th className="p-4 text-left font-serif text-lg font-bold">Sustainability</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b transition-colors hover:bg-accent/5">
                  <td className="p-4 font-semibold">Concrete</td>
                  <td className="p-4 text-muted-foreground">High compression</td>
                  <td className="p-4 text-muted-foreground">Excellent</td>
                  <td className="p-4 text-muted-foreground">Moderate</td>
                  <td className="p-4 text-muted-foreground">High embodied energy</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-accent/5">
                  <td className="p-4 font-semibold">Steel</td>
                  <td className="p-4 text-muted-foreground">High tension & compression</td>
                  <td className="p-4 text-muted-foreground">Good (with protection)</td>
                  <td className="p-4 text-muted-foreground">Higher</td>
                  <td className="p-4 text-muted-foreground">Recyclable</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-accent/5">
                  <td className="p-4 font-semibold">Stone Masonry</td>
                  <td className="p-4 text-muted-foreground">Good compression</td>
                  <td className="p-4 text-muted-foreground">Excellent</td>
                  <td className="p-4 text-muted-foreground">Variable</td>
                  <td className="p-4 text-muted-foreground">Low embodied energy</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-accent/5">
                  <td className="p-4 font-semibold">Timber</td>
                  <td className="p-4 text-muted-foreground">Moderate</td>
                  <td className="p-4 text-muted-foreground">Good (with treatment)</td>
                  <td className="p-4 text-muted-foreground">Variable</td>
                  <td className="p-4 text-muted-foreground">Renewable, carbon storage</td>
                </tr>
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
              <Link href="/context/styles">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Architectural Styles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/context/plants">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Natural Environment & Landscape
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
