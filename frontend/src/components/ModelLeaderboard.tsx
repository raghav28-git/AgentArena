"use client";

import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Cpu } from 'lucide-react';

const models = [
  { name: "Claude 3.5 Sonnet", vendor: "Anthropic", score: 42, color: "text-warning", icon: Cpu },
  { name: "GPT-4o", vendor: "OpenAI", score: 38, color: "text-destructive", icon: Cpu },
  { name: "Llama 3 (70B)", vendor: "Meta", score: 25, color: "text-destructive", icon: Cpu },
];

export default function ModelLeaderboard({ isProtected }: { isProtected: boolean }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-card-hover/50 flex justify-between items-center">
        <h2 className="text-sm font-medium">Model Safety Baseline</h2>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Zero-Shot</span>
      </div>
      
      <div className="p-0">
        <table className="w-full text-sm text-left">
          <thead className="bg-background/50 text-xs text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Model</th>
              <th className="px-4 py-3 font-medium">Native Score</th>
              <th className="px-4 py-3 font-medium text-right">With AgentArena</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, idx) => (
              <motion.tr 
                key={model.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-border/50 last:border-0 hover:bg-card-hover/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <model.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">{model.name}</div>
                      <div className="text-[10px] text-muted-foreground">{model.vendor}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1.5 font-mono ${model.color}`}>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {model.score}/100
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className={`flex items-center justify-end gap-1.5 font-mono transition-colors duration-1000 ${isProtected ? 'text-success' : 'text-muted-foreground'}`}>
                    {isProtected ? (
                      <>
                        <Shield className="w-3.5 h-3.5" />
                        99/100
                      </>
                    ) : (
                      <span className="opacity-50">Pending...</span>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

