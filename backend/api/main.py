import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from backend.models import AgentConfig, AttackConfig, TestRun, CedarPolicy, GeneratePolicyRequest, ApplyPolicyRequest
from backend.attacks.attack_runner import run_attack_suite
from backend.cedar.policy_generator import generate_policies_from_results, POLICY_ENFORCEMENT_MAP
from backend.agents.target_agent import cedar_enforcer

app = FastAPI(title="AgentArena Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
agents_db: Dict[str, AgentConfig] = {}
runs_db: Dict[str, TestRun] = {}
policies_db: Dict[str, CedarPolicy] = {}

@app.post("/api/agents", response_model=AgentConfig)
def register_agent(agent: AgentConfig):
    agents_db[agent.agentId] = agent
    return agent

@app.get("/api/agents/{agent_id}", response_model=AgentConfig)
def get_agent(agent_id: str):
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agents_db[agent_id]

@app.post("/api/attacks/run", response_model=TestRun)
def launch_attack(agent_id: str, configs: List[AttackConfig]):
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = agents_db[agent_id]
    run = run_attack_suite(agent, configs)
    runs_db[run.runId] = run
    return run

@app.get("/api/attacks/{run_id}", response_model=TestRun)
def get_attack_results(run_id: str):
    if run_id not in runs_db:
        raise HTTPException(status_code=404, detail="TestRun not found")
    return runs_db[run_id]

@app.post("/api/policies/generate", response_model=List[CedarPolicy])
def generate_policies(req: GeneratePolicyRequest):
    if req.runId not in runs_db:
        raise HTTPException(status_code=404, detail="TestRun not found")
    
    run = runs_db[req.runId]
    new_policies = generate_policies_from_results(run.agentId, run.attacks)
    
    for p in new_policies:
        policies_db[p.policyId] = p
        
    return new_policies

@app.post("/api/policies/apply")
def apply_policies(req: ApplyPolicyRequest):
    if req.agentId not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    applied = []
    # Clear old policies before applying new ones to ensure a clean state
    cedar_enforcer.clear_policies()
    
    for pid in req.policyIds:
        if pid in policies_db:
            applied.append(pid)
            if pid in POLICY_ENFORCEMENT_MAP:
                cedar_enforcer.add_policy(POLICY_ENFORCEMENT_MAP[pid])
    
    return {"status": "success", "applied_policies": applied}

@app.post("/api/attacks/retest", response_model=TestRun)
def retest_agent(agent_id: str, configs: List[AttackConfig]):
    # The policies have been applied to the global cedar_enforcer,
    # so running the attack suite again will now enforce those policies.
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    agent = agents_db[agent_id]
    run = run_attack_suite(agent, configs)
    runs_db[run.runId] = run
    return run

@app.get("/api/dashboard/{agent_id}")
def get_dashboard(agent_id: str):
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    agent_runs = [r for r in runs_db.values() if r.agentId == agent_id]
    agent_policies = [p for p in policies_db.values() if p.agentId == agent_id]
    
    return {
        "agent": agents_db[agent_id],
        "runs": sorted(agent_runs, key=lambda x: x.timestamp, reverse=True),
        "policies": agent_policies
    }

from pydantic import BaseModel
class ManualHackRequest(BaseModel):
    prompt: str

@app.post("/api/attacks/manual")
def manual_hack(agent_id: str, req: ManualHackRequest):
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    from backend.agents.target_agent import create_target_agent, set_session
    set_session("CUST-001")
    target = create_target_agent(agents_db[agent_id].systemPrompt, use_real_strands=True)
    
    response = target.invoke(req.prompt)
    return {"response": response}
