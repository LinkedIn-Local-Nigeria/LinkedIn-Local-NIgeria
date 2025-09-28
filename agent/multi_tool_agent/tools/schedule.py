import os
import pandas as pd
import re
from typing import List, Dict, Any
from google.adk.tools import FunctionTool, ToolContext

csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "schedule.csv")
df = pd.read_csv(csv_path)

df.columns = df.columns.str.strip()

TIME_FRAMES = ['7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']

def normalize_time_query(raw_query: str) -> str:
    """Extract and normalize time expressions like 'by 2pm', 'around 2pm', 'at 2:00pm' → '2pm'."""
    raw_query = raw_query.lower().strip()

    match = re.search(r"\b(\d{1,2})(?::\d{2})?\s*(am|pm)\b", raw_query)
    if match:
        hour, meridian = match.groups()
        return f"{int(hour)}{meridian}" 

    return raw_query

def get_schedule_by_time(time_query: str, tool_context: ToolContext) -> dict:
    """
    Get sessions happening at a specific time or time frame.
    
    Args:
        time_query (str): The time or time frame to look up (e.g., '2pm', 'morning', 'keynote')
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: Sessions information for the requested time
    """
    try:
        if not time_query or time_query.strip() == "":
            return {"message": "Please specify a time (e.g., '2pm', 'morning', 'afternoon')"}
            
        original_query = time_query
        time_query = normalize_time_query(time_query).lower()

        if time_query in ['morning', 'am', 'before noon', 'early']:
            target_frames = ['7am', '8am', '9am', '10am', '11am']
            query_description = "morning sessions"
        elif time_query in ['noon', '12pm', 'midday', 'twelve', '12:00pm', '12 pm']:
            target_frames = ['12pm']
            query_description = "noon sessions"
        elif time_query in ['afternoon', 'pm', 'after noon']:
            target_frames = ['12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
            query_description = "afternoon sessions"
        elif time_query in ['lunch', 'lunch time', 'break time', 'break']:
            target_frames = ['1pm']
            query_description = "lunch break sessions"
        elif time_query in ['opening', 'start', 'beginning']:
            target_frames = ['7am', '8am', '9am']
            query_description = "opening sessions"
        elif time_query in ['closing', 'end', 'finish', 'final']:
            target_frames = ['3pm', '4pm', '5pm']
            query_description = "closing sessions"
        elif 'keynote' in time_query.lower():
            keynote_sessions = df[df['type'].str.lower().str.contains('keynote', na=False)]
            if not keynote_sessions.empty:
                sessions_list = []
                for _, session in keynote_sessions.iterrows():
                    sessions_list.append(f"• **{session.get('title', 'Unknown')}** ({session.get('timeSlot', 'Time TBD')})")
                
                return {
                    "message": f"**Keynote Sessions:**\n\n" + "\n".join(sessions_list)
                }
            else:
                return {"message": "No keynote sessions found in the schedule."}
        elif 'setup' in time_query.lower() or 'volunteer' in time_query.lower():
            setup_sessions = df[df['type'].str.lower().str.contains('setup', na=False)]
            if not setup_sessions.empty:
                sessions_list = []
                for _, session in setup_sessions.iterrows():
                    sessions_list.append(f"• **{session.get('title', 'Unknown')}** ({session.get('timeSlot', 'Time TBD')})")
                
                return {
                    "message": f"**Setup/Volunteer Sessions:**\n\n" + "\n".join(sessions_list)
                }
            else:
                return {"message": "No setup sessions found in the schedule."}
        else:
            matched_frames = [tf for tf in TIME_FRAMES if tf in time_query or time_query in tf]
            if matched_frames:
                target_frames = matched_frames
                query_description = f"sessions at {original_query}"
            else:
                target_frames = [time_query]
                query_description = f"sessions at {original_query}"

        results = []
        for time_frame in target_frames:
            frame_sessions = df[df['timeFrame'].str.lower().str.contains(time_frame.lower(), na=False)]
            if not frame_sessions.empty:
                results.extend(frame_sessions.to_dict('records'))

        if not results:
            for time_frame in target_frames:
                frame_sessions = df[df['timeSlot'].str.lower().str.contains(time_frame.lower(), na=False)]
                if not frame_sessions.empty:
                    results.extend(frame_sessions.to_dict('records'))

        if not results:
            available_times = df['timeFrame'].dropna().unique()[:10] 
            return {
                "message": f"No sessions found for '{original_query}'.\n\nAvailable time frames: {', '.join(available_times)}"
            }

        sessions_list = []
        for session in results:
            title = session.get('title', 'Unknown Session')
            time_slot = session.get('timeSlot', 'Time TBD')
            duration = session.get('duration', '')
            session_type = session.get('type', 'session')
            
            session_info = f"• **{title}**"
            if time_slot != 'Time TBD':
                session_info += f" ({time_slot})"
            if duration:
                session_info += f" - {duration}"
            if session_type and session_type != 'session':
                session_info += f" [{session_type.title()}]"
                
            sessions_list.append(session_info)

        return {
            "time_query": original_query,
            "sessions_found": len(results),
            "message": f"**{query_description.title()}:**\n\n" + "\n".join(sessions_list)
        }

    except Exception as e:
        return {
            "message": f"Sorry, couldn't fetch the schedule for '{time_query}'. Please try again! Error: {str(e)}"
        }

def get_full_schedule(tool_context: ToolContext) -> dict:
    """
    Get the complete event schedule.
    
    Args:
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: Complete schedule information
    """
    try:
        schedule_by_time = {}
        
        for _, session in df.iterrows():
            time_frame = session.get('timeFrame', 'Unknown Time')
            if time_frame not in schedule_by_time:
                schedule_by_time[time_frame] = []
            
            session_info = {
                'title': session.get('title', 'Unknown'),
                'timeSlot': session.get('timeSlot', 'Time TBD'),
                'duration': session.get('duration', ''),
                'type': session.get('type', 'session')
            }
            schedule_by_time[time_frame].append(session_info)
        
        time_order = ['7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
        schedule_display = []
        
        schedule_display.append("**LinkedIn Local Nigeria 2025 - October 4, 2025**")
        schedule_display.append("Trinity Towers, VI, Lagos | 5,000+ guests | 7:00 AM – 5:00 PM")
        schedule_display.append("")
        
        for time_frame in time_order:
            if time_frame in schedule_by_time:
                schedule_display.append(f"**{time_frame.upper()}:**")
                for session in schedule_by_time[time_frame]:
                    title = session['title']
                    timeSlot = session['timeSlot']
                    duration = session['duration']
                    session_type = session['type']
                    
                    line = f"  • {title}"
                    if timeSlot != 'Time TBD':
                        line += f" ({timeSlot})"
                    if duration:
                        line += f" - {duration}"
                    if session_type and session_type not in ['session', 'keynote']:
                        line += f" [{session_type.title()}]"
                    
                    schedule_display.append(line)
                schedule_display.append("")  
        
        return {
            "total_sessions": len(df),
            "message": "\n".join(schedule_display)
        }
        
    except Exception as e:
        return {
            "message": f"Sorry, couldn't fetch the full schedule right now. Please try again! Error: {str(e)}"
        }

def search_sessions(query: str, tool_context: ToolContext) -> dict:
    """
    Search for sessions by title, type, or keyword.
    
    Args:
        query (str): Search term (e.g., 'keynote', 'panel', 'networking', 'speaker name')
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: Matching sessions
    """
    try:
        if not query or query.strip() == "":
            return {"message": "Please provide a search term (e.g., 'keynote', 'panel', 'networking', 'Tunde Onakoya')"}
            
        query = query.lower().strip()
        
        matches = df[
            df['title'].str.lower().str.contains(query, na=False) |
            df['type'].str.lower().str.contains(query, na=False)
        ]
        
        if matches.empty:
            speaker_keywords = ['tunde', 'onakoya', 'jesudamilare', 'aishah', 'ahmad', 'samuel', 'ajiboyede', 
                              'tonye', 'cole', 'moji', 'hunponu', 'taiwo', 'oyedele', 'tosin', 'olaseinde',
                              'kemi', 'adetiba', 'beauty', 'tukura']
            
            for keyword in speaker_keywords:
                if keyword in query:
                    matches = df[df['title'].str.lower().str.contains(keyword, na=False)]
                    break
            
            if matches.empty:
                return {"message": f"No sessions found matching '{query}'. Try searching for 'keynote', 'panel', 'networking', or speaker names like 'Tunde Onakoya'."}
        
        results_list = []
        for _, session in matches.iterrows():
            title = session.get('title', 'Unknown')
            timeSlot = session.get('timeSlot', 'Time TBD')
            session_type = session.get('type', 'session')
            
            result_line = f"• **{title}**"
            if timeSlot != 'Time TBD':
                result_line += f" ({timeSlot})"
            if session_type:
                result_line += f" [{session_type.title()}]"
                
            results_list.append(result_line)
        
        return {
            "query": query,
            "matches_found": len(matches),
            "message": f"**Sessions matching '{query}':**\n\n" + "\n".join(results_list)
        }
        
    except Exception as e:
        return {
            "message": f"Sorry, couldn't search sessions for '{query}'. Please try again! Error: {str(e)}"
        }

def get_session_types(tool_context: ToolContext) -> dict:
    """
    Get all available session types in the schedule.
    
    Args:
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: Available session types
    """
    try:
        session_types = df['type'].value_counts().to_dict()
        
        types_list = []
        for session_type, count in session_types.items():
            types_list.append(f"• **{session_type.title()}**: {count} sessions")
        
        return {
            "message": f"**Available Session Types:**\n\n" + "\n".join(types_list)
        }
        
    except Exception as e:
        return {
            "message": f"Sorry, couldn't fetch session types. Error: {str(e)}"
        }

schedule_time_tool = FunctionTool(get_schedule_by_time)
full_schedule_tool = FunctionTool(get_full_schedule)
search_sessions_tool = FunctionTool(search_sessions)
session_types_tool = FunctionTool(get_session_types)