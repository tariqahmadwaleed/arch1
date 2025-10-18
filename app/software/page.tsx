"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ExternalLink, Search, Laptop, GraduationCap, PlayCircle } from "lucide-react"
import Link from "next/link"

// Dummy data for software
const software = [
  {
    id: 1,
    name: "Autodesk Revit",
    category: "BIM",
    description: "Building Information Modeling software for architects and engineers.",
    icon: "/placeholder.svg?key=soft1",
    studentLicense: true,
    platform: ["Windows"],
    tutorials: 45,
    downloadLink: "#",
    licenseInfo: "Free for students and educators",
  },
  {
    id: 2,
    name: "AutoCAD",
    category: "CAD",
    description: "Industry-standard 2D and 3D CAD software for design and drafting.",
    icon: "/placeholder.svg?key=soft2",
    studentLicense: true,
    platform: ["Windows", "Mac"],
    tutorials: 67,
    downloadLink: "#",
    licenseInfo: "Free for students and educators",
  },
  {
    id: 3,
    name: "Rhino 3D",
    category: "3D Modeling",
    description: "Advanced 3D modeling software for complex geometries and parametric design.",
    icon: "/placeholder.svg?key=soft3",
    studentLicense: true,
    platform: ["Windows", "Mac"],
    tutorials: 38,
    downloadLink: "#",
    licenseInfo: "Educational discount available",
  },
  {
    id: 4,
    name: "SketchUp",
    category: "3D Modeling",
    description: "Intuitive 3D modeling software for architectural design and visualization.",
    icon: "/placeholder.svg?key=soft4",
    studentLicense: true,
    platform: ["Windows", "Mac", "Web"],
    tutorials: 52,
    downloadLink: "#",
    licenseInfo: "Free version available",
  },
  {
    id: 5,
    name: "Lumion",
    category: "Rendering",
    description: "Real-time 3D architectural visualization and rendering software.",
    icon: "/placeholder.svg?key=soft5",
    studentLicense: true,
    platform: ["Windows"],
    tutorials: 29,
    downloadLink: "#",
    licenseInfo: "Student license available",
  },
  {
    id: 6,
    name: "V-Ray",
    category: "Rendering",
    description: "Professional rendering engine for photorealistic visualizations.",
    icon: "/placeholder.svg?key=soft6",
    studentLicense: true,
    platform: ["Windows", "Mac"],
    tutorials: 41,
    downloadLink: "#",
    licenseInfo: "Educational pricing available",
  },
  {
    id: 7,
    name: "Grasshopper",
    category: "Parametric",
    description: "Visual programming language for parametric design in Rhino.",
    icon: "/placeholder.svg?key=soft7",
    studentLicense: true,
    platform: ["Windows", "Mac"],
    tutorials: 34,
    downloadLink: "#",
    licenseInfo: "Included with Rhino",
  },
  {
    id: 8,
    name: "Enscape",
    category: "Rendering",
    description: "Real-time rendering and virtual reality plugin for design software.",
    icon: "/placeholder.svg?key=soft8",
    studentLicense: true,
    platform: ["Windows"],
    tutorials: 23,
    downloadLink: "#",
    licenseInfo: "Free trial available",
  },
  {
    id: 9,
    name: "Adobe Creative Suite",
    category: "Graphics",
    description: "Complete suite of design tools including Photoshop, Illustrator, and InDesign.",
    icon: "/placeholder.svg?key=soft9",
    studentLicense: true,
    platform: ["Windows", "Mac"],
    tutorials: 89,
    downloadLink: "#",
    licenseInfo: "Student discount available",
  },
]

const tutorials = [
  {
    id: 1,
    title: "Revit for Beginners: Complete Course",
    software: "Revit",
    duration: "8 hours",
    level: "Beginner",
    views: "12.5K",
    thumbnail: "/placeholder.svg?key=tut1",
  },
  {
    id: 2,
    title: "Advanced Rhino & Grasshopper Techniques",
    software: "Rhino",
    duration: "6 hours",
    level: "Advanced",
    views: "8.2K",
    thumbnail: "/placeholder.svg?key=tut2",
  },
  {
    id: 3,
    title: "Architectural Visualization with Lumion",
    software: "Lumion",
    duration: "4 hours",
    level: "Intermediate",
    views: "15.3K",
    thumbnail: "/placeholder.svg?key=tut3",
  },
  {
    id: 4,
    title: "AutoCAD 2D Drafting Essentials",
    software: "AutoCAD",
    duration: "5 hours",
    level: "Beginner",
    views: "20.1K",
    thumbnail: "/placeholder.svg?key=tut4",
  },
]

export default function SoftwarePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredSoftware = software.filter((soft) => {
    const matchesSearch =
      soft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soft.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || soft.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(software.map((s) => s.category)))]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Laptop className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Software & Tools</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Essential Architecture Software</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Download architectural programs, access student licenses, and explore learning resources
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="software" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="software">Software</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>

            {/* Software Tab */}
            <TabsContent value="software">
              {/* Filters */}
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search software..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory !== category ? "bg-transparent" : ""}
                    >
                      {category === "all" ? "All" : category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Software Grid */}
              {filteredSoftware.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No software found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSoftware.map((soft) => (
                    <Card key={soft.id} className="transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
                          <Laptop className="h-8 w-8 text-accent" />
                        </div>
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="outline">{soft.category}</Badge>
                          {soft.studentLicense && (
                            <Badge variant="secondary" className="gap-1">
                              <GraduationCap className="h-3 w-3" />
                              Student
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl">{soft.name}</CardTitle>
                        <CardDescription>{soft.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Platform: </span>
                            <span className="font-semibold">{soft.platform.join(", ")}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tutorials: </span>
                            <span className="font-semibold">{soft.tutorials} available</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">License: </span>
                            <span className="font-semibold text-accent">{soft.licenseInfo}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" asChild>
                            <Link href={soft.downloadLink}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Link>
                          </Button>
                          <Button className="flex-1 bg-transparent" variant="outline" asChild>
                            <Link href={`/software/${soft.id}`}>
                              Learn More
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      <img
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <PlayCircle className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary">{tutorial.duration}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">
                        {tutorial.software}
                      </Badge>
                      <CardTitle className="line-clamp-2 text-lg text-balance">{tutorial.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center justify-between text-sm">
                          <span>{tutorial.level}</span>
                          <span>{tutorial.views} views</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline" asChild>
                        <Link href="#">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Watch Tutorial
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Student License Info */}
      <section className="border-t bg-accent py-12 text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="mx-auto mb-4 h-12 w-12" />
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Student Licenses</h2>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            Most architectural software offers free or discounted licenses for students. Check each software's
            requirements and apply with your university email.
          </p>
          <Button className="mt-6" size="lg" variant="secondary">
            Learn More About Student Licenses
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
