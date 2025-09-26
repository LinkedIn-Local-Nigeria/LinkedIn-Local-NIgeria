import os
import pandas as pd
import json
from google.adk.tools import FunctionTool, ToolContext

# Load the speakers CSV
csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "speakers.csv")
df = pd.read_csv(csv_path)

# Clean column names to handle any whitespace - keeping original case for linkedinUrl
df.columns = df.columns.str.strip()

# Map columns to consistent lowercase names for easier access
column_mapping = {
    'linkedinUrl': 'linkedinurl',  # Handle the camelCase column
    'name': 'name',
    'role': 'role', 
    'bio': 'bio',
    'image': 'image',
    'slug': 'slug',
    'id': 'id'
}

# Rename columns to lowercase
for old_col, new_col in column_mapping.items():
    if old_col in df.columns:
        df = df.rename(columns={old_col: new_col})

# CRITICAL FIX: Replace all NaN values with empty strings to prevent JSON serialization issues
df = df.fillna("")

def clean_value(value):
    """Clean a value to ensure it's JSON serializable"""
    if pd.isna(value) or value is None:
        return ""
    if isinstance(value, float) and (pd.isna(value) or value != value):  # Check for NaN
        return ""
    return str(value).strip()

def create_short_bio(full_bio, max_length=150):
    """Create a short bio by truncating at sentence boundary"""
    if not full_bio or len(full_bio) <= max_length:
        return full_bio
    
    # Find the last sentence that fits within max_length
    truncated = full_bio[:max_length]
    last_period = truncated.rfind('.')
    last_exclamation = truncated.rfind('!')
    
    # Use the latest sentence ending
    end_pos = max(last_period, last_exclamation)
    
    if end_pos > 50:  # Make sure we have a reasonable amount of text
        return full_bio[:end_pos + 1] + "..."
    else:
        # If no good sentence break, just truncate at word boundary
        last_space = truncated.rfind(' ')
        if last_space > 50:
            return full_bio[:last_space] + "..."
        else:
            return truncated + "..."

def get_speaker_info(name: str = "", tool_context: ToolContext = None) -> dict:
    """
    Retrieve information about a specific speaker by name,
    or list all speakers if no name is provided.
    
    Args:
        name (str): The speaker's name to search for (optional)
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: Speaker information or list of speakers
    """
    try:
        if not name or name.strip() == "":  
            # No name provided → return list of all speakers with short bios and images
            speakers_list = []
            for _, row in df.iterrows():
                speaker_name = clean_value(row.get('name', 'Unknown'))
                speaker_role = clean_value(row.get('role', 'Unknown'))
                speaker_bio = clean_value(row.get('bio', ''))
                speaker_image = clean_value(row.get('image', ''))
                
                if speaker_name != 'Unknown':  # Only include speakers with names
                    short_bio = create_short_bio(speaker_bio, 120)
                    
                    speaker_info = f"**{speaker_name}**\n*{speaker_role}*"
                    if short_bio:
                        speaker_info += f"\n{short_bio}"
                    if speaker_image:
                        speaker_info += f"\n![{speaker_name}]({speaker_image})"
                    
                    speakers_list.append(speaker_info)
            
            return {
                "message": "**LinkedIn Local Nigeria Keynote Speakers:**\n\n" + 
                          "\n\n---\n\n".join(speakers_list) + 
                          "\n\n*Want to know more about any specific speaker? Just ask!*"
            }

        # Clean the search query
        query = name.lower().strip()
        
        # Remove common words that might interfere with search
        query = query.replace("tell me about", "").replace("speaker", "").replace("the", "").strip()
        
        # Search for the speaker (case-insensitive, partial match)
        speaker_matches = df[df["name"].str.lower().str.contains(query, na=False, regex=False)]
        
        if speaker_matches.empty:
            # Try searching in role or bio as fallback
            role_matches = df[df["role"].str.lower().str.contains(query, na=False, regex=False)]
            bio_matches = df[df["bio"].str.lower().str.contains(query, na=False, regex=False)]
            
            if not role_matches.empty:
                speaker_matches = role_matches
            elif not bio_matches.empty:
                speaker_matches = bio_matches
            else:
                available_speakers = [clean_value(name) for name in df["name"].tolist()[:5]]
                return {
                    "message": f"Sorry, I couldn't find a speaker named '{name}'. \n\nAvailable speakers include: {', '.join(available_speakers)}... \n\nTry asking about a specific name!"
                }

        # Get the first (best) match
        speaker = speaker_matches.iloc[0]
        
        # Clean all values before using them
        speaker_name = clean_value(speaker.get('name', 'Unknown'))
        speaker_role = clean_value(speaker.get('role', ''))
        speaker_bio = clean_value(speaker.get('bio', ''))
        speaker_linkedin = clean_value(speaker.get('linkedinurl', ''))
        speaker_image = clean_value(speaker.get('image', ''))
        
        # Format the response with image
        response_parts = []
        response_parts.append(f"**{speaker_name}**")
        
        if speaker_role:
            response_parts.append(f"**Role:** {speaker_role}")
        
        if speaker_image:
            response_parts.append(f"![{speaker_name}]({speaker_image})")
        
        if speaker_bio:
            response_parts.append(f"**Bio:** {speaker_bio}")
        
        if speaker_linkedin:
            response_parts.append(f"**LinkedIn:** {speaker_linkedin}")

        return {
            "speaker_name": speaker_name,
            "speaker_role": speaker_role,
            "speaker_bio": speaker_bio,
            "speaker_linkedin": speaker_linkedin,
            "speaker_image": speaker_image,
            "message": "\n\n".join(response_parts)
        }

    except Exception as e:
        return {
            "message": f"Sorry, something went wrong while searching for speaker info. Please try again! Error: {str(e)}"
        }

