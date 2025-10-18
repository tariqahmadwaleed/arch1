import { cn } from "@/lib/utils"

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500")
  })

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe("base active")
  })

  it("handles tailwind merge conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })
})
