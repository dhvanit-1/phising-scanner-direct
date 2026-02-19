"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CyberBackground } from "@/components/cyber-background"
import { FloatingIcons } from "@/components/floating-icons"
import { ScannerHeader } from "@/components/scanner-header"
import { UrlInput } from "@/components/url-input"
import { VerdictBanner, type VerdictType } from "@/components/verdict-banner"
import { AiReasoningCard } from "@/components/ai-reasoning-card"
import { NetworkIntelligenceCard } from "@/components/network-intelligence-card"
import { DockerScreenshotCard } from "@/components/docker-screenshot-card"
import { DnsTable } from "@/components/dns-table"

export interface ScanResult {
  verdict: VerdictType
  confidence: number
  aiReasoning: string | string[]
  checks?: { label: string; status: "pass" | "warn" | "fail"; detail: string }[]
  liveWebsitePreviewUrl: string
  ipAddress: string
  locationName: string
  latitude?: number
  longitude?: number
  ispAsn: string
  registrar: string
  createdDate: string
  dnsRecords: { type: string; value: string }[]
}

type AppView = "entry" | "scanning" | "results"

export default function PhishingScannerPage() {
  const [view, setView] = useState<AppView>("entry")
  const [analyzedUrl, setAnalyzedUrl] = useState("")
  const [result, setResult] = useState<ScanResult | null>(null)

  const runScan = useCallback(async (url: string) => {
    // 🧹 Clear previous results to prevent map crashes
    setResult(null) 
    setAnalyzedUrl(url)
    setView("scanning")

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Scan failed")
      
      const data: ScanResult = await response.json()

      // 🔍 Ensure coordinates are treated as numbers
      const cleanedData = {
        ...data,
        latitude: data.latitude ? Number(data.latitude) : undefined,
        longitude: data.longitude ? Number(data.longitude) : undefined,
      }

      setResult(cleanedData)
      setView("results")
    } catch (error) {
      console.error(error)
      alert("Error connecting to scanner backend.")
      setView("entry")
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CyberBackground />
      <AnimatePresence mode="wait">
        {(view === "entry" || view === "scanning") && (
          <motion.main
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative flex min-h-screen flex-col items-center justify-center px-4"
          >
            <FloatingIcons />
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8">
              <ScannerHeader />
              <UrlInput onAnalyze={runScan} isAnalyzing={view === "scanning"} variant="hero" />
            </div>

            {view === "scanning" && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                 <div className="text-center p-8 bg-card border border-border rounded-xl">
                    <p className="animate-pulse font-mono text-primary">Analyzing {analyzedUrl}...</p>
                 </div>
              </div>
            )}
          </motion.main>
        )}

        {view === "results" && result && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
            <ScannerHeader compact />
            {/* 🔄 Pass the compact UrlInput so you can scan again from the results page */}
            <UrlInput onAnalyze={runScan} isAnalyzing={false} variant="compact" />

            <div className="mx-auto max-w-7xl flex flex-col gap-6 mt-6">
              <VerdictBanner confidence={result.confidence} verdict={result.verdict} />
              <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <AiReasoningCard reasoning={result.aiReasoning} checks={result.checks} />
                  
                  {/* 📍 Map ready check: only renders if lat/lng are present */}
                  <NetworkIntelligenceCard 
                    ipAddress={result.ipAddress} 
                    locationName={result.locationName}
                    latitude={result.latitude}
                    longitude={result.longitude}
                    ispAsn={result.ispAsn}
                    registrar={result.registrar}
                    createdDate={result.createdDate}
                  />
                </div>
                <div className="lg:col-span-3">
                  <DockerScreenshotCard url={analyzedUrl} previewUrl={result.liveWebsitePreviewUrl} />
                </div>
              </div>
              <DnsTable records={result.dnsRecords} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}