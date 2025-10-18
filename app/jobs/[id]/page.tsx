import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Clock, ExternalLink, Mail } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const job = {
  id: 1,
  title: "Senior Architect",
  company: "Mada Design Studio",
  location: "Amman, Jordan",
  type: "Full-time",
  level: "Experienced",
  salary: "Competitive",
  posted: "2 days ago",
  description: "Seeking an experienced architect to lead design projects for cultural and commercial buildings.",
  fullDescription: `Mada Design Studio is seeking a talented Senior Architect to join our growing team in Amman. This role offers the opportunity to lead significant cultural and commercial projects across Jordan and the wider MENA region.

As a Senior Architect, you will be responsible for leading design teams, managing client relationships, and ensuring the highest quality of architectural output. You will work on diverse projects ranging from cultural institutions to commercial developments, with a focus on contextually sensitive and sustainable design.

We offer a collaborative work environment, opportunities for professional development, and the chance to work on award-winning projects that make a real impact on Jordan's built environment.`,
  requirements: [
    "10+ years of professional experience in architecture",
    "Licensed architect in Jordan or eligible for licensure",
    "Proficiency in Revit, AutoCAD, and Adobe Creative Suite",
    "Strong design and conceptual thinking skills",
    "Experience leading project teams and managing client relationships",
    "Excellent communication skills in English and Arabic",
    "Portfolio demonstrating completed projects",
  ],
  responsibilities: [
    "Lead architectural design from concept through construction documentation",
    "Manage project teams and coordinate with consultants",
    "Present designs to clients and stakeholders",
    "Ensure projects meet quality standards and deadlines",
    "Mentor junior architects and interns",
    "Participate in business development activities",
  ],
  benefits: [
    "Competitive salary based on experience",
    "Health insurance coverage",
    "Professional development opportunities",
    "Flexible working arrangements",
    "Annual performance bonuses",
    "Collaborative studio environment",
  ],
  companyInfo: {
    name: "Mada Design Studio",
    about:
      "Mada Design Studio is an award-winning architecture firm based in Amman, specializing in cultural, educational, and commercial projects. Founded in 2010, we have completed over 50 projects across Jordan and the region.",
    size: "20-50 employees",
    website: "www.madadesign.jo",
  },
}

export default function JobDetailPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Job Header */}
      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant={job.type === "Internship" ? "secondary" : "default"}>{job.type}</Badge>
              <Badge variant="outline">{job.level}</Badge>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">{job.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {job.company}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Posted {job.posted}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button size="lg">
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent">
                Save Job
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About the Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  {job.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">Job Type</dt>
                      <dd className="font-semibold">{job.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Experience Level</dt>
                      <dd className="font-semibold">{job.level}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Location</dt>
                      <dd className="font-semibold">{job.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Salary</dt>
                      <dd className="font-semibold">{job.salary}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Posted</dt>
                      <dd className="font-semibold">{job.posted}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About {job.companyInfo.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{job.companyInfo.about}</p>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Company Size</dt>
                      <dd className="font-semibold">{job.companyInfo.size}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Website</dt>
                      <dd>
                        <Link href="#" className="font-semibold text-accent hover:underline">
                          {job.companyInfo.website}
                        </Link>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle>Ready to Apply?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm opacity-90">
                    Submit your application and portfolio to be considered for this position.
                  </p>
                  <Button className="w-full" variant="secondary">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
