"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  Trophy,
  BookOpen,
  Briefcase,
  AlertCircle,
  X,
  Check,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "competition" | "message" | "job" | "book" | "system"
  user?: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  read: boolean
  link?: string
}

const allNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: { name: "Ahmad Khalil", avatar: "/placeholder.svg?height=40&width=40" },
    content: "liked your project 'Sustainable Housing Concept'",
    timestamp: "2 hours ago",
    read: false,
    link: "/projects/1",
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Layla Hassan", avatar: "/placeholder.svg?height=40&width=40" },
    content: "commented on your post: 'Great design approach!'",
    timestamp: "5 hours ago",
    read: false,
    link: "/projects/1",
  },
  {
    id: "3",
    type: "follow",
    user: { name: "Omar Zaid", avatar: "/placeholder.svg?height=40&width=40" },
    content: "started following you",
    timestamp: "1 day ago",
    read: true,
    link: "/profile/omar-zaid",
  },
  {
    id: "4",
    type: "competition",
    content: "New competition deadline approaching: Jordan National Museum",
    timestamp: "2 days ago",
    read: true,
    link: "/competitions/1",
  },
  {
    id: "5",
    type: "job",
    content: "New job posting matches your profile: Senior Architect at Dar Al Omran",
    timestamp: "3 days ago",
    read: true,
    link: "/jobs/1",
  },
  {
    id: "6",
    type: "book",
    content: "New book added to library: 'Sustainable Design Principles'",
    timestamp: "4 days ago",
    read: true,
    link: "/books/2",
  },
  {
    id: "7",
    type: "system",
    content: "Your profile has been verified",
    timestamp: "5 days ago",
    read: true,
  },
  {
    id: "8",
    type: "like",
    user: { name: "Sara Al-Khatib", avatar: "/placeholder.svg?height=40&width=40" },
    content: "liked your research paper",
    timestamp: "6 days ago",
    read: true,
    link: "/research/1",
  },
  {
    id: "9",
    type: "comment",
    user: { name: "Noor Al-Tamimi", avatar: "/placeholder.svg?height=40&width=40" },
    content: "replied to your comment",
    timestamp: "1 week ago",
    read: true,
    link: "/projects/2",
  },
  {
    id: "10",
    type: "competition",
    content: "Competition results announced: Sustainable Housing Initiative",
    timestamp: "1 week ago",
    read: true,
    link: "/competitions/2",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const filteredNotifications = notifications.filter((n) => {
    const matchesTab = activeTab === "all" || (activeTab === "unread" && !n.read)
    const matchesType = filterType === "all" || n.type === filterType
    return matchesTab && matchesType
  })

  const groupedNotifications = filteredNotifications.reduce(
    (acc, notification) => {
      const type = notification.type
      if (!acc[type]) {
        acc[type] = []
      }
      acc[type].push(notification)
      return acc
    },
    {} as Record<string, Notification[]>,
  )

  const typeLabels = {
    like: "Likes",
    comment: "Comments",
    follow: "Connections",
    competition: "Competitions",
    message: "Messages",
    job: "Jobs",
    book: "Books & Research",
    system: "System",
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-accent" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-accent" />
      case "follow":
        return <UserPlus className="h-5 w-5 text-accent" />
      case "competition":
        return <Trophy className="h-5 w-5 text-accent" />
      case "job":
        return <Briefcase className="h-5 w-5 text-accent" />
      case "book":
        return <BookOpen className="h-5 w-5 text-accent" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-accent" />
      default:
        return <Bell className="h-5 w-5 text-accent" />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Bell className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Notifications Center</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Your Notifications</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Stay updated with all your interactions and important updates
            </p>
          </div>
        </div>
      </section>

      {/* Actions Bar */}
      <section className="border-b py-4 bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="bg-transparent">
                  <Check className="mr-2 h-4 w-4" />
                  Mark all read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAll} className="text-destructive bg-transparent">
                  <X className="mr-2 h-4 w-4" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="all">
                    All
                    {notifications.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {notifications.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="like">Likes</SelectItem>
                      <SelectItem value="comment">Comments</SelectItem>
                      <SelectItem value="follow">Connections</SelectItem>
                      <SelectItem value="competition">Competitions</SelectItem>
                      <SelectItem value="job">Jobs</SelectItem>
                      <SelectItem value="book">Books</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value={activeTab}>
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    <Bell className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium mb-2">
                      {activeTab === "unread" ? "No unread notifications" : "No notifications yet"}
                    </p>
                    <p className="text-sm">
                      {activeTab === "unread"
                        ? "You're all caught up!"
                        : "When you get notifications, they'll show up here"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedNotifications).map(([type, items]) => (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-muted-foreground">
                            {typeLabels[type as Notification["type"]]}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {items.length}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {items.map((notification) => {
                            const NotificationWrapper = notification.link ? Link : "div"
                            return (
                              <NotificationWrapper
                                key={notification.id}
                                href={notification.link || "#"}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Card
                                  className={`p-4 cursor-pointer transition-colors hover:bg-accent/5 relative group ${
                                    !notification.read ? "bg-accent/10 border-accent/20" : ""
                                  }`}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => deleteNotification(notification.id, e)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                  <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                      {notification.user ? (
                                        <Avatar className="h-12 w-12">
                                          <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                                          <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                                        </Avatar>
                                      ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                                          {getIcon(notification.type)}
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 space-y-1 min-w-0">
                                      <p className="text-sm">
                                        {notification.user && (
                                          <span className="font-semibold">{notification.user.name} </span>
                                        )}
                                        {notification.content}
                                      </p>
                                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                                    </div>
                                    {!notification.read && (
                                      <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                                    )}
                                  </div>
                                </Card>
                              </NotificationWrapper>
                            )
                          })}
                        </div>
                      </div>
                    ))}
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
