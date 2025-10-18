"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookMarked, FileText, Clock } from "lucide-react"
import Link from "next/link"

export default function LibraryPage() {
  const savedBooks = [
    {
      id: 1,
      title: "Architectural Theory: An Anthology",
      author: "Various Authors",
      category: "Theory",
      savedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Sustainable Design Principles",
      author: "Dr. Ahmad Hassan",
      category: "Sustainability",
      savedDate: "2024-01-10",
    },
  ]

  const savedProjects = [
    {
      id: 1,
      title: "Modern Museum in Amman",
      author: "Sarah Al-Masri",
      category: "Cultural",
      savedDate: "2024-01-12",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <BookMarked className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Personal Library</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">My Library</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Access all your saved books, resources, and projects in one place
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="books" className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedBooks.map((book) => (
                  <Card key={book.id}>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">
                        {book.category}
                      </Badge>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Saved {book.savedDate}</span>
                      </div>
                      <Button className="mt-4 w-full" asChild>
                        <Link href={`/books/${book.id}`}>View Book</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Saved {project.savedDate}</span>
                      </div>
                      <Button className="mt-4 w-full" asChild>
                        <Link href={`/projects/${project.id}`}>View Project</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <div className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No saved resources yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
