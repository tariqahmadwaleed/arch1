"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Edit, ImageIcon, LinkIcon } from "lucide-react"

export function CreatePostDialog() {
  const [postType, setPostType] = useState<"text" | "image" | "link">("text")
  const [content, setContent] = useState("")
  const [privacy, setPrivacy] = useState("public")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Post Type</Label>
            <div className="flex gap-2">
              <Button
                variant={postType === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("text")}
              >
                <Edit className="mr-2 h-4 w-4" />
                Text
              </Button>
              <Button
                variant={postType === "image" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("image")}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Image
              </Button>
              <Button
                variant={postType === "link" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("link")}
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Link
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, projects, or insights..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          {postType === "image" && (
            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <Input id="image" type="file" accept="image/*" />
            </div>
          )}

          {postType === "link" && (
            <div className="space-y-2">
              <Label htmlFor="link">Link URL</Label>
              <Input id="link" type="url" placeholder="https://..." />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="privacy">Privacy</Label>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger id="privacy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can see</SelectItem>
                <SelectItem value="connections">Connections Only</SelectItem>
                <SelectItem value="private">Private - Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Publish Post</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
