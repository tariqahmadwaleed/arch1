"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, CheckCircle, XCircle, Flag, BadgeCheck } from "lucide-react"

export default function ModerationPage() {
  const [verificationRequests] = useState([
    {
      id: "1",
      user: {
        name: "Sarah Al-Masri",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "sarah@example.com",
      },
      type: "architect",
      organization: "Jordan Engineers Association",
      license: "JEA-2024-1234",
      details: "Licensed architect with 10+ years of experience in sustainable design.",
      submittedDate: "2 days ago",
      status: "pending",
    },
    {
      id: "2",
      user: {
        name: "University of Jordan",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "arch@ju.edu.jo",
      },
      type: "university",
      organization: "University of Jordan - Faculty of Engineering",
      license: "N/A",
      details: "Official account for the Faculty of Engineering and Technology at University of Jordan.",
      submittedDate: "5 days ago",
      status: "pending",
    },
  ])

  const [reportedContent] = useState([
    {
      id: "1",
      type: "post",
      reporter: "Anonymous User",
      reason: "spam",
      details: "This post contains promotional content unrelated to architecture.",
      content: {
        author: "John Doe",
        text: "Check out my new product! Buy now at...",
      },
      reportedDate: "1 day ago",
      status: "pending",
    },
    {
      id: "2",
      type: "comment",
      reporter: "Ahmad Khalil",
      reason: "inappropriate",
      details: "Offensive language and personal attacks.",
      content: {
        author: "Jane Smith",
        text: "Your design is terrible and you should quit...",
      },
      reportedDate: "3 days ago",
      status: "pending",
    },
  ])

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Shield className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Admin Panel</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Content Moderation</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Review verification requests and reported content
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Tabs defaultValue="verification">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="verification" className="gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Verification Requests ({verificationRequests.length})
                </TabsTrigger>
                <TabsTrigger value="reports" className="gap-2">
                  <Flag className="h-4 w-4" />
                  Reported Content ({reportedContent.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="verification" className="mt-6 space-y-4">
                {verificationRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{request.user.name}</CardTitle>
                            <CardDescription>{request.user.email}</CardDescription>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="secondary">{request.type}</Badge>
                              <span className="text-xs text-muted-foreground">Submitted {request.submittedDate}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-semibold mb-1">Organization</p>
                          <p className="text-sm text-muted-foreground">{request.organization}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">License/Credential</p>
                          <p className="text-sm text-muted-foreground">{request.license}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Additional Information</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{request.details}</p>
                      </div>
                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" className="gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-2">
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          Request More Info
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reports" className="mt-6 space-y-4">
                {reportedContent.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">Reported {report.type}</CardTitle>
                            <Badge variant="secondary">{report.reason}</Badge>
                          </div>
                          <CardDescription>
                            Reported by {report.reporter} • {report.reportedDate}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{report.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-1">Reporter's Details</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{report.details}</p>
                      </div>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm font-semibold mb-2">Reported Content</p>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{report.content.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{report.content.author}</p>
                            <p className="text-sm text-muted-foreground mt-1">{report.content.text}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="destructive" className="gap-2">
                          <XCircle className="h-4 w-4" />
                          Remove Content
                        </Button>
                        <Button size="sm" variant="outline">
                          Warn User
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <CheckCircle className="h-4 w-4" />
                          Dismiss Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
