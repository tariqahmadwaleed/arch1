"use client"

import { use } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Building2, ExternalLink, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import { SocialInteractions } from "@/components/social-interactions"
import { useState } from "react"

// Sample news data (in a real app, this would come from a database)
const newsData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Jordan Wins International Architecture Award",
    category: "Awards",
    region: "National",
    date: "2024-01-15",
    source: "Aga Khan Award",
    excerpt:
      "Jordanian architect receives prestigious Aga Khan Award for Architecture for sustainable community center design.",
    image: "/modern-architecture-award-winning-building-design.jpg",
    author: "ArchNet Editorial",
    content: `
      <p>In a momentous achievement for Jordanian architecture, architect Dr. Layla Al-Hassan has been awarded the prestigious Aga Khan Award for Architecture for her innovative sustainable community center design in Amman.</p>
      
      <p>The award, which recognizes excellence in architecture that addresses the needs and aspirations of communities where Muslims have a significant presence, was presented at a ceremony in Geneva, Switzerland.</p>
      
      <h2>Innovative Design Approach</h2>
      <p>Dr. Al-Hassan's community center integrates traditional Jordanian architectural elements with cutting-edge sustainable technologies. The building features passive cooling systems inspired by historic courtyard houses, combined with modern solar panels and rainwater harvesting systems.</p>
      
      <p>"This project demonstrates how we can honor our architectural heritage while addressing contemporary environmental challenges," said Dr. Al-Hassan during her acceptance speech.</p>
      
      <h2>Community Impact</h2>
      <p>The community center serves over 5,000 residents in East Amman, providing educational facilities, healthcare services, and cultural spaces. The design prioritizes accessibility and inclusivity, with spaces that accommodate diverse community needs.</p>
      
      <p>The Aga Khan Award jury praised the project for its "sensitive integration of traditional and contemporary design principles, creating a space that truly serves its community while setting new standards for sustainable architecture in the region."</p>
      
      <h2>Recognition for Jordanian Architecture</h2>
      <p>This marks the third time a Jordanian architect has received the Aga Khan Award, highlighting the country's growing reputation for architectural excellence and innovation in the Middle East.</p>
      
      <p>The award comes with a prize of $1 million, which Dr. Al-Hassan plans to use to establish a scholarship fund for architecture students from underserved communities in Jordan.</p>
    `,
    relatedNews: [2, 4],
  },
  "2": {
    id: 2,
    title: "New Sustainable Building Code Announced",
    category: "Policy",
    region: "National",
    date: "2024-01-12",
    source: "Ministry of Public Works",
    excerpt:
      "Ministry of Public Works introduces updated building codes focusing on energy efficiency and sustainability.",
    image: "/sustainable-building-code-green-construction.jpg",
    author: "ArchNet Editorial",
    content: `
      <p>The Ministry of Public Works and Housing has announced comprehensive updates to Jordan's National Building Code, introducing stringent requirements for energy efficiency and sustainable construction practices.</p>
      
      <h2>Key Changes</h2>
      <p>The updated code, set to take effect in July 2024, includes mandatory energy performance standards for all new buildings, requirements for renewable energy integration, and guidelines for water conservation systems.</p>
      
      <p>Minister of Public Works, Eng. Yahya Kasbi, stated: "These updates position Jordan as a regional leader in sustainable construction, aligning our building practices with international best practices while addressing our unique climate challenges."</p>
      
      <h2>Impact on Construction Industry</h2>
      <p>The new regulations will require architects and engineers to incorporate energy modeling into their design processes and demonstrate compliance with minimum energy performance standards before obtaining building permits.</p>
      
      <p>Industry experts estimate that buildings constructed under the new code will achieve 30-40% energy savings compared to current standards, significantly reducing operational costs and environmental impact.</p>
    `,
    relatedNews: [1, 5],
  },
}

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [saved, setSaved] = useState(false)

  const newsItem = newsData[id]

  if (!newsItem) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">News article not found.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <section className="border-b bg-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/news" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="default">{newsItem.category}</Badge>
              <Badge variant="secondary">{newsItem.region}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {new Date(newsItem.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">{newsItem.title}</h1>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {newsItem.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {newsItem.source}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSaved(!saved)}
                  className={saved ? "bg-accent text-accent-foreground" : "bg-transparent"}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${saved ? "fill-current" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary/30">
              <img
                src={newsItem.image || "/placeholder.svg"}
                alt={newsItem.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              {/* Main Content */}
              <div>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: newsItem.content }} />

                <Separator className="my-8" />

                {/* Social Interactions */}
                <div className="flex items-center justify-between">
                  <SocialInteractions
                    contentId={`news-${newsItem.id}`}
                    contentType="news"
                    showRepost={true}
                    showReport={true}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Related News */}
                {newsItem.relatedNews && newsItem.relatedNews.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 font-semibold">Related News</h3>
                      <div className="space-y-4">
                        {newsItem.relatedNews.map((relatedId: number) => {
                          const related = newsData[relatedId.toString()]
                          if (!related) return null
                          return (
                            <Link key={relatedId} href={`/news/${relatedId}`} className="group block space-y-2">
                              <div className="relative aspect-video overflow-hidden rounded-md bg-secondary/30">
                                <img
                                  src={related.image || "/placeholder.svg"}
                                  alt={related.title}
                                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                              <h4 className="text-sm font-medium leading-tight group-hover:text-accent transition-colors">
                                {related.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {new Date(related.date).toLocaleDateString()}
                              </p>
                            </Link>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Share Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Share this article</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <Share2 className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Share on Social Media
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
