import os
import pandas as pd
import numpy as np
import re
from typing import Dict, List
from google.adk.tools import FunctionTool, ToolContext

csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "team.csv")
df = pd.read_csv(csv_path)

# Clean column names to match your actual CSV structure
df.columns = df.columns.str.strip()

# Map your actual columns to expected names
column_mapping = {
    'LinkedInURL': 'linkedinurl',
    'twitterURL': 'twitterurl', 
    'websiteURL': 'websiteurl',
    'teamImg': 'teamimg'
}

# Rename columns to lowercase for consistency
for old_col, new_col in column_mapping.items():
    if old_col in df.columns:
        df = df.rename(columns={old_col: new_col})

# Convert all column names to lowercase
df.columns = df.columns.str.lower()

# CRITICAL FIX: Replace all NaN values with empty strings to prevent JSON serialization issues
df = df.fillna("")

def clean_value(value):
    """Clean a value to ensure it's JSON serializable and handle NaN"""
    if pd.isna(value) or value is None or value is np.nan:
        return ""
    if isinstance(value, float) and (pd.isna(value) or np.isnan(value)):
        return ""
    return str(value).strip()

# Create role mapping for better search
ROLE_SYNONYMS = {
    'web': ['web development', 'web dev', 'developer', 'programming', 'coding'],
    'marketing': ['pr', 'event marketing', 'promotion', 'publicity'],
    'logistics': ['logistics', 'operations', 'coordination'],
    'content': ['content', 'social media', 'copywriting', 'writing'],
    'design': ['design', 'brand design', 'graphics', 'creative'],
    'community': ['community', 'engagement', 'members'],
    'awards': ['awards', 'recognition', 'prizes'],
    'media': ['media', 'press', 'journalism'],
    'ticketing': ['ticketing', 'tickets', 'registration'],
    'event': ['event management', 'events', 'planning'],
    'sponsorship': ['sponsorship', 'partnerships', 'sponsors'],
    'delegates': ['delegates', 'attendees', 'participants'],
    'qa': ['quality assurance', 'qa', 'testing'],
    'lead': ['lead', 'co-lead', 'head', 'manager', 'director'],
    'team': ['team management', 'team lead', 'coordination'],
    'convener': ['convener', 'organizer', 'lead organizer']
}

def normalize_search_term(search_term: str) -> List[str]:
    """Convert search term into possible variations"""
    search_term = search_term.lower().strip()
    
    # Direct search terms
    search_variations = [search_term]
    
    # Add synonyms
    for key, synonyms in ROLE_SYNONYMS.items():
        if key in search_term:
            search_variations.extend(synonyms)
    
    # Add common variations
    if 'web' in search_term:
        search_variations.extend(['web development', 'web dev', 'developer'])
    if 'marketing' in search_term:
        search_variations.extend(['pr', 'event marketing'])
    if 'lead' in search_term or 'head' in search_term:
        search_variations.extend(['lead', 'head', 'co-lead'])
    if 'convener' in search_term:
        search_variations.extend(['lead lln', 'co-lead lln'])
    
    return list(set(search_variations))  # Remove duplicates

def search_team_member(role: str) -> Dict:
    """Enhanced search with fuzzy matching and proper NaN handling"""
    if not role or not role.strip():
        return {"message": "Please provide a role to search for."}
    
    search_variations = normalize_search_term(role)
    matches = pd.DataFrame()
    
    # Try each search variation
    for variation in search_variations:
        temp_matches = df[df["role"].str.lower().str.contains(variation.lower(), na=False, regex=False)]
        if not temp_matches.empty:
            matches = temp_matches
            break
    
    # If no matches, try a more relaxed search (word by word)
    if matches.empty:
        role_words = role.lower().split()
        for word in role_words:
            if len(word) > 2:  # Skip very short words
                temp_matches = df[df["role"].str.lower().str.contains(word, na=False, regex=False)]
                if not temp_matches.empty:
                    matches = temp_matches
                    break
    
    # Try searching by name as fallback
    if matches.empty:
        temp_matches = df[df["name"].str.lower().str.contains(role.lower(), na=False, regex=False)]
        if not temp_matches.empty:
            matches = temp_matches
    
    if matches.empty:
        available_roles = [clean_value(role) for role in df["role"].dropna().tolist()[:5]]
        return {
            "message": f"No team member found for '{role}'. Available roles include: {', '.join(available_roles)}..."
        }
    
    # Take the best match (first one)
    member = matches.iloc[0]
    
    # Clean all values to ensure JSON serialization works
    name = clean_value(member.get("name", "Unknown"))
    role_title = clean_value(member.get("role", "Unknown"))
    description = clean_value(member.get("description", ""))
    linkedin_url = clean_value(member.get("linkedinurl", ""))
    twitter_url = clean_value(member.get("twitterurl", ""))
    website_url = clean_value(member.get("websiteurl", ""))
    team_image = clean_value(member.get("teamimg", ""))
    
    # Format social links nicely
    social_links = []
    if linkedin_url:
        social_links.append(f"LinkedIn: {linkedin_url}")
    if twitter_url:
        social_links.append(f"Twitter: {twitter_url}")
    if website_url:
        social_links.append(f"Instagram/Website: {website_url}")
    
    social_text = " | ".join(social_links) if social_links else "Contact info coming soon!"
    
    # Create the response message
    response_message = f"**{name}** - {role_title}"
    
    if team_image:
        response_message += f"\n\n![{name}]({team_image})"
    
    if description:
        response_message += f"\n\n*\"{description}\"*"
    
    response_message += f"\n\n{social_text}"
    
    return {
        "name": name,
        "role": role_title,
        "linkedin": linkedin_url,
        "twitter": twitter_url,
        "website": website_url,
        "image": team_image,
        "description": description,
        "social_links": social_text,
        "message": response_message
    }

