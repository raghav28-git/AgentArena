from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
import datetime

class AttackType(str, Enum):
    PROMPT_INJECTION = "PROMPT_INJECTION"
    DATA_EXFILTRATION = "DATA_EXFILTRATION"
    UNAUTHORIZED_ACTION = "UNAUTHORIZED_ACTION"

class AttackSeverity(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class AgentConfig(BaseModel):
    agentId: str
    name: str
    systemPrompt: str
    tools: List[str]
    modelId: str

class AttackConfig(BaseModel):
    attackType: AttackType
    intensity: str = "MEDIUM"

class TraceStep(BaseModel):
    step: int
    role: str
    content: str
    toolCall: Optional[str] = None
    timestamp: str

class AttackResult(BaseModel):
    attackId: str
    attackType: AttackType
    compromised: bool
    evidence: str
    severity: AttackSeverity
    trace: List[TraceStep]

class TestRun(BaseModel):
    runId: str
    agentId: str
    attacks: List[AttackResult]
    status: str
    overallScore: float
    timestamp: str = Field(default_factory=lambda: datetime.datetime.now().isoformat())

class CedarPolicy(BaseModel):
    policyId: str
    agentId: str
    cedarCode: str
    generatedFrom: str
    description: str

class GeneratePolicyRequest(BaseModel):
    runId: str

class ApplyPolicyRequest(BaseModel):
    agentId: str
    policyIds: List[str]
