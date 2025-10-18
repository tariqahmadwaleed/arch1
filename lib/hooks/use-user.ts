"use client"

import useSWR from "swr"
import { createBrowserClient } from "@/lib/supabase/client"

async function fetchUser() {
  const supabase = createBrowserClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return { ...user, profile }
}

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR("current-user", fetchUser, {
    revalidateOnFocus: true,
    dedupingInterval: 10000, // 10 seconds
  })

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  }
}
