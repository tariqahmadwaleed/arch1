"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, Download, ExternalLink, Filter } from "lucide-react"
import Link from "next/link"
import { VerificationBadge } from "@/components/verification-badge"
import { SocialInteractions } from "@/components/social-interactions"
import { ResearchSubmitDialog } from "@/components/research-submit-dialog"
import { CompareButton } from "@/components/compare-button"

// Dummy data for research papers
const researchPapers = [
  {
    id: 1,
    title: "Sustainable Urban Development in Amman: A Case Study of Green Infrastructure Integration",
    authors: ["Dr. Layla Al-Hassan", "Prof. Ahmad Mansour"],
    university: "University of Jordan",
    category: "Urban Planning",
    language: "English",
    date: "2024-01-15",
    abstract:
      "This research investigates the integration of green infrastructure in Amman's urban fabric, analyzing the impact on microclimate, air quality, and community well-being. The study proposes a framework for sustainable urban development applicable to Middle Eastern cities.",
    keywords: ["Sustainable Development", "Green Infrastructure", "Urban Planning", "Amman"],
    pdfUrl: "#",
    externalLink: null,
    images: ["/urban-green-infrastructure-amman-sustainable-devel.jpg"],
    likes: 156,
    comments: 23,
    bookmarks: 89,
    verified: true,
  },
  {
    id: 2,
    title: "Adaptive Reuse of Industrial Heritage: Transforming Zarqa's Abandoned Factories",
    authors: ["Sara Al-Khatib"],
    university: "German Jordanian University",
    category: "Theory",
    language: "English/Arabic",
    date: "2024-02-20",
    abstract:
      "Master's thesis exploring adaptive reuse strategies for industrial heritage sites in Zarqa, Jordan. The research proposes design interventions that preserve historical significance while creating contemporary community spaces.",
    keywords: ["Adaptive Reuse", "Industrial Heritage", "Community Design", "Zarqa"],
    pdfUrl: "#",
    externalLink: null,
    images: ["/industrial-heritage-architecture-adaptive-reuse-fa.jpg"],
    likes: 98,
    comments: 15,
    bookmarks: 67,
    verified: false,
  },
  {
    id: 3,
    title: "Parametric Design in Desert Architecture: Climate-Responsive Facades for Hot Arid Regions",
    authors: ["Dr. Omar Rashid", "Eng. Noor Al-Tamimi"],
    university: "Jordan University of Science and Technology",
    category: "Technology",
    language: "English",
    date: "2023-11-10",
    abstract:
      "This paper presents a parametric design methodology for climate-responsive facades in hot arid climates. Using computational design tools, the research develops adaptive shading systems that optimize thermal performance while maintaining aesthetic quality.",
    keywords: ["Parametric Design", "Climate-Responsive", "Facade Design", "Computational Design"],
    pdfUrl: "#",
    externalLink: "https://example.com/research",
    images: ["/parametric-facade-design-computational-architectur.jpg"],
    likes: 234,
    comments: 31,
    bookmarks: 145,
    verified: true,
  },
  {
    id: 4,
    title: "Traditional Jordanian Courtyard Houses: Lessons for Contemporary Sustainable Design",
    authors: ["Prof. Hala Qudah"],
    university: "Yarmouk University",
    category: "Sustainability",
    language: "Arabic",
    date: "2024-03-05",
    abstract:
      "An in-depth analysis of traditional Jordanian courtyard houses, examining their passive cooling strategies, spatial organization, and social functions. The research extracts design principles applicable to contemporary sustainable architecture in Jordan.",
    keywords: ["Traditional Architecture", "Courtyard Houses", "Passive Design", "Cultural Heritage"],
    pdfUrl: "#",
    externalLink: null,
    images: ["/traditional-jordanian-courtyard-house-stone-archit.jpg"],
    likes: 189,
    comments: 27,
    bookmarks: 112,
    verified: true,
  },
  {
    id: 5,
    title: "Smart Cities and IoT Integration in Jordanian Urban Planning",
    authors: ["Ahmad Khalil", "Lina Haddad"],
    university: "Princess Sumaya University for Technology",
    category: "Technology",
    language: "English",
    date: "2024-01-28",
    abstract:
      "This research explores the integration of Internet of Things (IoT) technologies in Jordanian urban planning, focusing on smart infrastructure, energy management, and citizen engagement. Case studies from Amman and Aqaba demonstrate practical applications.",
    keywords: ["Smart Cities", "IoT", "Urban Planning", "Technology Integration"],
    pdfUrl: "#",
    externalLink: "https://example.com/smart-cities",
    images: ["/smart-city-technology-iot-urban-planning-digital.jpg"],
    likes: 167,
    comments: 19,
    bookmarks: 94,
    verified: false,
  },
  {
    id: 6,
    title: "Water-Sensitive Urban Design for Arid Climates: A Framework for Jordanian Cities",
    authors: ["Dr. Rania Al-Masri", "Eng. Tariq Nasser"],
    university: "University of Jordan",
    category: "Sustainability",
    language: "English/Arabic",
    date: "2023-12-15",
    abstract:
      "Developing a comprehensive framework for water-sensitive urban design tailored to Jordan's arid climate. The research addresses stormwater management, water conservation, and landscape design strategies for sustainable urban development.",
    keywords: ["Water Management", "Sustainable Design", "Arid Climate", "Urban Design"],
    pdfUrl: "#",
    externalLink: null,
    images: ["/water-sensitive-urban-design-landscape-architectur.jpg"],
    likes: 201,
    comments: 25,
    bookmarks: 128,
    verified: true,
  },
]

