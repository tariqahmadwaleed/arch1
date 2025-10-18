import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, GraduationCap, Monitor, PlayCircle } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const softwareDetail = {
  id: 1,
  name: "Autodesk Revit",
  category: "BIM",
  description: "Building Information Modeling software for architects and engineers.",
  fullDescription: `Autodesk Revit is the industry-leading Building Information Modeling (BIM) software that enables architects, engineers, and construction professionals to design, build, and maintain higher-quality, more energy-efficient buildings.

Revit supports a multidisciplinary design process, allowing teams to collaborate on a single model throughout the project lifecycle. From conceptual design through construction and operations, Revit provides tools for every phase of the building process.

Key features include parametric components, intelligent objects, automated documentation, and powerful visualization tools. Revit's BIM approach helps reduce errors, improve coordination, and streamline the design-to-construction workflow.`,
  icon: "/placeholder.svg?key=softdet1",
  studentLicense: true,
  platform: ["Windows"],
  tutorials: 45,
  downloadLink: "#",
  licenseInfo: "Free for students and educators",
  systemRequirements: {
    os: "Windows 10 64-bit or later",
    processor: "Intel Core i7 or equivalent",
    ram: "16 GB minimum, 32 GB recommended",
    graphics: "DirectX 11 capable graphics card with Shader Model 5",
    storage: "30 GB free disk space",
  },
  features: [
    "Parametric modeling and intelligent components",
    "Collaborative design with worksharing",
    "Automated documentation and schedules",
    "Energy analysis and sustainability tools",
    "Rendering and visualization",
    "Construction documentation",
    "Interoperability with other Autodesk products",
  ],
  tutorials: [
    {
      id: 1,
      title: "Revit for Beginners: Complete Course",
      duration: "8 hours",
      level: "Beginner",
      thumbnail: "/placeholder.svg?key=revittut1",
    },
    {
      id: 2,
      title: "Advanced Revit Families",
      duration: "4 hours",
      level: "Advanced",
      thumbnail: "/placeholder.svg?key=revittut2",
    },
    {
      id: 3,
      title: "BIM Coordination with Revit",
      duration: "3 hours",
      level: "Intermediate",
      thumbnail: "/placeholder.svg?key=revittut3",
    },
  ],
  relatedSoftware: [
    { id: 2, name: "AutoCAD", category: "CAD" },
    { id: 7, name: "Grasshopper", category: "Parametric" },
    { id: 8, name: "Enscape", category: "Rendering" },
  ],
}

export default function SoftwareDetailPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Software Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg bg-accent/10">
              <Monitor className="h-10 w-10 text-accent" />
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{softwareDetail.category}</Badge>
              {softwareDetail.studentLicense && (
                <Badge variant="secondary" className="gap-1">
                  <GraduationCap className="h-3 w-3" />
                  Student License Available
                </Badge>
              )}
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">{softwareDetail.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{softwareDetail.description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href={softwareDetail.downloadLink}>
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="#">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Official Website
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Software Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About {softwareDetail.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  {softwareDetail.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {softwareDetail.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>System Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">Operating System</dt>
                      <dd className="font-semibold">{softwareDetail.systemRequirements.os}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Processor</dt>
                      <dd className="font-semibold">{softwareDetail.systemRequirements.processor}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">RAM</dt>
                      <dd className="font-semibold">{softwareDetail.systemRequirements.ram}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Graphics</dt>
                      <dd className="font-semibold">{softwareDetail.systemRequirements.graphics}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Storage</dt>
                      <dd className="font-semibold">{softwareDetail.systemRequirements.storage}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Tutorials */}
              <div className="mt-8">
                <h2 className="mb-4 font-serif text-2xl font-bold">Learning Resources</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {softwareDetail.tutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                        <img
                          src={tutorial.thumbnail || "/placeholder.svg"}
                          alt={tutorial.title}
                          className="h-full w-full object-cover"
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
                          {tutorial.level}
                        </Badge>
                        <CardTitle className="line-clamp-2 text-base">{tutorial.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Software Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">Category</dt>
                      <dd className="font-semibold">{softwareDetail.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Platform</dt>
                      <dd className="font-semibold">{softwareDetail.platform.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Tutorials Available</dt>
                      <dd className="font-semibold">{softwareDetail.tutorials.length}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">License</dt>
                      <dd className="font-semibold text-accent">{softwareDetail.licenseInfo}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Student License
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm opacity-90">
                    {softwareDetail.name} offers free licenses for students and educators. Apply with your university
                    email.
                  </p>
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="#">
                      Get Student License
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Software</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {softwareDetail.relatedSoftware.map((related) => (
                      <Link
                        key={related.id}
                        href={`/software/${related.id}`}
                        className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/10"
                      >
                        <div>
                          <p className="font-semibold">{related.name}</p>
                          <p className="text-sm text-muted-foreground">{related.category}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
