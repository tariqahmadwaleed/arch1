"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Briefcase, Calendar, UserPlus, MessageCircle, Lock, SettingsIcon, Edit } from "lucide-react"
import { SocialInteractions } from "@/components/social-interactions"
import { VerificationBadge } from "@/components/verification-badge"
import { ReportDialog } from "@/components/report-dialog"
import { PortfolioBuilderDialog } from "@/components/portfolio-builder-dialog"
import { EditProfileDialog } from "@/components/edit-profile-dialog"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [showConnections, setShowConnections] = useState<"followers" | "following" | null>(null)

  const currentUsername = "ahmad-khalil" // In production, get from auth context
  const isOwnProfile = params.username === currentUsername

  const user = {
    name: "Ahmad Khalil",
    title: "Senior Architect",
    location: "Amman, Jordan",
    bio: "Passionate about sustainable architecture and innovative design solutions. 15+ years of experience in commercial and residential projects.",
    joinedDate: "March 2023",
    avatar: "/placeholder.svg?height=128&width=128",
    followers: 1234,
    following: 567,
    posts: 89,
    isVerified: true,
    verificationType: "architect" as const,
  }

  const userPosts = [
    {
      id: "1",
      type: "project",
      title: "Sustainable Community Center",
      description: "A modern community center designed with passive cooling strategies.",
      image: "/modern-museum-architecture.jpg",
      likes: 124,
      comments: 18,
      date: "2 days ago",
    },
  ]

  const portfolioProjects = [
    {
      id: "1",
      title: "Sustainable Community Center",
      category: "Public Architecture",
      year: "2023",
      location: "Amman, Jordan",
      image: "/modern-museum-architecture.jpg",
      description: "A modern community center designed with passive cooling strategies and local materials.",
    },
    {
      id: "2",
      title: "Residential Complex",
      category: "Housing",
      year: "2022",
      location: "Aqaba, Jordan",
      image: "/sustainable-housing-design.jpg",
      description: "Sustainable housing development with integrated green spaces.",
    },
    {
      id: "3",
      title: "Cultural Heritage Center",
      category: "Cultural",
      year: "2023",
      location: "Petra, Jordan",
      image: "/petra-visitor-center-architecture.jpg",
      description: "Visitor center blending modern design with traditional Nabataean architecture.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Profile Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg transition-transform duration-200 hover:scale-105">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-serif text-3xl font-bold">{user.name}</h1>
                      {user.isVerified && <VerificationBadge type={user.verificationType} size="lg" />}
                    </div>
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
                    {!isOwnProfile ? (
                      <>
                        <Button
                          variant={isFollowing ? "outline" : "default"}
                          size="sm"
                          onClick={() => setIsFollowing(!isFollowing)}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-200 hover:scale-105 bg-transparent"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <ReportDialog contentId={params.username} contentType="user" />
                      </>
                    ) : (
                      <>
                        <EditProfileDialog currentProfile={user} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-200 hover:scale-105 bg-transparent"
                          asChild
                        >
                          <Link href="/settings">
                            <SettingsIcon className="mr-2 h-4 w-4" />
                            Settings
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed">{user.bio}</p>

                <div className="mt-4 flex gap-6">
                  <button className="text-sm hover:text-accent transition-all duration-200 hover:scale-105">
                    <span className="font-semibold">{user.posts}</span> Posts
                  </button>
                  <button
                    className="text-sm hover:text-accent transition-all duration-200 hover:scale-105"
                    onClick={() => setShowConnections("followers")}
                  >
                    <span className="font-semibold">{user.followers}</span> Followers
                  </button>
                  <button
                    className="text-sm hover:text-accent transition-all duration-200 hover:scale-105"
                    onClick={() => setShowConnections("following")}
                  >
                    <span className="font-semibold">{user.following}</span> Following
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="posts">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts" className="transition-all duration-200">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="transition-all duration-200">
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="saved" className="transition-all duration-200">
                  Saved
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6 space-y-6">
                {userPosts.map((post) => (
                  <Card key={post.id} className="transition-all duration-200 hover:shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold">{user.name}</p>
                                {user.isVerified && <VerificationBadge type={user.verificationType} size="sm" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{post.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{post.type}</Badge>
                              <ReportDialog contentId={post.id} contentType="post" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{post.description}</p>
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full rounded-lg object-cover aspect-video mb-4 transition-transform duration-200 hover:scale-[1.02]"
                      />

                      <SocialInteractions
                        postId={post.id}
                        initialLikes={post.likes}
                        initialComments={post.comments}
                        className="pt-4 border-t"
                      />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                {isOwnProfile && (
                  <div className="mb-6 flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Portfolio
                    </Button>
                    <PortfolioBuilderDialog />
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  {portfolioProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {project.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{project.year}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                {!isOwnProfile ? (
                  <Card className="p-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-full bg-secondary p-4">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Private</h3>
                        <p className="text-sm text-muted-foreground">
                          This user's saved items are private and cannot be viewed.
                        </p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Your saved items will appear here.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
