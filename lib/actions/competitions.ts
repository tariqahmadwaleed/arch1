"use server"

import { createClient } from "@/lib/supabase/server"

export async function getCompetitions(status?: string) {
  const supabase = await createClient()
  let query = supabase.from("competitions").select("*").order("submission_deadline", { ascending: true })

  if (status) query = query.eq("status", status)

  const { data, error } = await query
  return { data: data || [], error: error?.message }
}

export async function applyToCompetition(competitionId: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("competition_applications").insert({
    competition_id: competitionId,
    user_id: user.id,
    project_id: formData.get("projectId") as string,
    notes: formData.get("notes") as string,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function setCompetitionReminder(competitionId: string, reminderDate: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("competition_reminders").insert({
    competition_id: competitionId,
    user_id: user.id,
    reminder_date: reminderDate,
  })

  if (error) return { error: error.message }
  return { success: true }
}
