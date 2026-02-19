"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

type SecurityMapProps = {
  lat?: number
  lng?: number
}

export function SecurityMap({ lat, lng }: SecurityMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Validate coordinates
    const hasValidCoordinates =
      typeof lat === "number" && typeof lng === "number"

    // Default world view if coordinates are missing
    const finalLat = hasValidCoordinates ? lat : 20
    const finalLng = hasValidCoordinates ? lng : 0
    const finalZoom = hasValidCoordinates ? 12 : 1.5

    // Initialize map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [finalLng, finalLat],
      zoom: finalZoom,
    })

    // Resize properly after load
    map.on("load", () => {
      map.resize()
    })

    // Add marker if valid coordinates exist
    if (hasValidCoordinates) {
      new maplibregl.Marker({ color: "#ef4444" })
        .setLngLat([lng as number, lat as number])
        .addTo(map)
    }

    // Cleanup on unmount
    return () => {
      map.remove()
    }
  }, [lat, lng])

  return (
    <div
      ref={mapContainer}
      className="h-full w-full bg-zinc-950"
    />
  )
}
