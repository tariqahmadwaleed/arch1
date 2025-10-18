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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Newspaper } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NewsSubmitDialog() {
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
      title: "News submitted successfully",
      description: "Your submission will be reviewed and published soon.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Submit News
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Newspaper className="h-6 w-6" />
            Submit News or Event
          </DialogTitle>
          <DialogDescription>Share architecture news, awards, or events with the ArchNet community</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="news-type">Type *</Label>
              <Select required>
                <SelectTrigger id="news-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News Article</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="award">Award</SelectItem>
                  <SelectItem value="project">Project Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" placeholder="Enter news title" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awards">Awards</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select required>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="amman">Amman</SelectItem>
                    <SelectItem value="aqaba">Aqaba</SelectItem>
                    <SelectItem value="jerash">Jerash</SelectItem>
                    <SelectItem value="petra">Petra</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" placeholder="Provide a detailed description..." rows={5} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input id="source" placeholder="e.g., Ministry of Culture" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">External URL (Optional)</Label>
              <Input id="url" type="url" placeholder="https://example.com/article" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input id="image" type="url" placeholder="https://example.com/image.jpg" />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
