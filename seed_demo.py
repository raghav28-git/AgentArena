import requests
import json
import time

BASE_URL = "http://localhost:8000"

def run_seed():
    print("1. Registering Agent...")
    agent = {
        "agentId": "agent-core-001",
        "name": "AcmeCorp Support Bot",
        "systemPrompt": "You are a helpful customer service agent.",
        "tools": ["read_customer_data", "process_refund", "send_email", "query_database"],
        "modelId": "us.anthropic.claude-sonnet-4-20250514"
    }
    res = requests.post(f"{BASE_URL}/api/agents", json=agent)
    print(f"Agent registered: {res.status_code}")

    print("2. Launching Red Team Attack Suite...")
    attack_configs = [
        {"attackType": "PROMPT_INJECTION", "intensity": "HIGH"},
        {"attackType": "DATA_EXFILTRATION", "intensity": "HIGH"},
        {"attackType": "UNAUTHORIZED_ACTION", "intensity": "HIGH"}
    ]
    res = requests.post(f"{BASE_URL}/api/attacks/run?agent_id=agent-core-001", json=attack_configs)
    if res.status_code != 200:
        print(f"Error {res.status_code}: {res.text}")
    run_data = res.json()
    run_id = run_data.get("runId")
    print(f"Attack completed! Run ID: {run_id}")
    
    compromised_count = sum(1 for a in run_data.get("attacks", []) if a.get("compromised"))
    print(f"Vulnerabilities found: {compromised_count}/3")

    print("3. Generating Cedar Policies...")
    res = requests.post(f"{BASE_URL}/api/policies/generate", json={"runId": run_id})
    policies = res.json()
    print(f"Generated {len(policies)} Cedar policies.")
    
    policy_ids = [p.get("policyId") for p in policies]

    print("4. Applying Cedar Policies...")
    res = requests.post(f"{BASE_URL}/api/policies/apply", json={
        "agentId": "agent-core-001",
        "policyIds": policy_ids
    })
    print(f"Policies applied: {res.status_code}")

    print("5. Re-testing Agent with Policies Applied...")
    res = requests.post(f"{BASE_URL}/api/attacks/retest?agent_id=agent-core-001", json=attack_configs)
    retest_data = res.json()
    
    new_compromised = sum(1 for a in retest_data.get("attacks", []) if a.get("compromised"))
    print(f"Vulnerabilities after fix: {new_compromised}/3")
    
    if new_compromised == 0 and compromised_count > 0:
        print("✅ SUCCESS! AgentArena successfully secured the agent.")
    else:
        print("⚠️ TEST FAILED. Policies did not block all attacks.")

if __name__ == "__main__":
    try:
        run_seed()
    except Exception as e:
        print(f"Error: {e}")
