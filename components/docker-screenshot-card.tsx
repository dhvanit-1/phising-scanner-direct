"use client"

import { Monitor, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionWrapper } from "@/components/motion-wrapper"

interface DockerScreenshotCardProps {
  url: string
}

export function DockerScreenshotCard({ url }: DockerScreenshotCardProps) {
  return (
    <MotionWrapper delay={0.35}>
      <Card className="border-border bg-card h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Monitor className="h-4 w-4 text-primary" />
            Live Docker Screenshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-secondary/80 px-3 py-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-3/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
              </div>
              <div className="flex flex-1 items-center gap-1.5 rounded-md border border-border/50 bg-background/60 px-2.5 py-1">
                <Lock className="h-3 w-3 text-success" />
                <span className="truncate text-xs font-mono text-muted-foreground">
                  {url}
                </span>
              </div>
            </div>
            {/* Simulated page content */}
            <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-4 p-6">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="relative flex flex-col items-center gap-4">
                {/* Simulated page skeleton */}
                <div className="h-4 w-48 rounded bg-muted-foreground/10" />
                <div className="h-3 w-64 rounded bg-muted-foreground/8" />
                <div className="h-3 w-56 rounded bg-muted-foreground/6" />
                <div className="mt-2 grid w-full max-w-[240px] grid-cols-2 gap-2">
                  <div className="h-16 rounded-md bg-muted-foreground/8" />
                  <div className="h-16 rounded-md bg-muted-foreground/8" />
                </div>
                <div className="h-8 w-32 rounded-md bg-primary/20" />
                <div className="mt-1 h-3 w-44 rounded bg-muted-foreground/6" />
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-border bg-card/80 px-2 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                <span className="text-[10px] font-mono text-muted-foreground">
                  captured via docker
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionWrapper>
  )
}
