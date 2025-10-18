"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SocialInteractions } from "@/components/social-interactions"
import { CommentSection } from "@/components/comment-section"
import { CreatePostDialog } from "@/components/create-post-dialog"
import { VerificationBadge } from "@/components/verification-badge"
import { ReportDialog } from "@/components/report-dialog"
import { SuggestedPeople } from "@/components/suggested-people"
import { Rss, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

const feedPosts = [
  {
    id: "1",
    type: "project",
    author: {
      name: "Ahmad Khalil",
      title: "Senior Architect",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      verificationType: "architect" as const,
    },
    content: "Excited to share my latest project - a sustainable community center in Amman!",
    image: "/modern-museum-architecture.jpg",
    likes: 124,
    comments: 18,
    timestamp: "2 hours ago",
    tags: ["Sustainable", "Community"],
  },
  {
    id: "2",
    type: "competition",
    author: {
      name: "ArchNet",
      title: "Platform",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      verificationType: "firm" as const,
    },
    content: "New competition alert: Jordan National Museum Design Competition. Deadline: March 15, 2025",
    likes: 89,
    comments: 12,
    timestamp: "5 hours ago",
    tags: ["Competition", "Cultural"],
  },
  {
    id: "3",
    type: "text",
    author: {
      name: "Layla Hassan",
      title: "Architecture Student",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content:
      "Just finished reading 'Architecture and Climate' by Jeffrey Cook. Highly recommend for anyone interested in sustainable design in arid regions! The chapter on passive cooling strategies is particularly insightful.",
    likes: 56,
    comments: 8,
    timestamp: "1 day ago",
    tags: ["Books", "Sustainability"],
  },
]

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedComments, setExpandedComments] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-4xl font-bold">Your Feed</h1>
                <p className="mt-2 text-muted-foreground">Stay updated with the architectural community</p>
              </div>
              <CreatePostDialog />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-3">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="gap-2">
                    <Rss className="h-4 w-4" />
                    All Posts
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="following" className="gap-2">
                    <Users className="h-4 w-4" />
                    Following
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-6">
                {feedPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Link href={`/profile/${post.author.name.toLowerCase().replace(" ", "-")}`}>
                          <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0">
                              <Link href={`/profile/${post.author.name.toLowerCase().replace(" ", "-")}`}>
                                <div className="flex items-center gap-1.5">
                                  <p className="font-semibold hover:text-accent transition-colors cursor-pointer truncate">
                                    {post.author.name}
                                  </p>
                                  {post.author.isVerified && (
                                    <VerificationBadge type={post.author.verificationType} size="sm" />
                                  )}
                                </div>
                              </Link>
                              <p className="text-sm text-muted-foreground truncate">{post.author.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{post.timestamp}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge variant="secondary">{post.type}</Badge>
                              <ReportDialog contentId={post.id} contentType="post" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{post.content}</p>

                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full rounded-lg object-cover aspect-video"
                        />
                      )}

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <SocialInteractions
                        postId={post.id}
                        initialLikes={post.likes}
                        initialComments={post.comments}
                        onComment={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
                        className="pt-4 border-t"
                      />

                      {expandedComments === post.id && (
                        <div className="pt-4 border-t">
                          <CommentSection
                            postId={post.id}
                            comments={[
                              {
                                id: "1",
                                author: { name: "Omar Zaid", avatar: "/placeholder.svg?height=40&width=40" },
                                content: "This looks amazing! Love the sustainable approach.",
                                timestamp: "1 hour ago",
                              },
                            ]}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                <SuggestedPeople limit={6} />

                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Trending Topics</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <button className="w-full text-left hover:bg-accent/5 p-2 rounded-lg transition-colors">
                      <p className="font-semibold text-sm">#SustainableDesign</p>
                      <p className="text-xs text-muted-foreground">234 posts</p>
                    </button>
                    <button className="w-full text-left hover:bg-accent/5 p-2 rounded-lg transition-colors">
                      <p className="font-semibold text-sm">#BIMWorkflow</p>
                      <p className="text-xs text-muted-foreground">189 posts</p>
                    </button>
                    <button className="w-full text-left hover:bg-accent/5 p-2 rounded-lg transition-colors">
                      <p className="font-semibold text-sm">#HeritageConservation</p>
                      <p className="text-xs text-muted-foreground">156 posts</p>
                    </button>
                    <button className="w-full text-left hover:bg-accent/5 p-2 rounded-lg transition-colors">
                      <p className="font-semibold text-sm">#UrbanDesign</p>
                      <p className="text-xs text-muted-foreground">142 posts</p>
                    </button>
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
