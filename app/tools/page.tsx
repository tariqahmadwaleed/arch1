"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sun,
  Wind,
  Mountain,
  Building2,
  ExternalLink,
  Laptop,
  Wrench,
  GraduationCap,
  Clock,
  Users,
  Star,
  Search,
  Bookmark,
  Bell,
  DollarSign,
} from "lucide-react"
import { FavoriteButton } from "@/components/favorite-button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const analysisTools = [
  {
    title: "Sun & Climate Analysis",
    description: "Analyze solar paths, daylight hours, and climate data for your project location",
    icon: Sun,
    tools: [
      {
        name: "SunCalc",
        description: "Interactive sun position and sunlight phases calculator",
        url: "https://www.suncalc.org",
      },
      {
        name: "Climate Consultant",
        description: "Comprehensive climate analysis and design strategies",
        url: "http://www.energy-design-tools.aud.ucla.edu",
      },
      {
        name: "Ladybug Tools",
        description: "Environmental analysis tools for Grasshopper and Rhino",
        url: "https://www.ladybug.tools",
      },
    ],
  },
  {
    title: "Wind & Orientation",
    description: "Study wind patterns, prevailing directions, and natural ventilation strategies",
    icon: Wind,
    tools: [
      {
        name: "Windfinder",
        description: "Wind forecasts and statistics for any location worldwide",
        url: "https://www.windfinder.com",
      },
      {
        name: "Wind Rose",
        description: "Visualize wind direction and speed data",
        url: "https://www.meteoblue.com/en/weather/archive/windrose",
      },
      {
        name: "CFD Online",
        description: "Computational fluid dynamics resources and tools",
        url: "https://www.cfd-online.com",
      },
    ],
  },
  {
    title: "Contour & Topography",
    description: "Access elevation data, generate contour lines, and analyze site topography",
    icon: Mountain,
    tools: [
      {
        name: "OpenTopography",
        description: "High-resolution topography data and tools",
        url: "https://opentopography.org",
      },
      {
        name: "USGS Earth Explorer",
        description: "Download elevation and satellite imagery data",
        url: "https://earthexplorer.usgs.gov",
      },
      {
        name: "Terrain2STL",
        description: "Generate 3D terrain models from map data",
        url: "https://jthatch.com/Terrain2STL",
      },
    ],
  },
  {
    title: "Building Shadows",
    description: "Calculate shadow patterns, analyze overshadowing, and optimize building placement",
    icon: Building2,
    tools: [
      {
        name: "ShadowCalculator",
        description: "Calculate building shadows for any time and location",
        url: "https://shadowcalculator.eu",
      },
      {
        name: "SketchUp Shadow Analysis",
        description: "Built-in shadow studies in SketchUp",
        url: "https://www.sketchup.com",
      },
      {
        name: "Autodesk Insight",
        description: "Building performance analysis including shadow studies",
        url: "https://insight.autodesk.com",
      },
    ],
  },
]

const softwareCategories = [
  {
    name: "CAD & Modeling",
    tools: [
      {
        name: "AutoCAD",
        description: "Industry-standard 2D and 3D CAD software",
        url: "https://www.autodesk.com/products/autocad",
      },
      { name: "Rhino 3D", description: "Advanced 3D modeling for complex geometries", url: "https://www.rhino3d.com" },
      {
        name: "SketchUp",
        description: "Intuitive 3D modeling for architectural design",
        url: "https://www.sketchup.com",
      },
    ],
  },
  {
    name: "BIM Software",
    tools: [
      {
        name: "Revit",
        description: "Building Information Modeling for architecture",
        url: "https://www.autodesk.com/products/revit",
      },
      {
        name: "ArchiCAD",
        description: "BIM software for architects",
        url: "https://graphisoft.com/solutions/archicad",
      },
      { name: "Vectorworks", description: "Design and BIM software", url: "https://www.vectorworks.net" },
    ],
  },
  {
    name: "Visualization",
    tools: [
      { name: "Lumion", description: "Real-time 3D architectural visualization", url: "https://lumion.com" },
      { name: "Enscape", description: "Real-time rendering and virtual reality", url: "https://enscape3d.com" },
      { name: "V-Ray", description: "Photorealistic rendering engine", url: "https://www.chaos.com/vray" },
    ],
  },
  {
    name: "Parametric Design",
    tools: [
      { name: "Grasshopper", description: "Visual programming for Rhino", url: "https://www.grasshopper3d.com" },
      { name: "Dynamo", description: "Visual programming for Revit", url: "https://dynamobim.org" },
      { name: "Processing", description: "Creative coding for designers", url: "https://processing.org" },
    ],
  },
]

