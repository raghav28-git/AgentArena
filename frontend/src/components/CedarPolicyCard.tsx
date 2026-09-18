"use client";

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface Props {
  title: string;
  code: string;
}

export default function CedarPolicyCard({ title, code }: Props) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-border bg-card-hover/30">
        <h3 className="font-medium text-sm text-foreground">{title}</h3>
        <span className="text-[10px] px-2 py-1 rounded-md bg-accent/10 text-accent font-mono border border-accent/20">Auto-Generated</span>
      </div>
      <div className="p-4 bg-background flex-grow">
        <pre className="text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
      <div className="p-4 border-t border-border flex justify-end gap-3 items-center bg-card-hover/30">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-border">
          <Copy className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setApplied(true)}
          className={`h-9 px-4 text-sm rounded-md font-medium transition-all ${applied ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground hover:opacity-90'}`}
        >
          {applied ? (
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Applied</span>
          ) : 'Apply Policy'}
        </button>
      </div>
    </div>
  );
}
