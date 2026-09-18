"use client";

import { motion } from "framer-motion";

export default function AttackAnimation() {
  return (
    <div className="relative w-full h-48 bg-black/20 rounded-xl border border-arena-border overflow-hidden flex items-center justify-center">
      {/* Target Node */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="z-10 w-16 h-16 rounded-full bg-arena-blue flex items-center justify-center glow-blue"
      >
        <span className="font-bold text-white text-xs">AGENT</span>
      </motion.div>
      
      {/* Attacker Node */}
      <motion.div 
        className="absolute left-8 z-10 w-12 h-12 rounded-full bg-arena-red flex items-center justify-center glow-red"
      >
        <span className="font-bold text-white text-xs">ATK</span>
      </motion.div>

      {/* Attack Probes */}
      <motion.div
        animate={{ left: ["4rem", "calc(50% - 2rem)"], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute h-1 w-16 bg-arena-red/80 shadow-[0_0_8px_rgba(255,68,68,0.8)] rounded-full"
      />
    </div>
  );
}
