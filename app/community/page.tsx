"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Send, Search, GraduationCap, Radio, MessageSquare, UserPlus } from "lucide-react"
import { SocialInteractions } from "@/components/social-interactions"
import { UserSearchDialog } from "@/components/user-search-dialog"
import { SuggestedPeople } from "@/components/suggested-people"
import Link from "next/link"

// Dummy data for discussions
const discussions = [
  {
    id: 1,
    title: "Best practices for sustainable design in Jordan?",
    author: "Ahmad Hassan",
    authorUsername: "ahmad-hassan",
    avatar: "AH",
    category: "Sustainability",
    replies: 12,
    likes: 24,
    timeAgo: "2 hours ago",
    excerpt: "Looking for advice on implementing passive cooling strategies in residential projects...",
  },
  {
    id: 2,
    title: "Recommendations for BIM software for small firms?",
    author: "Sara Mansour",
    authorUsername: "sara-mansour",
    avatar: "SM",
    category: "Technology",
    replies: 8,
    likes: 15,
    timeAgo: "5 hours ago",
    excerpt: "Our firm is transitioning to BIM. What software would you recommend for a team of 5?",
  },
  {
    id: 3,
    title: "Heritage conservation resources in Jordan",
    author: "Khalid Mahmoud",
    authorUsername: "khalid-mahmoud",
    avatar: "KM",
    category: "Conservation",
    replies: 6,
    likes: 18,
    timeAgo: "1 day ago",
    excerpt: "Compiling a list of resources for heritage conservation projects. Please share your favorites!",
  },
  {
    id: 4,
    title: "Portfolio review - Recent graduate seeking feedback",
    author: "Layla Ibrahim",
    authorUsername: "layla-ibrahim",
    avatar: "LI",
    category: "Career",
    replies: 15,
    likes: 32,
    timeAgo: "1 day ago",
    excerpt: "Just graduated and preparing my portfolio for job applications. Would appreciate constructive feedback!",
  },
  {
    id: 5,
    title: "Collaboration opportunity: Urban planning research",
    author: "Omar Khalil",
    authorUsername: "omar-khalil",
    avatar: "OK",
    category: "Collaboration",
    replies: 4,
    likes: 9,
    timeAgo: "2 days ago",
    excerpt: "Looking for collaborators on research project about urban density in Amman...",
  },
]

// Dummy data for members
const featuredMembers = [
  {
    id: 1,
    username: "noor-almasri",
    name: "Dr. Noor Al-Masri",
    title: "Professor of Architecture",
    avatar: "NA",
    contributions: 156,
    specialty: "Sustainable Design",
  },
  {
    id: 2,
    username: "studio-mada",
    name: "Studio Mada",
    title: "Architecture Firm",
    avatar: "SM",
    contributions: 89,
    specialty: "Cultural Projects",
  },
  {
    id: 3,
    username: "ahmad-hassan",
    name: "Ahmad Hassan",
    title: "Senior Architect",
    avatar: "AH",
    contributions: 124,
    specialty: "BIM & Technology",
  },
  {
    id: 4,
    username: "sara-alkhatib",
    name: "Sara Al-Khatib",
    title: "Architecture Student",
    avatar: "SK",
    contributions: 67,
    specialty: "Residential Design",
  },
]

// Dummy data for universities
const universities = [
  {
    id: 1,
    name: "University of Jordan",
    shortName: "UJ",
    members: 450,
    posts: 1200,
    description: "Faculty of Engineering and Technology - Architecture Department",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "German Jordanian University",
    shortName: "GJU",
    members: 320,
    posts: 890,
    description: "School of Architecture and Built Environment",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Jordan University of Science and Technology",
    shortName: "JUST",
    members: 280,
    posts: 750,
    description: "Department of Architecture",
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Applied Science Private University",
    shortName: "ASU",
    members: 210,
    posts: 620,
    description: "Faculty of Art and Design - Architecture",
    color: "bg-orange-500",
  },
]

