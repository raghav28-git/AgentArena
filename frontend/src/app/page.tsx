"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Target, Lock, ArrowRight, ActivitySquare } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-background selection:bg-accent/30 text-foreground">
      
      {/* Navbar placeholder */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <ActivitySquare className="w-5 h-5 text-accent" />
          AgentArena
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Dashboard
        </Link>
      </nav>

      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground mb-8">
            <span className="flex h-2 w-2 rounded-full bg-success"></span>
            Agent Security Platform v2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight">
            Automated red-teaming <br className="hidden md:block"/> for AI agents.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light">
            Simulate sophisticated attacks against your LLM agents. Automatically generate 
            and enforce AWS Cedar policies to protect against prompt injection and data exfiltration.
          </p>

          <Link href="/dashboard">
            <button className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
              Launch Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
          <FeatureCard 
            icon={<Target className="w-5 h-5 text-foreground" />}
            title="Attack Simulation"
            description="Run sophisticated adversarial prompts and test your agent's resilience."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Shield className="w-5 h-5 text-foreground" />}
            title="Vulnerability Detection"
            description="Identify data leaks and unauthorized actions in real-time."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Lock className="w-5 h-5 text-foreground" />}
            title="Policy Generation"
            description="Automatically generate verifiable AWS Cedar security policies."
            delay={0.3}
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="p-6 rounded-xl bg-card border border-border hover:border-border-hover transition-colors flex flex-col items-start text-left"
    >
      <div className="mb-4 p-3 rounded-lg bg-background border border-border">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
