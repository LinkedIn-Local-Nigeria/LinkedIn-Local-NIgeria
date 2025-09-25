
from google.adk.agents import LlmAgent
from multi_tool_agent.config.olutona_config import OlutonaConfig
from multi_tool_agent.tools.team import team_tool, all_team_tool
from multi_tool_agent.tools.web_scrapper import web_scraper_tool
from multi_tool_agent.tools.schedule import get_tool_definition as schedule_tool
from multi_tool_agent.tools.speaker import speaker_tool
Olutona = LlmAgent(
    name=OlutonaConfig.get_agent_name(),
    model="gemini-2.5-flash",
    description=OlutonaConfig.get_agent_description(),
    instruction=OlutonaConfig.get_system_instruction(),
    tools=[
        team_tool,
        all_team_tool,
        schedule_tool,     
        web_scraper_tool,
        speaker_tool,
    ]
)
