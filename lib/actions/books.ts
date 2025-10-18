"use server"

import { createClient } from "@/lib/supabase/server"

export async function getBooks(filters?: { category?: string; language?: string; limit?: number }) {
  const supabase = await createClient()
  let query = supabase.from("books").select("*").order("created_at", { ascending: false })

  if (filters?.category) query = query.eq("category", filters.category)
  if (filters?.language) query = query.eq("language", filters.language)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query
  return { data: data || [], error: error?.message }
}

export async function rateBook(bookId: string, rating: number, review?: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("book_ratings").upsert({
    book_id: bookId,
    user_id: user.id,
    rating,
    review,
  })

  if (error) return { error: error.message }
  return { success: true }
}
