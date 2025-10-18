"use client"

import useSWR from "swr"
import { getProjects, getProjectById } from "@/lib/actions/projects"

export function useProjects(filters?: {
  category?: string
  status?: string
  search?: string
}) {
  const key = filters ? ["projects", filters] : "projects"

  const { data, error, isLoading, mutate } = useSWR(key, () => getProjects(filters), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  })

  return {
    projects: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useProject(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `project-${id}` : null, () => getProjectById(id), {
    revalidateOnFocus: false,
    dedupingInterval: 30000, // 30 seconds
  })

  return {
    project: data,
    isLoading,
    isError: error,
    mutate,
  }
}
