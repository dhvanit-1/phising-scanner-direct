"use client"

import { useState, useCallback } from "react"
import { ScannerHeader } from "@/components/scanner-header"
import { UrlInput } from "@/components/url-input"
import { VerdictBanner } from "@/components/verdict-banner"
import { AiReasoningCard } from "@/components/ai-reasoning-card"
import { NetworkIntelligenceCard } from "@/components/network-intelligence-card"
import { DockerScreenshotCard } from "@/components/docker-screenshot-card"
import { DnsTable } from "@/components/dns-table"

const MOCK_REASONING = [
  {
    label: "URL Structure Analysis",
    status: "pass" as const,
    detail: "Domain matches known legitimate pattern. No suspicious subdomains or typosquatting detected.",
  },
  {
    label: "SSL/TLS Verification",
    status: "pass" as const,
    detail: "Valid certificate issued by Let's Encrypt. Certificate chain verified successfully.",
  },
  {
    label: "Content Similarity Check",
    status: "pass" as const,
    detail: "Page content does not mimic known phishing templates. No credential harvesting forms found.",
  },
  {
    label: "Domain Reputation",
    status: "pass" as const,
    detail: "Domain has a clean history across 47 threat intelligence databases.",
  },
  {
    label: "JavaScript Behavior Analysis",
    status: "warn" as const,
    detail: "Minor obfuscated script detected but classified as analytics tracking. No malicious payloads.",
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
]

export default function PhishingScannerPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasResults, setHasResults] = useState(true)
  const [analyzedUrl, setAnalyzedUrl] = useState("https://example.com")
  const [confidence, setConfidence] = useState(97)

  const handleAnalyze = useCallback((url: string) => {
    setIsAnalyzing(true)
    setHasResults(false)
    setAnalyzedUrl(url)

    // Simulate analysis with a loading delay
    setTimeout(() => {
      setConfidence(Math.floor(Math.random() * 10) + 90)
      setHasResults(true)
      setIsAnalyzing(false)
    }, 2200)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <ScannerHeader />
          <UrlInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {hasResults && (
            <>
              <VerdictBanner confidence={confidence} />

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                  <AiReasoningCard steps={MOCK_REASONING} />
                  <NetworkIntelligenceCard data={MOCK_NETWORK} />
                </div>

                {/* Right Column */}
                <DockerScreenshotCard url={analyzedUrl} />
              </div>

              <DnsTable records={MOCK_DNS} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
