"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Briefcase,
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  Edit,
  Settings,
  Users,
  BookOpen,
  Trophy,
  Star,
  Bookmark,
  Building2,
  FileText,
  Folder,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { ConnectionsDialog } from "@/components/connections-dialog"
import { UserSearchDialog } from "@/components/user-search-dialog"
import { SuggestedPeople } from "@/components/suggested-people"

// Dummy user data
const user = {
  name: "Sarah Al-Mansour",
  title: "Architecture Student",
  location: "Amman, Jordan",
  bio: "Passionate about sustainable architecture and urban design. Currently studying at Jordan University of Science and Technology.",
  joinedDate: "January 2024",
  avatar: "/professional-woman-architect.png",
  followers: 234,
  following: 189,
  posts: 42,
}

const userPosts = [
  {
    id: 1,
    type: "project",
    title: "Sustainable Housing Concept",
    description: "Exploring passive cooling strategies for residential architecture in Jordan's climate.",
    image: "/sustainable-housing-design.jpg",
    likes: 45,
    comments: 12,
    date: "2 days ago",
  },
  {
    id: 2,
    type: "text",
    content:
      "Just finished reading 'Architecture and Climate' by Jeffrey Cook. Highly recommend for anyone interested in sustainable design in arid regions!",
    likes: 28,
    comments: 8,
    date: "5 days ago",
  },
  {
    id: 3,
    type: "project",
    title: "Community Center Design",
    description: "Final year project focusing on creating inclusive public spaces.",
    image: "/modern-museum-architecture.jpg",
    likes: 67,
    comments: 19,
    date: "1 week ago",
  },
]

const savedItems = [
  {
    id: 1,
    type: "competition",
    title: "Jordan National Museum Design Competition",
    category: "Cultural",
    deadline: "March 15, 2025",
    image: "/modern-museum-architecture.jpg",
  },
  {
    id: 2,
    type: "job",
    title: "Architecture Intern at Mada Design Studio",
    company: "Mada Design Studio",
    location: "Amman, Jordan",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    type: "book",
    title: "Islamic Architecture: Form, Function, and Meaning",
    author: "Robert Hillenbrand",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    type: "project",
    title: "Modern Villa in Amman",
    architect: "Ahmad Al-Hassan",
    category: "Residential",
    image: "/modern-villa-amman.jpg",
  },
  {
    id: 5,
    type: "research",
    title: "Sustainable Urban Development in Amman",
    authors: "Dr. Layla Al-Hassan, Prof. Ahmad Mansour",
    university: "University of Jordan",
    image: "/urban-green-infrastructure.jpg",
  },
]

const favoriteItems = [
  {
    id: 1,
    type: "project",
    title: "Cultural Center Concept",
    architect: "Layla Mansour",
    category: "Cultural",
    image: "/cultural-center-jerash.jpg",
  },
  {
    id: 2,
    type: "book",
    title: "Architectural Theory: An Anthology",
    author: "Various Authors",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    type: "research",
    title: "Parametric Design in Desert Architecture",
    authors: "Dr. Omar Rashid, Eng. Noor Al-Tamimi",
    university: "Jordan University of Science and Technology",
    image: "/parametric-facade-design.jpg",
  },
  {
    id: 4,
    type: "plant",
    title: "Aleppo Pine",
    scientificName: "Pinus halepensis",
    category: "Native Trees",
    image: "/aleppo-pine.jpg",
  },
]

