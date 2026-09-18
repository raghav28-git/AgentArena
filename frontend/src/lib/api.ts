export interface AgentConfig { agentId: string; name: string; systemPrompt: string; tools: string[]; modelId: string; }
export interface AttackConfig { attackType: 'PROMPT_INJECTION' | 'DATA_EXFILTRATION' | 'UNAUTHORIZED_ACTION'; intensity: 'LOW' | 'MEDIUM' | 'HIGH'; }
export interface AttackResult { attackId: string; attackType: string; compromised: boolean; evidence: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; trace: TraceStep[]; }
export interface TraceStep { step: number; role: string; content: string; toolCall?: string; timestamp: string; }
export interface TestRun { runId: string; agentId: string; attacks: AttackResult[]; status: string; overallScore: number; timestamp: string; }
export interface CedarPolicy { policyId: string; agentId: string; cedarCode: string; description: string; generatedFrom: string; }
export interface DashboardData { agent: AgentConfig; latestRun?: TestRun; policies: CedarPolicy[]; history: TestRun[]; }

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function createAgent(config: AgentConfig): Promise<AgentConfig> {
  return config; // Mock
}

export async function runAttacks(agentId: string, attacks: AttackConfig[]): Promise<TestRun> {
  return {} as TestRun; // Mock
}

export async function getResults(runId: string): Promise<TestRun> {
  return {} as TestRun; // Mock
}

export async function generatePolicies(runId: string): Promise<CedarPolicy[]> {
  return []; // Mock
}

export async function applyPolicies(agentId: string, policyIds: string[]): Promise<void> {
  // Mock
}

export async function retest(agentId: string, runId: string): Promise<TestRun> {
  return {} as TestRun; // Mock
}

export async function getDashboard(agentId: string): Promise<DashboardData> {
  return {} as DashboardData; // Mock
}
