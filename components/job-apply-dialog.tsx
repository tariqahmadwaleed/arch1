"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, FileText } from "lucide-react"

interface JobApplyDialogProps {
  jobId: string
  jobTitle: string
}

export function JobApplyDialog({ jobId, jobTitle }: JobApplyDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [useProfile, setUseProfile] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle application submission
    console.log("[v0] Submitting application for job:", jobId)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="transition-all duration-200 hover:scale-105">
          <Send className="mr-2 h-4 w-4" />
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Submit your application using your ArchNet profile. Your profile information will be shared with the
            employer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="use-profile" checked={useProfile} onCheckedChange={(checked) => setUseProfile(!!checked)} />
            <Label htmlFor="use-profile" className="text-sm font-normal cursor-pointer">
              Use my ArchNet profile information
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
            <Textarea
              id="cover-letter"
              placeholder="Tell the employer why you're a great fit for this position..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="rounded-lg bg-secondary/30 p-4">
            <div className="flex items-start gap-2">
              <FileText className="h-5 w-5 text-accent mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Your profile will include:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Name and contact information</li>
                  <li>• Professional title and bio</li>
                  <li>• Portfolio and projects</li>
                  <li>• Education and experience</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
