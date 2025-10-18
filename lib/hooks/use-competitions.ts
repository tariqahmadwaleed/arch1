"use client"

import useSWR from "swr"
import { getCompetitions, getCompetitionById } from "@/lib/actions/competitions"

export function useCompetitions(status?: "ongoing" | "upcoming" | "past") {
  const key = status ? ["competitions", status] : "competitions"

  const { data, error, isLoading, mutate } = useSWR(key, () => getCompetitions(status), {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes
  })

  return {
    competitions: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCompetition(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `competition-${id}` : null, () => getCompetitionById(id), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  })

  return {
    competition: data,
    isLoading,
    isError: error,
    mutate,
  }
}
