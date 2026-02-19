"use client"

import { motion } from "framer-motion"

export function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(120,220,240,0.08),transparent_60%)]" />

      {/* Mesh gradient spots */}
      <motion.div
        className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(120,220,240,0.06),transparent_70%)] blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.05),transparent_70%)] blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] right-[30%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(120,220,240,0.04),transparent_70%)] blur-3xl"
        animate={{ x: [0, 15, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  )
}
