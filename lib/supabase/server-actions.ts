"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const username = formData.get("username") as string
  const fullName = formData.get("fullName") as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName,
      },
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true, data }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Get profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return { ...user, profile }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const updates = {
    full_name: formData.get("fullName") as string,
    username: formData.get("username") as string,
    bio: formData.get("bio") as string,
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    website: formData.get("website") as string,
    avatar_url: formData.get("avatarUrl") as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile/[username]", "page")
  return { success: true }
}

export async function followUser(userId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("follows").insert({
    follower_id: user.id,
    following_id: userId,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile/[username]", "page")
  return { success: true }
}

export async function unfollowUser(userId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile/[username]", "page")
  return { success: true }
}

export async function getProfile(username: string) {
  const supabase = await createClient()

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (error) {
    return null
  }

  return profile
}

export async function isFollowing(userId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", userId)
    .single()

  return !!data
}
