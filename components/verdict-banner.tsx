"use client"

import { motion } from "framer-motion"
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react"

export type VerdictType = "safe" | "suspicious" | "dangerous"

interface VerdictBannerProps {
  confidence: number
  verdict: VerdictType
}

const verdictConfig: Record<
  VerdictType,
  {
    label: string
    subtitle: string
    Icon: typeof ShieldCheck
    colorClass: string
    glowClass: string
    bgClass: string
    gradientClass: string
    trackClass: string
    gaugeText: string
  }
> = {
  safe: {
    label: "FINAL VERDICT: SAFE",
    subtitle: "All security checks passed. No threats detected.",
    Icon: ShieldCheck,
    colorClass: "text-success",
    glowClass: "glow-green",
    bgClass: "border-success/20",
    gradientClass: "from-success/8 via-transparent to-success/8",
    trackClass: "text-success/10",
    gaugeText: "Confidence",
  },
  suspicious: {
    label: "FINAL VERDICT: SUSPICIOUS",
    subtitle: "Anomalies detected. Proceed with caution.",
    Icon: ShieldAlert,
    colorClass: "text-amber-400",
    glowClass: "shadow-[0_0_40px_rgba(251,191,36,0.08)]",
    bgClass: "border-amber-400/20",
    gradientClass: "from-amber-400/8 via-transparent to-amber-400/8",
    trackClass: "text-amber-400/10",
    gaugeText: "Risk Level",
  },
  dangerous: {
    label: "FINAL VERDICT: DANGEROUS",
    subtitle: "High-risk phishing indicators confirmed. Do not proceed.",
    Icon: ShieldX,
    colorClass: "text-red-400",
    glowClass: "shadow-[0_0_40px_rgba(248,113,113,0.12)]",
    bgClass: "border-red-400/25",
    gradientClass: "from-red-400/10 via-transparent to-red-400/10",
    trackClass: "text-red-400/10",
    gaugeText: "Threat Level",
  },
}

function CircularGauge({
  value,
  verdict,
}: {
  value: number
  verdict: VerdictType
}) {
  const config = verdictConfig[verdict]
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className={config.trackClass}
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className={config.colorClass}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className={`${config.colorClass} opacity-20`}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          filter="blur(4px)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className={`font-mono text-2xl font-bold tabular-nums ${config.colorClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {value}%
        </motion.span>
        <span
          className={`text-[10px] uppercase tracking-wider ${config.colorClass} opacity-60`}
        >
          {config.gaugeText}
        </span>
      </div>
    </div>
  )
}

export function VerdictBanner({ confidence, verdict }: VerdictBannerProps) {
  const config = verdictConfig[verdict]
  const { Icon } = config

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border ${config.bgClass} ${config.glowClass}`}
    >
      {/* Pulsing background */}
      <motion.div
        className={`absolute inset-0 ${
          verdict === "safe"
            ? "bg-success/5"
            : verdict === "suspicious"
              ? "bg-amber-400/5"
              : "bg-red-400/5"
        }`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${config.gradientClass}`}
      />

      <div className="relative flex flex-col items-center gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
        {/* Left: Verdict text */}
        <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.2,
              }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                  verdict === "safe"
                    ? "border-success/20 bg-success/10"
                    : verdict === "suspicious"
                      ? "border-amber-400/20 bg-amber-400/10"
                      : "border-red-400/20 bg-red-400/10"
                }`}
              >
                <Icon className={`h-6 w-6 ${config.colorClass}`} />
              </div>
            </motion.div>
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className={`text-2xl font-bold tracking-wide sm:text-3xl ${config.colorClass}`}
              >
                {config.label}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className={`text-sm ${config.colorClass} opacity-60`}
              >
                {config.subtitle}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right: Circular gauge */}
        <CircularGauge value={confidence} verdict={verdict} />
      </div>
    </motion.div>
  )
}
