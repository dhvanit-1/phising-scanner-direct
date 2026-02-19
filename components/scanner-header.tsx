"use client"

import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MotionWrapper } from "@/components/motion-wrapper"

export function ScannerHeader() {
  return (
    <MotionWrapper>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Hybrid AI Phishing Scanner
            </h1>
            <p className="text-sm text-muted-foreground">
              Docker-Isolated Deep Inspection Engine
            </p>
          </div>
        </div>
        <Badge className="w-fit border-success/30 bg-success/10 text-success">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
          System Online
        </Badge>
      </header>
    </MotionWrapper>
  )
}
