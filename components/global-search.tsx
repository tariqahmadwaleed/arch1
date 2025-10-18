"use client"

import { useState, useEffect } from "react"
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { useRouter } from "next/navigation"

const searchCategories = [
  "All",
  "Projects",
  "Books",
  "Research",
  "Competitions",
  "Context",
  "News",
  "Events",
  "Jobs",
  "Tools",
]

const allSearchResults = [
  {
    id: "1",
    title: "Sustainable Community Center",
    category: "Projects",
    type: "projects",
    description: "Modern community center with green infrastructure",
    image: "/modern-museum-architecture.jpg",
    tags: ["Sustainable", "Community", "Modern"],
  },
  {
    id: "2",
    title: "Jordan National Museum Design Competition",
    category: "Competitions",
    type: "competitions",
    description: "International competition for museum design",
    image: "/placeholder.svg",
    tags: ["Competition", "Museum", "Cultural"],
  },
  {
    id: "1",
    title: "Architectural Theory: An Anthology",
    category: "Books",
    type: "books",
    description: "Comprehensive collection of architectural theory",
    image: "/placeholder.svg",
    tags: ["Theory", "Education", "Reference"],
  },
  {
    id: "1",
    title: "Urban Green Infrastructure in Arid Climates",
    category: "Research",
    type: "research",
    description: "Research on sustainable urban development",
    image: "/placeholder.svg",
    tags: ["Research", "Sustainability", "Urban Planning"],
  },
  {
    id: "1",
    title: "Islamic Architecture Heritage",
    category: "Context",
    type: "context/styles",
    description: "Exploring traditional Islamic architectural elements",
    image: "/placeholder.svg",
    tags: ["Islamic", "Heritage", "Traditional"],
  },
  {
    id: "1",
    title: "Senior Architect Position",
    category: "Jobs",
    type: "jobs",
    description: "Full-time position at leading firm",
    image: "/placeholder.svg",
    tags: ["Full-time", "Senior", "Architecture"],
  },
]

const trendingSearches = [
  "Sustainable architecture",
  "Islamic design",
  "Competition deadlines",
  "BIM software",
  "Urban planning",
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const saveSearch = (query: string) => {
    if (!query.trim()) return
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const filteredResults = allSearchResults.filter((result) => {
    const matchesQuery =
      searchQuery === "" ||
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || result.category === selectedCategory

    return matchesQuery && matchesCategory
  })

  const groupedResults = filteredResults.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, typeof allSearchResults>,
  )

  const handleSearch = () => {
    if (searchQuery.trim()) {
      saveSearch(searchQuery)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`)
      setIsOpen(false)
    }
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
    saveSearch(query)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-110 hover:text-accent">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Search ArchNet Jordan</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects, books, research, competitions..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {searchCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <ScrollArea className="h-[450px]">
            {searchQuery ? (
              <div className="space-y-6">
                {Object.keys(groupedResults).length > 0 ? (
                  <>
                    {Object.entries(groupedResults).map(([category, results]) => (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold">{category}</h3>
                          <Link
                            href={`/search?q=${encodeURIComponent(searchQuery)}&category=${category}`}
                            className="text-xs text-accent hover:underline flex items-center gap-1"
                            onClick={() => {
                              saveSearch(searchQuery)
                              setIsOpen(false)
                            }}
                          >
                            View all
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                        <div className="space-y-2">
                          {results.slice(0, 3).map((result) => (
                            <Link
                              key={`${result.type}-${result.id}`}
                              href={`/${result.type}/${result.id}`}
                              onClick={() => {
                                saveSearch(searchQuery)
                                setIsOpen(false)
                              }}
                            >
                              <Card className="p-3 hover:bg-accent/5 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={result.image || "/placeholder.svg"}
                                    alt={result.title}
                                    className="h-14 w-14 rounded object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm line-clamp-1">{result.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{result.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {result.tags.slice(0, 2).map((tag, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <Button className="w-full" onClick={handleSearch}>
                        View All Results for "{searchQuery}"
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-2">Try different keywords or check your spelling</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">Recent Searches</h3>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="h-auto py-1 px-2">
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/5 transition-colors text-sm"
                          onClick={() => handleQuickSearch(search)}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Trending Searches</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent/20 transition-colors"
                        onClick={() => handleQuickSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Start typing to search across all sections
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
