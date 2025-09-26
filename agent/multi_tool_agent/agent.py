from google.adk.agents import LlmAgent
from multi_tool_agent.config.olutona_config import OlutonaConfig

from multi_tool_agent.tools.team import team_tool, all_team_tool, conveners_tool
from multi_tool_agent.tools.web_scrapper import web_scraper_tool
from multi_tool_agent.tools.schedule import schedule_time_tool, full_schedule_tool, search_sessions_tool
from multi_tool_agent.tools.speaker import speaker_tool, all_speakers_tool
from multi_tool_agent.tools.knowledge_base import venue_tool, event_info_tool, directions_tool, ticket_tool, general_tool, resources_tool, practical_tool, maximize_tool, networking_tool

Olutona = LlmAgent(
    name=OlutonaConfig.get_agent_name(),
    model="gemini-2.5-flash",
    description=OlutonaConfig.get_agent_description(),
    instruction=OlutonaConfig.get_system_instruction(),
    tools=[
        # Team tools
        team_tool,
        all_team_tool,
        conveners_tool,
        
        # Schedule tools
        schedule_time_tool,
        full_schedule_tool, 
        search_sessions_tool,
        
        # Speaker tools
        speaker_tool,
        all_speakers_tool,
        
        # Knowledge base tools
        venue_tool,
        event_info_tool,
        directions_tool,
        ticket_tool,
        networking_tool,
        maximize_tool,
        practical_tool,
        resources_tool,
        general_tool,
        web_scraper_tool
    ]
)