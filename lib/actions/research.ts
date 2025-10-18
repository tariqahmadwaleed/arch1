"use server"

import { createClient } from "@/lib/supabase/server"

export async function getResearch(filters?: { category?: string; type?: string; limit?: number }) {
  const supabase = await createClient()
  let query = supabase
    .from("research")
    .select("*, profiles(username, full_name, avatar_url)")
    .order("publication_date", { ascending: false })

  if (filters?.category) query = query.eq("category", filters.category)
  if (filters?.type) query = query.eq("research_type", filters.type)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  return { data: data || [], error: error?.message }
}

export async function submitResearch(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase
    .from("research")
    .insert({
      user_id: user.id,
      title: formData.get("title") as string,
      abstract: formData.get("abstract") as string,
      authors: JSON.parse((formData.get("authors") as string) || "[]"),
      category: formData.get("category") as string,
      research_type: formData.get("type") as string,
      pdf_url: formData.get("pdfUrl") as string,
    })
    .select()
    .single()

  if (error) return { error: error.message }
  return { success: true, data }
}
