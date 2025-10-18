"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, MessageCircle, Bookmark, Clock } from "lucide-react"

export default function ActivityPage() {
  const recentActivity = [
    {
      id: 1,
      type: "like",
      content: "Liked Modern Museum in Amman",
      date: "2 hours ago",
    },
    {
      id: 2,
      type: "comment",
      content: "Commented on Sustainable Housing Design",
      date: "5 hours ago",
    },
    {
      id: 3,
      type: "save",
      content: "Saved Architectural Theory: An Anthology",
      date: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Activity className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Activity Dashboard</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">My Activity</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Track your interactions and engagement on ArchNet
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-8">
              <div className="mx-auto max-w-2xl space-y-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {activity.type === "like" && <Heart className="h-5 w-5 text-accent" />}
                          {activity.type === "comment" && <MessageCircle className="h-5 w-5 text-accent" />}
                          {activity.type === "save" && <Bookmark className="h-5 w-5 text-accent" />}
                          <div>
                            <CardTitle className="text-base">{activity.content}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {activity.date}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="likes" className="mt-8">
              <div className="py-12 text-center">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Your liked items will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-8">
              <div className="py-12 text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Your comments will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
