"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Search, MapPin, Clock, Building2, DollarSign } from "lucide-react"
import Link from "next/link"
import { JobApplyDialog } from "@/components/job-apply-dialog"
import { SocialInteractions } from "@/components/social-interactions"
import { JobPostDialog } from "@/components/job-post-dialog"

const jobs = [
  {
    id: 1,
    title: "Senior Architect",
    company: "Mada Design Studio",
    companyType: "office",
    location: "Amman, Jordan",
    type: "Full-time",
    level: "Senior",
    yearsExperience: "10+",
    salary: "Competitive",
    status: "Paid",
    posted: "2 days ago",
    description: "Seeking an experienced architect to lead design projects for cultural and commercial buildings.",
    requirements: ["10+ years experience", "Licensed architect", "Proficiency in Revit and AutoCAD"],
  },
  {
    id: 2,
    title: "Architecture Intern",
    company: "Jordan Design Collective",
    location: "Amman, Jordan",
    type: "Internship",
    level: "Student",
    yearsExperience: "0",
    salary: "Stipend provided",
    status: "Free",
    posted: "1 week ago",
    description: "Summer internship opportunity for architecture students to work on real projects.",
    requirements: ["Currently enrolled in architecture program", "Basic CAD skills", "Portfolio required"],
  },
  {
    id: 3,
    title: "Project Architect",
    company: "Levant Architecture",
    location: "Aqaba, Jordan",
    type: "Full-time",
    level: "Mid-Level",
    yearsExperience: "5-7",
    salary: "JOD 800-1200/month",
    status: "Paid",
    posted: "3 days ago",
    description: "Join our team working on hospitality and resort projects in the Aqaba region.",
    requirements: ["5-7 years experience", "Strong design skills", "Experience with hospitality projects preferred"],
  },
  {
    id: 4,
    title: "BIM Specialist",
    company: "Tech Architecture Group",
    location: "Amman, Jordan",
    type: "Full-time",
    level: "Mid-Level",
    yearsExperience: "4-6",
    salary: "JOD 1000-1500/month",
    status: "Paid",
    posted: "5 days ago",
    description: "Lead BIM implementation and coordination for large-scale commercial projects.",
    requirements: ["Revit expert", "BIM coordination experience", "Navisworks and Dynamo knowledge"],
  },
  {
    id: 5,
    title: "Urban Planning Intern",
    company: "Greater Amman Municipality",
    location: "Amman, Jordan",
    type: "Internship",
    level: "Student",
    yearsExperience: "0",
    salary: "Unpaid",
    status: "Free",
    posted: "1 week ago",
    description: "Assist with urban planning studies and community development projects.",
    requirements: ["Urban planning or architecture student", "GIS knowledge preferred", "Research skills"],
  },
  {
    id: 6,
    title: "Interior Designer",
    company: "Heritage Design Studio",
    location: "Amman, Jordan",
    type: "Full-time",
    level: "Junior",
    yearsExperience: "2-3",
    salary: "JOD 700-1000/month",
    status: "Paid",
    posted: "4 days ago",
    description: "Design interior spaces for residential and commercial projects with cultural sensitivity.",
    requirements: ["Interior design degree", "3D visualization skills", "Knowledge of local materials"],
  },
  {
    id: 7,
    title: "Landscape Architect",
    company: "Green Jordan Consultants",
    location: "Amman, Jordan",
    type: "Full-time",
    level: "Senior",
    yearsExperience: "8+",
    salary: "Competitive",
    status: "Paid",
    posted: "1 week ago",
    description: "Design sustainable landscapes for public spaces and private developments.",
    requirements: ["Landscape architecture degree", "8+ years experience", "Knowledge of arid climate design"],
  },
  {
    id: 8,
    title: "Graduate Architect",
    company: "Studio Mada",
    location: "Amman, Jordan",
    type: "Full-time",
    level: "Graduate",
    yearsExperience: "0-2",
    salary: "JOD 600-900/month",
    status: "Paid",
    posted: "2 days ago",
    description: "Entry-level position for recent graduates to develop skills across various project types.",
    requirements: ["Architecture degree", "Portfolio required", "Eager to learn", "Team player"],
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || job.type === selectedType
    const matchesLevel = selectedLevel === "all" || job.level === selectedLevel
    const matchesStatus = selectedStatus === "all" || job.status === selectedStatus
    return matchesSearch && matchesType && matchesLevel && matchesStatus
  })

  const types = ["all", ...Array.from(new Set(jobs.map((j) => j.type)))]
  const levels = ["all", "Student", "Graduate", "Junior", "Mid-Level", "Senior"]
  const statuses = ["all", "Free", "Paid"]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <Briefcase className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Jobs & Internships in Jordan</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Find Your Next Opportunity</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Discover architectural job opportunities and internships across Jordan
            </p>
            <div className="mt-6">
              <JobPostDialog />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{jobs.length}</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{jobs.filter((j) => j.type === "Full-time").length}</p>
              <p className="text-sm text-muted-foreground">Full-time Jobs</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">{jobs.filter((j) => j.type === "Internship").length}</p>
              <p className="text-sm text-muted-foreground">Internships</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Companies</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs, companies..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredJobs.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="transition-all hover:shadow-lg flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant={job.type === "Internship" ? "secondary" : "default"}>{job.type}</Badge>
                          <Badge variant="outline">{job.level}</Badge>
                          <Badge
                            variant={job.status === "Free" ? "secondary" : "default"}
                            className={job.status === "Paid" ? "bg-accent text-accent-foreground" : ""}
                          >
                            <DollarSign className="mr-1 h-3 w-3" />
                            {job.status}
                          </Badge>
                          {job.companyType === "office" && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Building2 className="mr-1 h-3 w-3" />
                              Engineering Office
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-2xl text-balance">
                          <Link href={`/jobs/${job.id}`} className="hover:text-accent transition-colors">
                            {job.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                          <Link
                            href={
                              job.companyType === "office"
                                ? `/profile/${job.company.toLowerCase().replace(/\s+/g, "-")}`
                                : "#"
                            }
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                          >
                            <Building2 className="h-4 w-4" />
                            {job.company}
                          </Link>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-accent">{job.salary}</p>
                        <p className="text-xs text-muted-foreground">{job.yearsExperience} years</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-semibold">Requirements:</p>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <JobApplyDialog jobId={job.id.toString()} jobTitle={job.title} />
                        <Button variant="outline" className="bg-transparent" asChild>
                          <Link href={`/jobs/${job.id}`}>View Details</Link>
                        </Button>
                      </div>
                      <div className="border-t pt-3">
                        <SocialInteractions
                          contentId={job.id.toString()}
                          contentType="job"
                          showRepost={false}
                          showReport={true}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-accent py-12 text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Hiring Architects?</h2>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            Post your job openings and connect with talented architects and students across Jordan.
          </p>
          <div className="mt-6">
            <JobPostDialog />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
