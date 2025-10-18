"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, DollarSign, ExternalLink, MapPin, Search, Trophy, Award, Bookmark } from "lucide-react"
import Link from "next/link"
import { CompetitionApplyDialog } from "@/components/competition-apply-dialog"
import { CompetitionReminderButton } from "@/components/competition-reminder-button"
import { SocialInteractions } from "@/components/social-interactions"

const competitions = [
  {
    id: 1,
    title: "Jordan National Museum Design Competition",
    description:
      "Design a contemporary museum that celebrates Jordan's rich cultural heritage while incorporating sustainable design principles.",
    deadline: "2025-03-15",
    prize: "$50,000",
    status: "ongoing",
    category: "Cultural",
    location: "Amman, Jordan",
    organizer: "Ministry of Culture",
    requirements: "Open to all architects and students",
    image: "/modern-museum-architecture-jordan-cultural-heritag.jpg",
  },
  {
    id: 2,
    title: "Sustainable Housing Initiative Amman",
    description:
      "Create innovative, affordable, and sustainable housing solutions for growing urban communities in Amman.",
    deadline: "2025-04-20",
    prize: "$30,000",
    status: "ongoing",
    category: "Residential",
    location: "Amman, Jordan",
    organizer: "Jordan Green Building Council",
    requirements: "Teams of 2-4 members",
    image: "/sustainable-housing-design-green-architecture.jpg",
  },
  {
    id: 3,
    title: "Petra Visitor Center Redesign",
    description:
      "Reimagine the visitor experience at Petra with a modern, contextually sensitive visitor center design.",
    deadline: "2025-05-10",
    prize: "$40,000",
    status: "upcoming",
    category: "Tourism",
    location: "Petra, Jordan",
    organizer: "Petra Development & Tourism Authority",
    requirements: "Licensed architects only",
    image: "/petra-visitor-center-architecture-desert-stone.jpg",
  },
  {
    id: 4,
    title: "Aqaba Waterfront Development",
    description:
      "Design a mixed-use waterfront development that enhances public space and promotes sustainable tourism.",
    deadline: "2025-06-01",
    prize: "$60,000",
    status: "upcoming",
    category: "Urban Planning",
    location: "Aqaba, Jordan",
    organizer: "Aqaba Special Economic Zone Authority",
    requirements: "International competition",
    image: "/waterfront-development-architecture-coastal-promen.jpg",
  },
  {
    id: 5,
    title: "Jerash Archaeological Park Pavilion",
    description: "Design a temporary pavilion for cultural events within the historic Jerash archaeological site.",
    deadline: "2025-02-28",
    prize: "$25,000",
    status: "ongoing",
    category: "Cultural",
    location: "Jerash, Jordan",
    organizer: "Department of Antiquities",
    requirements: "Students and young professionals",
    image: "/archaeological-pavilion-design-temporary-structure.jpg",
  },
  {
    id: 6,
    title: "Zarqa Innovation Hub",
    description: "Create a collaborative workspace and innovation center for tech startups and entrepreneurs in Zarqa.",
    deadline: "2024-12-15",
    prize: "$35,000",
    status: "past",
    category: "Commercial",
    location: "Zarqa, Jordan",
    organizer: "Jordan Enterprise Development Corporation",
    requirements: "Open to all",
    image: "/innovation-hub-architecture-modern-workspace.jpg",
    winner: {
      name: "Studio Mada",
      position: "1st Place",
      project: "Collaborative Innovation Space",
    },
  },
]

