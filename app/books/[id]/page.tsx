import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, FileText, Calendar, Globe, Hash } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const book = {
  id: 1,
  title: "Architectural Theory: An Anthology",
  author: "Various Authors",
  category: "Theory",
  year: 2023,
  pages: 856,
  language: "English",
  description: "A comprehensive collection of architectural theory texts from ancient to contemporary times.",
  fullDescription: `This comprehensive anthology brings together the most influential texts in architectural theory, spanning from ancient civilizations to contemporary practice. The collection includes seminal works by Vitruvius, Alberti, Le Corbusier, and contemporary theorists.

The book is organized chronologically, allowing readers to trace the evolution of architectural thought through different periods and movements. Each text is accompanied by contextual introductions and critical commentary.

Essential reading for architecture students, practitioners, and anyone interested in understanding the theoretical foundations of architectural practice.`,
  cover: "/placeholder.svg?key=bookdetail1",
  type: "PDF",
  size: "45 MB",
  isbn: "978-1-234567-89-0",
  publisher: "Architectural Press",
  edition: "3rd Edition",
  tableOfContents: [
    "Part I: Ancient & Classical Theory",
    "Part II: Renaissance & Baroque",
    "Part III: Modernism & the International Style",
    "Part IV: Postmodernism & Deconstruction",
    "Part V: Contemporary Theory & Practice",
    "Part VI: Sustainability & Future Directions",
  ],
  relatedBooks: [
    { id: 2, title: "Sustainable Design Principles", category: "Sustainability" },
    { id: 6, title: "Digital Design & Parametric Architecture", category: "Digital Design" },
    { id: 5, title: "Islamic Architecture Heritage", category: "History" },
  ],
}

export default function BookDetailPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Book Header */}
      <section className="border-b py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="h-full w-full object-cover" />
                </div>
                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>
                  <Button className="w-full bg-transparent" size="lg" variant="outline">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Read Online
                  </Button>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2">
              <Badge variant="outline" className="mb-4">
                {book.category}
              </Badge>
              <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">{book.title}</h1>
              <p className="mt-2 text-xl text-muted-foreground">by {book.author}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="font-semibold">{book.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-semibold">{book.pages}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-semibold">{book.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Hash className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-semibold">{book.size}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 font-serif text-2xl font-bold">About This Book</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {book.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Publication Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">ISBN</dt>
                      <dd className="font-semibold">{book.isbn}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Publisher</dt>
                      <dd className="font-semibold">{book.publisher}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Edition</dt>
                      <dd className="font-semibold">{book.edition}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Format</dt>
                      <dd className="font-semibold">{book.type}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {book.tableOfContents.map((chapter, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 text-sm font-semibold text-accent">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{chapter}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 font-serif text-2xl font-bold">Related Books</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {book.relatedBooks.map((relatedBook) => (
                <Card key={relatedBook.id} className="transition-all hover:shadow-lg">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10" />
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      {relatedBook.category}
                    </Badge>
                    <CardTitle className="text-lg">{relatedBook.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline" size="sm" asChild>
                      <Link href={`/books/${relatedBook.id}`}>
                        View Book
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
