"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  type: string;
  compromised: boolean;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  evidence: string;
}

export default function AttackCard({ type, compromised, severity, evidence }: Props) {
  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'CRITICAL': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'HIGH': return 'bg-warning/10 text-warning border-warning/20';
      case 'MEDIUM': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-background text-muted-foreground border-border';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-5 rounded-xl border ${compromised ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {compromised ? <XCircle className="w-5 h-5 text-destructive" /> : <CheckCircle2 className="w-5 h-5 text-muted-foreground" />}
            <h3 className="font-medium text-sm">{type.replace('_', ' ')}</h3>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full w-max border ${getSeverityColor(severity)}`}>
            {severity} SEVERITY
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">Evidence</p>
        <div className="p-3 bg-background border border-border rounded-md text-sm font-mono text-muted-foreground break-words">
          {compromised ? evidence : "No vulnerabilities detected."}
        </div>
      </div>
    </motion.div>
  );
}
