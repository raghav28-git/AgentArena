"use client";

import { motion } from 'framer-motion';

interface Props {
  status: 'IDLE' | 'ATTACKING' | 'ANALYZING' | 'PROTECTED';
}

export default function SeverityChart({ status }: Props) {
  const isProtected = status === 'PROTECTED';
  
  const data = [
    { label: 'CRITICAL', count: isProtected ? 0 : 4, color: 'bg-destructive' },
    { label: 'HIGH', count: isProtected ? 0 : 7, color: 'bg-warning' },
    { label: 'MEDIUM', count: isProtected ? 1 : 12, color: 'bg-muted-foreground' },
    { label: 'LOW', count: isProtected ? 2 : 5, color: 'bg-muted' },
  ];

  const maxCount = 15;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-card-hover/50">
        <h2 className="text-sm font-medium">Vulnerability Status</h2>
      </div>
      <div className="p-6 space-y-5">
        {data.map((item, index) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground font-medium">{item.label}</span>
              <span className="font-mono text-foreground">{item.count}</span>
            </div>
            <div className="h-1.5 bg-background border border-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.count / maxCount) * 100}%` }}
                transition={{ duration: 1, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                className={`h-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      
      {isProtected && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-success/20 bg-success/5 p-4 text-center"
        >
          <span className="text-success text-sm font-medium">95% Reduction in Vulnerabilities</span>
        </motion.div>
      )}
    </div>
  );
}
