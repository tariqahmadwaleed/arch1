"use client"

import type React from "react"

import { renderHook, waitFor } from "@testing-library/react"
import { useUser } from "@/lib/hooks/use-user"
import { SWRConfig } from "swr"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
)

describe("useUser hook", () => {
  it("returns loading state initially", () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    expect(result.current.isLoading).toBe(true)
  })

  it("handles user data correctly", async () => {
    const { result } = renderHook(() => useUser(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })
})
