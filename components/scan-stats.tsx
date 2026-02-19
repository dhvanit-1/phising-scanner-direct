"use client"

import { motion } from "framer-motion"
import { Activity, Database, Clock, Shield } from "lucide-react"

const stats = [
  { Icon: Activity, label: "Scans Today", value: "12,847" },
  { Icon: Database, label: "Threat DB", value: "2.4M+" },
  { Icon: Clock, label: "Avg. Time", value: "1.8s" },
  { Icon: Shield, label: "Detection Rate", value: "99.7%" },
]

export function ScanStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
          className="flex flex-col items-center gap-2 rounded-xl border border-border/30 bg-card/30 py-4 backdrop-blur-sm"
        >
          <stat.Icon className="h-4 w-4 text-primary/60" strokeWidth={1.5} />
          <span className="text-lg font-bold tabular-nums text-foreground font-mono">
            {stat.value}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground/60">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
