import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar, Building2, Users, Tag } from "lucide-react"
import Link from "next/link"
import { VerificationBadge } from "@/components/verification-badge"
import { SocialInteractions } from "@/components/social-interactions"
import { CommentSection } from "@/components/comment-section"

// Dummy data for a single research paper
const researchPaper = {
  id: 1,
  title: "Sustainable Urban Development in Amman: A Case Study of Green Infrastructure Integration",
  authors: [
    { name: "Dr. Layla Al-Hassan", verified: true, affiliation: "University of Jordan" },
    { name: "Prof. Ahmad Mansour", verified: true, affiliation: "University of Jordan" },
  ],
  university: "University of Jordan",
  department: "Department of Architecture and Design",
  category: "Urban Planning",
  date: "2024-01-15",
  abstract:
    "This research investigates the integration of green infrastructure in Amman's urban fabric, analyzing the impact on microclimate, air quality, and community well-being. The study proposes a framework for sustainable urban development applicable to Middle Eastern cities facing similar challenges of rapid urbanization and climate change.",
  fullDescription: `This comprehensive study examines the potential of green infrastructure as a tool for sustainable urban development in Amman, Jordan. Through a mixed-methods approach combining spatial analysis, environmental monitoring, and community surveys, the research identifies key opportunities and challenges for implementing green infrastructure in the city's diverse neighborhoods.

The study focuses on three pilot sites representing different urban typologies: a dense commercial district, a residential neighborhood, and a peri-urban area. Environmental data collected over 18 months demonstrates significant improvements in microclimate conditions, with temperature reductions of up to 3°C in areas with enhanced green infrastructure.

Community engagement revealed strong support for green infrastructure initiatives, with residents reporting improved quality of life and increased social interaction in greened public spaces. The research concludes with a scalable framework for green infrastructure implementation that can be adapted to other Middle Eastern cities.`,
  keywords: [
    "Sustainable Development",
    "Green Infrastructure",
    "Urban Planning",
    "Amman",
    "Climate Change",
    "Community Well-being",
  ],
  methodology: "Mixed-methods approach combining spatial analysis, environmental monitoring, and community surveys",
  findings: [
    "Temperature reductions of up to 3°C in areas with enhanced green infrastructure",
    "Improved air quality with 15% reduction in particulate matter",
    "85% of residents reported improved quality of life in greened areas",
    "Increased biodiversity with 40% more bird species observed",
  ],
  pdfUrl: "#",
  externalLink: "https://example.com/research",
  images: ["/urban-green-infrastructure-amman.jpg", "/green-roof-architecture.jpg", "/urban-park-design.png"],
  relatedResearch: [
    {
      id: 2,
      title: "Water-Sensitive Urban Design for Arid Climates",
      authors: ["Dr. Rania Al-Masri"],
      category: "Sustainability",
    },
    {
      id: 3,
      title: "Traditional Jordanian Courtyard Houses: Lessons for Contemporary Design",
      authors: ["Prof. Hala Qudah"],
      category: "Sustainability",
    },
  ],
}

export default function ResearchDetailPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{researchPaper.category}</Badge>
              <Badge variant="secondary">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(researchPaper.date).toLocaleDateString()}
              </Badge>
            </div>

            <h1 className="font-serif text-4xl font-bold md:text-5xl mb-6 text-balance">{researchPaper.title}</h1>

            <div className="mb-6 space-y-3">
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Authors:</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {researchPaper.authors.map((author, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="text-sm">{author.name}</span>
                        {author.verified && <VerificationBadge size="sm" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{researchPaper.university}</p>
                  <p className="text-sm text-muted-foreground">{researchPaper.department}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={researchPaper.pdfUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
              {researchPaper.externalLink && (
                <Button variant="outline" asChild>
                  <a href={researchPaper.externalLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    External Link
                  </a>
                </Button>
              )}
              <SocialInteractions contentId={researchPaper.id.toString()} contentType="research" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              <div className="space-y-8">
                {/* Images */}
                <div className="space-y-4">
                  {researchPaper.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image || "/placeholder.svg"}
                      alt={`Research image ${idx + 1}`}
                      className="w-full rounded-lg border"
                    />
                  ))}
                </div>

                {/* Abstract */}
                <Card>
                  <CardHeader>
                    <CardTitle>Abstract</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{researchPaper.abstract}</p>
                  </CardContent>
                </Card>

                {/* Full Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Research Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      {researchPaper.fullDescription.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="mb-4 text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Methodology */}
                <Card>
                  <CardHeader>
                    <CardTitle>Methodology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{researchPaper.methodology}</p>
                  </CardContent>
                </Card>

                {/* Key Findings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Findings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {researchPaper.findings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Comments */}
                <CommentSection contentId={researchPaper.id.toString()} contentType="research" />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Tag className="h-4 w-4" />
                      Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {researchPaper.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Research */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Research</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {researchPaper.relatedResearch.map((related) => (
                        <Link
                          key={related.id}
                          href={`/research/${related.id}`}
                          className="block group transition-colors"
                        >
                          <p className="font-medium text-sm group-hover:text-accent transition-colors mb-1 text-balance">
                            {related.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{related.authors.join(", ")}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {related.category}
                          </Badge>
                        </Link>
                      ))}
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
