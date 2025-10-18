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
import { X, FileText, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export function ResearchSubmitDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [authors, setAuthors] = useState("")
  const [university, setUniversity] = useState("")
  const [abstract, setAbstract] = useState("")
  const [category, setCategory] = useState("")
  const [publicationYear, setPublicationYear] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const { toast } = useToast()

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validImages = files.filter((file) => file.type.startsWith("image/"))
    if (validImages.length > 0) {
      setImageFiles([...imageFiles, ...validImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title || !authors || !university || !abstract || !category || !publicationYear) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would upload to a server
    console.log("[v0] Submitting research:", {
      title,
      authors,
      university,
      abstract,
      category,
      publicationYear,
      tags,
      pdfFile,
      imageFiles,
    })

    toast({
      title: "Research submitted successfully!",
      description: "Your research will be reviewed and published soon.",
    })

    // Reset form
    setTitle("")
    setAuthors("")
    setUniversity("")
    setAbstract("")
    setCategory("")
    setPublicationYear("")
    setTags([])
    setPdfFile(null)
    setImageFiles([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Submit Your Research</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Research Paper</DialogTitle>
          <DialogDescription>
            Share your architectural research with the ArchNet community. All submissions are reviewed before
            publication.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter research paper title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Authors */}
          <div className="space-y-2">
            <Label htmlFor="authors">
              Authors <span className="text-destructive">*</span>
            </Label>
            <Input
              id="authors"
              placeholder="e.g., Dr. Sarah Ahmed, Prof. Omar Hassan (comma-separated)"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
            />
          </div>

          {/* University */}
          <div className="space-y-2">
            <Label htmlFor="university">
              University/Institution <span className="text-destructive">*</span>
            </Label>
            <Input
              id="university"
              placeholder="Enter university or institution name"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
          </div>

          {/* Category and Year */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urban Planning">Urban Planning</SelectItem>
                  <SelectItem value="Theory">Theory</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Sustainability">Sustainability</SelectItem>
                  <SelectItem value="Heritage">Heritage</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">
                Publication Year <span className="text-destructive">*</span>
              </Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="2024"
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <Label htmlFor="abstract">
              Abstract <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="abstract"
              placeholder="Enter research abstract (200-500 words)"
              rows={6}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Keywords/Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add keyword and press Enter"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* PDF Upload */}
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF Document</Label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" className="relative bg-transparent" asChild>
                <label htmlFor="pdf" className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  {pdfFile ? "Change PDF" : "Upload PDF"}
                  <input id="pdf" type="file" accept=".pdf" className="sr-only" onChange={handlePdfUpload} />
                </label>
              </Button>
              {pdfFile && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{pdfFile.name}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setPdfFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="images">Images (Optional)</Label>
            <Button type="button" variant="outline" className="relative bg-transparent" asChild>
              <label htmlFor="images" className="cursor-pointer">
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Images
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </label>
            </Button>
            {imageFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Research</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
