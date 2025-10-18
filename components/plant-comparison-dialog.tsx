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

interface Plant {
  id: number
  commonName: string
  scientificName: string
  type: string
  nativeStatus: string
  height: string
  spread: string
  sunRequirement: string
  waterNeeds: string
  soilType: string
  region: string
  uses: string
}

interface PlantComparisonDialogProps {
  plants: Plant[]
}

export function PlantComparisonDialog({ plants }: PlantComparisonDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([])

  const togglePlant = (plant: Plant) => {
    if (selectedPlants.find((p) => p.id === plant.id)) {
      setSelectedPlants(selectedPlants.filter((p) => p.id !== plant.id))
    } else if (selectedPlants.length < 3) {
      setSelectedPlants([...selectedPlants, plant])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <GitCompare className="mr-2 h-4 w-4" />
          Compare Plants
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Compare Plants</DialogTitle>
          <DialogDescription>Select up to 3 plants to compare their properties</DialogDescription>
        </DialogHeader>

        {/* Plant Selection */}
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-semibold mb-2">Select Plants ({selectedPlants.length}/3)</p>
            <div className="flex flex-wrap gap-2">
              {plants.map((plant) => (
                <Button
                  key={plant.id}
                  variant={selectedPlants.find((p) => p.id === plant.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePlant(plant)}
                  disabled={selectedPlants.length >= 3 && !selectedPlants.find((p) => p.id === plant.id)}
                  className="bg-transparent"
                >
                  {plant.commonName}
                </Button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedPlants.length >= 2 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="p-3 text-left font-semibold">Property</th>
                    {selectedPlants.map((plant) => (
                      <th key={plant.id} className="p-3 text-left font-semibold">
                        {plant.commonName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Scientific Name</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm italic">
                        {plant.scientificName}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium">Type</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3">
                        <Badge variant="outline">{plant.type}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Native Status</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3">
                        <Badge variant={plant.nativeStatus === "Native" ? "default" : "secondary"}>
                          {plant.nativeStatus}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium">Height</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm">
                        {plant.height}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Spread</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm">
                        {plant.spread}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium">Sun Requirement</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm">
                        {plant.sunRequirement}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Water Needs</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm">
                        {plant.waterNeeds}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium">Soil Type</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm">
                        {plant.soilType}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Region</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm">
                        {plant.region}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-secondary/20">
                    <td className="p-3 font-medium align-top">Uses</td>
                    {selectedPlants.map((plant) => (
                      <td key={plant.id} className="p-3 text-sm text-muted-foreground">
                        {plant.uses}
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
