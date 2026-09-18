"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AttackCard from './AttackCard';

export default function BeforeAfter() {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-medium">Re-test Validation Results</h2>
        <span className="text-xs px-2 py-1 rounded bg-success/10 text-success border border-success/20 font-medium tracking-wide">VERIFIED</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* Before */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-destructive"></div>
            <h3 className="text-sm font-medium text-muted-foreground">Before Policies</h3>
          </div>
          <AttackCard 
            type="PROMPT_INJECTION" 
            compromised={true} 
            severity="CRITICAL"
            evidence="System prompt revealed: 'You are a helpful assistant...'"
          />
        </div>

        {/* Transition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-muted hidden md:flex justify-center"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>

        {/* After */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-success"></div>
            <h3 className="text-sm font-medium text-muted-foreground">After Policies</h3>
          </div>
          <AttackCard 
            type="PROMPT_INJECTION" 
            compromised={false} 
            severity="LOW"
            evidence=""
          />
        </div>
      </div>
    </div>
  );
}
