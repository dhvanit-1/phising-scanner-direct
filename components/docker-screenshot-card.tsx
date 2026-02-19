"use client"

import { motion } from "framer-motion"
import { Monitor, Lock, Minus, Square, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DockerScreenshotCardProps {
  url: string
}

export function DockerScreenshotCard({ url }: DockerScreenshotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm h-full transition-shadow hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-card-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Monitor className="h-4 w-4 text-primary" />
            </div>
            Live Sandbox Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-2xl">
            {/* Mac-style window chrome */}
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/60 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]" />
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="flex max-w-sm flex-1 items-center gap-2 rounded-md border border-border/40 bg-background/50 px-3 py-1">
                  <Lock className="h-3 w-3 text-success" />
                  <span className="truncate text-xs font-mono text-muted-foreground">
                    {url}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground/40">
                <Minus className="h-3.5 w-3.5" />
                <Square className="h-3 w-3" />
                <X className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Simulated page content */}
            <div className="relative min-h-[340px] p-6">
              {/* Dot grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(120,220,240,0.06)_1px,transparent_1px)] bg-[size:16px_16px]" />

              <div className="relative flex flex-col gap-5">
                {/* Nav bar skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-muted-foreground/10" />
                  <div className="flex gap-3">
                    <div className="h-3 w-12 rounded bg-muted-foreground/8" />
                    <div className="h-3 w-12 rounded bg-muted-foreground/8" />
                    <div className="h-3 w-12 rounded bg-muted-foreground/8" />
                  </div>
                </div>

                {/* Hero section skeleton */}
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="h-5 w-52 rounded bg-muted-foreground/12" />
                  <div className="h-3 w-72 rounded bg-muted-foreground/8" />
                  <div className="h-3 w-60 rounded bg-muted-foreground/6" />
                  <div className="mt-2 h-9 w-28 rounded-lg bg-primary/15" />
                </div>

                {/* Card grid skeleton */}
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 rounded-lg border border-border/20 bg-muted-foreground/4 p-3"
                    >
                      <div className="h-3 w-12 rounded bg-muted-foreground/10" />
                      <div className="h-2 w-full rounded bg-muted-foreground/6" />
                      <div className="h-2 w-4/5 rounded bg-muted-foreground/5" />
                    </div>
                  ))}
                </div>

                {/* Footer skeleton */}
                <div className="flex items-center justify-between pt-3 border-t border-border/10">
                  <div className="h-2.5 w-28 rounded bg-muted-foreground/6" />
                  <div className="flex gap-2">
                    <div className="h-2.5 w-8 rounded bg-muted-foreground/5" />
                    <div className="h-2.5 w-8 rounded bg-muted-foreground/5" />
                  </div>
                </div>
              </div>

              {/* Docker badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/90 px-2.5 py-1.5 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                <span className="text-[10px] font-mono text-muted-foreground">
                  docker:sandbox-v3
                </span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
