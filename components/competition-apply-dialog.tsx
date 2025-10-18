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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CompetitionApplyDialogProps {
  competitionId: string
  competitionTitle: string
}

export function CompetitionApplyDialog({ competitionId, competitionTitle }: CompetitionApplyDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsOpen(false)

    toast({
      title: "Application submitted",
      description:
        "Your application has been submitted successfully. You'll receive updates via email and notifications.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="default">
          <Send className="mr-2 h-4 w-4" />
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Apply to Competition</DialogTitle>
          <DialogDescription>{competitionTitle}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Ahmad Khalil" disabled className="bg-secondary/50" />
              <p className="text-xs text-muted-foreground">From your ArchNet profile</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="ahmad@example.com" disabled className="bg-secondary/50" />
              <p className="text-xs text-muted-foreground">From your ArchNet profile</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization / University</Label>
              <Input id="organization" placeholder="Enter your organization" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team Members (Optional)</Label>
              <Textarea id="team" placeholder="List team member names and roles" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statement">Design Statement</Label>
              <Textarea
                id="statement"
                placeholder="Briefly describe your design approach and concept"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Upload Portfolio / Previous Work</Label>
              <div className="mt-2 flex items-center gap-2">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Files
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 10MB)</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
