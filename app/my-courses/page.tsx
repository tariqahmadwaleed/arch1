"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Search, Clock, Star, PlayCircle, CheckCircle2, Calendar, Bell } from "lucide-react"
import Link from "next/link"

const myCourses = [
  {
    id: 1,
    title: "Introduction to Sustainable Architecture",
    instructor: "Dr. Ahmad Hassan",
    duration: "6 weeks",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    progress: 65,
    rating: 4.8,
    level: "Beginner",
    language: "English",
    category: "Sustainability",
    description: "Learn the fundamentals of sustainable design and green building practices in hot climates.",
    image: "/sustainable-architecture-course-green-building.jpg",
    nextLesson: "Module 4: Passive Cooling Strategies",
    completedLessons: 13,
    totalLessons: 20,
    status: "ongoing",
  },
  {
    id: 2,
    title: "Parametric Design with Grasshopper",
    instructor: "Maya Chen",
    duration: "10 weeks",
    startDate: "2024-10-15",
    endDate: "2025-01-05",
    progress: 30,
    rating: 4.7,
    level: "Intermediate",
    language: "English",
    category: "Parametric Design",
    description: "Explore computational design and parametric modeling techniques using Grasshopper for Rhino.",
    image: "/parametric-design-grasshopper-computational-archit.jpg",
    nextLesson: "Module 3: Data Trees and Lists",
    completedLessons: 9,
    totalLessons: 30,
    status: "ongoing",
  },
  {
    id: 3,
    title: "BIM for Architectural Practice",
    instructor: "Eng. Khalid Mansour",
    duration: "8 weeks",
    startDate: "2025-02-01",
    endDate: "2025-03-30",
    progress: 0,
    rating: 4.6,
    level: "Intermediate",
    language: "Arabic",
    category: "Technology",
    description:
      "Master Building Information Modeling workflows for efficient architectural documentation and collaboration.",
    image: "/bim-workshop-revit-training-architecture.jpg",
    nextLesson: "Course starts February 1, 2025",
    completedLessons: 0,
    totalLessons: 24,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Islamic Architecture Principles",
    instructor: "Prof. Layla Al-Rashid",
    duration: "6 weeks",
    startDate: "2025-01-15",
    endDate: "2025-02-28",
    progress: 0,
    rating: 4.9,
    level: "Beginner",
    language: "English",
    category: "History",
    description:
      "Understand the principles, patterns, and spatial concepts that define Islamic architectural tradition.",
    image: "/archaeological-pavilion-design-temporary-structure.jpg",
    nextLesson: "Course starts January 15, 2025",
    completedLessons: 0,
    totalLessons: 18,
    status: "upcoming",
  },
  {
    id: 5,
    title: "Heritage Conservation Principles",
    instructor: "Prof. Hala Qudah",
    duration: "5 weeks",
    startDate: "2024-09-01",
    endDate: "2024-10-10",
    progress: 100,
    rating: 4.9,
    level: "Beginner",
    language: "Arabic",
    category: "Heritage",
    description: "Understanding principles and practices of architectural heritage conservation in Jordan.",
    image: "/heritage-conservation-restoration-historic-buildin.jpg",
    nextLesson: "Course Completed",
    completedLessons: 15,
    totalLessons: 15,
    status: "past",
    completionDate: "2024-10-10",
  },
  {
    id: 6,
    title: "AutoCAD for Architects",
    instructor: "Eng. Rami Khalil",
    duration: "4 weeks",
    startDate: "2024-08-01",
    endDate: "2024-09-01",
    progress: 100,
    rating: 4.5,
    level: "Beginner",
    language: "English",
    category: "Technology",
    description: "Master 2D drafting and documentation techniques using AutoCAD for architectural projects.",
    image: "/architecture-lab-digital-fabrication-university.jpg",
    nextLesson: "Course Completed",
    completedLessons: 12,
    totalLessons: 12,
    status: "past",
    completionDate: "2024-09-01",
  },
]

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [reminders, setReminders] = useState<Record<number, boolean>>({})

  const filteredCourses = myCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const ongoingCourses = filteredCourses.filter((c) => c.status === "ongoing")
  const upcomingCourses = filteredCourses.filter((c) => c.status === "upcoming")
  const pastCourses = filteredCourses.filter((c) => c.status === "past")

  const toggleReminder = (id: number) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <GraduationCap className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Learning Dashboard</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">My Courses</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Track your progress and continue learning with your subscribed courses
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="border-b bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ongoing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ongoingCourses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{upcomingCourses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pastCourses.length}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            {/* Ongoing Courses Tab */}
            <TabsContent value="ongoing">
              {ongoingCourses.length === 0 ? (
                <div className="py-12 text-center">
                  <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-serif text-2xl font-bold mb-2">No ongoing courses</h3>
                  <p className="text-muted-foreground mb-6">Start learning by browsing available courses</p>
                  <Button asChild>
                    <Link href="/tools">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
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
                          <Badge variant="default">{course.progress}% Complete</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{course.level}</Badge>
                            <Badge variant="secondary">{course.language}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

                        <div className="mb-3 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>Duration: {course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>
                              {new Date(course.startDate).toLocaleDateString()} -{" "}
                              {new Date(course.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="mb-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
                          <p className="text-xs text-muted-foreground mb-1">Next Lesson</p>
                          <p className="text-sm font-medium">{course.nextLesson}</p>
                        </div>

                        <Button className="w-full mt-auto" asChild>
                          <Link href={`/courses/${course.id}`}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continue Learning
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Upcoming Courses Tab */}
            <TabsContent value="upcoming">
              {upcomingCourses.length === 0 ? (
                <div className="py-12 text-center">
                  <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-serif text-2xl font-bold mb-2">No upcoming courses</h3>
                  <p className="text-muted-foreground mb-6">Browse and enroll in new courses</p>
                  <Button asChild>
                    <Link href="/tools">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
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
                          <Badge variant="secondary">Upcoming</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{course.level}</Badge>
                            <Badge variant="secondary">{course.language}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

                        <div className="mb-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>Duration: {course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>Starts: {new Date(course.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>Ends: {new Date(course.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-muted-foreground mb-1">Course Status</p>
                          <p className="text-sm font-medium">{course.nextLesson}</p>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full mb-2 bg-transparent"
                          onClick={() => toggleReminder(course.id)}
                        >
                          <Bell className={`mr-2 h-4 w-4 ${reminders[course.id] ? "fill-current" : ""}`} />
                          {reminders[course.id] ? "Reminder Set" : "Set Reminder"}
                        </Button>

                        <Button variant="outline" className="w-full mt-auto bg-transparent" asChild>
                          <Link href={`/courses/${course.id}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Past Courses Tab */}
            <TabsContent value="past">
              {pastCourses.length === 0 ? (
                <div className="py-12 text-center">
                  <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-serif text-2xl font-bold mb-2">No completed courses yet</h3>
                  <p className="text-muted-foreground mb-6">Complete your ongoing courses to see them here</p>
                  <Button asChild>
                    <Link href="/tools">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
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
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{course.level}</Badge>
                            <Badge variant="secondary">{course.language}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-balance">{course.title}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

                        <div className="mb-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>Duration: {course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>Completed: {new Date(course.completionDate!).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">{course.totalLessons} lessons completed</span>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full mt-auto bg-transparent" asChild>
                          <Link href={`/courses/${course.id}`}>Review Course</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Browse More Courses */}
      <section className="border-t bg-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Explore More Courses</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground mb-6">
            Expand your architectural knowledge with expert-led courses on various topics
          </p>
          <Button asChild>
            <Link href="/tools">Browse All Courses</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
