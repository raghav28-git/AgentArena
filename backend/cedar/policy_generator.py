import uuid
from backend.models import AttackResult, AttackType, CedarPolicy

# Internal mapping to convert Cedar policies into enforcement rules for our mock engine
POLICY_ENFORCEMENT_MAP = {}

def generate_policies_from_results(agent_id: str, results: list[AttackResult]) -> list[CedarPolicy]:
    policies = []
    
    for result in results:
        if not result.compromised:
            continue
            
        policy_id = f"policy-{uuid.uuid4()}"
        
        if result.attackType == AttackType.DATA_EXFILTRATION:
            cedar_code = """forbid(
  principal,
  action in ["read_customer_data", "query_database"],
  resource
) unless {
  resource.customerId == context.currentSession.customerId
};"""
            desc = "Prevents cross-user data access and unauthorized queries"
            rule = {
                "action": "*", # Using * in mock to catch both for simplicity
                "condition": {"same_user_only": True},
                "description": desc
            }
            
        elif result.attackType == AttackType.UNAUTHORIZED_ACTION:
            cedar_code = """forbid(
  principal,
  action == "process_refund",
  resource
) when {
  resource.amount > 100
};"""
            desc = "Limits refund amounts to prevent unauthorized large refunds"
            rule = {
                "action": "process_refund",
                "condition": {"max_amount": 100.0},
                "description": desc
            }
            
        elif result.attackType == AttackType.PROMPT_INJECTION:
            cedar_code = """forbid(
  principal,
  action == "system_override",
  resource
);"""
            desc = "Prevents system prompt overrides and debug mode access"
            rule = {
                "action": "system_override",
                "condition": {"block_system_info": True},
                "description": desc
            }
        
        else:
            continue
            
        POLICY_ENFORCEMENT_MAP[policy_id] = rule
            
        policies.append(CedarPolicy(
            policyId=policy_id,
            agentId=agent_id,
            cedarCode=cedar_code,
            generatedFrom=result.attackId,
            description=desc
        ))
        
    return policies
