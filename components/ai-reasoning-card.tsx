"use client"

import { Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionWrapper } from "@/components/motion-wrapper"

interface ReasoningStep {
  label: string
  status: "pass" | "warn" | "fail"
  detail: string
}

interface AiReasoningCardProps {
  steps: ReasoningStep[]
}

export function AiReasoningCard({ steps }: AiReasoningCardProps) {
  return (
    <MotionWrapper delay={0.3}>
      <Card className="border-border bg-card h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Brain className="h-4 w-4 text-primary" />
            AI Reasoning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {steps.map((step) => (
              <div
                key={step.label}
                className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/50 p-3"
              >
                <span
                  className={`mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full ${
                    step.status === "pass"
                      ? "bg-success"
                      : step.status === "warn"
                        ? "bg-chart-3"
                        : "bg-destructive"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-card-foreground">
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MotionWrapper>
  )
}