const portfolioProjects = [
  {
    id: 1,
    title: "Sustainable Housing Complex",
    category: "Residential",
    year: "2024",
    description: "Mixed-use residential development with passive cooling strategies",
    image: "/sustainable-housing-design.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Community Center Design",
    category: "Public",
    year: "2024",
    description: "Inclusive public space promoting community engagement",
    image: "/modern-museum-architecture.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Urban Park Concept",
    category: "Landscape",
    year: "2023",
    description: "Green infrastructure integration in urban context",
    image: "/urban-green-infrastructure.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Heritage Restoration Study",
    category: "Conservation",
    year: "2023",
    description: "Adaptive reuse proposal for historic building",
    image: "/historic-building-restoration-heritage-architectur.jpg",
    featured: false,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [savedTab, setSavedTab] = useState("saved")

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Profile Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="font-serif text-3xl font-bold">{user.name}</h1>
                    <p className="mt-1 flex items-center gap-2 text-lg text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {user.title}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Joined {user.joinedDate}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed">{user.bio}</p>

                <div className="mt-4 flex items-center gap-6">
                  <button className="text-sm hover:text-accent transition-colors">
                    <span className="font-semibold">{user.posts}</span> Posts
                  </button>
                  <ConnectionsDialog
                    userId="current-user"
                    userName={user.name}
                    followers={user.followers}
                    following={user.following}
                    defaultTab="followers"
                  />
                  <ConnectionsDialog
                    userId="current-user"
                    userName={user.name}
                    followers={user.followers}
                    following={user.following}
                    defaultTab="following"
                  />
                </div>

                <div className="mt-4">
                  <UserSearchDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="saved">Library</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-serif text-2xl font-bold">Your Posts</h2>
                    <Button>
                      <Edit className="mr-2 h-4 w-4" />
                      Create Post
                    </Button>
                  </div>

                  {userPosts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{post.date}</p>
                              </div>
                              <Badge variant="secondary">{post.type}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {post.type === "project" && (
                          <>
                            <h3 className="font-serif text-xl font-bold mb-2">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{post.description}</p>
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full rounded-lg object-cover aspect-video mb-4"
                            />
                          </>
                        )}
                        {post.type === "text" && <p className="text-sm leading-relaxed">{post.content}</p>}

                        <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Portfolio tab */}
                <TabsContent value="portfolio" className="mt-6 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Portfolio</h2>
                    <p className="text-sm text-muted-foreground mt-1">Showcase your best architectural work</p>
                  </div>

                  {/* Featured Projects */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      Featured Projects
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {portfolioProjects
                        .filter((p) => p.featured)
                        .map((project) => (
                          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all group">
                            <div className="relative aspect-video overflow-hidden bg-secondary/30">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute top-3 right-3">
                                <Badge variant="secondary">{project.category}</Badge>
                              </div>
                            </div>
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <CardTitle className="text-lg">{project.title}</CardTitle>
                                  <p className="text-xs text-muted-foreground mt-1">{project.year}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                              <CardDescription className="mt-2">{project.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* All Projects */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      All Projects
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {portfolioProjects.map((project) => (
                        <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all">
                          <div className="flex gap-4 p-4">
                            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/30">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-sm line-clamp-1">{project.title}</h4>
                                {project.featured && (
                                  <Star className="h-4 w-4 text-accent fill-current flex-shrink-0" />
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs mb-2">
                                {project.category}
                              </Badge>
                              <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{project.year}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="saved" className="mt-6">
                  <Tabs value={savedTab} onValueChange={setSavedTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="saved">
                        <Bookmark className="mr-2 h-4 w-4" />
                        Saved ({savedItems.length})
                      </TabsTrigger>
                      <TabsTrigger value="favorites">
                        <Star className="mr-2 h-4 w-4" />
                        Favorites ({favoriteItems.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="saved" className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="font-serif text-2xl font-bold">Saved Items</h2>
                        <p className="text-sm text-muted-foreground">{savedItems.length} items</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {savedItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                            <div className="aspect-video overflow-hidden bg-secondary/30">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <Badge variant="secondary" className="mb-2">
                                  {item.type}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Bookmark className="h-4 w-4 fill-current" />
                                </Button>
                              </div>
                              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                              <CardDescription className="mt-2">
                                {item.type === "competition" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <Trophy className="h-3 w-3" />
                                    {item.category} • Deadline: {item.deadline}
                                  </span>
                                )}
                                {item.type === "job" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <Briefcase className="h-3 w-3" />
                                    {item.company} • {item.location}
                                  </span>
                                )}
                                {item.type === "book" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <BookOpen className="h-3 w-3" />
                                    by {item.author}
                                  </span>
                                )}
                                {item.type === "project" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <Building2 className="h-3 w-3" />
                                    by {item.architect} • {item.category}
                                  </span>
                                )}
                                {item.type === "research" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <FileText className="h-3 w-3" />
                                    {item.authors} • {item.university}
                                  </span>
                                )}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                <Link href={`/${item.type}s/${item.id}`}>View Details</Link>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="favorites" className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="font-serif text-2xl font-bold">Favorite Items</h2>
                        <p className="text-sm text-muted-foreground">{favoriteItems.length} items</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {favoriteItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                            <div className="aspect-video overflow-hidden bg-secondary/30">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <Badge variant="secondary" className="mb-2">
                                  {item.type}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                </Button>
                              </div>
                              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                              <CardDescription className="mt-2">
                                {item.type === "project" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <Building2 className="h-3 w-3" />
                                    by {item.architect} • {item.category}
                                  </span>
                                )}
                                {item.type === "book" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <BookOpen className="h-3 w-3" />
                                    by {item.author}
                                  </span>
                                )}
                                {item.type === "research" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <FileText className="h-3 w-3" />
                                    {item.authors} • {item.university}
                                  </span>
                                )}
                                {item.type === "plant" && (
                                  <span className="flex items-center gap-1 text-xs">
                                    <span className="italic">{item.scientificName}</span> • {item.category}
                                  </span>
                                )}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                                <Link
                                  href={`/${item.type === "plant" ? "context/plants" : `${item.type}s`}/${item.id}`}
                                >
                                  View Details
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-accent/10 p-2">
                            <Users className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-semibold">Ahmad Khalil</span> started following you
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-accent/10 p-2">
                            <Heart className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-semibold">Layla Hassan</span> liked your project "Sustainable
                              Housing Concept"
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-accent/10 p-2">
                            <MessageSquare className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-semibold">Omar Zaid</span> commented on your post
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar with Suggested People */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                <SuggestedPeople limit={5} />

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Profile Views</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Post Impressions</span>
                      <span className="font-semibold">5,678</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Engagement Rate</span>
                      <span className="font-semibold">12.5%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent text-accent-foreground">
                  <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm opacity-90 mb-4">Add more projects to your portfolio to showcase your work</p>
                    <Button variant="secondary" className="w-full">
                      Add Projects
                    </Button>
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
