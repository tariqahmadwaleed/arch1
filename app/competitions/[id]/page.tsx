import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, ExternalLink, MapPin, Users, FileText, Award } from "lucide-react"
import Link from "next/link"
import { CompetitionApplyDialog } from "@/components/competition-apply-dialog"
import { CompetitionReminderButton } from "@/components/competition-reminder-button"
import { SocialInteractions } from "@/components/social-interactions"

const competition = {
  id: 1,
  title: "Jordan National Museum Design Competition",
  description:
    "Design a contemporary museum that celebrates Jordan's rich cultural heritage while incorporating sustainable design principles.",
  fullDescription: `The Jordan National Museum Design Competition invites architects and designers to create a world-class cultural institution that will serve as a beacon of Jordan's rich heritage and contemporary vision.

The museum should accommodate permanent and temporary exhibition spaces, educational facilities, conservation laboratories, administrative offices, and public amenities. The design must respect the surrounding urban context while making a bold architectural statement.

Key considerations include sustainable design practices, accessibility for all visitors, integration of modern technology for interactive exhibits, and creating flexible spaces that can adapt to changing exhibition needs.`,
  deadline: "2025-03-15",
  prize: "$50,000",
  status: "ongoing",
  category: "Cultural",
  location: "Amman, Jordan",
  organizer: "Ministry of Culture",
  requirements: "Open to all architects and students",
  image: "/modern-museum-architecture-jordan-cultural-heritag.jpg",
  eligibility: [
    "Open to architects, designers, and students worldwide",
    "Individual entries or teams up to 5 members",
    "Students must provide proof of enrollment",
    "Previous winners of major competitions are not eligible",
  ],
  prizes: [
    { place: "1st Place", amount: "$50,000", description: "Winner + Implementation opportunity" },
    { place: "2nd Place", amount: "$25,000", description: "Runner-up" },
    { place: "3rd Place", amount: "$15,000", description: "Third place" },
    { place: "Honorable Mentions", amount: "$5,000 each", description: "Up to 3 mentions" },
  ],
  timeline: [
    { date: "2024-12-01", event: "Competition Launch" },
    { date: "2025-01-15", event: "Registration Deadline" },
    { date: "2025-02-01", event: "Q&A Session" },
    { date: "2025-03-15", event: "Submission Deadline" },
    { date: "2025-04-30", event: "Winners Announcement" },
  ],
  deliverables: [
    "Site analysis and concept diagrams",
    "Floor plans (all levels) at 1:200 scale",
    "Elevations and sections at 1:200 scale",
    "3D renderings (minimum 5 views)",
    "Sustainability strategy document",
    "Design statement (max 500 words)",
  ],
  relatedCompetitions: [
    {
      id: 2,
      title: "Sustainable Housing Initiative Amman",
      image: "/sustainable-housing-design-green-architecture.jpg",
      category: "Residential",
      deadline: "2025-04-20",
    },
    {
      id: 5,
      title: "Jerash Archaeological Park Pavilion",
      image: "/archaeological-pavilion-design-temporary-structure.jpg",
      category: "Cultural",
      deadline: "2025-02-28",
    },
    {
      id: 3,
      title: "Petra Visitor Center Redesign",
      image: "/petra-visitor-center-architecture-desert-stone.jpg",
      category: "Tourism",
      deadline: "2025-05-10",
    },
  ],
}

export default function CompetitionDetailPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden border-b">
        <img
          src={competition.image || "/placeholder.svg"}
          alt={competition.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Competition Header */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant={competition.status === "ongoing" ? "default" : "secondary"}>
                {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
              </Badge>
              <Badge variant="outline">{competition.category}</Badge>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">{competition.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">{competition.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{new Date(competition.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p className="font-semibold">{competition.prize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{competition.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organizer</p>
                  <p className="font-semibold">{competition.organizer}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {competition.status === "ongoing" && (
                <>
                  <CompetitionApplyDialog
                    competitionId={competition.id.toString()}
                    competitionTitle={competition.title}
                  />
                  <Button size="lg" variant="outline" className="bg-transparent">
                    Download Brief
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}

              {competition.status === "upcoming" && (
                <>
                  <CompetitionReminderButton competitionId={competition.id.toString()} />
                  <Button size="lg" variant="outline" className="bg-transparent">
                    Download Brief
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}

              {competition.status === "past" && (
                <Button size="lg" variant="outline" className="bg-transparent">
                  View Winners
                  <Award className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="mt-4">
              <SocialInteractions
                contentId={competition.id.toString()}
                contentType="competition"
                showRepost={false}
                showReport={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Competition Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About the Competition</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  {competition.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Eligibility Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {competition.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Required Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {competition.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Related Competitions</CardTitle>
                  <CardDescription>Other competitions you might be interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {competition.relatedCompetitions.map((related) => (
                      <Link
                        key={related.id}
                        href={`/competitions/${related.id}`}
                        className="group block overflow-hidden rounded-lg border transition-all hover:shadow-md"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={related.image || "/placeholder.svg"}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {related.category}
                          </Badge>
                          <h4 className="text-sm font-semibold line-clamp-2 mb-1">{related.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            Deadline: {new Date(related.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Prizes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competition.prizes.map((prize, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <p className="font-semibold">{prize.place}</p>
                        <p className="text-lg font-bold text-accent">{prize.amount}</p>
                        <p className="text-sm text-muted-foreground">{prize.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competition.timeline.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-accent" />
                          </div>
                          {index < competition.timeline.length - 1 && <div className="flex-1 w-px bg-border mt-1" />}
                        </div>
                        <div className="pb-4 flex-1">
                          <p className="text-sm font-semibold">{item.event}</p>
                          <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle>Ready to Participate?</CardTitle>
                  <CardDescription className="text-accent-foreground/80">
                    Register now and start working on your submission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="#">
                      Register Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
