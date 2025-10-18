"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Clock, Users, Star, Bell, Play, Calendar } from "lucide-react"
import { FavoriteButton } from "@/components/favorite-button"
import { SocialInteractions } from "@/components/social-interactions"
import Link from "next/link"

const ongoingCourses = [
  {
    id: 1,
    title: "Introduction to Sustainable Architecture",
    instructor: "Dr. Ahmad Hassan",
    duration: "6 weeks",
    students: 234,
    rating: 4.8,
    level: "Beginner",
    description: "Learn the fundamentals of sustainable design and green building practices.",
    image: "/sustainable-architecture-course-green-building.jpg",
    status: "ongoing",
    progress: 45,
    likes: 89,
    comments: 23,
  },
  {
    id: 2,
    title: "Advanced BIM Techniques",
    instructor: "Tech Architecture Group",
    duration: "8 weeks",
    students: 156,
    rating: 4.9,
    level: "Advanced",
    description: "Master Building Information Modeling for complex architectural projects.",
    image: "/bim-revit-architecture-course-modeling.jpg",
    status: "ongoing",
    progress: 30,
    likes: 67,
    comments: 18,
  },
  {
    id: 3,
    title: "Parametric Design with Grasshopper",
    instructor: "Maya Chen",
    duration: "10 weeks",
    students: 189,
    rating: 4.7,
    level: "Intermediate",
    description: "Explore computational design and parametric modeling techniques.",
    image: "/parametric-design-grasshopper-computational-archit.jpg",
    status: "ongoing",
    progress: 60,
    likes: 102,
    comments: 31,
  },
]

const upcomingCourses = [
  {
    id: 4,
    title: "Architectural Visualization Masterclass",
    instructor: "Studio Render",
    duration: "7 weeks",
    students: 0,
    rating: 4.8,
    level: "Intermediate",
    description: "Create stunning architectural renderings and presentations.",
    image: "/architectural-visualization-rendering-3d-photoreali.jpg",
    status: "upcoming",
    startsOn: "March 1, 2025",
    likes: 145,
    comments: 42,
  },
  {
    id: 5,
    title: "Heritage Conservation Principles",
    instructor: "Prof. Hala Qudah",
    duration: "5 weeks",
    students: 0,
    rating: 4.9,
    level: "Beginner",
    description: "Understanding principles and practices of architectural heritage conservation.",
    image: "/heritage-conservation-restoration-historic-buildin.jpg",
    status: "upcoming",
    startsOn: "March 15, 2025",
    likes: 98,
    comments: 27,
  },
  {
    id: 6,
    title: "Urban Design Fundamentals",
    instructor: "Dr. Layla Al-Hassan",
    duration: "9 weeks",
    students: 0,
    rating: 4.6,
    level: "Intermediate",
    description: "Master the principles of urban design and city planning.",
    image: "/urban-design-city-planning-public-spaces.jpg",
    status: "upcoming",
    startsOn: "April 5, 2025",
    likes: 76,
    comments: 19,
  },
]

const pastCourses = [
  {
    id: 7,
    title: "Modern Architecture History",
    instructor: "Prof. Omar Khalil",
    duration: "6 weeks",
    students: 312,
    rating: 4.7,
    level: "Beginner",
    description: "Explore the evolution of modern architecture from the 20th century to today.",
    image: "/modern-architecture-history-20th-century.jpg",
    status: "past",
    completedOn: "January 15, 2025",
    likes: 187,
    comments: 54,
  },
  {
    id: 8,
    title: "Construction Technology and Materials",
    instructor: "Eng. Sarah Al-Masri",
    duration: "8 weeks",
    students: 245,
    rating: 4.8,
    level: "Intermediate",
    description: "Deep dive into modern construction methods and innovative materials.",
    image: "/construction-technology-materials-building.jpg",
    status: "past",
    completedOn: "December 20, 2024",
    likes: 156,
    comments: 38,
  },
  {
    id: 9,
    title: "Landscape Architecture Basics",
    instructor: "Dr. Noor Al-Hassan",
    duration: "5 weeks",
    students: 198,
    rating: 4.6,
    level: "Beginner",
    description: "Introduction to landscape design principles and site planning.",
    image: "/landscape-architecture-design-outdoor-spaces.jpg",
    status: "past",
    completedOn: "November 30, 2024",
    likes: 134,
    comments: 29,
  },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("ongoing")

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <GraduationCap className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Learning Hub</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Courses</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Expand your architectural knowledge with expert-led courses
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{ongoingCourses.length}</p>
              <p className="text-sm text-muted-foreground">Ongoing Courses</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{upcomingCourses.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming Courses</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{pastCourses.length}</p>
              <p className="text-sm text-muted-foreground">Past Courses</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">1,200+</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="ongoing">
                <Play className="mr-2 h-4 w-4" />
                Ongoing
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past">
                <GraduationCap className="mr-2 h-4 w-4" />
                Past
              </TabsTrigger>
            </TabsList>

            {/* Ongoing Courses Tab */}
            <TabsContent value="ongoing">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold mb-2">Available Courses</h2>
                <p className="text-muted-foreground">Register now and start learning immediately</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ongoingCourses.map((course) => (
                  <Card key={course.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-secondary/30">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <FavoriteButton itemId={`course-${course.id}`} itemType="course" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 text-white">Available Now</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <SocialInteractions
                        postId={`course-${course.id}`}
                        initialLikes={course.likes}
                        initialComments={course.comments}
                        onComment={() => {}}
                        className="mb-4 pb-4 border-b"
                      />
                      <Button className="w-full mt-auto" asChild>
                        <Link href={`/courses/${course.id}`}>Register Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Upcoming Courses Tab */}
            <TabsContent value="upcoming">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold mb-2">Upcoming Courses</h2>
                <p className="text-muted-foreground">Set reminders to be notified when registration opens</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingCourses.map((course) => (
                  <Card key={course.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-secondary/30">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <FavoriteButton itemId={`course-${course.id}`} itemType="course" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-500 text-white">Coming Soon</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{course.startsOn}</span>
                        </div>
                      </div>
                      <SocialInteractions
                        postId={`course-${course.id}`}
                        initialLikes={course.likes}
                        initialComments={course.comments}
                        onComment={() => {}}
                        className="mb-4 pb-4 border-b"
                      />
                      <Button className="w-full mt-auto bg-transparent" variant="outline">
                        <Bell className="mr-2 h-4 w-4" />
                        Set Reminder
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Past Courses Tab */}
            <TabsContent value="past">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold mb-2">Past Courses</h2>
                <p className="text-muted-foreground">Access recorded versions of completed courses</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastCourses.map((course) => (
                  <Card key={course.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden bg-secondary/30">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <FavoriteButton itemId={`course-${course.id}`} itemType="course" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary">Recorded</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students} completed</span>
                        </div>
                      </div>
                      <SocialInteractions
                        postId={`course-${course.id}`}
                        initialLikes={course.likes}
                        initialComments={course.comments}
                        onComment={() => {}}
                        className="mb-4 pb-4 border-b"
                      />
                      <Button className="w-full mt-auto" asChild>
                        <Link href={`/courses/${course.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          View Recording
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y bg-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold">Want to Teach a Course?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Share your expertise with the ArchNet community. We're always looking for experienced architects and
            educators to create new courses.
          </p>
          <Button size="lg" className="mt-6">
            Become an Instructor
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