// Dummy data for live lectures
const liveLectures = [
  {
    id: 1,
    title: "Sustainable Urban Design Principles",
    university: "University of Jordan",
    speaker: "Dr. Ahmad Hassan",
    viewers: 145,
    startedAt: "20 minutes ago",
    isLive: true,
  },
  {
    id: 2,
    title: "BIM in Modern Architecture Practice",
    university: "German Jordanian University",
    speaker: "Prof. Sarah Al-Masri",
    scheduledFor: "Tomorrow at 2:00 PM",
    isLive: false,
  },
]

// Dummy data for university posts
const universityPosts = [
  {
    id: 1,
    university: "University of Jordan",
    universityShort: "UJ",
    author: "Layla Ibrahim",
    authorUsername: "layla-ibrahim",
    avatar: "LI",
    content: "Just finished our final year thesis presentation! Topic: Adaptive Reuse of Industrial Heritage in Amman",
    likes: 45,
    comments: 12,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    university: "German Jordanian University",
    universityShort: "GJU",
    author: "Omar Khalil",
    authorUsername: "omar-khalil",
    avatar: "OK",
    content: "Our studio is organizing a workshop on parametric design next week. All students welcome!",
    likes: 32,
    comments: 8,
    timeAgo: "5 hours ago",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(discussions.map((d) => d.category)))]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Users className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Community</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Connect & Collaborate</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join discussions, ask questions, and connect with architects and students across Jordan
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button size="lg">Start a Discussion</Button>
              <UserSearchDialog />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">1,200+</p>
              <p className="text-sm text-muted-foreground">Members</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">450+</p>
              <p className="text-sm text-muted-foreground">Discussions</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">3,500+</p>
              <p className="text-sm text-muted-foreground">Replies</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            {/* Main Discussions */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="discussions" className="w-full">
                <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 md:grid-cols-3">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="universities">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Universities
                  </TabsTrigger>
                  <TabsTrigger value="ask">Ask Question</TabsTrigger>
                </TabsList>

                {/* Discussions Tab */}
                <TabsContent value="discussions">
                  {/* Filters */}
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search discussions..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory !== category ? "bg-transparent" : ""}
                      >
                        {category === "all" ? "All Topics" : category}
                      </Button>
                    ))}
                  </div>

                  {/* Discussions List */}
                  <div className="space-y-4">
                    {filteredDiscussions.map((discussion) => (
                      <Card
                        key={discussion.id}
                        className="transition-all duration-200 hover:shadow-lg hover:border-accent/50"
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <Link href={`/profile/${discussion.authorUsername}`}>
                              <Avatar className="cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                                <AvatarFallback>{discussion.avatar}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div className="flex-1 min-w-0">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <Badge variant="outline">{discussion.category}</Badge>
                                <span className="text-xs text-muted-foreground">{discussion.timeAgo}</span>
                              </div>
                              <CardTitle className="text-xl text-balance">
                                <button className="text-left hover:text-accent transition-colors">
                                  {discussion.title}
                                </button>
                              </CardTitle>
                              <CardDescription className="mt-2">
                                <Link
                                  href={`/profile/${discussion.authorUsername}`}
                                  className="font-semibold hover:text-accent transition-colors"
                                >
                                  {discussion.author}
                                </Link>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{discussion.excerpt}</p>
                          <SocialInteractions
                            postId={discussion.id.toString()}
                            initialLikes={discussion.likes}
                            initialComments={discussion.replies}
                            onComment={() => {}}
                            className="pt-4 border-t"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Universities Zone Tab */}
                <TabsContent value="universities">
                  {/* Live Lectures Section */}
                  <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-bold">Live Lectures & Events</h3>
                    </div>
                    <div className="space-y-4">
                      {liveLectures.map((lecture) => (
                        <Card
                          key={lecture.id}
                          className={`transition-all duration-200 hover:shadow-lg ${
                            lecture.isLive ? "border-red-500 border-2" : ""
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                  {lecture.isLive ? (
                                    <Badge className="bg-red-500 text-white animate-pulse">
                                      <Radio className="mr-1 h-3 w-3" />
                                      Live Now
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Upcoming</Badge>
                                  )}
                                  <Badge variant="secondary">{lecture.university}</Badge>
                                </div>
                                <CardTitle className="text-xl text-balance">{lecture.title}</CardTitle>
                                <CardDescription className="mt-2">
                                  <span className="font-semibold">{lecture.speaker}</span>
                                  {lecture.isLive ? (
                                    <span className="ml-2 text-xs">• {lecture.viewers} watching</span>
                                  ) : (
                                    <span className="ml-2 text-xs">• {lecture.scheduledFor}</span>
                                  )}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button className="w-full" variant={lecture.isLive ? "default" : "outline"}>
                              {lecture.isLive ? "Join Live Lecture" : "Set Reminder"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Universities Grid */}
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl font-bold mb-4">University Spaces</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {universities.map((uni) => (
                        <Card
                          key={uni.id}
                          className="transition-all duration-200 hover:shadow-lg hover:border-accent/50 cursor-pointer"
                          onClick={() => setSelectedUniversity(uni.shortName)}
                        >
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex h-12 w-12 items-center justify-center rounded-lg ${uni.color} text-white font-bold`}
                              >
                                {uni.shortName}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg text-balance">{uni.name}</CardTitle>
                                <CardDescription className="mt-1">{uni.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{uni.members} members</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{uni.posts} posts</span>
                              </div>
                            </div>
                            <Button className="w-full mt-4 bg-transparent" variant="outline">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Join Space
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* University Posts Feed */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-4">Recent University Posts</h3>
                    <div className="space-y-4">
                      {universityPosts.map((post) => (
                        <Card key={post.id} className="transition-all duration-200 hover:shadow-lg">
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <Link href={`/profile/${post.authorUsername}`}>
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                                  <AvatarFallback>{post.avatar}</AvatarFallback>
                                </Avatar>
                              </Link>
                              <div className="flex-1 min-w-0">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <Badge variant="secondary">{post.university}</Badge>
                                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                                </div>
                                <Link
                                  href={`/profile/${post.authorUsername}`}
                                  className="font-semibold hover:text-accent transition-colors"
                                >
                                  {post.author}
                                </Link>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4 text-sm leading-relaxed">{post.content}</p>
                            <SocialInteractions
                              postId={`uni-${post.id}`}
                              initialLikes={post.likes}
                              initialComments={post.comments}
                              onComment={() => {}}
                              className="pt-4 border-t"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Ask Question Tab */}
                <TabsContent value="ask">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ask the Community</CardTitle>
                      <CardDescription>
                        Get help from fellow architects and students. Be specific and provide context.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium">Question Title</label>
                          <Input placeholder="What's your question?" />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Category</label>
                          <div className="flex flex-wrap gap-2">
                            {categories.slice(1).map((category) => (
                              <Button key={category} variant="outline" size="sm" className="bg-transparent">
                                {category}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">Details</label>
                          <Textarea
                            placeholder="Provide more context about your question..."
                            className="min-h-[150px]"
                          />
                        </div>
                        <Button className="w-full">
                          <Send className="mr-2 h-4 w-4" />
                          Post Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <SuggestedPeople limit={4} />

              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Be respectful and professional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Stay on topic and provide value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Give credit and cite sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>Help others learn and grow</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredMembers.map((member) => (
                      <div key={member.id} className="flex items-start gap-3">
                        <Link href={`/profile/${member.username}`}>
                          <Avatar className="cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/profile/${member.username}`}>
                            <p className="font-semibold hover:text-accent transition-colors cursor-pointer truncate">
                              {member.name}
                            </p>
                          </Link>
                          <p className="text-sm text-muted-foreground truncate">{member.title}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">
                              {member.specialty}
                            </Badge>
                            <span>{member.contributions} posts</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle>Join Our Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm opacity-90">
                    Connect with over 1,200 architects and students. Share knowledge, get feedback, and grow together.
                  </p>
                  <Button className="w-full" variant="secondary">
                    Create Account
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
