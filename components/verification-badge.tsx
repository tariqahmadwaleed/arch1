import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationBadgeProps {
  type?: "firm" | "university" | "professor" | "architect"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function VerificationBadge({ type = "architect", size = "md", className }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const typeLabels = {
    firm: "Verified Firm",
    university: "Verified Institution",
    professor: "Verified Professor",
    architect: "Verified Architect",
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)} title={typeLabels[type]}>
      <BadgeCheck className={cn("text-accent fill-accent/20", sizeClasses[size])} />
    </div>
  )
}
