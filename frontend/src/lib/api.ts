export interface AgentConfig { agentId: string; name: string; systemPrompt: string; tools: string[]; modelId: string; }
export interface AttackConfig { attackType: 'PROMPT_INJECTION' | 'DATA_EXFILTRATION' | 'UNAUTHORIZED_ACTION'; intensity: 'LOW' | 'MEDIUM' | 'HIGH'; }
export interface AttackResult { attackId: string; attackType: string; compromised: boolean; evidence: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; trace: TraceStep[]; }
export interface TraceStep { step: number; role: string; content: string; toolCall?: string; timestamp: string; }
export interface TestRun { runId: string; agentId: string; attacks: AttackResult[]; status: string; overallScore: number; timestamp: string; }
export interface CedarPolicy { policyId: string; agentId: string; cedarCode: string; description: string; generatedFrom: string; }
export interface DashboardData { agent: AgentConfig; latestRun?: TestRun; policies: CedarPolicy[]; history: TestRun[]; }

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function createAgent(config: AgentConfig): Promise<AgentConfig> {
  const res = await fetch(`${API_BASE}/api/agents`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config)
  });
  return res.json();
}

export async function runAttacks(agentId: string, attacks: AttackConfig[]): Promise<TestRun> {
  const res = await fetch(`${API_BASE}/api/attacks/run?agent_id=${agentId}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(attacks)
  });
  return res.json();
}

export async function generatePolicies(runId: string): Promise<CedarPolicy[]> {
  const res = await fetch(`${API_BASE}/api/policies/generate?run_id=${runId}`, {
    method: 'POST'
  });
  return res.json();
}

export async function applyPolicies(agentId: string, policyIds: string[]): Promise<void> {
  await fetch(`${API_BASE}/api/policies/apply?agent_id=${agentId}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(policyIds)
  });
}

export async function retest(agentId: string, runId: string): Promise<TestRun> {
  const res = await fetch(`${API_BASE}/api/attacks/retest?agent_id=${agentId}&run_id=${runId}`, {
    method: 'POST'
  });
  return res.json();
}

export async function manualHack(agentId: string, prompt: string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/attacks/manual?agent_id=${agentId}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt })
  });
  return res.json();
}
