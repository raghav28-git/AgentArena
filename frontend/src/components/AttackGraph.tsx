"use client";

import { motion } from 'framer-motion';
import { Bot, UserX, Database, ShieldX, ShieldCheck } from 'lucide-react';

interface Props {
  status: 'IDLE' | 'ATTACKING' | 'ANALYZING' | 'PROTECTED';
}

export default function AttackGraph({ status }: Props) {
  const isAttacking = status === 'ATTACKING';
  const isProtected = status === 'PROTECTED';

  return (
    <div className="bg-card rounded-xl border border-border p-8 flex items-center justify-center relative min-h-[200px] overflow-hidden">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 flex items-center gap-8 md:gap-16 w-full max-w-2xl justify-between">
        
        {/* Node 1: Attacker */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${isAttacking ? 'bg-destructive/10 border-destructive text-destructive' : 'bg-background border-border text-muted-foreground'}`}>
            <UserX className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">RED TEAM</span>
        </div>

        {/* Connection 1 */}
        <div className="flex-1 h-px bg-border relative">
          {isAttacking && !isProtected && (
            <motion.div 
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            />
          )}
          {isProtected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-success/20 flex items-center justify-center border border-success"
            >
              <ShieldCheck className="w-4 h-4 text-success" />
            </motion.div>
          )}
        </div>

        {/* Node 2: Target Agent */}
        <div className="flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${isProtected ? 'bg-success/10 border-success text-success' : 'bg-background border-border text-foreground'}`}>
            <Bot className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">AGENT v2.1</span>
        </div>

        {/* Connection 2 */}
        <div className="flex-1 h-px bg-border relative hidden md:block">
          {isAttacking && !isProtected && (
            <motion.div 
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.75, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-warning shadow-[0_0_10px_rgba(245,158,11,0.8)]"
            />
          )}
        </div>

        {/* Node 3: Internal Systems */}
        <div className="flex flex-col items-center gap-2 hidden md:flex">
          <div className="w-12 h-12 rounded-lg bg-background border border-border text-muted-foreground flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">DATABASE</span>
        </div>

      </div>
    </div>
  );
}

