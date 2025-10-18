"use client"

import { useState } from "react"
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReportDialog } from "@/components/report-dialog"
import { useToast } from "@/hooks/use-toast"

interface SocialInteractionsProps {
  contentId: string
  contentType?:
    | "post"
    | "comment"
    | "project"
    | "book"
    | "research"
    | "competition"
    | "job"
    | "news"
    | "tree"
    | "plant"
    | "soil"
    | "style"
    | "structural-system"
  initialLikes?: number
  initialComments?: number
  initialIsLiked?: boolean
  initialIsSaved?: boolean
  onComment?: () => void
  className?: string
}

export function SocialInteractions({
  contentId,
  contentType = "post",
  initialLikes = 0,
  initialComments = 0,
  initialIsLiked = false,
  initialIsSaved = false,
  onComment,
  className,
}: SocialInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isSaved, setIsSaved] = useState(initialIsSaved)
  const { toast } = useToast()

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)

    if (!isLiked) {
      toast({
        description: "Added to your liked content",
      })
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      description: isSaved ? "Removed from saved items" : "Saved to your library",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check this out on ArchNet",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        description: "Link copied to clipboard",
      })
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Like */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={cn(
          "gap-1.5 transition-all duration-200 hover:scale-105",
          isLiked && "text-accent hover:text-accent",
        )}
      >
        <Heart className={cn("h-4 w-4 transition-all", isLiked && "fill-current scale-110")} />
        <span className="text-sm">{likes}</span>
      </Button>

      {/* Save */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className={cn(
          "gap-1.5 transition-all duration-200 hover:scale-105",
          isSaved && "text-accent hover:text-accent",
        )}
      >
        <Bookmark className={cn("h-4 w-4 transition-all", isSaved && "fill-current scale-110")} />
      </Button>

      {/* Comment */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onComment}
        className="gap-1.5 transition-all duration-200 hover:scale-105"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="text-sm">{initialComments}</span>
      </Button>

      {/* Report */}
      <ReportDialog contentId={contentId} contentType={contentType} />

      {/* Share */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="gap-1.5 transition-all duration-200 hover:scale-105"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
