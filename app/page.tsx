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

/* ────────────────────────────────────────────────────
   Shared ScanResult type — mirrors the backend shape
   ──────────────────────────────────────────────────── */

export interface ScanResult {
  verdict: VerdictType
  confidence: number
  /** Free-form AI reasoning — a single string or a list of strings from the backend */
  aiReasoning: string | string[]
  /** Optional structured checks (label / status / detail) */
  checks?: { label: string; status: "pass" | "warn" | "fail"; detail: string }[]
  liveWebsitePreviewUrl: string
  ipAddress: string
  locationName: string
  /** Optional lat/lng from the backend; when absent the map falls back to locationName */
  latitude?: number
  longitude?: number
  ispAsn: string
  registrar: string
  createdDate: string
  dnsRecords: { type: string; value: string }[]
}

/* ────────────────────────────────────────────────────
   Three demo result profiles
   ──────────────────────────────────────────────────── */

const SCENARIOS: Record<"safe" | "suspicious" | "dangerous", Omit<ScanResult, "confidence">> = {
  safe: {
    verdict: "safe",
    aiReasoning: [
      "The domain has a valid SSL/TLS certificate issued by Let's Encrypt with a full chain of trust. HSTS is enforced.",
      "Page content does not match any known phishing templates in the database. No credential-harvesting forms detected.",
      "URL structure is clean with no typosquatting, suspicious sub-domains, or Punycode abuse.",
      "Domain is 6+ years old with a clean reputation across 47 threat intelligence feeds.",
      "All JavaScript is non-obfuscated — standard analytics and UI libraries only. No malicious payloads found.",
    ],
    checks: [
      { label: "SSL/TLS Verification", status: "pass", detail: "Valid certificate issued by Let's Encrypt. Certificate chain verified. HSTS enabled." },
      { label: "Content Similarity Check", status: "pass", detail: "Page content does not mimic known phishing templates. No credential harvesting forms detected." },
      { label: "URL Structure Analysis", status: "pass", detail: "Domain matches known legitimate pattern. No suspicious subdomains or typosquatting detected." },
      { label: "Domain Reputation", status: "pass", detail: "Domain has a clean history across 47 threat intelligence databases. Age: 6+ years." },
      { label: "JavaScript Behavior", status: "pass", detail: "All scripts verified as standard analytics and UI libraries. No obfuscation or malicious payloads." },
    ],
    liveWebsitePreviewUrl: "",
    ipAddress: "104.21.32.1",
    locationName: "San Francisco, US",
    latitude: 37.78,
    longitude: -122.42,
    ispAsn: "AS13335 — Cloudflare, Inc.",
    registrar: "Cloudflare, Inc.",
    createdDate: "2019-03-15",
    dnsRecords: [
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
    verdict: "suspicious",
    aiReasoning: [
      "A self-signed SSL certificate was detected. The certificate chain is incomplete and HSTS is not configured, making the connection vulnerable to downgrade attacks.",
      "The page layout has a 72 % visual similarity to a known PayPal credential-harvesting template. A login form with email and password fields was found.",
      "The domain uses an uncommon TLD (.xyz) and the subdomain structure mimics a well-known brand: 'secure-paypal.login.xyz'.",
      "Domain was registered only 4 months ago. It appeared in 2 low-confidence threat intelligence feeds but has not been confirmed malicious yet.",
      "An obfuscated keylogger script was detected — it captures form input and sends data to an external endpoint via Base64-encoded POST requests.",
    ],
    checks: [
      { label: "SSL/TLS Verification", status: "warn", detail: "Self-signed certificate detected. Certificate chain incomplete. HSTS not configured." },
      { label: "Content Similarity Check", status: "warn", detail: "Page layout has 72% similarity to known PayPal phishing template. Login form detected." },
      { label: "URL Structure Analysis", status: "warn", detail: "Domain uses uncommon TLD (.xyz). Subdomain mimics well-known brand: 'secure-paypal.login.xyz'." },
      { label: "Domain Reputation", status: "pass", detail: "Domain is 4 months old. Found in 2 low-confidence threat feeds. Not yet confirmed malicious." },
      { label: "JavaScript Behavior", status: "fail", detail: "Obfuscated keylogger script detected. Sends form data to external endpoint via Base64 POST." },
    ],
    liveWebsitePreviewUrl: "",
    ipAddress: "185.234.72.11",
    locationName: "Moscow, RU",
    latitude: 55.75,
    longitude: 37.62,
    ispAsn: "AS44493 — Chelyabinsk-Signal LLC",
    registrar: "Namecheap, Inc.",
    createdDate: "2025-11-02",
    dnsRecords: [
      { type: "A", value: "185.234.72.11" },
      { type: "CNAME", value: "proxy-redirect.xyz" },
      { type: "MX", value: "5 mail.suspicious-host.ru" },
      { type: "TXT", value: "v=spf1 -all" },
      { type: "NS", value: "ns1.shady-dns.xyz" },
    ],
  },

  dangerous: {
    verdict: "dangerous",
    aiReasoning:
      "CRITICAL — This URL is almost certainly a phishing page. No SSL certificate is present so all data is transmitted in plaintext. " +
      "The page content is a 98 % match with a known Bank of America credential-harvesting template and includes a fake 2FA form. " +
      "Typosquatting was detected: the domain 'bankofarnerlca.com' uses Punycode-encoded characters to mimic the legitimate brand. " +
      "The domain was registered only 2 days ago and is already flagged in 31 of 47 threat intelligence databases. " +
      "JavaScript analysis found a cryptominer, a keylogger, and a session-hijacker. A drive-by download payload is also hosted on the server. " +
      "DO NOT interact with this page under any circumstances.",
    checks: [
      { label: "SSL/TLS Verification", status: "fail", detail: "No SSL certificate found. Connection is unencrypted HTTP. All data transmitted in plaintext." },
      { label: "Content Similarity Check", status: "fail", detail: "98% match with known Bank of America credential harvesting page. Fake 2FA form included." },
      { label: "URL Structure Analysis", status: "fail", detail: "Typosquatting detected: 'bankofarnerlca.com'. Punycode encoding used to spoof characters." },
      { label: "Domain Reputation", status: "fail", detail: "Domain registered 2 days ago. Flagged in 31 of 47 threat intelligence databases as malicious." },
      { label: "JavaScript Behavior", status: "fail", detail: "Cryptominer, keylogger, and session hijacker detected. Drive-by download payload hosted." },
    ],
    liveWebsitePreviewUrl: "",
    ipAddress: "45.95.168.222",
    locationName: "Lagos, NG",
    latitude: 6.52,
    longitude: 3.38,
    ispAsn: "AS37560 — Cynextra Ng Ltd",
    registrar: "Tucows Domains",
    createdDate: "2026-02-17",
    dnsRecords: [
      { type: "A", value: "45.95.168.222" },
      { type: "MX", value: "0 localhost" },
      { type: "TXT", value: "(none)" },
      { type: "NS", value: "ns1.malicious-registrar.net" },
      { type: "SOA", value: "ns1.malicious-registrar.net root 1" },
    ],
  },
}

/* ────────────────────────────────────────────────────
   Classify a URL into one of the three scenarios
   ──────────────────────────────────────────────────── */

function pickScenario(url: string): Omit<ScanResult, "confidence"> {
  const lower = url.toLowerCase()

  const dangerousPatterns = [
    "phish", "malware", "hack", "exploit", "trojan",
    "fake", "scam", "steal", "login-verify", "bankofarnerlca",
    "free-iphone", "claim-prize",
  ]
  if (dangerousPatterns.some((p) => lower.includes(p))) return SCENARIOS.dangerous

  const suspiciousPatterns = [
    "suspicious", "warn", "test", "unknown", "verify",
    "secure-", "auth-", "account-", "update-info", ".xyz", ".ru",
  ]
  if (suspiciousPatterns.some((p) => lower.includes(p))) return SCENARIOS.suspicious

  const safeDomains = [
    "google.com", "github.com", "vercel.com", "nextjs.org",
    "apple.com", "microsoft.com", "amazon.com", "wikipedia.org",
  ]
  if (safeDomains.some((d) => lower.includes(d))) return SCENARIOS.safe

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

export default function PhishingScannerPage() {
  const [view, setView] = useState<AppView>("entry")
  const [analyzedUrl, setAnalyzedUrl] = useState("")
  const [result, setResult] = useState<ScanResult | null>(null)

  const runScan = useCallback((url: string) => {
    setAnalyzedUrl(url)
    setView("scanning")

    setTimeout(() => {
      const scenario = pickScenario(url)
      const confRange =
        scenario.verdict === "safe"
          ? [92, 99]
          : scenario.verdict === "suspicious"
            ? [55, 74]
            : [88, 99]
      const confidence = randBetween(confRange[0], confRange[1])

      setResult({ ...scenario, confidence })
      setView("results")
    }, 2800)
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      <CyberBackground />

      <AnimatePresence mode="wait">
        {/* ───── Entry / Scanning view ───── */}
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
              <UrlInput onAnalyze={runScan} isAnalyzing={view === "scanning"} variant="hero" />
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
                      <p className="text-sm font-medium text-foreground">Analyzing Target</p>
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

        {/* ───── Results view ───── */}
        {view === "results" && result && (
          <motion.div
            key={`results-${result.verdict}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <ScannerHeader compact />
            <UrlInput onAnalyze={runScan} isAnalyzing={false} variant="compact" />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-6">
                <VerdictBanner confidence={result.confidence} verdict={result.verdict} />

                <div className="grid gap-6 lg:grid-cols-5">
                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <AiReasoningCard
                      reasoning={result.aiReasoning}
                      checks={result.checks}
                    />
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
                    <DockerScreenshotCard
                      url={analyzedUrl}
                      previewUrl={result.liveWebsitePreviewUrl}
                    />
                  </div>
                </div>

                <DnsTable records={result.dnsRecords} />
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
