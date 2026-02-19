"use client"

import { ShieldCheck } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { MotionWrapper } from "@/components/motion-wrapper"

interface VerdictBannerProps {
  confidence: number
}

export function VerdictBanner({ confidence }: VerdictBannerProps) {
  return (
    <MotionWrapper delay={0.2}>
      <div className="rounded-xl border border-success/30 bg-success/10 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-success" />
            <span className="text-lg font-bold tracking-wide text-success">
              FINAL VERDICT: SAFE
            </span>
          </div>
          <div className="flex items-center gap-3 sm:min-w-[280px]">
            <span className="text-sm font-medium text-success/80 whitespace-nowrap">
              Confidence Score
            </span>
            <div className="flex-1">
              <Progress
                value={confidence}
                className="h-2.5 bg-success/20 [&>[data-slot=progress-indicator]]:bg-success"
              />
            </div>
            <span className="text-sm font-bold tabular-nums text-success">
              {confidence}%
            </span>
          </div>
        </div>
      </div>
    </MotionWrapper>
  )
}
