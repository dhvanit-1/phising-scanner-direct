"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityMap } from "./security-map" // Import our new real map

interface NetworkIntelligenceCardProps {
  ipAddress: string
  locationName: string
  latitude?: number
  longitude?: number
  ispAsn: string
  registrar: string
  createdDate: string
}

export function NetworkIntelligenceCard({
  ipAddress, locationName, latitude, longitude, ispAsn, registrar, createdDate,
}: NetworkIntelligenceCardProps) {
  const fields = [
    { label: "IP Address", value: ipAddress },
    { label: "Location", value: locationName },
    { label: "ISP / ASN", value: ispAsn },
    { label: "Registrar", value: registrar },
    { label: "Created Date", value: createdDate },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5">
            <Globe className="h-4 w-4 text-primary" />
            Network Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 📍 REAL DYNAMIC MAP INJECTION */}
          <div className="h-[200px] w-full mb-4">
            <SecurityMap lat={latitude} lng={longitude} locationName={locationName} />
          </div>
          
          <div className="flex flex-col gap-2">
            {fields.map((field) => (
              <div key={field.label} className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/40 px-3.5 py-2.5">
                <span className="text-xs uppercase text-muted-foreground/70">{field.label}</span>
                <span className="font-mono text-sm">{field.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}