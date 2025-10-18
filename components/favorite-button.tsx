"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"

interface FavoriteButtonProps {
  itemId: string
  itemType: "tool" | "style" | "plant" | "timeline" | "project"
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
}

export function FavoriteButton({
  itemId,
  itemType,
  variant = "ghost",
  size = "icon",
  showLabel = false,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    // In a real app, this would save to user's favorites
    console.log(`[v0] ${isFavorited ? "Removed from" : "Added to"} favorites: ${itemType} ${itemId}`)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleFavorite}
      className={`transition-all duration-200 hover:scale-110 ${isFavorited ? "text-accent" : ""}`}
    >
      {isFavorited ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {showLabel && <span className="ml-2">{isFavorited ? "Saved" : "Save"}</span>}
    </Button>
  )
}