const courses = [
  {
    id: 1,
    title: "Introduction to Sustainable Architecture",
    instructor: "Dr. Ahmad Hassan",
    duration: "6 weeks",
    students: 234,
    rating: 4.8,
    level: "Beginner",
    language: "English",
    price: "Free",
    category: "Sustainability",
    description: "Learn the fundamentals of sustainable design and green building practices.",
    image: "/sustainable-architecture-course-green-building.jpg",
  },
  {
    id: 2,
    title: "Advanced BIM Techniques",
    instructor: "Tech Architecture Group",
    duration: "8 weeks",
    students: 156,
    rating: 4.9,
    level: "Advanced",
    language: "English",
    price: "$99",
    category: "BIM",
    description: "Master Building Information Modeling for complex architectural projects.",
    image: "/bim-revit-architecture-course-modeling.jpg",
  },
  {
    id: 3,
    title: "Parametric Design with Grasshopper",
    instructor: "Maya Chen",
    duration: "10 weeks",
    students: 189,
    rating: 4.7,
    level: "Intermediate",
    language: "English",
    price: "$79",
    category: "Parametric Design",
    description: "Explore computational design and parametric modeling techniques.",
    image: "/parametric-design-grasshopper-computational-archit.jpg",
  },
  {
    id: 4,
    title: "Architectural Visualization Masterclass",
    instructor: "Studio Render",
    duration: "7 weeks",
    students: 201,
    rating: 4.8,
    level: "Intermediate",
    language: "English",
    price: "$89",
    category: "Visualization",
    description: "Create stunning architectural renderings and presentations.",
    image: "/architectural-visualization-rendering-3d-photoreali.jpg",
  },
  {
    id: 5,
    title: "Heritage Conservation Principles",
    instructor: "Prof. Hala Qudah",
    duration: "5 weeks",
    students: 142,
    rating: 4.9,
    level: "Beginner",
    language: "Arabic",
    price: "Free",
    category: "Heritage",
    description: "Understanding principles and practices of architectural heritage conservation.",
    image: "/heritage-conservation-restoration-historic-buildin.jpg",
  },
  {
    id: 6,
    title: "Urban Design Fundamentals",
    instructor: "Dr. Layla Al-Hassan",
    duration: "9 weeks",
    students: 178,
    rating: 4.6,
    level: "Intermediate",
    language: "English",
    price: "$69",
    category: "Urban Design",
    description: "Master the principles of urban design and city planning.",
    image: "/urban-design-city-planning-public-spaces.jpg",
  },
]

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("tools")
  const [courseSearch, setCourseSearch] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [savedCourses, setSavedCourses] = useState<Record<number, boolean>>({})
  const [reminders, setReminders] = useState<Record<number, boolean>>({})

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.instructor.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.description.toLowerCase().includes(courseSearch.toLowerCase())
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    const matchesLanguage = selectedLanguage === "all" || course.language === selectedLanguage
    const matchesDuration = selectedDuration === "all" || course.duration === selectedDuration
    const matchesPrice = selectedPrice === "all" || course.price === selectedPrice
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesLevel && matchesLanguage && matchesDuration && matchesPrice && matchesCategory
  })

  const toggleSaved = (id: number) => {
    setSavedCourses((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleReminder = (id: number) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="border-b bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Wrench className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Tools & Software</span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl text-balance">Tools & Software</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              Essential software, analysis tools, and courses for architectural design, environmental analysis, and
              professional development
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="tools">
                <Wrench className="mr-2 h-4 w-4" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="software">
                <Laptop className="mr-2 h-4 w-4" />
                Software
              </TabsTrigger>
              <TabsTrigger value="courses">
                <GraduationCap className="mr-2 h-4 w-4" />
                Courses
              </TabsTrigger>
            </TabsList>

            {/* Tools Tab */}
            <TabsContent value="tools" className="mt-0">
              <div className="space-y-16">
                {analysisTools.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <div key={index}>
                      <div className="mb-8 flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <h2 className="font-serif text-3xl font-bold">{category.title}</h2>
                          <p className="mt-2 text-muted-foreground">{category.description}</p>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {category.tools.map((tool, toolIndex) => (
                          <Card key={toolIndex} className="transition-all hover:shadow-lg">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <CardTitle className="text-xl flex-1">{tool.name}</CardTitle>
                                <FavoriteButton
                                  itemId={`tool-${category.title}-${toolIndex}`}
                                  itemType="tool"
                                  variant="ghost"
                                />
                              </div>
                              <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button variant="outline" className="w-full bg-transparent" asChild>
                                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                  Visit Tool
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Software Tab */}
            <TabsContent value="software" className="mt-0">
              <div className="space-y-12">
                {softwareCategories.map((category, index) => (
                  <div key={index}>
                    <h2 className="font-serif text-3xl font-bold mb-6">{category.name}</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {category.tools.map((tool, toolIndex) => (
                        <Card key={toolIndex} className="transition-all hover:shadow-lg">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <CardTitle className="text-xl flex-1">{tool.name}</CardTitle>
                              <FavoriteButton
                                itemId={`software-${category.name}-${toolIndex}`}
                                itemType="software"
                                variant="ghost"
                              />
                            </div>
                            <CardDescription>{tool.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button variant="outline" className="w-full bg-transparent" asChild>
                              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                Visit Website
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-3xl font-bold mb-2">Featured Courses</h2>
                <p className="text-muted-foreground">Expand your architectural knowledge with expert-led courses</p>
              </div>

              {/* Search and Filters for Courses */}
              <div className="mb-8 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses by title, instructor, or topic..."
                    className="pl-10"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Arabic">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="5 weeks">5 weeks</SelectItem>
                      <SelectItem value="6 weeks">6 weeks</SelectItem>
                      <SelectItem value="7 weeks">7 weeks</SelectItem>
                      <SelectItem value="8 weeks">8 weeks</SelectItem>
                      <SelectItem value="9 weeks">9 weeks</SelectItem>
                      <SelectItem value="10 weeks">10 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="$69">$69</SelectItem>
                      <SelectItem value="$79">$79</SelectItem>
                      <SelectItem value="$89">$89</SelectItem>
                      <SelectItem value="$99">$99</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Sustainability">Sustainability</SelectItem>
                      <SelectItem value="BIM">BIM</SelectItem>
                      <SelectItem value="Parametric Design">Parametric Design</SelectItem>
                      <SelectItem value="Visualization">Visualization</SelectItem>
                      <SelectItem value="Heritage">Heritage</SelectItem>
                      <SelectItem value="Urban Design">Urban Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-secondary/30">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{course.level}</Badge>
                          <Badge variant="secondary">{course.language}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{course.price}</span>
                        </div>
                      </div>
                      {/* Save and Set Reminder buttons */}
                      <div className="flex gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSaved(course.id)}
                          className={`flex-1 ${savedCourses[course.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                        >
                          <Bookmark className={`h-4 w-4 mr-2 ${savedCourses[course.id] ? "fill-current" : ""}`} />
                          {savedCourses[course.id] ? "Saved" : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleReminder(course.id)}
                          className={`flex-1 ${reminders[course.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                        >
                          <Bell className={`h-4 w-4 mr-2 ${reminders[course.id] ? "fill-current" : ""}`} />
                          {reminders[course.id] ? "Reminder Set" : "Set Reminder"}
                        </Button>
                      </div>
                      <Button className="w-full mt-auto" asChild>
                        <Link href={`/courses/${course.id}`}>View Course</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="border-y bg-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold">More Resources Coming Soon</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We're continuously adding new software guides, analysis tools, and educational courses to help you grow as
            an architect.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
