"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Search, Newspaper, Users, Bell } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SocialInteractions } from "@/components/social-interactions"
import { NewsSubmitDialog } from "@/components/news-submit-dialog"

// Dummy data for news
const news = [
  {
    id: 1,
    title: "Jordan Wins International Architecture Award",
    category: "Awards",
    region: "National",
    date: "2024-01-15",
    source: "Aga Khan Award",
    excerpt:
      "Jordanian architect receives prestigious Aga Khan Award for Architecture for sustainable community center design.",
    image: "/modern-architecture-award-winning-building-design.jpg",
    author: "ArchNet Editorial",
  },
  {
    id: 2,
    title: "New Sustainable Building Code Announced",
    category: "Policy",
    region: "National",
    date: "2024-01-12",
    source: "Ministry of Public Works",
    excerpt:
      "Ministry of Public Works introduces updated building codes focusing on energy efficiency and sustainability.",
    image: "/sustainable-building-code-green-construction.jpg",
    author: "ArchNet Editorial",
  },
  {
    id: 3,
    title: "Amman Design Week 2024 Dates Revealed",
    category: "Events",
    region: "Amman",
    date: "2024-01-10",
    source: "Design Week Organizers",
    excerpt: "Annual design festival to showcase local and international talent in September 2024.",
    image: "/design-week-exhibition-architecture-showcase.jpg",
    author: "ArchNet Editorial",
  },
  {
    id: 4,
    title: "Historic Building Restoration Project Completed",
    category: "Projects",
    region: "Amman",
    date: "2024-01-08",
    source: "Heritage Foundation",
    excerpt: "Five-year restoration of Ottoman-era building in downtown Amman reaches completion.",
    image: "/historic-building-restoration-heritage-architectur.jpg",
    author: "ArchNet Editorial",
  },
  {
    id: 5,
    title: "University of Jordan Opens New Architecture Lab",
    category: "Education",
    region: "Amman",
    date: "2024-01-05",
    source: "University of Jordan",
    excerpt: "State-of-the-art digital fabrication lab provides students with advanced design tools.",
    image: "/architecture-lab-digital-fabrication-university.jpg",
    author: "ArchNet Editorial",
  },
]

// Dummy data for events
const events = [
  {
    id: 1,
    title: "Architecture Career Fair 2024",
    date: "2024-02-15",
    time: "10:00 AM - 4:00 PM",
    location: "Amman, Jordan",
    type: "Career",
    description: "Connect with leading architecture firms and explore career opportunities.",
    image: "/architecture-career-fair-job-networking-event.jpg",
  },
  {
    id: 2,
    title: "Sustainable Design Workshop",
    date: "2024-02-20",
    time: "2:00 PM - 6:00 PM",
    location: "Online",
    type: "Workshop",
    description: "Learn passive design strategies for hot climates from international experts.",
    image: "/sustainable-design-workshop-green-architecture.jpg",
  },
  {
    id: 3,
    title: "Heritage Conservation Symposium",
    date: "2024-03-01",
    time: "9:00 AM - 5:00 PM",
    location: "Jerash, Jordan",
    type: "Conference",
    description: "Annual gathering of heritage conservation professionals and researchers.",
    image: "/heritage-conservation-symposium-historic-preservat.jpg",
  },
  {
    id: 4,
    title: "BIM Implementation Masterclass",
    date: "2024-03-10",
    time: "10:00 AM - 3:00 PM",
    location: "Amman, Jordan",
    type: "Workshop",
    description: "Hands-on training for implementing BIM workflows in architectural practice.",
    image: "/bim-workshop-revit-training-architecture.jpg",
  },
]

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [eventSearchQuery, setEventSearchQuery] = useState("")
  const [selectedEventType, setSelectedEventType] = useState("all")
  const [reminders, setReminders] = useState<Record<number, boolean>>({})

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(eventSearchQuery.toLowerCase())
    const matchesType = selectedEventType === "all" || event.type === selectedEventType
    return matchesSearch && matchesType
  })

  const categories = ["all", ...Array.from(new Set(news.map((n) => n.category)))]
  const eventTypes = ["all", ...Array.from(new Set(events.map((e) => e.type)))]

  const toggleReminder = (id: number) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Newspaper className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">News & Events</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Stay Updated</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Latest architecture news, awards, exhibitions, and events in Jordan
            </p>
            <div className="mt-6">
              <NewsSubmitDialog />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {/* News Tab */}
            <TabsContent value="news">
              {/* Filters */}
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search news..."
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

              {/* News Grid */}
              {filteredNews.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No news found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredNews.map((item) => (
                    <Card key={item.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
                      <Link href={`/news/${item.id}`}>
                        <div className="relative aspect-video overflow-hidden bg-secondary/30">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      </Link>
                      <CardHeader className="flex-grow">
                        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                          <Badge variant="outline">
                            <span className="text-muted-foreground mr-1">Category:</span>
                            {item.category}
                          </Badge>
                          <Badge variant="secondary">
                            <span className="text-muted-foreground mr-1">Region:</span>
                            {item.region}
                          </Badge>
                          <Badge variant="secondary">
                            <span className="text-muted-foreground mr-1">Date:</span>
                            {new Date(item.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-balance">
                          <Link href={`/news/${item.id}`} className="hover:text-accent transition-colors">
                            {item.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{item.excerpt}</CardDescription>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span>by {item.author}</span>
                            <span className="font-medium">{item.source}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <div className="pt-4 border-t">
                          <SocialInteractions
                            contentId={`news-${item.id}`}
                            contentType="news"
                            initialLikes={Math.floor(Math.random() * 100)}
                            initialComments={Math.floor(Math.random() * 20)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="pl-10"
                    value={eventSearchQuery}
                    onChange={(e) => setEventSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-secondary/30">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute right-3 top-3">
                        <Badge variant="secondary">{event.type}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-balance">
                        <Link href={`/news/events/${event.id}`} className="hover:text-accent transition-colors">
                          {event.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                            <span>
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      <div className="flex gap-2">
                        <Button className="flex-1" asChild>
                          <Link href={`/news/events/${event.id}`}>View Details</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleReminder(event.id)}
                          className={`${reminders[event.id] ? "bg-accent text-accent-foreground" : "bg-transparent"}`}
                        >
                          <Bell className={`h-4 w-4 ${reminders[event.id] ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
