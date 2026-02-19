"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CyberBackground } from "@/components/cyber-background"
import { FloatingIcons } from "@/components/floating-icons"
import { ScannerHeader } from "@/components/scanner-header"
import { UrlInput } from "@/components/url-input"
import { ScanStats } from "@/components/scan-stats"
import { VerdictBanner } from "@/components/verdict-banner"
import { AiReasoningCard } from "@/components/ai-reasoning-card"
import { NetworkIntelligenceCard } from "@/components/network-intelligence-card"
import { DockerScreenshotCard } from "@/components/docker-screenshot-card"
import { DnsTable } from "@/components/dns-table"

const MOCK_REASONING = [
  {
    label: "SSL/TLS Verification",
    status: "pass" as const,
    detail:
      "Valid certificate issued by Let's Encrypt. Certificate chain verified successfully. HSTS enabled.",
  },
  {
    label: "Content Similarity Check",
    status: "pass" as const,
    detail:
      "Page content does not mimic known phishing templates. No credential harvesting forms detected.",
  },
  {
    label: "URL Structure Analysis",
    status: "pass" as const,
    detail:
      "Domain matches known legitimate pattern. No suspicious subdomains or typosquatting detected.",
  },
  {
    label: "Domain Reputation",
    status: "pass" as const,
    detail:
      "Domain has a clean history across 47 threat intelligence databases. Age: 6+ years.",
  },
  {
    label: "JavaScript Behavior",
    status: "warn" as const,
    detail:
      "Minor obfuscated script detected but classified as analytics tracking. No malicious payloads.",
  },
]

const MOCK_NETWORK = {
  ip: "104.21.32.1",
  location: "San Francisco, US",
  created: "2019-03-15",
  registrar: "Cloudflare, Inc.",
  ssl: "Let's Encrypt (Valid)",
}

const MOCK_DNS = [
  { type: "A", value: "104.21.32.1" },
  { type: "AAAA", value: "2606:4700:3030::6815:2001" },
  { type: "CNAME", value: "cdn.example.com" },
  { type: "MX", value: "10 mail.example.com" },
  { type: "TXT", value: "v=spf1 include:_spf.google.com ~all" },
  { type: "NS", value: "ns1.cloudflare.com" },
  { type: "SOA", value: "ns1.cloudflare.com admin.example.com 2024010101" },
]

type AppView = "entry" | "scanning" | "results"

export default function PhishingScannerPage() {
  const [view, setView] = useState<AppView>("entry")
  const [analyzedUrl, setAnalyzedUrl] = useState("")
  const [confidence, setConfidence] = useState(97)

  const handleAnalyze = useCallback((url: string) => {
    setAnalyzedUrl(url)
    setView("scanning")

    setTimeout(() => {
      setConfidence(Math.floor(Math.random() * 8) + 92)
      setView("results")
    }, 2400)
  }, [])

  const handleRescan = useCallback((url: string) => {
    setAnalyzedUrl(url)
    setView("scanning")

    setTimeout(() => {
      setConfidence(Math.floor(Math.random() * 8) + 92)
      setView("results")
    }, 2400)
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      <CyberBackground />

      <AnimatePresence mode="wait">
        {(view === "entry" || view === "scanning") && (
          <motion.main
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16"
          >
            <FloatingIcons />

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8">
              <ScannerHeader />
              <UrlInput
                onAnalyze={handleAnalyze}
                isAnalyzing={view === "scanning"}
                variant="hero"
              />
              <ScanStats />
            </div>

            {/* Scanning overlay */}
            <AnimatePresence>
              {view === "scanning" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card/90 px-10 py-8 backdrop-blur-xl glow-cyan"
                  >
                    {/* Scanning ring animation */}
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute inset-1 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="h-3 w-3 rounded-full bg-primary"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-medium text-foreground">
                        Analyzing Target
                      </p>
                      <p className="max-w-[240px] truncate text-xs font-mono text-muted-foreground">
                        {analyzedUrl}
                      </p>
                    </div>
                    {/* Progress steps */}
                    <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground/60">
                      <ScanStep text="Initializing Docker sandbox..." delay={0} />
                      <ScanStep text="Resolving DNS records..." delay={0.6} />
                      <ScanStep text="Running AI analysis engine..." delay={1.2} />
                      <ScanStep text="Capturing live screenshot..." delay={1.8} />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}

        {view === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            {/* Compact header */}
            <ScannerHeader compact />

            {/* Compact input bar */}
            <UrlInput
              onAnalyze={handleRescan}
              isAnalyzing={false}
              variant="compact"
            />

            {/* Results content */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-6">
                {/* Verdict Banner */}
                <VerdictBanner confidence={confidence} />

                {/* Bento Grid */}
                <div className="grid gap-6 lg:grid-cols-5">
                  {/* Left column */}
                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <AiReasoningCard steps={MOCK_REASONING} />
                    <NetworkIntelligenceCard data={MOCK_NETWORK} />
                  </div>

                  {/* Right column - Sandbox Preview */}
                  <div className="lg:col-span-3">
                    <DockerScreenshotCard url={analyzedUrl} />
                  </div>
                </div>

                {/* DNS Table */}
                <DnsTable records={MOCK_DNS} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScanStep({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-2"
    >
      <motion.span
        className="inline-block h-1 w-1 rounded-full bg-primary"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, delay }}
      />
      {text}
    </motion.div>
  )
}
