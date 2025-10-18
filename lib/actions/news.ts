"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getNews(filters?: { category?: string; region?: string; limit?: number; offset?: number }) {
  const supabase = await createClient()

  let query = supabase
    .from("news")
    .select("*, profiles(username, full_name, avatar_url)")
    .order("published_at", { ascending: false })

  if (filters?.category) query = query.eq("category", filters.category)
  if (filters?.region) query = query.eq("region", filters.region)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)

  const { data, error } = await query
  return { data: data || [], error: error?.message }
}

export async function submitNews(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase
    .from("news")
    .insert({
      user_id: user.id,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      region: formData.get("region") as string,
      source: formData.get("source") as string,
      image_url: formData.get("imageUrl") as string,
    })
    .select()
    .single()

  if (error) return { error: error.message }
  revalidatePath("/news")
  return { success: true, data }
}
