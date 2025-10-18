import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CompareItem {
  id: string
  type:
    | "project"
    | "book"
    | "research"
    | "plant"
    | "style"
    | "timeline"
    | "competition"
    | "tree"
    | "soil"
    | "structural-system"
  title: string
  image?: string
  metadata?: Record<string, any>
}

interface CompareStore {
  items: CompareItem[]
  addItem: (item: CompareItem) => void
  removeItem: (id: string) => void
  clearAll: () => void
  isInCompare: (id: string) => boolean
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        if (items.length >= 4) return
        if (items.find((i) => i.id === item.id)) return
        set({ items: [...items, item] })
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      clearAll: () => {
        set({ items: [] })
      },
      isInCompare: (id) => {
        return get().items.some((item) => item.id === id)
      },
    }),
    {
      name: "archnet-compare-storage",
    },
  ),
)
