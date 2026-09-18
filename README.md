# 🛡️ AgentArena

**Automated penetration testing for AI agents — find vulnerabilities, auto-generate Cedar security policies, prove they're fixed.**

## The Problem

AI agents are being deployed with access to databases, APIs, and payments — but nobody tests if they can be hacked. Prompt injection attacks are up 340% YoY, yet no tool tests agents as integrated systems.

## The Solution

AgentArena automatically red-teams your AI agents by simulating:
- **Prompt Injection** — Override agent instructions, leak system prompts
- **Data Exfiltration** — Access unauthorized customer data through tool misuse  
- **Unauthorized Actions** — Trigger payments, emails, or database operations beyond scope

Then it **auto-generates AWS Cedar security policies** to fix each vulnerability and **re-tests to prove they work**.

## Architecture

```
User → Dashboard (Next.js) → FastAPI Backend → Attack Engine
                                                    ↓
                                          ┌─────────┼─────────┐
                                          │         │         │
                                     Attacker   Target    Cedar
                                      Agent     Agent    Policy
                                    (Strands)  (Strands)  Engine
                                          │         │         │
                                          └────┬────┘         │
                                               │              │
                                          Amazon Bedrock      │
                                         (Claude Sonnet)      │
                                               │              │
                                          Results DB ◄────────┘
```

## AWS Services Used

| Service | Purpose |
|---|---|
| **Amazon Bedrock** | LLM reasoning for attack & target agents |
| **Strands Agents SDK** | Agent framework (attacker + target) |
| **AWS Cedar** | Authorization policy language |
| **AWS Lambda** | Serverless API compute |
| **API Gateway** | REST API |
| **DynamoDB** | Results & policy storage |
| **S3** | Attack logs & artifacts |
| **Step Functions** | Attack pipeline orchestration |
| **EventBridge** | Async event notifications |
| **OpenSearch** | Searchable attack traces |
| **CloudWatch** | Monitoring & metrics |

## Quick Start

### Backend
```bash
pip install -r requirements.txt
cp .env.example .env  # Edit with your AWS credentials
python -m uvicorn backend.api.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Built During

**First Commit Hackathon** — WeMakeDevs × AWS Bharat Builds Tour  
September 17–20, 2026

## AI Tools Used

- Antigravity (Google Gemini) — Code generation & architecture
- Amazon Bedrock (Claude Sonnet) — Agent reasoning

## License

MIT
