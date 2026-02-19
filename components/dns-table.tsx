"use client"

import { Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MotionWrapper } from "@/components/motion-wrapper"

interface DnsRecord {
  type: string
  value: string
}

interface DnsTableProps {
  records: DnsRecord[]
}

export function DnsTable({ records }: DnsTableProps) {
  return (
    <MotionWrapper delay={0.5}>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Server className="h-4 w-4 text-primary" />
            DNS Configurations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent bg-secondary/50">
                  <TableHead className="text-muted-foreground font-semibold uppercase text-xs tracking-wider w-[140px]">
                    Type
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold uppercase text-xs tracking-wider">
                    Value
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index} className="border-border">
                    <TableCell>
                      <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-mono font-medium text-primary">
                        {record.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-card-foreground">
                      {record.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MotionWrapper>
  )
}