def get_team_member(role: str, tool_context: ToolContext) -> dict:
    """
    Look up a team member by role with enhanced fuzzy search.
    
    Args:
        role (str): The role to search for (e.g., 'web development', 'logistics', 'marketing', 'convener').
        tool_context (ToolContext): Provided by ADK runtime.
        
    Returns:
        dict: Structured info about the team member or a message if not found.
    """
    try:
        return search_team_member(role)
    except Exception as e:
        return {
            "message": f"Sorry, something went wrong searching for '{role}'. Please try again! Error: {str(e)}"
        }

def get_all_team_members(tool_context: ToolContext) -> dict:
    """
    Get list of all team members with images and descriptions.
    
    Args:
        tool_context (ToolContext): Provided by ADK runtime.
        
    Returns:
        dict: List of all team members with their basic info and images.
    """
    try:
        team_list = []
        display_list = []
        
        for _, member in df.iterrows():
            name = clean_value(member.get("name", "Unknown"))
            role = clean_value(member.get("role", "Unknown"))
            description = clean_value(member.get("description", ""))
            image = clean_value(member.get("teamimg", ""))
            
            if name != "Unknown":
                team_list.append({
                    "name": name,
                    "role": role,
                    "description": description,
                    "image": image
                })
                
                # Create display format with image
                member_display = f"**{name}**\n*{role}*"
                if image:
                    member_display += f"\n![{name}]({image})"
                if description:
                    member_display += f"\n\"{description}\""
                
                display_list.append(member_display)
        
        return {
            "team_members": team_list,
            "total_count": len(team_list),
            "message": f"**LinkedIn Local Nigeria Team ({len(team_list)} members):**\n\n" + 
                      "\n\n---\n\n".join(display_list) + 
                      "\n\n*Want to know more about any team member? Just ask about their role!*"
        }
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch the team list right now. Please try again! Error: {str(e)}"}

def get_conveners(tool_context: ToolContext) -> dict:
    """
    Get information about the LLN conveners (leaders).
    
    Args:
        tool_context (ToolContext): Provided by ADK runtime.
        
    Returns:
        dict: Information about the conveners
    """
    try:
        # Look for Lead and Co-Lead
        conveners = df[df['role'].str.contains('Lead LLN|Co-Lead LLN', case=False, na=False)]
        
        if conveners.empty:
            return {"message": "Convener information not found in the team data."}
        
        convener_list = []
        for _, convener in conveners.iterrows():
            name = clean_value(convener.get('name', 'Unknown'))
            role = clean_value(convener.get('role', 'Unknown'))
            description = clean_value(convener.get('description', ''))
            linkedin = clean_value(convener.get('linkedinurl', ''))
            image = clean_value(convener.get('teamimg', ''))
            
            convener_info = f"**{name}** - {role}"
            if image:
                convener_info += f"\n![{name}]({image})"
            if description:
                convener_info += f"\n*\"{description}\"*"
            if linkedin:
                convener_info += f"\nLinkedIn: {linkedin}"
            
            convener_list.append(convener_info)
        
        return {
            "message": "**LinkedIn Local Nigeria Conveners (Lead Organizers):**\n\n" + "\n\n---\n\n".join(convener_list)
        }
        
    except Exception as e:
        return {"message": f"Sorry, couldn't fetch convener information. Error: {str(e)}"}

# Register tools
team_tool = FunctionTool(get_team_member)
all_team_tool = FunctionTool(get_all_team_members)
conveners_tool = FunctionTool(get_conveners)