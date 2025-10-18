"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { GitCompare } from "lucide-react"

interface Style {
  id: number
  name: string
  period: string
  years: string
  region: string
  characteristics: string[]
  examples: string[]
}

interface StyleComparisonDialogProps {
  styles: Style[]
}

export function StyleComparisonDialog({ styles }: StyleComparisonDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([])

  const toggleStyle = (style: Style) => {
    if (selectedStyles.find((s) => s.id === style.id)) {
      setSelectedStyles(selectedStyles.filter((s) => s.id !== style.id))
    } else if (selectedStyles.length < 3) {
      setSelectedStyles([...selectedStyles, style])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <GitCompare className="mr-2 h-4 w-4" />
          Compare Styles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Compare Architectural Styles</DialogTitle>
          <DialogDescription>Select up to 3 styles to compare their characteristics</DialogDescription>
        </DialogHeader>

        {/* Style Selection */}
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-semibold mb-2">Select Styles ({selectedStyles.length}/3)</p>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <Button
                  key={style.id}
                  variant={selectedStyles.find((s) => s.id === style.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleStyle(style)}
                  disabled={selectedStyles.length >= 3 && !selectedStyles.find((s) => s.id === style.id)}
                  className="bg-transparent"
                >
                  {style.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedStyles.length >= 2 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="p-3 text-left font-semibold">Attribute</th>
                    {selectedStyles.map((style) => (
                      <th key={style.id} className="p-3 text-left font-semibold">
                        {style.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Period</td>
                    {selectedStyles.map((style) => (
                      <td key={style.id} className="p-3">
                        <Badge variant="outline">{style.period}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium">Years</td>
                    {selectedStyles.map((style) => (
                      <td key={style.id} className="p-3 text-sm">
                        {style.years}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Region</td>
                    {selectedStyles.map((style) => (
                      <td key={style.id} className="p-3 text-sm">
                        {style.region}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium align-top">Characteristics</td>
                    {selectedStyles.map((style) => (
                      <td key={style.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {style.characteristics.map((char, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium align-top">Examples</td>
                    {selectedStyles.map((style) => (
                      <td key={style.id} className="p-3">
                        <ul className="space-y-1">
                          {style.examples.map((example, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
