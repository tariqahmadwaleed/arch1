"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserMinus, MessageCircle, MapPin, Briefcase } from "lucide-react"
import { VerificationBadge } from "@/components/verification-badge"
import Link from "next/link"

interface ConnectionsDialogProps {
  userId: string
  userName: string
  followers: number
  following: number
  defaultTab?: "followers" | "following"
}

const mockConnections = [
  {
    id: "1",
    username: "layla-ibrahim",
    name: "Layla Ibrahim",
    title: "Landscape Architect",
    location: "Amman, Jordan",
    avatar: "/placeholder.svg",
    isVerified: false,
    mutualConnections: 8,
  },
  {
    id: "2",
    username: "omar-khalil",
    name: "Omar Khalil",
    title: "Urban Planner",
    location: "Irbid, Jordan",
    avatar: "/placeholder.svg",
    isVerified: true,
    verificationType: "architect" as const,
    mutualConnections: 15,
  },
  {
    id: "3",
    username: "maya-zaid",
    name: "Maya Zaid",
    title: "Interior Designer",
    location: "Aqaba, Jordan",
    avatar: "/placeholder.svg",
    isVerified: false,
    mutualConnections: 3,
  },
]

export function ConnectionsDialog({
  userId,
  userName,
  followers,
  following,
  defaultTab = "followers",
}: ConnectionsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({})

  const filteredConnections = mockConnections.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFollow = (connectionId: string) => {
    setFollowingState((prev) => ({ ...prev, [connectionId]: !prev[connectionId] }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-sm hover:text-accent transition-colors">
          <span className="font-semibold">{activeTab === "followers" ? followers : following}</span>
          <span className="ml-1">{activeTab === "followers" ? "Followers" : "Following"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{userName}'s Connections</DialogTitle>
          <DialogDescription>View and manage connections</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "followers" | "following")}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="followers">Followers ({followers})</TabsTrigger>
            <TabsTrigger value="following">Following ({following})</TabsTrigger>
          </TabsList>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search connections..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsContent value="followers" className="flex-1 overflow-y-auto space-y-3 pr-2 mt-0">
            {filteredConnections.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>No followers found.</p>
              </div>
            ) : (
              filteredConnections.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <Link href={`/profile/${user.username}`}>
                    <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${user.username}`}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-semibold text-sm hover:text-accent transition-colors cursor-pointer truncate">
                          {user.name}
                        </h4>
                        {user.isVerified && <VerificationBadge type={user.verificationType} size="sm" />}
                      </div>
                    </Link>

                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Briefcase className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{user.title}</span>
                    </p>

                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </p>

                    {user.mutualConnections > 0 && (
                      <p className="text-xs text-muted-foreground">{user.mutualConnections} mutual connections</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant={followingState[user.id] ? "outline" : "default"}
                      onClick={() => toggleFollow(user.id)}
                      className="w-24"
                    >
                      {followingState[user.id] ? "Following" : "Follow Back"}
                    </Button>
                    <Button size="sm" variant="outline" className="w-24 bg-transparent" asChild>
                      <Link href={`/messages?user=${user.username}`}>
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Message
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="following" className="flex-1 overflow-y-auto space-y-3 pr-2 mt-0">
            {filteredConnections.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>Not following anyone yet.</p>
              </div>
            ) : (
              filteredConnections.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <Link href={`/profile/${user.username}`}>
                    <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${user.username}`}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-semibold text-sm hover:text-accent transition-colors cursor-pointer truncate">
                          {user.name}
                        </h4>
                        {user.isVerified && <VerificationBadge type={user.verificationType} size="sm" />}
                      </div>
                    </Link>

                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Briefcase className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{user.title}</span>
                    </p>

                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </p>

                    {user.mutualConnections > 0 && (
                      <p className="text-xs text-muted-foreground">{user.mutualConnections} mutual connections</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFollow(user.id)}
                      className="w-24 bg-transparent"
                    >
                      <UserMinus className="mr-1 h-3 w-3" />
                      Unfollow
                    </Button>
                    <Button size="sm" variant="outline" className="w-24 bg-transparent" asChild>
                      <Link href={`/messages?user=${user.username}`}>
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Message
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
