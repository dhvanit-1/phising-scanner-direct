"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CyberBackground } from "@/components/cyber-background"
import { FloatingIcons } from "@/components/floating-icons"
import { ScannerHeader } from "@/components/scanner-header"
import { UrlInput } from "@/components/url-input"
import { ScanStats } from "@/components/scan-stats"
import { VerdictBanner, type VerdictType } from "@/components/verdict-banner"
import { AiReasoningCard } from "@/components/ai-reasoning-card"
import { NetworkIntelligenceCard } from "@/components/network-intelligence-card"
import { DockerScreenshotCard } from "@/components/docker-screenshot-card"
import { DnsTable } from "@/components/dns-table"

/* ────────────────────────────────────────────────────
   Three distinct result profiles
   ──────────────────────────────────────────────────── */

const SCENARIOS = {
  safe: {
    verdict: "safe" as VerdictType,
    confidenceRange: [92, 99],
    reasoning: [
      { label: "SSL/TLS Verification", status: "pass" as const, detail: "Valid certificate issued by Let's Encrypt. Certificate chain verified. HSTS enabled." },
      { label: "Content Similarity Check", status: "pass" as const, detail: "Page content does not mimic known phishing templates. No credential harvesting forms detected." },
      { label: "URL Structure Analysis", status: "pass" as const, detail: "Domain matches known legitimate pattern. No suspicious subdomains or typosquatting detected." },
      { label: "Domain Reputation", status: "pass" as const, detail: "Domain has a clean history across 47 threat intelligence databases. Age: 6+ years." },
      { label: "JavaScript Behavior", status: "pass" as const, detail: "All scripts verified as standard analytics and UI libraries. No obfuscation or malicious payloads." },
    ],
    network: { ip: "104.21.32.1", location: "San Francisco, US", created: "2019-03-15", registrar: "Cloudflare, Inc.", ssl: "Let's Encrypt (Valid)" },
    dns: [
      { type: "A", value: "104.21.32.1" },
      { type: "AAAA", value: "2606:4700:3030::6815:2001" },
      { type: "CNAME", value: "cdn.example.com" },
      { type: "MX", value: "10 mail.example.com" },
      { type: "TXT", value: "v=spf1 include:_spf.google.com ~all" },
      { type: "NS", value: "ns1.cloudflare.com" },
      { type: "SOA", value: "ns1.cloudflare.com admin.example.com 2024010101" },
    ],
  },
  suspicious: {
    verdict: "suspicious" as VerdictType,
    confidenceRange: [55, 74],
    reasoning: [
      { label: "SSL/TLS Verification", status: "warn" as const, detail: "Self-signed certificate detected. Certificate chain incomplete. HSTS not configured." },
      { label: "Content Similarity Check", status: "warn" as const, detail: "Page layout has 72% similarity to known PayPal phishing template. Login form detected." },
      { label: "URL Structure Analysis", status: "warn" as const, detail: "Domain uses uncommon TLD (.xyz). Subdomain mimics well-known brand: 'secure-paypal.login.xyz'." },
      { label: "Domain Reputation", status: "pass" as const, detail: "Domain is 4 months old. Found in 2 low-confidence threat feeds. Not yet confirmed malicious." },
      { label: "JavaScript Behavior", status: "fail" as const, detail: "Obfuscated keylogger script detected. Sends form data to external endpoint via Base64 POST." },
    ],
    network: { ip: "185.234.72.11", location: "Moscow, RU", created: "2025-11-02", registrar: "Namecheap, Inc.", ssl: "Self-Signed (Invalid)" },
    dns: [
      { type: "A", value: "185.234.72.11" },
      { type: "CNAME", value: "proxy-redirect.xyz" },
      { type: "MX", value: "5 mail.suspicious-host.ru" },
      { type: "TXT", value: "v=spf1 -all" },
      { type: "NS", value: "ns1.shady-dns.xyz" },
    ],
  },
  dangerous: {
    verdict: "dangerous" as VerdictType,
    confidenceRange: [88, 99],
    reasoning: [
      { label: "SSL/TLS Verification", status: "fail" as const, detail: "No SSL certificate found. Connection is unencrypted HTTP. All data transmitted in plaintext." },
      { label: "Content Similarity Check", status: "fail" as const, detail: "98% match with known Bank of America credential harvesting page. Fake 2FA form included." },
      { label: "URL Structure Analysis", status: "fail" as const, detail: "Typosquatting detected: 'bankofarnerlca.com'. Punycode encoding used to spoof characters." },
      { label: "Domain Reputation", status: "fail" as const, detail: "Domain registered 2 days ago. Flagged in 31 of 47 threat intelligence databases as malicious." },
      { label: "JavaScript Behavior", status: "fail" as const, detail: "Cryptominer, keylogger, and session hijacker detected. Drive-by download payload hosted." },
    ],
    network: { ip: "45.95.168.222", location: "Lagos, NG", created: "2026-02-17", registrar: "Tucows Domains", ssl: "None (HTTP Only)" },
    dns: [
      { type: "A", value: "45.95.168.222" },
      { type: "MX", value: "0 localhost" },
      { type: "TXT", value: "(none)" },
      { type: "NS", value: "ns1.malicious-registrar.net" },
      { type: "SOA", value: "ns1.malicious-registrar.net root 1" },
    ],
  },
}

