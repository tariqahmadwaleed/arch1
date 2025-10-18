"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VerificationBadge } from "@/components/verification-badge"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface SuggestedPerson {
  id: string
  username: string
  name: string
  title: string
  avatar: string
  specialty?: string
  mutualConnections?: number
  isVerified?: boolean
  verificationType?: "architect" | "academic" | "firm"
}

const suggestedPeople: SuggestedPerson[] = [
  {
    id: "1",
    username: "noor-almasri",
    name: "Dr. Noor Al-Masri",
    title: "Professor of Architecture",
    avatar: "/placeholder.svg",
    specialty: "Sustainable Design",
    mutualConnections: 12,
    isVerified: true,
    verificationType: "academic",
  },
  {
    id: "2",
    username: "studio-mada",
    name: "Studio Mada",
    title: "Architecture Firm",
    avatar: "/placeholder.svg",
    specialty: "Cultural Projects",
    mutualConnections: 8,
    isVerified: true,
    verificationType: "firm",
  },
  {
    id: "3",
    username: "layla-qudah",
    name: "Layla Qudah",
    title: "Senior Architect",
    avatar: "/placeholder.svg",
    specialty: "Heritage Conservation",
    mutualConnections: 5,
    isVerified: true,
    verificationType: "architect",
  },
  {
    id: "4",
    username: "omar-khalil",
    name: "Omar Khalil",
    title: "Urban Planner",
    avatar: "/placeholder.svg",
    specialty: "Urban Design",
    mutualConnections: 3,
    isVerified: false,
  },
  {
    id: "5",
    username: "maya-hassan",
    name: "Maya Hassan",
    title: "Architecture Student",
    avatar: "/placeholder.svg",
    specialty: "Parametric Design",
    mutualConnections: 7,
    isVerified: false,
  },
]

interface SuggestedPeopleProps {
  limit?: number
  showTitle?: boolean
  className?: string
}

export function SuggestedPeople({ limit = 5, showTitle = true, className }: SuggestedPeopleProps) {
  const [following, setFollowing] = useState<Record<string, boolean>>({})

  const toggleFollow = (id: string) => {
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const displayedPeople = suggestedPeople.slice(0, limit)

  return (
    <Card className={className}>
      {showTitle && (
        <CardHeader>
          <CardTitle>Suggested People</CardTitle>
        </CardHeader>
      )}
      <CardContent className={showTitle ? "" : "pt-6"}>
        <div className="space-y-4">
          {displayedPeople.map((person) => (
            <div key={person.id} className="flex items-start gap-3">
              <Link href={`/profile/${person.username}`}>
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                  <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/profile/${person.username}`}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="font-semibold text-sm hover:text-accent transition-colors cursor-pointer truncate">
                      {person.name}
                    </h4>
                    {person.isVerified && <VerificationBadge type={person.verificationType} size="sm" />}
                  </div>
                </Link>
                <p className="text-xs text-muted-foreground mb-1 truncate">{person.title}</p>
                {person.specialty && (
                  <Badge variant="secondary" className="text-xs mb-1">
                    {person.specialty}
                  </Badge>
                )}
                {person.mutualConnections && person.mutualConnections > 0 && (
                  <p className="text-xs text-muted-foreground">{person.mutualConnections} mutual connections</p>
                )}
              </div>
              <Button
                variant={following[person.id] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleFollow(person.id)}
                className={following[person.id] ? "bg-transparent" : ""}
              >
                {following[person.id] ? (
                  "Following"
                ) : (
                  <>
                    <UserPlus className="mr-1 h-3 w-3" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
        {suggestedPeople.length > limit && (
          <Button variant="ghost" className="w-full mt-4" asChild>
            <Link href="/find-people">View All Suggestions</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
