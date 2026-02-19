"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"

interface UrlInputProps {
  onAnalyze: (url: string) => void
  isAnalyzing: boolean
}

export function UrlInput({ onAnalyze, isAnalyzing }: UrlInputProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onAnalyze(url.trim())
    }
  }

  return (
    <MotionWrapper delay={0.1}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="url"
            placeholder="Enter URL to analyze (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 pl-10 text-base bg-card border-border placeholder:text-muted-foreground/60"
          />
        </div>
        <Button
          type="submit"
          disabled={isAnalyzing || !url.trim()}
          className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
        >
          {isAnalyzing ? (
            <>
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Scanning
            </>
          ) : (
            "Analyze URL"
          )}
        </Button>
      </form>
    </MotionWrapper>
  )
}
