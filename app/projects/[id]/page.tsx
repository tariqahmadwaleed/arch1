"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, Share2, MapPin, Calendar, User } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const project = {
  id: 1,
  title: "Amman Cultural Center",
  architect: "Studio Mada",
  architectId: 1,
  type: "Firm",
  category: "Cultural",
  location: "Amman, Jordan",
  year: 2024,
  area: "3,500 sqm",
  description:
    "A contemporary cultural center integrating traditional Jordanian architectural elements with modern design.",
  fullDescription: `The Amman Cultural Center represents a harmonious blend of Jordan's rich architectural heritage and contemporary design principles. Located in the heart of Amman, this project serves as a community hub for cultural events, exhibitions, and educational programs.

The design draws inspiration from traditional Jordanian courtyard houses, reinterpreting them through a modern lens. Natural stone from local quarries creates a strong connection to the region's architectural identity, while large glass openings provide transparency and invite the community inside.

Sustainable features include passive cooling strategies, rainwater harvesting, and photovoltaic panels integrated into the roof design. The building achieves a balance between cultural sensitivity and environmental responsibility.`,
  images: [
    "/placeholder.svg?key=projdet1",
    "/placeholder.svg?key=projdet2",
    "/placeholder.svg?key=projdet3",
    "/placeholder.svg?key=projdet4",
  ],
  likes: 245,
  comments: [
    {
      id: 1,
      author: "Ahmad Hassan",
      avatar: "AH",
      date: "2 days ago",
      text: "Beautiful integration of traditional and modern elements. The use of local stone is particularly impressive.",
      likes: 12,
    },
    {
      id: 2,
      author: "Layla Ibrahim",
      avatar: "LI",
      date: "3 days ago",
      text: "Love the courtyard concept! Would be great to see more details about the passive cooling system.",
      likes: 8,
    },
  ],
  tags: ["Cultural", "Sustainable", "Contemporary", "Stone", "Courtyard"],
  team: [
    { name: "Noor Al-Masri", role: "Lead Architect" },
    { name: "Omar Khalil", role: "Project Architect" },
    { name: "Sara Mansour", role: "Interior Designer" },
  ],
}

export default function ProjectDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

  const handleCommentLike = (commentId: number) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden border-b">
        <img src={project.images[0] || "/placeholder.svg"} alt={project.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Project Header */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant={project.type === "Student" ? "secondary" : "default"}>{project.type}</Badge>
              <Badge variant="outline">{project.category}</Badge>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">{project.title}</h1>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href={`/projects/architect/${project.architectId}`}
                className="flex items-center gap-2 text-lg text-muted-foreground hover:text-accent transition-colors"
              >
                <User className="h-5 w-5" />
                <span>by {project.architect}</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Area: {project.area}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={() => setIsLiked(!isLiked)}
                className="bg-transparent"
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {project.likes + (isLiked ? 1 : 0)} Likes
              </Button>
              <Button variant="outline" className="bg-transparent">
                <MessageSquare className="mr-2 h-4 w-4" />
                {project.comments.length} Comments
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-sm max-w-none">
                <h2 className="font-serif text-2xl font-bold">About the Project</h2>
                {project.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Image Gallery */}
              <div className="mt-8">
                <h2 className="mb-4 font-serif text-2xl font-bold">Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <h2 className="mb-6 font-serif text-2xl font-bold">Comments ({project.comments.length})</h2>

                {/* Add Comment */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <Textarea
                      placeholder="Share your thoughts about this project..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-4"
                    />
                    <Button>Post Comment</Button>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-4">
                  {project.comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarFallback>{comment.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <p className="font-semibold">{comment.author}</p>
                              <p className="text-sm text-muted-foreground">{comment.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{comment.text}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCommentLike(comment.id)}
                              className={likedComments.has(comment.id) ? "text-accent" : ""}
                            >
                              <Heart
                                className={`mr-1.5 h-4 w-4 ${likedComments.has(comment.id) ? "fill-current" : ""}`}
                              />
                              {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">Category</dt>
                      <dd className="font-semibold">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Location</dt>
                      <dd className="font-semibold">{project.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Year</dt>
                      <dd className="font-semibold">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Area</dt>
                      <dd className="font-semibold">{project.area}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Type</dt>
                      <dd className="font-semibold">{project.type}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.team.map((member, index) => (
                      <div key={index}>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle>View More Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href={`/projects/architect/${project.architectId}`}>
                      View {project.architect}'s Portfolio
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
