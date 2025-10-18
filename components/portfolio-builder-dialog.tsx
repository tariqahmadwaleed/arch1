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
import { Plus, Upload } from "lucide-react"

export function PortfolioBuilderDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [projectData, setProjectData] = useState({
    name: "",
    year: "",
    type: "",
    location: "",
    description: "",
    images: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating portfolio project:", projectData)
    setIsOpen(false)
    // Reset form
    setProjectData({
      name: "",
      year: "",
      type: "",
      location: "",
      description: "",
      images: [],
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 transition-all duration-200 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Add Portfolio Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Portfolio Project</DialogTitle>
          <DialogDescription>
            Create a new project entry for your architectural portfolio. Include images, plans, and project details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name *</Label>
            <Input
              id="project-name"
              placeholder="e.g., Sustainable Community Center"
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                value={projectData.year}
                onChange={(e) => setProjectData({ ...projectData, year: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Project Type *</Label>
              <Select
                value={projectData.type}
                onValueChange={(value) => setProjectData({ ...projectData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="interior">Interior Design</SelectItem>
                  <SelectItem value="urban">Urban Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Amman, Jordan"
              value={projectData.location}
              onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your project, design approach, and key features..."
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Project Images</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">Plans, sections, elevations, renders, photos</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add to Portfolio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
