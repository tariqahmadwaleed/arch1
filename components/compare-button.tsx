"use client"
import { GitCompare, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useCompareStore } from "@/lib/compare-store"

interface CompareButtonProps {
  item: {
    id: string
    type: "project" | "book" | "research" | "plant" | "style" | "timeline" | "competition"
    title: string
    image?: string
    metadata?: Record<string, any>
  }
  className?: string
}

export function CompareButton({ item, className }: CompareButtonProps) {
  const { items, addItem, removeItem, isInCompare } = useCompareStore()
  const { toast } = useToast()
  const isAdded = isInCompare(item.id)

  const handleToggle = () => {
    if (isAdded) {
      removeItem(item.id)
      toast({
        description: "Removed from comparison",
      })
    } else {
      if (items.length >= 4) {
        toast({
          description: "Maximum 4 items can be compared",
          variant: "destructive",
        })
        return
      }
      addItem(item)
      toast({
        description: "Added to comparison",
      })
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={cn(
        "gap-2 transition-all duration-200 hover:scale-105",
        isAdded && "text-accent hover:text-accent",
        className,
      )}
    >
      {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      <GitCompare className="h-4 w-4" />
      <span className="text-sm">{isAdded ? "Added" : "Compare"}</span>
    </Button>
  )
}
