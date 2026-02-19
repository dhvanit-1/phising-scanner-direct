"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

interface VerdictBannerProps {
  confidence: number
}

function CircularGauge({ value }: { value: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex h-32 w-32 items-center justify-center shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-success/10"
        />
        {/* Value arc */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className="text-success"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
        {/* Glow */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-success/20"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          filter="blur(4px)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-2xl font-bold tabular-nums text-success font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {value}%
        </motion.span>
        <span className="text-[10px] uppercase tracking-wider text-success/60">
          Confidence
        </span>
      </div>
    </div>
  )
}

export function VerdictBanner({ confidence }: VerdictBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-success/20 glow-green"
    >
      {/* Pulsing green background */}
      <motion.div
        className="absolute inset-0 bg-success/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-success/8 via-transparent to-success/8" />

      <div className="relative flex flex-col items-center gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
        {/* Left: Verdict text */}
        <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-success/20 bg-success/10">
                <ShieldCheck className="h-6 w-6 text-success" />
              </div>
            </motion.div>
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-2xl font-bold tracking-wide text-success sm:text-3xl"
              >
                FINAL VERDICT: SAFE
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-sm text-success/60"
              >
                All security checks passed. No threats detected.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right: Circular gauge */}
        <CircularGauge value={confidence} />
      </div>
    </motion.div>
  )
}
