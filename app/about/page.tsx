import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, BookOpen, Trophy, Briefcase, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl text-balance">About ArchNet</h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed text-pretty">
              ArchNet is a global architecture community platform built to connect students, architects, firms, and
              institutions — starting from Jordan — to empower collaboration, education, and innovation in architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a comprehensive platform that bridges the gap between architectural education,
                    professional practice, and global opportunities. We aim to democratize access to architectural
                    knowledge and resources for everyone, everywhere.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the world's leading architectural community platform where students, professionals, and
                    institutions collaborate, learn, and grow together. Starting from Jordan, we're building a global
                    network that celebrates architectural excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="border-y bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl font-bold">What We Offer</h2>
            <p className="mt-4 text-muted-foreground">A comprehensive ecosystem for the architectural community</p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Global Competitions</CardTitle>
                  <CardDescription>
                    Access to international architecture competitions with detailed briefs, deadlines, and prize
                    information
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Digital Library</CardTitle>
                  <CardDescription>
                    Extensive collection of architectural books, magazines, and academic references from around the
                    world
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Project Showcase</CardTitle>
                  <CardDescription>
                    Platform to share and discover architectural projects from students and firms worldwide
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Job Opportunities</CardTitle>
                  <CardDescription>
                    Connect with architectural firms and find internships and job opportunities, starting in Jordan
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>
                    Engage in discussions, ask questions, and collaborate with fellow architects and students
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Analysis Tools</CardTitle>
                  <CardDescription>
                    Access essential tools for sun analysis, wind studies, topography, and building performance
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Jordan */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl font-bold">Why Start from Jordan?</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Jordan represents a unique intersection of ancient architectural heritage and modern innovation. By
              starting here, we're building a platform that understands the needs of emerging architectural communities
              while maintaining a global perspective. Our goal is to amplify Jordan's architectural voice on the world
              stage while providing local professionals and students with access to global resources and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="border-y bg-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">The Future of ArchNet</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            We're continuously expanding our platform with new features including integrated analysis tools, AI-powered
            design assistance, virtual exhibitions, and specialized sections for urban planning, interior design, and
            project management. Join us as we build the future of architectural collaboration.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
