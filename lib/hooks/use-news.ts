"use client"

import useSWR from "swr"
import { getNews, getNewsById } from "@/lib/actions/news"

export function useNews(filters?: {
  category?: string
  region?: string
  search?: string
}) {
  const key = filters ? ["news", filters] : "news"

  const { data, error, isLoading, mutate } = useSWR(key, () => getNews(filters), {
    revalidateOnFocus: false,
    dedupingInterval: 120000, // 2 minutes
  })

  return {
    news: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useNewsItem(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `news-${id}` : null, () => getNewsById(id), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  })

  return {
    newsItem: data,
    isLoading,
    isError: error,
    mutate,
  }
}
