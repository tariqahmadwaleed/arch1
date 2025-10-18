"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building2, MapPin, Calendar, User, Filter } from "lucide-react"
import Link from "next/link"
import { ProjectUploadDialog } from "@/components/project-upload-dialog"
import { createBrowserClient } from "@/lib/supabase-client"
import { SocialInteractions } from "@/components/social-interactions"
import { CompareButton } from "@/components/compare-button"

interface Project {
  id: string
  title: string
  architect: string
  type: string
  category: string
  location: string
  year: number
  description: string
  images: string[]
  likes: number
  comments: number
  keywords?: string[]
  materials?: string[]
  scale?: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Modern Villa in Amman",
    architect: "Ahmad Al-Hassan",
    type: "Firm",
    category: "Residential",
    location: "Amman, Jordan",
    year: 2023,
    description:
      "A contemporary villa design featuring clean lines and sustainable materials, integrating traditional Jordanian elements with modern architecture.",
    images: ["/modern-villa-amman.jpg"],
    likes: 124,
    comments: 18,
    keywords: ["Modern", "Sustainable", "Villa"],
    materials: ["Stone", "Glass", "Concrete"],
    scale: "Medium",
  },
  {
    id: "2",
    title: "Cultural Center Concept",
    architect: "Layla Mansour",
    type: "Student",
    category: "Cultural",
    location: "Jerash, Jordan",
    year: 2024,
    description:
      "A student project exploring the integration of ancient Roman architecture with contemporary design for a new cultural center in Jerash.",
    images: ["/cultural-center-jerash.jpg"],
    likes: 89,
    comments: 12,
    keywords: ["Cultural", "Heritage", "Contemporary"],
    materials: ["Stone", "Steel"],
    scale: "Large",
  },
  {
    id: "3",
    title: "Sustainable Office Complex",
    architect: "Noor Architecture Studio",
    type: "Firm",
    category: "Commercial",
    location: "Aqaba, Jordan",
    year: 2023,
    description:
      "An eco-friendly office building utilizing passive cooling, solar panels, and local materials to minimize environmental impact.",
    images: ["/sustainable-office-aqaba.jpg"],
    likes: 156,
    comments: 24,
    keywords: ["Sustainable", "Office", "Green"],
    materials: ["Glass", "Solar Panels", "Recycled Materials"],
    scale: "Large",
  },
  {
    id: "4",
    title: "Heritage Hotel Restoration",
    architect: "Kareem Designs",
    type: "Firm",
    category: "Hospitality",
    location: "Petra, Jordan",
    year: 2022,
    description:
      "Restoration and adaptive reuse of a historic building near Petra, transforming it into a boutique hotel while preserving its architectural heritage.",
    images: ["/heritage-hotel-petra.jpg"],
    likes: 203,
    comments: 31,
    keywords: ["Restoration", "Heritage", "Hospitality"],
    materials: ["Stone", "Wood", "Traditional Materials"],
    scale: "Medium",
  },
  {
    id: "5",
    title: "Urban Park Design",
    architect: "Sara Khalil",
    type: "Student",
    category: "Landscape",
    location: "Irbid, Jordan",
    year: 2024,
    description:
      "A thesis project proposing a new urban park that connects neighborhoods and provides green space for the community.",
    images: ["/urban-park-irbid.jpg"],
    likes: 67,
    comments: 9,
    keywords: ["Landscape", "Urban", "Park"],
    materials: ["Native Plants", "Permeable Paving"],
    scale: "Large",
  },
  {
    id: "6",
    title: "Educational Campus",
    architect: "Horizon Architects",
    type: "Firm",
    category: "Educational",
    location: "Zarqa, Jordan",
    year: 2023,
    description:
      "A modern educational campus designed to foster collaboration and innovation, featuring flexible learning spaces and outdoor classrooms.",
    images: ["/educational-campus-zarqa.jpg"],
    likes: 142,
    comments: 19,
    keywords: ["Educational", "Campus", "Innovation"],
    materials: ["Concrete", "Glass", "Steel"],
    scale: "Large",
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createBrowserClient()
        const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

        if (error) {
          console.error("[v0] Error fetching projects:", error)
          setProjects(mockProjects)
          setError("Using sample data. Connect Supabase to see real projects.")
          return
        }

        setProjects(data || [])
      } catch (error) {
        console.error("[v0] Error in fetchProjects:", error)
        setProjects(mockProjects)
        setError(
          "Supabase not configured. Showing sample projects. Please add your Supabase credentials to see real data.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.architect.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.keywords && project.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())))
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
      const matchesType = selectedType === "all" || project.type === selectedType
      const matchesLocation = selectedLocation === "all" || project.location.includes(selectedLocation)
      const matchesYear = selectedYear === "all" || project.year.toString() === selectedYear
      return matchesSearch && matchesCategory && matchesType && matchesLocation && matchesYear
    })
    .sort((a, b) => {
      if (sortBy === "recent") return b.year - a.year
      if (sortBy === "oldest") return a.year - b.year
      if (sortBy === "popular") return (b.likes || 0) - (a.likes || 0)
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]
  const types = ["all", "Student", "Firm"]
  const locations = ["all", ...Array.from(new Set(projects.map((p) => p.location.split(",")[0].trim())))]
  const years = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.year.toString())))
      .sort()
      .reverse(),
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Building2 className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Projects & Portfolios</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Discover Inspiring Architecture</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Explore projects from students and firms across Jordan, share your work, and connect with the community
            </p>
            <div className="mt-6">
              <ProjectUploadDialog />
            </div>
          </div>
        </div>
      </section>

      {error && (
        <section className="border-b bg-yellow-50 dark:bg-yellow-950/20 py-3">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
          </div>
        </section>
      )}

      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects, architects, keywords..."
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>
                <Filter className="inline h-4 w-4 mr-1" />
                {filteredProjects.length} projects found
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
                  <Link href={`/projects/${project.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute right-3 top-3">
                        <Badge variant={project.type === "Student" ? "secondary" : "default"}>{project.type}</Badge>
                      </div>
                    </div>
                  </Link>
                  <CardHeader className="flex-grow">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <CardTitle className="text-xl text-balance">
                      <Link href={`/projects/${project.id}`} className="hover:text-accent transition-colors">
                        {project.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      <Link
                        href={`/projects/architect/${project.id}`}
                        className="hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <User className="h-3 w-3" />
                        {project.architect}
                      </Link>
                    </CardDescription>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto">
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    {project.keywords && project.keywords.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {project.keywords.slice(0, 3).map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <CompareButton
                          item={{
                            id: project.id,
                            type: "project",
                            title: project.title,
                            image: project.images[0],
                            metadata: {
                              Architect: project.architect,
                              Category: project.category,
                              Location: project.location,
                              Year: project.year,
                              Type: project.type,
                            },
                          }}
                        />
                      </div>
                      <SocialInteractions
                        contentId={project.id}
                        contentType="project"
                        initialLikes={project.likes}
                        initialComments={project.comments}
                        showRepost={true}
                        showReport={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
