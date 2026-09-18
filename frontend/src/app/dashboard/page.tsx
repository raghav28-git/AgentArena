"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bug, Play, ActivitySquare, Terminal } from 'lucide-react';
import Link from 'next/link';
import AttackCard from '@/components/AttackCard';
import SeverityChart from '@/components/SeverityChart';
import CedarPolicyCard from '@/components/CedarPolicyCard';
import LiveTrace from '@/components/LiveTrace';
import BeforeAfter from '@/components/BeforeAfter';
import ModelLeaderboard from '@/components/ModelLeaderboard';
import AttackGraph from '@/components/AttackGraph';

export default function Dashboard() {
  const [status, setStatus] = useState<'IDLE' | 'ATTACKING' | 'ANALYZING' | 'PROTECTED'>('IDLE');
  const [manualInput, setManualInput] = useState('');

  const startTest = () => {
    setStatus('ATTACKING');
    setTimeout(() => setStatus('ANALYZING'), 3000);
    setTimeout(() => setStatus('PROTECTED'), 6000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setManualInput('');
    // In a real app, this would send to the backend
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <ActivitySquare className="w-5 h-5 text-accent hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <span className="font-medium text-sm">Dashboard</span>
            <span className="text-muted-foreground text-sm">/ Target: Agent Core v2.1</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-card border border-border text-xs font-medium">
              <div className={`w-2 h-2 rounded-full ${
                status === 'IDLE' ? 'bg-muted' : 
                status === 'PROTECTED' ? 'bg-success' : 
                'bg-accent animate-pulse'
              }`} />
              <span className="tracking-wide">{status}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Red Team Simulation</h1>
            <p className="text-muted-foreground">Monitor attack vectors and generate security policies.</p>
          </div>
          <button 
            onClick={startTest}
            disabled={status !== 'IDLE'}
            className="h-10 px-6 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {status === 'IDLE' ? <Play className="w-4 h-4" /> : <Bug className="w-4 h-4 animate-bounce" />}
            {status === 'IDLE' ? 'Start Assessment' : 'Running...'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-12">
            <AttackGraph status={status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Analytics & Controls */}
          <div className="lg:col-span-4 space-y-8">
            <SeverityChart status={status} />
            <ModelLeaderboard isProtected={status === 'PROTECTED'} />
          </div>

          {/* Right Column: Live Feed & Results */}
          <div className="lg:col-span-8 space-y-8">
            {status === 'PROTECTED' ? (
              <BeforeAfter />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AttackCard 
                  type="PROMPT_INJECTION" 
                  compromised={status !== 'IDLE'} 
                  severity="CRITICAL"
                  evidence="System prompt revealed: 'You are a helpful assistant...'"
                />
                <AttackCard 
                  type="DATA_EXFILTRATION" 
                  compromised={status !== 'IDLE'} 
                  severity="HIGH"
                  evidence="Leaked 3 customer email addresses."
                />
              </div>
            )}
            
            <div className="bg-card rounded-xl border border-border flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-card-hover/50 flex justify-between items-center">
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                  Execution Trace & Manual Override
                </h2>
                <span className="text-xs text-muted-foreground font-mono">Live</span>
              </div>
              <div className="h-64 flex flex-col">
                <LiveTrace active={status === 'ATTACKING'} />
              </div>
              <div className="p-3 border-t border-border bg-background">
                <form onSubmit={handleManualSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Type an adversarial prompt to test the agent manually..." 
                    className="flex-1 bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-card-hover border border-border rounded-md text-sm font-medium hover:bg-border transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {status === 'PROTECTED' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
            className="mt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-border gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-success" />
                <h2 className="text-lg font-medium tracking-tight">Generated Cedar Policies</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert("Downloading AWS CDK definitions (agent_arena_stack.ts)...")}
                  className="px-3 py-1.5 text-xs font-medium bg-card border border-border hover:bg-border rounded-md transition-colors text-muted-foreground hover:text-foreground"
                >
                  Export to AWS CDK
                </button>
                <button 
                  onClick={() => alert("Downloading Terraform state (main.tf)...")}
                  className="px-3 py-1.5 text-xs font-medium bg-card border border-border hover:bg-border rounded-md transition-colors text-muted-foreground hover:text-foreground"
                >
                  Export to Terraform
                </button>
                <button 
                  onClick={() => alert("Generating .github/workflows/security.yml...")}
                  className="px-3 py-1.5 text-xs font-medium bg-accent text-primary-foreground hover:bg-accent/90 rounded-md transition-colors"
                >
                  Generate CI/CD Action
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CedarPolicyCard 
                title="Prevent System Prompt Leakage"
                code={`permit (\n  principal,\n  action == Action::"ReadResponse",\n  resource\n) when {\n  !resource.content.contains("You are a helpful assistant")\n};`}
              />
              <CedarPolicyCard 
                title="Block Email Exfiltration"
                code={`forbid (\n  principal,\n  action == Action::"SendResponse",\n  resource\n) when {\n  resource.content.like("*@*.*")\n};`}
              />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
