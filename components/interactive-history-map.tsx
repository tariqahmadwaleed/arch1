"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Calendar, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FavoriteButton } from "@/components/favorite-button"

// Leaflet types
declare global {
  interface Window {
    L: any
    mapInitialized?: boolean
  }
}

interface Region {
  name: string
  info: string
  timeline: Array<{ year: string; event: string }>
}

interface Governorate {
  name: string
  coords: number[][]
  zoomLevel: number
  regions: Region[]
  history: string
}

export function InteractiveHistoryMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | null>(null)
  const mapInstanceRef = useRef<any>(null)
  const [timelineSearch, setTimelineSearch] = useState("")

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (typeof window !== "undefined" && !window.L) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = () => initMap()
      document.head.appendChild(script)
    } else if (window.L && !window.mapInitialized) {
      initMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        window.mapInitialized = false
      }
    }
  }, [])

  const initMap = () => {
    if (!mapRef.current || window.mapInitialized || mapInstanceRef.current) return

    const L = window.L

    // Initialize map centered on Jordan
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
    }).setView([31.95, 35.9], 7)

    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    // Governorate data with historical information
    const governorates: Governorate[] = [
      {
        name: "Amman",
        coords: [
          [31.85, 35.75],
          [31.85, 36.05],
          [32.05, 36.05],
          [32.05, 35.75],
        ],
        zoomLevel: 10,
        history: "Capital city with rich history from ancient Philadelphia to modern metropolis",
        regions: [
          {
            name: "Al-Weibdeh",
            info: "Historic neighborhood known for art galleries and cultural heritage",
            timeline: [
              { year: "1920s", event: "Established as residential area" },
              { year: "1950s", event: "Became cultural hub" },
              { year: "2000s", event: "Art gallery district development" },
            ],
          },
          {
            name: "Jabal Amman",
            info: "Old city area with Ottoman and early 20th century architecture",
            timeline: [
              { year: "1878", event: "Circassian settlement" },
              { year: "1920s", event: "Ottoman architecture development" },
              { year: "1940s", event: "Became administrative center" },
            ],
          },
        ],
      },
      {
        name: "Irbid",
        coords: [
          [32.4, 35.7],
          [32.4, 36.1],
          [32.65, 36.1],
          [32.65, 35.7],
        ],
        zoomLevel: 10,
        history: "Northern governorate with ancient roots and modern educational institutions",
        regions: [
          {
            name: "Irbid Center",
            info: "City center with universities and cultural institutions",
            timeline: [
              { year: "Ancient", event: "Site of ancient Arabella" },
              { year: "1976", event: "Yarmouk University founded" },
              { year: "1990s", event: "Educational hub expansion" },
            ],
          },
        ],
      },
      {
        name: "Petra",
        coords: [
          [30.2, 35.3],
          [30.2, 35.6],
          [30.45, 35.6],
          [30.45, 35.3],
        ],
        zoomLevel: 11,
        history: "Ancient Nabataean capital and UNESCO World Heritage Site",
        regions: [
          {
            name: "Petra Archaeological Park",
            info: "Rock-cut architecture and water conduit system",
            timeline: [
              { year: "312 BCE", event: "Nabataean capital established" },
              { year: "106 CE", event: "Annexed by Roman Empire" },
              { year: "1812", event: "Rediscovered by Johann Ludwig Burckhardt" },
              { year: "1985", event: "UNESCO World Heritage Site designation" },
            ],
          },
        ],
      },
      {
        name: "Jerash",
        coords: [
          [32.2, 35.8],
          [32.2, 35.95],
          [32.35, 35.95],
          [32.35, 35.8],
        ],
        zoomLevel: 11,
        history: "Best-preserved Roman provincial city in the world",
        regions: [
          {
            name: "Gerasa",
            info: "Ancient Roman city with colonnaded streets and temples",
            timeline: [
              { year: "331 BCE", event: "Founded by Alexander the Great" },
              { year: "63 BCE", event: "Conquered by Romans" },
              { year: "129 CE", event: "Emperor Hadrian's visit" },
              { year: "1920s", event: "Archaeological excavations begin" },
            ],
          },
        ],
      },
    ]

    // Add governorate polygons
    governorates.forEach((gov) => {
      const polygon = L.polygon(gov.coords, {
        color: "#B5754E",
        fillColor: "#B5754E",
        fillOpacity: 0.15,
        weight: 2,
      }).addTo(map)

      // Add label
      const center = polygon.getBounds().getCenter()
      L.marker(center, {
        icon: L.divIcon({
          className: "governorate-label",
          html: `<div style="background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; color: #1B1B1B; border: 1px solid #B5754E; white-space: nowrap;">${gov.name}</div>`,
          iconSize: [100, 30],
        }),
      }).addTo(map)

      // Click handler
      polygon.on("click", () => {
        map.fitBounds(polygon.getBounds(), { animate: true, duration: 1.0, padding: [50, 50] })
        setSelectedGovernorate(gov)
        setSelectedRegion(null)
      })

      // Hover effect
      polygon.on("mouseover", () => {
        polygon.setStyle({ fillOpacity: 0.3 })
      })
      polygon.on("mouseout", () => {
        polygon.setStyle({ fillOpacity: 0.15 })
      })
    })

    // Zoom event handler
    map.on("zoomend", () => {
      const zoom = map.getZoom()
      if (zoom < 9) {
        setSelectedGovernorate(null)
        setSelectedRegion(null)
      }
    })

    window.mapInitialized = true
  }

  const filteredTimeline = selectedRegion
    ? selectedRegion.timeline.filter(
        (item) =>
          item.year.toLowerCase().includes(timelineSearch.toLowerCase()) ||
          item.event.toLowerCase().includes(timelineSearch.toLowerCase()),
      )
    : []

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="relative overflow-hidden rounded-lg border shadow-lg">
        <div ref={mapRef} className="h-[600px] w-full" />

        {/* Region Info Panel */}
        {selectedGovernorate && (
          <div className="absolute top-4 right-4 max-w-sm animate-in slide-in-from-right-5 duration-300">
            <div className="rounded-lg border bg-background/95 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="font-serif text-xl font-bold">{selectedGovernorate.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedGovernorate.history}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setSelectedGovernorate(null)
                    setSelectedRegion(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Regions */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key Sites</p>
                {selectedGovernorate.regions.map((region, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRegion(region)}
                    className="w-full rounded-lg border bg-secondary/50 p-3 text-left transition-all duration-200 hover:border-accent hover:bg-accent/5"
                  >
                    <p className="font-semibold">{region.name}</p>
                    <p className="text-xs text-muted-foreground">{region.info}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline Panel */}
        {selectedRegion && (
          <div className="absolute bottom-4 left-4 right-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="rounded-lg border bg-background/95 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <h4 className="font-serif text-lg font-bold">{selectedRegion.name} Timeline</h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search timeline..."
                      className="pl-7 h-8 w-48 text-sm"
                      value={timelineSearch}
                      onChange={(e) => setTimelineSearch(e.target.value)}
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedRegion(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Horizontal Timeline */}
              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-2">
                  {filteredTimeline.map((item, index) => (
                    <div key={index} className="flex-shrink-0 w-48">
                      <div className="rounded-lg border bg-secondary/50 p-3 relative">
                        <div className="absolute top-2 right-2">
                          <FavoriteButton
                            itemId={`${selectedRegion.name}-${index}`}
                            itemType="timeline"
                            size="icon"
                            variant="ghost"
                          />
                        </div>
                        <p className="mb-1 text-sm font-bold text-accent">{item.year}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed pr-6">{item.event}</p>
                      </div>
                    </div>
                  ))}
                  {filteredTimeline.length === 0 && (
                    <p className="text-sm text-muted-foreground">No timeline events match your search.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="rounded-lg border bg-secondary/30 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Interactive Map:</strong> Click on any governorate to explore its architectural history. Zoom in to
          see detailed information about specific regions and their historical timeline.
        </p>
      </div>
    </div>
  )
}
