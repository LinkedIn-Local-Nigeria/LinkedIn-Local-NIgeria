import os
import pandas as pd
import re
from typing import List, Dict, Any
from google.adk.tools import FunctionTool, ToolContext

# Load the sessions CSV
csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "schedule.csv")
df = pd.read_csv(csv_path)

# Clean column names
df.columns = df.columns.str.strip().str.lower()

# Define available time frames based on your actual data
TIME_FRAMES = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm']

def normalize_time_query(raw_query: str) -> str:
    """Extract and normalize time expressions like 'by 2pm', 'around 2pm', 'at 2:00pm' → '2pm'."""
    raw_query = raw_query.lower().strip()

    # Regex to catch things like "2pm", "2 pm", "2:00pm", "02:00 pm"
    match = re.search(r"\b(\d{1,2})(?::\d{2})?\s*(am|pm)\b", raw_query)
    if match:
        hour, meridian = match.groups()
        return f"{int(hour)}{meridian}"  # normalize "02pm" → "2pm"

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
            
        # Normalize user query
        original_query = time_query
        time_query = normalize_time_query(time_query).lower()

        # Handle broad time ranges
        if time_query in ['morning', 'am', 'before noon']:
            target_frames = ['8am', '9am', '10am', '11am']
            query_description = "morning sessions"
        elif time_query in ['afternoon', 'pm', 'after noon']:
            target_frames = ['12pm', '1pm', '2pm', '3pm']
            query_description = "afternoon sessions"
        elif time_query in ['lunch', 'lunch time', 'break time', 'break']:
            target_frames = ['1pm']
            query_description = "lunch break sessions"
        elif time_query in ['opening', 'start', 'beginning']:
            target_frames = ['8am', '9am']
            query_description = "opening sessions"
        elif time_query in ['closing', 'end', 'finish', 'final']:
            target_frames = ['2pm', '3pm']
            query_description = "closing sessions"
        elif 'keynote' in time_query.lower():
            # Find all keynote sessions
            keynote_sessions = df[df['type'].str.lower().str.contains('keynote', na=False)]
            if not keynote_sessions.empty:
                sessions_list = []
                for _, session in keynote_sessions.iterrows():
                    sessions_list.append(f"• **{session.get('title', 'Unknown')}** ({session.get('timeslot', 'Time TBD')})")
                
                return {
                    "message": f"**Keynote Sessions:**\n\n" + "\n".join(sessions_list)
                }
            else:
                return {"message": "No keynote sessions found in the schedule."}
        else:
            # Look for specific time frame
            matched_frames = [tf for tf in TIME_FRAMES if tf in time_query or time_query in tf]
            if matched_frames:
                target_frames = matched_frames
                query_description = f"sessions at {original_query}"
            else:
                target_frames = [time_query]
                query_description = f"sessions at {original_query}"

        # Search for sessions in the target time frames
        results = []
        for time_frame in target_frames:
            # Match against timeframe column in your CSV
            frame_sessions = df[df['timeframe'].str.lower().str.contains(time_frame.lower(), na=False)]
            if not frame_sessions.empty:
                results.extend(frame_sessions.to_dict('records'))

        if not results:
            # Try fallback search in timeslot column
            for time_frame in target_frames:
                frame_sessions = df[df['timeslot'].str.lower().str.contains(time_frame.lower(), na=False)]
                if not frame_sessions.empty:
                    results.extend(frame_sessions.to_dict('records'))

        if not results:
            available_times = df['timeframe'].dropna().unique()[:8]  # Show some available times
            return {
                "message": f"No sessions found for '{original_query}'.\n\nAvailable time frames: {', '.join(available_times)}"
            }

        # Format the results
        sessions_list = []
        for session in results:
            title = session.get('title', 'Unknown Session')
            time_slot = session.get('timeslot', 'Time TBD')
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
        # Group sessions by time frame for better organization
        schedule_by_time = {}
        
        for _, session in df.iterrows():
            time_frame = session.get('timeframe', 'Unknown Time')
            if time_frame not in schedule_by_time:
                schedule_by_time[time_frame] = []
            
            session_info = {
                'title': session.get('title', 'Unknown'),
                'timeslot': session.get('timeslot', 'Time TBD'),
                'duration': session.get('duration', ''),
                'type': session.get('type', 'session')
            }
            schedule_by_time[time_frame].append(session_info)
        
        # Format for display
        schedule_display = []
        for time_frame in sorted(schedule_by_time.keys()):
            if time_frame != 'Unknown Time':
                schedule_display.append(f"**{time_frame.upper()}:**")
                for session in schedule_by_time[time_frame]:
                    title = session['title']
                    timeslot = session['timeslot']
                    duration = session['duration']
                    session_type = session['type']
                    
                    line = f"  • {title}"
                    if timeslot != 'Time TBD':
                        line += f" ({timeslot})"
                    if duration:
                        line += f" - {duration}"
                    
                    schedule_display.append(line)
                schedule_display.append("")  # Add spacing
        
        return {
            "total_sessions": len(df),
            "message": "**LinkedIn Local Nigeria - Full Event Schedule:**\n\n" + "\n".join(schedule_display)
        }
        
    except Exception as e:
        return {
            "message": f"Sorry, couldn't fetch the full schedule right now. Please try again! Error: {str(e)}"
        }

def search_sessions(query: str, tool_context: ToolContext) -> dict:
    """
    Search for sessions by title, type, or keyword.
    
    Args:
        query (str): Search term (e.g., 'keynote', 'panel', 'networking')
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: Matching sessions
    """
    try:
        if not query or query.strip() == "":
            return {"message": "Please provide a search term (e.g., 'keynote', 'panel', 'networking')"}
            
        query = query.lower().strip()
        
        # Search in title, type, and other relevant columns
        matches = df[
            df['title'].str.lower().str.contains(query, na=False) |
            df['type'].str.lower().str.contains(query, na=False)
        ]
        
        if matches.empty:
            return {"message": f"No sessions found matching '{query}'. Try searching for 'keynote', 'panel', or 'networking'."}
        
        # Format results
        results_list = []
        for _, session in matches.iterrows():
            title = session.get('title', 'Unknown')
            timeslot = session.get('timeslot', 'Time TBD')
            session_type = session.get('type', 'session')
            
            result_line = f"• **{title}**"
            if timeslot != 'Time TBD':
                result_line += f" ({timeslot})"
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

# Create the function tools
schedule_time_tool = FunctionTool(get_schedule_by_time)
full_schedule_tool = FunctionTool(get_full_schedule)
search_sessions_tool = FunctionTool(search_sessions)