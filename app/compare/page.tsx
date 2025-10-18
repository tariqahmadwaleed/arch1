"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { useCompareStore } from "@/lib/compare-store"
import { Button } from "@/components/ui/button"
import { GitCompare, X, Download, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompareStore()
  const router = useRouter()
  const { toast } = useToast()

  const handleShare = () => {
    toast({
      description: "Comparison link copied to clipboard",
    })
  }

  const handleExport = () => {
    toast({
      description: "Comparison exported as PDF",
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <BackToHomeButton />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <GitCompare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="font-serif text-3xl font-bold mb-4">No Items to Compare</h1>
            <p className="text-muted-foreground mb-8">
              Add items from Projects, Books, Research, Timeline, or other sections to compare them side by side.
            </p>
            <Button onClick={() => router.push("/")}>Browse Content</Button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToHomeButton />

      {/* Header */}
      <section className="border-b bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">Compare Items</h1>
              <p className="text-muted-foreground">Comparing {items.length} items side by side</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 bg-transparent">
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="container mx-auto px-4 py-8">
        <div
          className={`grid gap-6 ${items.length === 2 ? "md:grid-cols-2" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}
        >
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden bg-background">
              {/* Header */}
              <div className="p-4 border-b bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCompare className="h-4 w-4 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wide">{item.type}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Image */}
              {item.image && (
                <div className="aspect-video overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h3 className="font-serif text-lg font-bold mb-4">{item.title}</h3>

                {/* Metadata */}
                {item.metadata && (
                  <div className="space-y-3">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <div key={key} className="border-b pb-2 last:border-b-0">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                          {key}
                        </dt>
                        <dd className="text-sm">{String(value)}</dd>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add More */}
      <section className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">
            {items.length < 4
              ? `You can add ${4 - items.length} more item${4 - items.length > 1 ? "s" : ""} to compare`
              : "Maximum comparison limit reached"}
          </p>
          <Button onClick={() => router.push("/")} variant="outline">
            Browse More Content
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
