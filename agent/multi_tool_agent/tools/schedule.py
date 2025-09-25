"""
Schedule tool for LinkedIn Local Nigeria (LLN).
Provides functions to query sessions by time.
"""

import re
from typing import List, Dict, Any
from core.types import ToolContext

# Define available time frames (ensure consistency with schedule data)
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


def get_schedule_by_time(time_query: str, tool_context: ToolContext) -> Dict[str, Any]:
    """Get sessions happening at a specific time or time frame."""
    try:
        # Normalize user query
        time_query = normalize_time_query(time_query)

        if time_query in ['morning', 'am', 'before noon']:
            time_frames = ['8am', '9am', '10am', '11am']
        elif time_query in ['afternoon', 'pm', 'after noon']:
            time_frames = ['12pm', '1pm', '2pm', '3pm']
        elif time_query in ['lunch', 'lunch time', 'break time']:
            time_frames = ['1pm']
        elif time_query in ['opening', 'start', 'beginning']:
            time_frames = ['8am', '9am']
        elif time_query in ['closing', 'end', 'finish']:
            time_frames = ['3pm']
        else:
            # Match against TIME_FRAMES directly
            matched_frames = [tf for tf in TIME_FRAMES if tf in time_query or time_query in tf]
            time_frames = matched_frames if matched_frames else [time_query]

        # Fetch sessions from schedule
        schedule = tool_context.get_csv_data("schedule")
        results = []
        for tf in time_frames:
            frame_sessions = [
                row for row in schedule if row.get("time", "").lower() == tf.lower()
            ]
            if frame_sessions:
                results.extend(frame_sessions)

        if not results:
            return {
                "status": "no_results",
                "message": f"No sessions found for {time_query}."
            }

        return {
            "status": "success",
            "time": time_query,
            "sessions": results
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Error fetching schedule: {str(e)}"
        }


def get_tool_definition() -> Dict[str, Any]:
    """Return the tool definition for the agent."""
    return {
        "name": "schedule_lookup",
        "description": "Look up LinkedIn Local Nigeria event sessions by time.",
        "functions": {
            "get_schedule_by_time": {
                "description": "Get sessions happening at a specific time or time frame (e.g., '2pm', 'morning').",
                "parameters": {
                    "time_query": "The time or time frame to look up (e.g., '2pm', 'morning')."
                }
            }
        }
    }
