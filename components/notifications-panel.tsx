"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Heart, MessageSquare, UserPlus, Trophy, BookOpen, Briefcase, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

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

const dummyNotifications: Notification[] = [
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
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications)
  const [activeTab, setActiveTab] = useState("all")
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
    e.stopPropagation()
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((n) => !n.read && activeTab === "unread")

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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
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

          <TabsContent value={activeTab} className="mt-4">
            <ScrollArea className="h-[calc(100vh-14rem)]">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>{activeTab === "unread" ? "No unread notifications" : "No notifications yet"}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedNotifications).map(([type, items]) => (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-2">
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
                                  !notification.read ? "bg-accent/10" : ""
                                }`}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => deleteNotification(notification.id, e)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0">
                                    {notification.user ? (
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                                      </Avatar>
                                    ) : (
                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                                        {getIcon(notification.type)}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 space-y-1 min-w-0">
                                    <p className="text-sm line-clamp-2">
                                      {notification.user && (
                                        <span className="font-semibold">{notification.user.name} </span>
                                      )}
                                      {notification.content}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                                  </div>
                                  {!notification.read && (
                                    <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
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
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {notifications.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/notifications">View All Notifications</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
