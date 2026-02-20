"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

export function SecurityMap({ locationName }: { locationName: string }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || !locationName) return

    const initMap = async () => {
      try {
        // Fetch coordinates from location name via your API bridge
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(locationName)}`)
        const data = await res.json()

        if (data.lat && data.lng) {
          if (mapInstance.current) mapInstance.current.remove()

          mapInstance.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: "https://tiles.openfreemap.org/styles/liberty",
            center: [data.lng, data.lat],
            zoom: 10,
            attributionControl: false
          })

          mapInstance.current.on('load', () => mapInstance.current?.resize())

          new maplibregl.Marker({ color: "#ef4444" })
            .setLngLat([data.lng, data.lat])
            .addTo(mapInstance.current)
        }
      } catch (error) {
        console.error("Map failed to load for location:", locationName)
      }
    }

    initMap()

    return () => mapInstance.current?.remove()
  }, [locationName])

  return <div ref={mapContainer} className="h-full w-full bg-zinc-950" />
}