export default function CompetitionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("ongoing")
  const [savedCompetitions, setSavedCompetitions] = useState<Record<number, boolean>>({})

  const filteredCompetitions = competitions.filter((comp) => {
    const matchesSearch =
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || comp.category === selectedCategory
    const matchesStatus = activeTab === "all" || comp.status === activeTab
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = ["all", ...Array.from(new Set(competitions.map((c) => c.category)))]

  const toggleSaved = (id: number) => {
    setSavedCompetitions((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Trophy className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Architecture Competitions</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Discover Your Next Challenge</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Explore local and international architecture competitions with deadlines, requirements, and rewards
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search competitions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
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
            </div>
          </div>
        </div>
      </section>

      {/* Competitions List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredCompetitions.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No competitions found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCompetitions.map((competition) => (
                    <Card
                      key={competition.id}
                      className="group flex flex-col overflow-hidden transition-all hover:shadow-lg"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={competition.image || "/placeholder.svg"}
                          alt={competition.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3">
                          <Badge
                            variant={
                              competition.status === "ongoing"
                                ? "default"
                                : competition.status === "upcoming"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                          </Badge>
                        </div>
                        {competition.status === "past" && competition.winner && (
                          <div className="absolute left-3 top-3">
                            <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                              <Award className="mr-1 h-3 w-3" />
                              {competition.winner.position}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="flex-grow">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="outline">{competition.category}</Badge>
                        </div>
                        <CardTitle className="text-xl text-balance">{competition.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{competition.description}</CardDescription>
                        {competition.status === "past" && competition.winner && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                <Award className="mr-1 h-3 w-3" />
                                Winner
                              </Badge>
                              <p className="text-sm font-semibold text-accent">{competition.winner.name}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{competition.winner.project}</p>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span>Deadline: {new Date(competition.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <DollarSign className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="font-semibold text-accent">{competition.prize}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span>{competition.location}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {competition.status === "ongoing" && (
                            <>
                              <CompetitionApplyDialog
                                competitionId={competition.id.toString()}
                                competitionTitle={competition.title}
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  variant="outline"
                                  size="default"
                                  onClick={() => toggleSaved(competition.id)}
                                  className={`${savedCompetitions[competition.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                                >
                                  <Bookmark
                                    className={`h-4 w-4 mr-2 ${savedCompetitions[competition.id] ? "fill-current" : ""}`}
                                  />
                                  {savedCompetitions[competition.id] ? "Saved" : "Save"}
                                </Button>
                                <Button variant="outline" size="default" asChild className="bg-transparent">
                                  <Link href={`/competitions/${competition.id}`}>
                                    Details
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </>
                          )}

                          {competition.status === "upcoming" && (
                            <>
                              <CompetitionReminderButton competitionId={competition.id.toString()} />
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  variant="outline"
                                  size="default"
                                  onClick={() => toggleSaved(competition.id)}
                                  className={`${savedCompetitions[competition.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                                >
                                  <Bookmark
                                    className={`h-4 w-4 mr-2 ${savedCompetitions[competition.id] ? "fill-current" : ""}`}
                                  />
                                  {savedCompetitions[competition.id] ? "Saved" : "Save"}
                                </Button>
                                <Button variant="outline" size="default" asChild className="bg-transparent">
                                  <Link href={`/competitions/${competition.id}`}>
                                    Details
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </>
                          )}

                          {competition.status === "past" && (
                            <>
                              <Button variant="outline" size="default" asChild className="w-full bg-transparent">
                                <Link href={`/competitions/${competition.id}`}>
                                  View Details & Winner
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="default"
                                onClick={() => toggleSaved(competition.id)}
                                className={`w-full ${savedCompetitions[competition.id] ? "bg-accent/10 text-accent" : "bg-transparent"}`}
                              >
                                <Bookmark
                                  className={`h-4 w-4 mr-2 ${savedCompetitions[competition.id] ? "fill-current" : ""}`}
                                />
                                {savedCompetitions[competition.id] ? "Saved" : "Save"}
                              </Button>
                            </>
                          )}

                          <div className="pt-2 border-t">
                            <SocialInteractions
                              contentId={competition.id.toString()}
                              contentType="competition"
                              showRepost={false}
                              showReport={false}
                              className="justify-end"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
