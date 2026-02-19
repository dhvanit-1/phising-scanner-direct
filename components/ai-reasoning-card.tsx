"use client"

import { motion } from "framer-motion"
import { Brain, Check, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm h-full transition-shadow hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-card-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            AI Reasoning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2.5">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="group flex items-start gap-3 rounded-xl border border-border/40 bg-secondary/40 p-3.5 transition-colors hover:border-border/60 hover:bg-secondary/60"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    delay: 0.6 + i * 0.12,
                  }}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    step.status === "pass"
                      ? "bg-success/15 text-success"
                      : step.status === "warn"
                        ? "bg-chart-3/15 text-chart-3"
                        : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {step.status === "pass" ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    <AlertTriangle className="h-3 w-3" />
                  )}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
