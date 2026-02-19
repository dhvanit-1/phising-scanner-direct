"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Search, Loader2 } from "lucide-react"

interface UrlInputProps {
  onAnalyze: (url: string) => void
  isAnalyzing: boolean
  variant?: "hero" | "compact"
}

export function UrlInput({ onAnalyze, isAnalyzing, variant = "hero" }: UrlInputProps) {
  const [url, setUrl] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scale = useMotionValue(1)
  const boxShadow = useTransform(
    scale,
    [1, 1.03],
    [
      "0 0 0px rgba(120, 220, 240, 0), 0 0 0px rgba(120, 220, 240, 0)",
      "0 0 30px rgba(120, 220, 240, 0.15), 0 0 80px rgba(120, 220, 240, 0.05)",
    ]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onAnalyze(url.trim())
    }
  }

  if (variant === "compact") {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className="flex gap-3 px-6 py-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="compact-url-input"
            name="url"
            ref={inputRef}
            type="url"
            placeholder="Enter URL to analyze..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50 focus:bg-secondary"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isAnalyzing || !url.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-11 overflow-hidden rounded-lg bg-primary px-5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning
            </span>
          ) : (
            "Analyze URL"
          )}
        </motion.button>
      </motion.form>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        style={{ boxShadow }}
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="rounded-2xl border border-border/60 bg-card/70 p-1.5 backdrop-blur-xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="hero-url-input"
              name="url"
              ref={inputRef}
              type="url"
              placeholder="Enter URL to Analyze"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => {
                setIsFocused(true)
                scale.set(1.03)
              }}
              onBlur={() => {
                setIsFocused(false)
                scale.set(1)
              }}
              className="h-14 w-full rounded-xl bg-secondary/60 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:bg-secondary sm:text-lg"
            />
          </div>
          <motion.button
            type="submit"
            disabled={isAnalyzing || !url.trim()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="scan-line-anim relative h-14 overflow-hidden rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground disabled:opacity-50 disabled:pointer-events-none sm:min-w-[180px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Initiate Scan"
              )}
            </span>
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground/50 font-mono"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-success/40 animate-pulse" />
        {">"} Secure sandbox environment ready. All scans run in isolated Docker containers.
      </motion.div>
    </motion.div>
  )
}