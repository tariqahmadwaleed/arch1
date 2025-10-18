"use client"

import { use, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, MapPin, Clock, Users, Bell, Share2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { SocialInteractions } from "@/components/social-interactions"

// Sample events data
const eventsData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Architecture Career Fair 2024",
    date: "2024-02-15",
    time: "10:00 AM - 4:00 PM",
    location: "Amman, Jordan",
    venue: "King Hussein Business Park, Hall A",
    type: "Career",
    description: "Connect with leading architecture firms and explore career opportunities.",
    image: "/architecture-career-fair-job-networking-event.jpg",
    organizer: "Jordan Engineers Association",
    capacity: "500 attendees",
    price: "Free",
    content: `
      <p>Join us for the largest architecture career fair in Jordan, bringing together top architectural firms, engineering offices, and design studios with talented architects, students, and professionals.</p>
      
      <h2>What to Expect</h2>
      <p>The career fair will feature over 40 exhibiting companies, including leading local and international firms. Attendees will have the opportunity to:</p>
      <ul>
        <li>Meet with recruiters and hiring managers</li>
        <li>Submit portfolios and CVs directly to companies</li>
        <li>Attend career development workshops</li>
        <li>Network with industry professionals</li>
        <li>Learn about internship and full-time opportunities</li>
      </ul>
      
      <h2>Featured Companies</h2>
      <p>Confirmed exhibitors include Mada Design Studio, Levant Architecture, Jordan Design Collective, Tech Architecture Group, and many more leading firms from across Jordan and the region.</p>
      
      <h2>Workshops & Talks</h2>
      <p>Throughout the day, industry leaders will present on topics including portfolio development, career advancement strategies, and emerging trends in architectural practice.</p>
      
      <h2>Registration</h2>
      <p>Pre-registration is recommended but not required. Bring multiple copies of your CV and portfolio for distribution to potential employers.</p>
    `,
    schedule: [
      { time: "10:00 AM", activity: "Registration & Networking" },
      { time: "11:00 AM", activity: "Opening Remarks" },
      { time: "11:30 AM", activity: "Career Fair Opens" },
      { time: "1:00 PM", activity: "Portfolio Review Workshop" },
      { time: "2:30 PM", activity: "Panel Discussion: Future of Architecture in Jordan" },
      { time: "4:00 PM", activity: "Event Concludes" },
    ],
    relatedEvents: [2, 4],
  },
  "2": {
    id: 2,
    title: "Sustainable Design Workshop",
    date: "2024-02-20",
    time: "2:00 PM - 6:00 PM",
    location: "Online",
    venue: "Zoom Webinar",
    type: "Workshop",
    description: "Learn passive design strategies for hot climates from international experts.",
    image: "/sustainable-design-workshop-green-architecture.jpg",
    organizer: "Green Building Council Jordan",
    capacity: "200 participants",
    price: "25 JOD",
    content: `
      <p>This intensive workshop focuses on passive design strategies specifically tailored for hot arid climates like Jordan's. Led by international experts in sustainable architecture, participants will learn practical techniques for creating energy-efficient buildings.</p>
      
      <h2>Workshop Topics</h2>
      <ul>
        <li>Passive cooling strategies for hot climates</li>
        <li>Natural ventilation design principles</li>
        <li>Solar shading and orientation optimization</li>
        <li>Thermal mass and insulation strategies</li>
        <li>Water conservation in building design</li>
        <li>Case studies from successful regional projects</li>
      </ul>
      
      <h2>Who Should Attend</h2>
      <p>This workshop is ideal for architects, engineers, students, and anyone interested in sustainable building design. Participants will receive a certificate of completion and access to workshop materials.</p>
      
      <h2>Instructors</h2>
      <p>The workshop will be led by Dr. Sarah Mitchell, an internationally recognized expert in passive design, and Eng. Ahmad Khalil, a local specialist in climate-responsive architecture.</p>
    `,
    schedule: [
      { time: "2:00 PM", activity: "Introduction to Passive Design" },
      { time: "2:45 PM", activity: "Climate Analysis & Site Considerations" },
      { time: "3:30 PM", activity: "Break" },
      { time: "3:45 PM", activity: "Design Strategies & Case Studies" },
      { time: "5:00 PM", activity: "Q&A Session" },
      { time: "5:45 PM", activity: "Closing Remarks" },
    ],
    relatedEvents: [3, 4],
  },
  "3": {
    id: 3,
    title: "Heritage Conservation Symposium",
    date: "2024-03-01",
    time: "9:00 AM - 5:00 PM",
    location: "Jerash, Jordan",
    venue: "Jerash Archaeological Museum",
    type: "Conference",
    description: "Annual gathering of heritage conservation professionals and researchers.",
    image: "/heritage-conservation-symposium-historic-preservat.jpg",
    organizer: "Department of Antiquities",
    capacity: "150 attendees",
    price: "50 JOD (Students: 25 JOD)",
    content: `
      <p>The annual Heritage Conservation Symposium brings together archaeologists, architects, conservators, and heritage professionals to discuss the latest developments in preservation and restoration of Jordan's rich architectural heritage.</p>
      
      <h2>Symposium Themes</h2>
      <ul>
        <li>Traditional building techniques and materials</li>
        <li>Modern conservation technologies</li>
        <li>Sustainable tourism and heritage sites</li>
        <li>Community engagement in heritage preservation</li>
        <li>Documentation and digital archiving</li>
      </ul>
      
      <h2>Keynote Speakers</h2>
      <p>This year's symposium features keynote presentations from leading international experts, including Dr. Maria Gonzalez from UNESCO and Prof. Hala Qudah from Yarmouk University.</p>
      
      <h2>Site Visits</h2>
      <p>The symposium includes guided tours of ongoing conservation projects in Jerash, providing participants with firsthand insight into practical conservation challenges and solutions.</p>
    `,
    schedule: [
      { time: "9:00 AM", activity: "Registration & Coffee" },
      { time: "9:30 AM", activity: "Opening Ceremony" },
      { time: "10:00 AM", activity: "Keynote: UNESCO Heritage Guidelines" },
      { time: "11:30 AM", activity: "Panel: Traditional Building Materials" },
      { time: "1:00 PM", activity: "Lunch Break" },
      { time: "2:00 PM", activity: "Site Visit: Jerash Conservation Projects" },
      { time: "4:00 PM", activity: "Closing Discussion" },
    ],
    relatedEvents: [1, 4],
  },
  "4": {
    id: 4,
    title: "BIM Implementation Masterclass",
    date: "2024-03-10",
    time: "10:00 AM - 3:00 PM",
    location: "Amman, Jordan",
    venue: "German Jordanian University, Building 3",
    type: "Workshop",
    description: "Hands-on training for implementing BIM workflows in architectural practice.",
    image: "/bim-workshop-revit-training-architecture.jpg",
    organizer: "Jordan BIM Society",
    capacity: "30 participants",
    price: "75 JOD",
    content: `
      <p>This intensive masterclass provides hands-on training in Building Information Modeling (BIM) implementation, focusing on practical workflows for architectural practices in Jordan.</p>
      
      <h2>What You'll Learn</h2>
      <ul>
        <li>BIM fundamentals and industry standards</li>
        <li>Revit best practices for architectural design</li>
        <li>Collaboration workflows and file management</li>
        <li>Clash detection and coordination</li>
        <li>Quantity takeoffs and cost estimation</li>
        <li>BIM execution planning</li>
      </ul>
      
      <h2>Prerequisites</h2>
      <p>Participants should have basic familiarity with Revit or similar BIM software. Laptops with Revit installed are required (trial versions acceptable).</p>
      
      <h2>Certification</h2>
      <p>Upon completion, participants will receive a certificate from the Jordan BIM Society, recognized by leading architectural firms in the region.</p>
    `,
    schedule: [
      { time: "10:00 AM", activity: "BIM Fundamentals & Standards" },
      { time: "11:00 AM", activity: "Hands-on: Project Setup" },
      { time: "12:00 PM", activity: "Lunch Break" },
      { time: "1:00 PM", activity: "Collaboration Workflows" },
      { time: "2:00 PM", activity: "Advanced Techniques" },
      { time: "2:45 PM", activity: "Q&A & Certification" },
    ],
    relatedEvents: [1, 2],
  },
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [reminder, setReminder] = useState(false)

  const event = eventsData[id]

  if (!event) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Event not found.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <section className="border-b bg-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/news" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News & Events
            </Link>
          </Button>
        </div>
      </section>

      {/* Event Header */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="default">{event.type}</Badge>
              <Badge variant="secondary">{event.price}</Badge>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">{event.title}</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.venue}</p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">{event.capacity}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2">
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setReminder(!reminder)}
                className={`gap-2 ${reminder ? "bg-accent text-accent-foreground" : "bg-transparent"}`}
              >
                <Bell className={`h-4 w-4 ${reminder ? "fill-current" : ""}`} />
                {reminder ? "Reminder Set" : "Set Reminder"}
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary/30">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              {/* Main Content */}
              <div className="space-y-8">
                {/* About */}
                <div>
                  <h2 className="mb-4 font-serif text-2xl font-bold">About This Event</h2>
                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />
                </div>

                {/* Schedule */}
                {event.schedule && event.schedule.length > 0 && (
                  <div>
                    <h2 className="mb-4 font-serif text-2xl font-bold">Event Schedule</h2>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {event.schedule.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex-shrink-0 w-24">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {item.time}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.activity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Separator />

                {/* Social Interactions */}
                <div className="flex items-center justify-between">
                  <SocialInteractions
                    contentId={`event-${event.id}`}
                    contentType="event"
                    showRepost={true}
                    showReport={false}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Organizer Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Organized By</h3>
                    <p className="text-sm font-medium">{event.organizer}</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Events */}
                {event.relatedEvents && event.relatedEvents.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 font-semibold">Related Events</h3>
                      <div className="space-y-4">
                        {event.relatedEvents.map((relatedId: number) => {
                          const related = eventsData[relatedId.toString()]
                          if (!related) return null
                          return (
                            <Link key={relatedId} href={`/news/events/${relatedId}`} className="group block space-y-2">
                              <div className="relative aspect-video overflow-hidden rounded-md bg-secondary/30">
                                <img
                                  src={related.image || "/placeholder.svg"}
                                  alt={related.title}
                                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                              <h4 className="text-sm font-medium leading-tight group-hover:text-accent transition-colors">
                                {related.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(related.date).toLocaleDateString()}
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Share Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Share this event</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Share on Social Media
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