/* ────────────────────────────────────────────────────
   Determine which scenario a URL gets
   ──────────────────────────────────────────────────── */

function pickScenario(url: string) {
  const lower = url.toLowerCase()

  // Dangerous keywords
  const dangerousPatterns = [
    "phish", "malware", "hack", "exploit", "trojan",
    "fake", "scam", "steal", "login-verify", "bankofarnerlca",
    "free-iphone", "claim-prize", ".ru", ".xyz",
  ]
  if (dangerousPatterns.some((p) => lower.includes(p))) {
    return SCENARIOS.dangerous
  }

  // Suspicious keywords
  const suspiciousPatterns = [
    "suspicious", "warn", "test", "unknown", "verify",
    "secure-", "auth-", "account-", "update-info",
  ]
  if (suspiciousPatterns.some((p) => lower.includes(p))) {
    return SCENARIOS.suspicious
  }

  // Well-known safe domains
  const safeDomains = [
    "google.com", "github.com", "vercel.com", "nextjs.org",
    "apple.com", "microsoft.com", "amazon.com", "wikipedia.org",
  ]
  if (safeDomains.some((d) => lower.includes(d))) {
    return SCENARIOS.safe
  }

  // Random pick for everything else
  const rand = Math.random()
  if (rand < 0.5) return SCENARIOS.safe
  if (rand < 0.8) return SCENARIOS.suspicious
  return SCENARIOS.dangerous
}

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* ────────────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────────────── */

type AppView = "entry" | "scanning" | "results"

interface ScanResult {
  verdict: VerdictType
  confidence: number
  reasoning: { label: string; status: "pass" | "warn" | "fail"; detail: string }[]
  network: { ip: string; location: string; created: string; registrar: string; ssl: string }
  dns: { type: string; value: string }[]
}

export default function PhishingScannerPage() {
  const [view, setView] = useState<AppView>("entry")
  const [analyzedUrl, setAnalyzedUrl] = useState("")
  const [result, setResult] = useState<ScanResult | null>(null)

  const runScan = useCallback((url: string) => {
    setAnalyzedUrl(url)
    setView("scanning")

    setTimeout(() => {
      const scenario = pickScenario(url)
      const confidence = randBetween(scenario.confidenceRange[0], scenario.confidenceRange[1])
      setResult({
        verdict: scenario.verdict,
        confidence,
        reasoning: scenario.reasoning,
        network: scenario.network,
        dns: scenario.dns,
      })
      setView("results")
    }, 2800)
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
                onAnalyze={runScan}
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
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-1 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
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
                      <p className="max-w-[240px] truncate font-mono text-xs text-muted-foreground">
                        {analyzedUrl}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 font-mono text-xs text-muted-foreground/60">
                      <ScanStep text="Initializing Docker sandbox..." delay={0} />
                      <ScanStep text="Resolving DNS records..." delay={0.6} />
                      <ScanStep text="Running AI analysis engine..." delay={1.2} />
                      <ScanStep text="Capturing live screenshot..." delay={1.8} />
                      <ScanStep text="Computing threat score..." delay={2.3} />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}

        {view === "results" && result && (
          <motion.div
            key={`results-${result.verdict}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <ScannerHeader compact />
            <UrlInput
              onAnalyze={runScan}
              isAnalyzing={false}
              variant="compact"
            />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-6">
                <VerdictBanner confidence={result.confidence} verdict={result.verdict} />

                <div className="grid gap-6 lg:grid-cols-5">
                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <AiReasoningCard steps={result.reasoning} />
                    <NetworkIntelligenceCard data={result.network} />
                  </div>
                  <div className="lg:col-span-3">
                    <DockerScreenshotCard url={analyzedUrl} />
                  </div>
                </div>

                <DnsTable records={result.dns} />
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
