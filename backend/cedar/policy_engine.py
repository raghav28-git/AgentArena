import re

class SimplifiedCedarEngine:
    def __init__(self):
        self.policies = []

    def add_policy(self, policy_str: str, policy_id: str):
        self.policies.append({
            "id": policy_id,
            "raw": policy_str
        })

    def evaluate(self, principal: dict, action: str, resource: dict, context: dict) -> bool:
        """
        Returns True if permitted, False if denied.
        A very simplified evaluation logic.
        """
        for policy in self.policies:
            raw = policy["raw"]
            
            # Simple check for forbid rules
            if "forbid" in raw and action in raw:
                # Basic condition parsing simulation
                if "unless" in raw:
                    if "resource.customerId == context.currentSession.customerId" in raw:
                        if resource.get("customerId") != context.get("currentSession", {}).get("customerId"):
                            return False # Denied
                else:
                    return False
        
        return True # Default permit for demo
