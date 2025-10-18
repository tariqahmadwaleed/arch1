"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Download, Search, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { SocialInteractions } from "@/components/social-interactions"
import { CompareButton } from "@/components/compare-button"

// Dummy data for books
const books = [
  {
    id: 1,
    title: "Architectural Theory: An Anthology",
    author: "Various Authors",
    category: "Theory",
    year: 2023,
    pages: 856,
    language: "English",
    description: "A comprehensive collection of architectural theory texts from ancient to contemporary times.",
    cover: "/placeholder.svg?key=book1",
    type: "PDF",
    size: "45 MB",
  },
  {
    id: 2,
    title: "Sustainable Design Principles",
    author: "Dr. Ahmad Hassan",
    category: "Sustainability",
    year: 2024,
    pages: 324,
    language: "English/Arabic",
    description: "Practical guide to sustainable architecture in the Middle East climate.",
    cover: "/placeholder.svg?key=book2",
    type: "PDF",
    size: "28 MB",
  },
  {
    id: 3,
    title: "Urban Planning in MENA Region",
    author: "Sarah Al-Masri",
    category: "Urban Planning",
    year: 2023,
    pages: 412,
    language: "English",
    description: "Contemporary urban planning strategies for Middle Eastern and North African cities.",
    cover: "/placeholder.svg?key=book3",
    type: "PDF",
    size: "52 MB",
  },
  {
    id: 4,
    title: "Construction Methods & Materials",
    author: "Engineering Department, University of Jordan",
    category: "Construction",
    year: 2024,
    pages: 568,
    language: "Arabic",
    description: "Comprehensive guide to modern construction techniques and materials.",
    cover: "/placeholder.svg?key=book4",
    type: "PDF",
    size: "67 MB",
  },
  {
    id: 5,
    title: "Islamic Architecture Heritage",
    author: "Prof. Khalid Mahmoud",
    category: "History",
    year: 2022,
    pages: 445,
    language: "English/Arabic",
    description: "Exploring the rich heritage of Islamic architectural traditions.",
    cover: "/placeholder.svg?key=book5",
    type: "PDF",
    size: "89 MB",
  },
  {
    id: 6,
    title: "Digital Design & Parametric Architecture",
    author: "Maya Chen & Omar Rashid",
    category: "Digital Design",
    year: 2024,
    pages: 298,
    language: "English",
    description: "Introduction to computational design and parametric modeling in architecture.",
    cover: "/placeholder.svg?key=book6",
    type: "PDF",
    size: "34 MB",
  },
  {
    id: 7,
    title: "Landscape Architecture in Arid Climates",
    author: "Dr. Layla Ibrahim",
    category: "Landscape",
    year: 2023,
    pages: 376,
    language: "English",
    description: "Strategies for creating sustainable landscapes in water-scarce environments.",
    cover: "/placeholder.svg?key=book7",
    type: "PDF",
    size: "41 MB",
  },
  {
    id: 8,
    title: "Architectural Drawing & Representation",
    author: "Studio Practice Collective",
    category: "Design",
    year: 2024,
    pages: 256,
    language: "English",
    description: "Modern techniques for architectural visualization and presentation.",
    cover: "/placeholder.svg?key=book8",
    type: "PDF",
    size: "125 MB",
  },
  {
    id: 9,
    title: "Building Information Modeling (BIM)",
    author: "Tech Architecture Group",
    category: "Technology",
    year: 2024,
    pages: 432,
    language: "English",
    description: "Complete guide to BIM implementation in architectural practice.",
    cover: "/placeholder.svg?key=book9",
    type: "PDF",
    size: "56 MB",
  },
  {
    id: 10,
    title: "Adaptive Reuse & Heritage Conservation",
    author: "Dr. Noor Al-Khatib",
    category: "Conservation",
    year: 2023,
    pages: 389,
    language: "English/Arabic",
    description: "Principles and case studies of adaptive reuse in historic buildings.",
    cover: "/placeholder.svg?key=book10",
    type: "PDF",
    size: "73 MB",
  },
  {
    id: 11,
    title: "Arquitectura Contemporánea",
    author: "Carlos Mendez",
    category: "Theory",
    year: 2023,
    pages: 412,
    language: "Spanish",
    description: "Contemporary architecture movements and trends in Latin America.",
    cover: "/placeholder.svg?key=book11",
    type: "PDF",
    size: "38 MB",
  },
  {
    id: 12,
    title: "Architettura Italiana Moderna",
    author: "Giovanni Rossi",
    category: "History",
    year: 2022,
    pages: 356,
    language: "Italian",
    description: "Modern Italian architecture from the 20th century to present.",
    cover: "/placeholder.svg?key=book12",
    type: "PDF",
    size: "62 MB",
  },
  {
    id: 13,
    title: "Современная Архитектура",
    author: "Dmitri Volkov",
    category: "Design",
    year: 2024,
    pages: 298,
    language: "Russian",
    description: "Contemporary architectural practices in Eastern Europe.",
    cover: "/placeholder.svg?key=book13",
    type: "PDF",
    size: "44 MB",
  },
  {
    id: 14,
    title: "Architecture Durable",
    author: "Marie Dubois",
    category: "Sustainability",
    year: 2023,
    pages: 387,
    language: "French",
    description: "Sustainable architecture principles and case studies from France.",
    cover: "/placeholder.svg?key=book14",
    type: "PDF",
    size: "51 MB",
  },
  {
    id: 15,
    title: "Moderne Baukunst",
    author: "Hans Schmidt",
    category: "Theory",
    year: 2024,
    pages: 445,
    language: "German",
    description: "Modern architectural theory and practice in German-speaking countries.",
    cover: "/placeholder.svg?key=book15",
    type: "PDF",
    size: "58 MB",
  },
  {
    id: 16,
    title: "当代建筑设计",
    author: "李明",
    category: "Design",
    year: 2023,
    pages: 512,
    language: "Chinese",
    description: "Contemporary architectural design principles and Chinese case studies.",
    cover: "/placeholder.svg?key=book16",
    type: "PDF",
    size: "76 MB",
  },
]

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
      const matchesLanguage = selectedLanguage === "all" || book.language.includes(selectedLanguage)
      const matchesYear = selectedYear === "all" || book.year.toString() === selectedYear
      return matchesSearch && matchesCategory && matchesLanguage && matchesYear
    })
    .sort((a, b) => {
      if (sortBy === "recent") return b.year - a.year
      if (sortBy === "oldest") return a.year - b.year
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "pages") return b.pages - a.pages
      return 0
    })

  const categories = ["all", ...Array.from(new Set(books.map((b) => b.category)))]
  const languages = ["all", "English", "Arabic", "Spanish", "Italian", "Russian", "French", "German", "Chinese"]
  const years = [
    "all",
    ...Array.from(new Set(books.map((b) => b.year.toString())))
      .sort()
      .reverse(),
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <BookOpen className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Digital Library</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Books & References</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Access a comprehensive collection of architecture books, magazines, and academic references in multiple
              languages
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{books.length}+</p>
              <p className="text-sm text-muted-foreground">Books Available</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{categories.length - 1}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{languages.length - 1}</p>
              <p className="text-sm text-muted-foreground">Languages</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">Free</p>
              <p className="text-sm text-muted-foreground">Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books, authors, topics..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language === "all" ? "All Languages" : language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="pages">Most Pages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>
                <Filter className="inline h-4 w-4 mr-1" />
                {filteredBooks.length} books found
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredBooks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No books found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <Card
                  key={book.id}
                  className="group flex flex-col overflow-hidden transition-all hover:shadow-lg h-full"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge variant="secondary">{book.type}</Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <Badge variant="outline" className="w-fit text-xs">
                        {book.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {book.language}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg text-balance min-h-[3.5rem]">{book.title}</CardTitle>
                    <CardDescription className="line-clamp-1">{book.author}</CardDescription>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-medium">{book.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-medium">{book.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium">{book.size}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto">
                    <div className="flex gap-2 mb-3">
                      <Button className="flex-1 bg-transparent" variant="outline" size="sm" asChild>
                        <Link href={`/books/${book.id}`}>
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          View
                        </Link>
                      </Button>
                      <Button className="flex-1" size="sm">
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                    <div className="mb-3">
                      <CompareButton
                        item={{
                          id: book.id.toString(),
                          type: "book",
                          title: book.title,
                          image: book.cover,
                          metadata: {
                            Author: book.author,
                            Category: book.category,
                            Year: book.year,
                            Pages: book.pages,
                            Language: book.language,
                            Size: book.size,
                          },
                        }}
                      />
                    </div>
                    <SocialInteractions
                      contentId={`book-${book.id}`}
                      contentType="book"
                      showRepost={false}
                      showReport={false}
                      className="pt-3 border-t"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-secondary/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Can't Find What You're Looking For?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Suggest a book or resource you'd like to see in our library. We're constantly expanding our collection.
          </p>
          <Button className="mt-6 bg-transparent" size="lg" variant="outline">
            Suggest a Book
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