export default function ResearchHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredResearch = researchPapers
    .filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory
      const matchesLanguage = selectedLanguage === "all" || paper.language.includes(selectedLanguage)
      const matchesUniversity = selectedUniversity === "all" || paper.university === selectedUniversity
      return matchesSearch && matchesCategory && matchesLanguage && matchesUniversity
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "popular") return b.likes - a.likes
      if (sortBy === "bookmarks") return b.bookmarks - a.bookmarks
      if (sortBy === "comments") return b.comments - a.comments
      return 0
    })

  const categories = ["all", ...Array.from(new Set(researchPapers.map((p) => p.category)))]
  const languages = ["all", "English", "Arabic", "English/Arabic"]
  const universities = ["all", ...Array.from(new Set(researchPapers.map((p) => p.university)))]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <BookOpen className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Research Hub</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">
              Architectural Research & Academic Papers
            </h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Explore architectural research shaping the future — by professors, students, and practitioners in multiple
              languages
            </p>
            <div className="mt-6">
              <ResearchSubmitDialog />
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
                placeholder="Search research, authors, keywords..."
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
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="University" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university === "all" ? "All Universities" : university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="bookmarks">Most Bookmarked</SelectItem>
                  <SelectItem value="comments">Most Discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>
                <Filter className="inline h-4 w-4 mr-1" />
                {filteredResearch.length} research papers found
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Papers List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredResearch.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No research papers found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredResearch.map((paper) => (
                <Card key={paper.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="grid gap-6 md:grid-cols-[280px_1fr]">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary/30">
                      <img
                        src={paper.images[0] || "/placeholder.svg"}
                        alt={paper.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <span className="text-muted-foreground mr-1">Category:</span>
                          {paper.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <span className="text-muted-foreground mr-1">Language:</span>
                          {paper.language}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <span className="text-muted-foreground mr-1">Published:</span>
                          {new Date(paper.date).toLocaleDateString()}
                        </Badge>
                        {paper.verified && (
                          <div className="flex items-center gap-1">
                            <VerificationBadge size="sm" />
                            <span className="text-xs text-muted-foreground">Verified</span>
                          </div>
                        )}
                      </div>

                      <Link href={`/research/${paper.id}`}>
                        <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 hover:text-accent transition-colors text-balance">
                          {paper.title}
                        </h3>
                      </Link>

                      <div className="mb-3 space-y-1 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground font-medium min-w-[80px]">Authors:</span>
                          <span className="font-medium">
                            {paper.authors.map((author, idx) => (
                              <span key={idx}>
                                {author}
                                {idx < paper.authors.length - 1 && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground font-medium min-w-[80px]">University:</span>
                          <span>{paper.university}</span>
                        </div>
                      </div>

                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                        {paper.abstract}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {paper.keywords.slice(0, 4).map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-3 pb-3 border-b">
                          <CompareButton
                            item={{
                              id: paper.id.toString(),
                              type: "research",
                              title: paper.title,
                              image: paper.images[0],
                              metadata: {
                                Authors: paper.authors.join(", "),
                                University: paper.university,
                                Category: paper.category,
                                Date: new Date(paper.date).toLocaleDateString(),
                                Language: paper.language,
                              },
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <SocialInteractions
                            contentId={paper.id.toString()}
                            contentType="research"
                            initialLikes={paper.likes}
                            initialComments={paper.comments}
                            showRepost={false}
                            showReport={true}
                          />

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {paper.externalLink && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={paper.externalLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="bg-transparent" asChild>
                              <a href={paper.pdfUrl} download>
                                <Download className="mr-2 h-3.5 w-3.5" />
                                PDF
                              </a>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/research/${paper.id}`}>Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
