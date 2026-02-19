"use client"

import { motion } from "framer-motion"
import { Globe, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NetworkData {
  ip: string
  location: string
  created: string
  registrar: string
  ssl: string
}

interface NetworkIntelligenceCardProps {
  data: NetworkData
}

function WorldMapSvg() {
  return (
    <div className="relative mb-4 overflow-hidden rounded-xl border border-border/30 bg-secondary/30 p-4">
      <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-30" fill="none">
        {/* Simplified world map paths */}
        <path d="M165 130 L180 125 L195 130 L210 125 L230 140 L245 135 L260 150 L240 165 L225 160 L210 170 L195 165 L180 175 L165 160 L150 155 L155 140 Z" fill="currentColor" className="text-primary/40" />
        <path d="M470 90 L510 85 L550 95 L580 90 L610 100 L640 95 L660 110 L680 105 L700 115 L690 135 L670 140 L650 130 L620 140 L590 135 L560 145 L530 135 L500 140 L480 130 L460 120 L450 105 Z" fill="currentColor" className="text-primary/40" />
        <path d="M500 150 L530 145 L560 155 L580 150 L600 165 L590 180 L570 185 L550 175 L530 180 L510 170 L490 165 Z" fill="currentColor" className="text-primary/40" />
        <path d="M640 150 L680 145 L720 155 L750 150 L780 160 L800 155 L830 165 L820 185 L790 190 L760 180 L730 190 L700 180 L670 185 L650 170 Z" fill="currentColor" className="text-primary/40" />
        <path d="M530 210 L560 200 L590 215 L610 210 L630 225 L620 250 L600 260 L570 250 L550 260 L530 245 L515 230 Z" fill="currentColor" className="text-primary/40" />
        <path d="M750 200 L790 195 L820 210 L850 205 L870 220 L860 250 L830 260 L800 250 L770 260 L750 240 L740 220 Z" fill="currentColor" className="text-primary/40" />
        <path d="M210 190 L240 185 L270 200 L290 210 L280 240 L260 270 L240 290 L220 280 L200 260 L190 230 L195 210 Z" fill="currentColor" className="text-primary/40" />
        <path d="M150 210 L175 205 L190 220 L185 250 L170 270 L150 265 L140 240 L135 225 Z" fill="currentColor" className="text-primary/40" />
      </svg>
      {/* Location pin */}
      <motion.div
        className="absolute"
        style={{ left: "22%", top: "32%" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin className="h-5 w-5 text-primary drop-shadow-[0_0_6px_rgba(120,220,240,0.5)]" fill="currentColor" />
        </motion.div>
        {/* Ripple rings */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          animate={{ scale: [1, 3], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    </div>
  )
}

export function NetworkIntelligenceCard({ data }: NetworkIntelligenceCardProps) {
  const fields = [
    { label: "IP Address", value: data.ip },
    { label: "Location", value: data.location },
    { label: "Created", value: data.created },
    { label: "Registrar", value: data.registrar },
    { label: "SSL Certificate", value: data.ssl },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-card-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Globe className="h-4 w-4 text-primary" />
            </div>
            Network Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WorldMapSvg />
          <div className="flex flex-col gap-2">
            {fields.map((field, i) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/40 px-3.5 py-2.5 transition-colors hover:bg-secondary/60"
              >
                <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
                  {field.label}
                </span>
                <span className="text-sm font-medium font-mono text-card-foreground">
                  {field.value}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
