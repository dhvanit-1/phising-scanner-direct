"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ScannerHeader({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between border-b border-border/50 bg-card/60 px-6 py-4 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-foreground">
              Hybrid AI Phishing Scanner
            </h1>
            <p className="text-xs text-muted-foreground">
              Docker-Isolated Deep Inspection Engine
            </p>
          </div>
        </div>
        <Badge className="border-success/30 bg-success/10 text-success">
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          System Online
        </Badge>
      </motion.header>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative mx-auto mb-2 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-primary/5" />
          <motion.div
            className="absolute inset-0 rounded-2xl border border-primary/30"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Shield className="relative h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-col items-center gap-3"
      >
        <Badge className="border-success/30 bg-success/10 text-success">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
          System Online
        </Badge>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Hybrid AI Phishing Scanner
        </h1>
        <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
          Docker-Isolated Deep Inspection Engine
        </p>
      </motion.div>
    </div>
  )
}
