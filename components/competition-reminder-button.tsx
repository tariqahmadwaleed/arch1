"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CompetitionReminderButtonProps {
  competitionId: string
}

export function CompetitionReminderButton({ competitionId }: CompetitionReminderButtonProps) {
  const [hasReminder, setHasReminder] = useState(false)
  const { toast } = useToast()

  const toggleReminder = () => {
    setHasReminder(!hasReminder)

    if (!hasReminder) {
      toast({
        title: "Reminder set",
        description: "You'll be notified when this competition opens and before the deadline.",
      })
    } else {
      toast({
        description: "Reminder removed",
      })
    }
  }

  return (
    <Button
      variant={hasReminder ? "default" : "outline"}
      size="default"
      onClick={toggleReminder}
      className={`w-full transition-all duration-200 ${!hasReminder ? "bg-transparent" : ""}`}
    >
      <Bell className={`mr-2 h-4 w-4 ${hasReminder ? "fill-current" : ""}`} />
      {hasReminder ? "Reminder Set" : "Set Reminder"}
    </Button>
  )
}
