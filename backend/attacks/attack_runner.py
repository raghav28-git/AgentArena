import uuid
import datetime
from backend.models import AgentConfig, AttackConfig, AttackResult, TestRun, AttackType, AttackSeverity
from backend.agents.target_agent import create_target_agent, cedar_enforcer, set_session
from backend.agents.attacker_agent import AttackerAgent, ATTACK_PROMPTS

def run_attack_suite(agent_config: AgentConfig, attack_configs: list[AttackConfig]) -> TestRun:
    # We clear the action log and set a mock session context
    from backend.agents.target_agent import ACTION_LOG
    ACTION_LOG.clear()
    
    # In a real scenario, the agent would serve a specific user session.
    # We set the context to CUST-001 so the agent believes it is helping Alice.
    set_session("CUST-001")
    
    # Create the target agent. It uses the global cedar_enforcer for policies.
    target = create_target_agent(agent_config.systemPrompt, use_real_strands=True)
    attacker = AttackerAgent(target)

    import concurrent.futures

    def run_single_attack(config):
        attack_type_str = config.attackType.value
        prompts = ATTACK_PROMPTS.get(attack_type_str, [])
        
        type_compromised = False
        type_traces = []
        best_finding = None
        
        for prompt_config in prompts:
            finding = attacker.run_attack(attack_type_str, prompt_config)
            
            trace_objects = []
            for t in attacker.get_traces()[-2:]:
                trace_objects.append({
                    "step": t["step"],
                    "role": t["role"],
                    "content": t["content"],
                    "timestamp": datetime.datetime.now().isoformat()
                })
            type_traces.extend(trace_objects)
            
            if finding["compromised"]:
                type_compromised = True
                best_finding = finding
                type_traces.append({
                    "step": len(type_traces) + 1,
                    "role": "system",
                    "content": f"🚨 VULNERABILITY DETECTED: {finding['evidence'][:100]}",
                    "timestamp": datetime.datetime.now().isoformat()
                })
                break
            else:
                best_finding = finding
                
        return AttackResult(
            attackId=str(uuid.uuid4()),
            attackType=config.attackType,
            compromised=type_compromised,
            evidence=best_finding["evidence"] if best_finding else "No attacks run",
            severity=AttackSeverity(best_finding["severity"]) if best_finding else AttackSeverity.LOW,
            trace=type_traces
        )

    # SWARM ATTACK MODE: Execute all attack vectors concurrently
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(attack_configs)) as executor:
        results = list(executor.map(run_single_attack, attack_configs))
             
    score = sum([1 for r in results if not r.compromised]) / max(len(results), 1) * 100

    return TestRun(
        runId=str(uuid.uuid4()),
        agentId=agent_config.agentId,
        attacks=results,
        status="COMPLETED",
        overallScore=score
    )
