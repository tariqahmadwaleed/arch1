"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, X, UserPlus, MessageCircle, MapPin, Briefcase } from "lucide-react"
import { VerificationBadge } from "@/components/verification-badge"
import Link from "next/link"

const searchData = [
  {
    id: 1,
    type: "Competition",
    title: "Jordan National Museum Design Competition",
    description: "Design a contemporary museum celebrating Jordan's rich cultural heritage",
    category: "Cultural",
    country: "Jordan",
    year: "2025",
    status: "Open",
    url: "/competitions/1",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    type: "Book",
    title: "Architectural Theory: An Anthology",
    description: "Comprehensive collection of architectural theory from 1968 to present",
    category: "Theory",
    author: "Various Authors",
    year: "2023",
    language: "English",
    url: "/books/1",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    type: "Project",
    title: "Amman Cultural Center",
    description: "Modern cultural center integrating traditional Jordanian architectural elements",
    category: "Cultural",
    country: "Jordan",
    year: "2024",
    architect: "Studio Maqam",
    url: "/projects/1",
    image: "/modern-museum-architecture.jpg",
  },
  {
    id: 4,
    type: "Job",
    title: "Senior Architect - Dar Al Omran",
    description: "Leading architectural firm seeking experienced architect for large-scale projects",
    category: "Full-time",
    country: "Jordan",
    year: "2025",
    company: "Dar Al Omran",
    url: "/jobs/1",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    type: "Competition",
    title: "Sustainable Housing Initiative",
    description: "Design affordable and sustainable housing solutions for urban areas",
    category: "Residential",
    country: "Global",
    year: "2025",
    status: "Upcoming",
    url: "/competitions/2",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    type: "Book",
    title: "Sustainable Design Principles",
    description: "Modern approaches to environmental architecture and green building",
    category: "Sustainability",
    author: "Dr. Ahmad Hassan",
    year: "2024",
    language: "English/Arabic",
    url: "/books/2",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    type: "Research",
    title: "Urban Green Infrastructure in Arid Climates",
    description: "Research on sustainable urban development in Middle Eastern cities",
    category: "Urban Planning",
    author: "Dr. Layla Al-Hassan",
    year: "2024",
    university: "University of Jordan",
    url: "/research/1",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    type: "Context",
    title: "Islamic Architecture Heritage",
    description: "Exploring traditional Islamic architectural elements and design principles",
    category: "Architectural Styles",
    region: "Middle East",
    url: "/context/styles",
    image: "/placeholder.svg",
  },
]

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
  {
    id: "5",
    username: "layla-omar",
    name: "Layla Omar",
    title: "Interior Designer",
    location: "Aqaba, Jordan",
    avatar: "/placeholder.svg",
    isVerified: true,
    verificationType: "architect" as const,
    followers: 890,
    mutualConnections: 8,
  },
]

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "all")
  const [contentType, setContentType] = useState(searchParams.get("category") || "all")
  const [country, setCountry] = useState("all")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [following, setFollowing] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const query = searchParams.get("q")
    const cat = searchParams.get("category")
    const tab = searchParams.get("tab")
    if (query) setSearchQuery(query)
    if (cat && cat !== "All") setContentType(cat)
    if (tab) setActiveTab(tab)
  }, [searchParams])

  const filteredResults = searchData
    .filter((item) => {
      const matchesQuery =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = contentType === "all" || item.type === contentType
      const matchesCountry = country === "all" || item.country === country
      const matchesCategory = category === "all" || item.category === category

      return matchesQuery && matchesType && matchesCountry && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "relevance") return 0
      if (sortBy === "newest") return Number.parseInt(b.year) - Number.parseInt(a.year)
      if (sortBy === "oldest") return Number.parseInt(a.year) - Number.parseInt(b.year)
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  const filteredUsers = mockUsers.filter(
    (user) =>
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const contentTypes = ["all", ...Array.from(new Set(searchData.map((item) => item.type)))]
  const countries = [
    "all",
    ...Array.from(new Set(searchData.filter((item) => item.country).map((item) => item.country))),
  ]
  const categories = ["all", ...Array.from(new Set(searchData.map((item) => item.category)))]

  const clearFilters = () => {
    setContentType("all")
    setCountry("all")
    setCategory("all")
    setSortBy("relevance")
  }

  const hasActiveFilters = contentType !== "all" || country !== "all" || category !== "all"

  const toggleFollow = (userId: string) => {
    setFollowing((prev) => ({ ...prev, [userId]: !prev[userId] }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Search Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl text-balance">Search ArchNet</h1>
            <p className="mt-4 text-muted-foreground">
              Find competitions, books, projects, research, jobs, people, and more across our platform
            </p>

            {/* Search Input */}
            <div className="mt-8 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for competitions, books, projects, jobs, people..."
                  className="pl-10 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b py-6 bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              {/* Filters - only show for content tab */}
              {(activeTab === "all" || activeTab === "content") && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Filters</span>
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2">
                          Active
                        </Badge>
                      )}
                    </div>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear all
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Content Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type === "all" ? "All Types" : type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c === "all" ? "All Countries" : c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Most Relevant</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="title">Title A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Tab Content for Content */}
            {(activeTab === "all" || activeTab === "content") && (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <Link key={`${result.type}-${result.id}`} href={result.url}>
                      <Card className="transition-all hover:shadow-lg">
                        <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-l-lg">
                            <img
                              src={result.image || "/placeholder.svg"}
                              alt={result.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardHeader>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge>{result.type}</Badge>
                              <Badge variant="outline">{result.category}</Badge>
                              {result.country && <Badge variant="secondary">{result.country}</Badge>}
                              {result.status && <Badge variant="secondary">{result.status}</Badge>}
                              {result.year && <Badge variant="secondary">{result.year}</Badge>}
                            </div>
                            <CardTitle className="text-xl hover:text-accent transition-colors text-balance">
                              {result.title}
                            </CardTitle>
                            <CardDescription className="text-base">{result.description}</CardDescription>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {result.author && <p>Author: {result.author}</p>}
                              {result.architect && <p>Architect: {result.architect}</p>}
                              {result.company && <p>Company: {result.company}</p>}
                              {result.university && <p>University: {result.university}</p>}
                            </div>
                          </CardHeader>
                        </div>
                      </Card>
                    </Link>
                  ))}

                  {filteredResults.length === 0 && (
                    <div className="py-12 text-center">
                      <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                      <p className="text-lg font-medium mb-2">No results found</p>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters to find what you're looking for
                      </p>
                      {hasActiveFilters && (
                        <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                          Clear all filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Tab Content for People */}
            {(activeTab === "all" || activeTab === "people") && (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <Link href={`/profile/${user.username}`}>
                        <Avatar className="h-14 w-14 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/profile/${user.username}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold hover:text-accent transition-colors cursor-pointer">
                              {user.name}
                            </h4>
                            {user.isVerified && <VerificationBadge type={user.verificationType} size="sm" />}
                          </div>
                        </Link>

                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
                          <Briefcase className="h-4 w-4 flex-shrink-0" />
                          <span>{user.title}</span>
                        </p>

                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span>{user.location}</span>
                        </p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{user.followers.toLocaleString()} followers</span>
                          {user.mutualConnections > 0 && (
                            <>
                              <span>•</span>
                              <span>{user.mutualConnections} mutual connections</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant={following[user.id] ? "outline" : "default"}
                          onClick={() => toggleFollow(user.id)}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          {following[user.id] ? "Following" : "Follow"}
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent" asChild>
                          <Link href={`/messages?user=${user.username}`}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredUsers.length === 0 && (
                    <div className="py-12 text-center">
                      <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                      <p className="text-lg font-medium mb-2">No people found</p>
                      <p className="text-muted-foreground">
                        Try adjusting your search to find architects, students, and firms
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
