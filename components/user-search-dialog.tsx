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
import { Search, UserPlus, MessageCircle, MapPin, Briefcase } from "lucide-react"
import { VerificationBadge } from "@/components/verification-badge"
import Link from "next/link"

const mockUsers = [
  {
    id: "1",
    username: "ahmad-hassan",
    name: "Ahmad Hassan",
    title: "Senior Architect",
    location: "Amman, Jordan",
    avatar: "/placeholder.svg",
    isVerified: true,
    verificationType: "architect" as const,
    followers: 1234,
    mutualConnections: 12,
  },
  {
    id: "2",
    username: "sara-mansour",
    name: "Sara Mansour",
    title: "Architecture Student",
    location: "Irbid, Jordan",
    avatar: "/placeholder.svg",
    isVerified: false,
    followers: 456,
    mutualConnections: 5,
  },
  {
    id: "3",
    username: "noor-almasri",
    name: "Dr. Noor Al-Masri",
    title: "Professor of Architecture",
    location: "Amman, Jordan",
    avatar: "/placeholder.svg",
    isVerified: true,
    verificationType: "academic" as const,
    followers: 2345,
    mutualConnections: 23,
  },
  {
    id: "4",
    username: "studio-mada",
    name: "Studio Mada",
    title: "Architecture Firm",
    location: "Amman, Jordan",
    avatar: "/placeholder.svg",
    isVerified: true,
    verificationType: "firm" as const,
    followers: 3456,
    mutualConnections: 34,
  },
]

export function UserSearchDialog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [following, setFollowing] = useState<Record<string, boolean>>({})

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFollow = (userId: string) => {
    setFollowing((prev) => ({ ...prev, [userId]: !prev[userId] }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Find People
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Find Architects & Students</DialogTitle>
          <DialogDescription>Connect with professionals and students in the architecture community</DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, title, or location..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>No users found matching your search.</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
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

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{user.followers.toLocaleString()} followers</span>
                    {user.mutualConnections > 0 && (
                      <>
                        <span>•</span>
                        <span>{user.mutualConnections} mutual</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant={following[user.id] ? "outline" : "default"}
                    onClick={() => toggleFollow(user.id)}
                    className="w-24"
                  >
                    <UserPlus className="mr-1 h-3 w-3" />
                    {following[user.id] ? "Following" : "Follow"}
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
