"use client"

import { useState } from "react"
import { GitCompare, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCompareStore } from "@/lib/compare-store"
import Link from "next/link"

export function ComparePanel() {
  const { items, removeItem, clearAll } = useCompareStore()
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="gap-2 shadow-lg">
            <GitCompare className="h-5 w-5" />
            Compare ({items.length})
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Compare Items ({items.length}/4)</span>
              {items.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="group relative border rounded-lg p-4 transition-all hover:border-accent">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="flex gap-3">
                  {item.image && (
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {item.type}
                    </Badge>
                    <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length >= 2 && (
            <div className="mt-6">
              <Link href="/compare" onClick={() => setIsOpen(false)}>
                <Button className="w-full gap-2">
                  View Comparison
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          {items.length < 2 && (
            <div className="mt-6 text-center text-sm text-muted-foreground">Add at least 2 items to compare</div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
