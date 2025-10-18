"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleLike(contentType: string, contentId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .single()

  if (existing) {
    // Unlike
    const { error } = await supabase.from("likes").delete().eq("id", existing.id)

    if (error) return { error: error.message }

    // Decrement counter
    await supabase.rpc("decrement_counter", {
      table_name: `${contentType}s`,
      column_name: "likes_count",
      row_id: contentId,
    })

    return { success: true, liked: false }
  } else {
    // Like
    const { error } = await supabase.from("likes").insert({
      user_id: user.id,
      content_type: contentType,
      content_id: contentId,
    })

    if (error) return { error: error.message }

    // Increment counter
    await supabase.rpc("increment_counter", {
      table_name: `${contentType}s`,
      column_name: "likes_count",
      row_id: contentId,
    })

    return { success: true, liked: true }
  }
}

export async function toggleSave(contentType: string, contentId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { data: existing } = await supabase
    .from("saves")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .single()

  if (existing) {
    const { error } = await supabase.from("saves").delete().eq("id", existing.id)

    if (error) return { error: error.message }

    await supabase.rpc("decrement_counter", {
      table_name: `${contentType}s`,
      column_name: "saves_count",
      row_id: contentId,
    })

    return { success: true, saved: false }
  } else {
    const { error } = await supabase.from("saves").insert({
      user_id: user.id,
      content_type: contentType,
      content_id: contentId,
    })

    if (error) return { error: error.message }

    await supabase.rpc("increment_counter", {
      table_name: `${contentType}s`,
      column_name: "saves_count",
      row_id: contentId,
    })

    return { success: true, saved: true }
  }
}

export async function addComment(contentType: string, contentId: string, content: string, parentId?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      content_type: contentType,
      content_id: contentId,
      content,
      parent_id: parentId,
    })
    .select("*, profiles(username, full_name, avatar_url)")
    .single()

  if (error) {
    return { error: error.message }
  }

  // Increment comments count
  await supabase.rpc("increment_counter", {
    table_name: `${contentType}s`,
    column_name: "comments_count",
    row_id: contentId,
  })

  revalidatePath("/[...path]", "page")
  return { success: true, data }
}

export async function reportContent(contentType: string, contentId: string, reason: string, description?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("reports").insert({
    user_id: user.id,
    content_type: contentType,
    content_id: contentId,
    reason,
    description,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function shareContent(contentType: string, contentId: string, platform?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from("shares").insert({
    user_id: user?.id,
    content_type: contentType,
    content_id: contentId,
    platform,
  })

  if (error) {
    return { error: error.message }
  }

  // Increment shares count
  await supabase.rpc("increment_counter", {
    table_name: `${contentType}s`,
    column_name: "shares_count",
    row_id: contentId,
  })

  return { success: true }
}

export async function getComments(contentType: string, contentId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(username, full_name, avatar_url, is_verified, verification_type)")
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .is("parent_id", null)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message, data: [] }
  }

  return { data, error: null }
}

export async function isLiked(contentType: string, contentId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .single()

  return !!data
}

export async function isSaved(contentType: string, contentId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from("saves")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .single()

  return !!data
}