def list_all_speakers(tool_context: ToolContext) -> dict:
    """
    Get a complete list of all speakers with short bios and images.
    
    Args:
        tool_context (ToolContext): Provided by ADK runtime
        
    Returns:
        dict: List of all speakers with their roles, short bios, and images
    """
    try:
        speakers_list = []
        display_list = []
        
        for _, row in df.iterrows():
            speaker_name = clean_value(row.get('name', 'Unknown'))
            speaker_role = clean_value(row.get('role', 'Unknown'))
            speaker_bio = clean_value(row.get('bio', ''))
            speaker_linkedin = clean_value(row.get('linkedinurl', ''))
            speaker_image = clean_value(row.get('image', ''))
            
            if speaker_name != 'Unknown':
                # Create short bio for display
                short_bio = create_short_bio(speaker_bio, 120)
                
                # Add to structured list
                speakers_list.append({
                    "name": speaker_name,
                    "role": speaker_role,
                    "bio": speaker_bio,
                    "short_bio": short_bio,
                    "linkedin": speaker_linkedin,
                    "image": speaker_image
                })
                
                # Create display format with image and short bio
                speaker_display = f"**{speaker_name}**\n*{speaker_role}*"
                if short_bio:
                    speaker_display += f"\n{short_bio}"
                if speaker_image:
                    speaker_display += f"\n![{speaker_name}]({speaker_image})"
                
                display_list.append(speaker_display)
        
        return {
            "speakers": speakers_list,
            "total_count": len(speakers_list),
            "message": f"**LinkedIn Local Nigeria Keynote Speakers ({len(speakers_list)} total):**\n\n" + 
                      "\n\n---\n\n".join(display_list) + 
                      "\n\n*Ask about any specific speaker to get their full bio and details!*"
        }
        
    except Exception as e:
        return {
            "message": f"Sorry, couldn't fetch the speakers list right now. Please try again! Error: {str(e)}"
        }

# Create the function tools
speaker_tool = FunctionTool(get_speaker_info)
all_speakers_tool = FunctionTool(list_all_speakers)