"use client"

import { Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionWrapper } from "@/components/motion-wrapper"

interface NetworkData {
  ip: string
  location: string
  created: string
  registrar: string
  ssl: string
}

interface NetworkIntelligenceCardProps {
  data: NetworkData
}

export function NetworkIntelligenceCard({ data }: NetworkIntelligenceCardProps) {
  const fields = [
    { label: "IP Address", value: data.ip },
    { label: "Location", value: data.location },
    { label: "Created", value: data.created },
    { label: "Registrar", value: data.registrar },
    { label: "SSL Certificate", value: data.ssl },
  ]

  return (
    <MotionWrapper delay={0.4}>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Globe className="h-4 w-4 text-primary" />
            Network Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/50 px-3 py-2.5"
              >
                <span className="text-sm text-muted-foreground">
                  {field.label}
                </span>
                <span className="text-sm font-medium font-mono text-card-foreground">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MotionWrapper>
  )
}
