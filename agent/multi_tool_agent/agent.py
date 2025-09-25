from google.adk.agents import LlmAgent
from multi_tool_agent.config.olutona_config import OlutonaConfig
from multi_tool_agent.tools.team import team_tool, all_team_tool
from multi_tool_agent.tools.schedule import (
    full_schedule_tool,      
    schedule_by_time_tool,   
    sessions_by_type_tool,  
    search_schedule_tool,   
    session_details_tool,    
    schedule_summary_tool    
)

Olutona = LlmAgent(
    name=OlutonaConfig.get_agent_name(),
    model="gemini-2.5-flash",
    description=OlutonaConfig.get_agent_description(),
    instruction=OlutonaConfig.get_system_instruction(),
    tools=[
        team_tool, 
        all_team_tool,
        full_schedule_tool,     
        schedule_by_time_tool, 
        sessions_by_type_tool, 
        search_schedule_tool,   
        session_details_tool, 
        schedule_summary_tool 
           ]
)