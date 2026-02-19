"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Terminal, Fingerprint, Scan, Wifi } from "lucide-react"

const icons = [
  { Icon: Shield, x: "8%", y: "25%", delay: 0, size: 28 },
  { Icon: Lock, x: "88%", y: "20%", delay: 0.5, size: 24 },
  { Icon: Terminal, x: "12%", y: "70%", delay: 1.0, size: 22 },
  { Icon: Fingerprint, x: "85%", y: "65%", delay: 1.5, size: 26 },
  { Icon: Scan, x: "5%", y: "45%", delay: 0.8, size: 20 },
  { Icon: Wifi, x: "92%", y: "42%", delay: 1.2, size: 22 },
]

export function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {icons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + delay }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <div className="rounded-xl border border-border/40 bg-card/40 p-3 backdrop-blur-md">
              <Icon
                size={size}
                className="text-primary/50"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
