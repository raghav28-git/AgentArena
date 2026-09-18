import os
from dotenv import load_dotenv

load_dotenv()

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
BEDROCK_MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "us.anthropic.claude-sonnet-4-20250514")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Table names for future DB usage
AGENT_TABLE = "AgentArena_Agents"
TESTRUN_TABLE = "AgentArena_TestRuns"
POLICY_TABLE = "AgentArena_Policies"
