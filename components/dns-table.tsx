"use client"

import { motion } from "framer-motion"
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

interface DnsRecord {
  type: string
  value: string
}

interface DnsTableProps {
  records: DnsRecord[]
}

const typeColorMap: Record<string, string> = {
  A: "border-primary/30 bg-primary/10 text-primary",
  AAAA: "border-chart-5/30 bg-chart-5/10 text-chart-5",
  CNAME: "border-success/30 bg-success/10 text-success",
  MX: "border-chart-3/30 bg-chart-3/10 text-chart-3",
  TXT: "border-chart-4/30 bg-chart-4/10 text-chart-4",
  NS: "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
  SOA: "border-destructive/30 bg-destructive/10 text-destructive",
}

export function DnsTable({ records }: DnsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ y: -1 }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-card-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Server className="h-4 w-4 text-primary" />
            </div>
            DNS Configurations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/40">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent bg-secondary/40">
                  <TableHead className="text-muted-foreground/70 font-semibold uppercase text-[11px] tracking-widest w-[140px] pl-4">
                    Type
                  </TableHead>
                  <TableHead className="text-muted-foreground/70 font-semibold uppercase text-[11px] tracking-widest">
                    Value
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record, index) => (
                  <motion.tr
                    key={index}
                    data-slot="table-row"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                    className="border-b border-border/30 transition-colors hover:bg-secondary/30"
                  >
                    <TableCell className="pl-4">
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-mono font-semibold tracking-wider ${
                          typeColorMap[record.type] || typeColorMap.NS
                        }`}
                      >
                        {record.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-card-foreground/90">
                      {record.value}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
