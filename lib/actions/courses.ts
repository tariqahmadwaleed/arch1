"use server"

import { createClient } from "@/lib/supabase/server"

export async function getCourses(filters?: { category?: string; level?: string; limit?: number }) {
  const supabase = await createClient()
  let query = supabase.from("courses").select("*").order("start_date", { ascending: true })

  if (filters?.category) query = query.eq("category", filters.category)
  if (filters?.level) query = query.eq("level", filters.level)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  return { data: data || [], error: error?.message }
}

export async function enrollInCourse(courseId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("course_enrollments").insert({
    course_id: courseId,
    user_id: user.id,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function getMyCourses() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { data: [], error: "Not authenticated" }

  const { data, error } = await supabase
    .from("course_enrollments")
    .select("*, courses(*)")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false })

  return { data: data || [], error: error?.message }
}
