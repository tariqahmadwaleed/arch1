"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const projectData = {
    user_id: user.id,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    location: formData.get("location") as string,
    year: Number.parseInt(formData.get("year") as string),
    area: Number.parseFloat(formData.get("area") as string),
    status: formData.get("status") as string,
    images: JSON.parse((formData.get("images") as string) || "[]"),
    tags: JSON.parse((formData.get("tags") as string) || "[]"),
  }

  const { data, error } = await supabase.from("projects").insert(projectData).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile/[username]", "page")
  return { success: true, data }
}

export async function updateProject(projectId: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const updates = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    location: formData.get("location") as string,
    year: Number.parseInt(formData.get("year") as string),
    area: Number.parseFloat(formData.get("area") as string),
    status: formData.get("status") as string,
    images: JSON.parse((formData.get("images") as string) || "[]"),
    tags: JSON.parse((formData.get("tags") as string) || "[]"),
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("projects").update(updates).eq("id", projectId).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/projects/[id]", "page")
  return { success: true }
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile/[username]", "page")
  return { success: true }
}

export async function getProjects(filters?: {
  category?: string
  userId?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from("projects")
    .select("*, profiles(username, full_name, avatar_url, is_verified, verification_type)")
    .order("created_at", { ascending: false })

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }

  if (filters?.userId) {
    query = query.eq("user_id", filters.userId)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    return { error: error.message, data: [] }
  }

  return { data, error: null }
}

export async function getProject(projectId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles(username, full_name, avatar_url, is_verified, verification_type)")
    .eq("id", projectId)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { data, error: null }
}

export async function getUserProjects(username: string) {
  const supabase = await createClient()

  // First get the user's ID from username
  const { data: profile } = await supabase.from("profiles").select("id").eq("username", username).single()

  if (!profile) {
    return { error: "User not found", data: [] }
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message, data: [] }
  }

  return { data, error: null }
}
