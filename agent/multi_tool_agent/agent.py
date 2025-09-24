from google.adk.agents import LlmAgent
from multi_tool_agent.config.olutona_config import OlutonaConfig
from multi_tool_agent.tools.team import team_tool, all_team_tool

Olutona = LlmAgent(
    name=OlutonaConfig.get_agent_name(),
    model="gemini-2.5-flash",
    description=OlutonaConfig.get_agent_description(),
    instruction=OlutonaConfig.get_system_instruction(),
    tools=[team_tool, all_team_tool]
)