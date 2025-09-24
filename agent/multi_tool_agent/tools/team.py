import os
import pandas as pd
import re
from typing import Dict, List
from google.adk.tools import FunctionTool, ToolContext

csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "team.csv")
df = pd.read_csv(csv_path)

# Clean column names
df.columns = df.columns.str.strip().str.lower()

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
    'team': ['team management', 'team lead', 'coordination']
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
    
    return list(set(search_variations))  # Remove duplicates

def search_team_member(role: str) -> Dict:
    """Enhanced search with fuzzy matching"""
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
    
    if matches.empty:
        available_roles = df["role"].dropna().tolist()
        return {
            "message": f"No team member found for '{role}'. Available roles include: {', '.join(available_roles[:5])}..."
        }
    
    # Take the best match (first one)
    member = matches.iloc[0].to_dict()
    
    # Format social links nicely
    social_links = []
    if pd.notna(member.get("linkedinurl")) and member.get("linkedinurl").strip():
        social_links.append(f"LinkedIn: {member.get('linkedinurl')}")
    if pd.notna(member.get("twitterurl")) and member.get("twitterurl").strip():
        social_links.append(f"Twitter: {member.get('twitterurl')}")
    if pd.notna(member.get("websiteurl")) and member.get("websiteurl").strip():
        social_links.append(f"Website/Instagram: {member.get('websiteurl')}")
    
    social_text = " | ".join(social_links) if social_links else "Social links coming soon!"
    
    return {
        "name": member.get("name", "Unknown"),
        "role": member.get("role", "Unknown"),
        "linkedin": member.get("linkedinurl"),
        "twitter": member.get("twitterurl"),
        "website": member.get("websiteurl"),
        "image": member.get("teamimg"),
        "description": member.get("description"),
        "social_links": social_text,
        "message": f"Meet {member.get('name', 'Unknown')} - {member.get('role', 'Unknown')}! 💪\n\n" +
                  f"'{member.get('description', 'Ready to help you succeed!')}'\n\n" +
                  f"Connect: {social_text}"
    }

def get_team_member(role: str, tool_context: ToolContext) -> dict:
    """
    Look up a team member by role with enhanced fuzzy search.
    
    Args:
        role (str): The role to search for (e.g., 'web development', 'logistics', 'marketing').
        tool_context (ToolContext): Provided by ADK runtime.
        
    Returns:
        dict: Structured info about the team member or a message if not found.
    """
    try:
        return search_team_member(role)
    except Exception as e:
        return {
            "message": f"Sorry, something went wrong searching for '{role}'. No wahala, try again! 😊"
        }

def get_all_team_members(tool_context: ToolContext) -> dict:
    """
    Get list of all team members and their roles.
    
    Args:
        tool_context (ToolContext): Provided by ADK runtime.
        
    Returns:
        dict: List of all team members with their basic info.
    """
    try:
        team_list = []
        for _, member in df.iterrows():
            team_list.append({
                "name": member.get("name", "Unknown"),
                "role": member.get("role", "Unknown"),
                "description": member.get("description", "")
            })
        
        roles_summary = "\n".join([f"• {m['name']} - {m['role']}" for m in team_list])
        
        return {
            "team_members": team_list,
            "total_count": len(team_list),
            "message": f"LinkedIn Local Nigeria Team ({len(team_list)} members):\n\n{roles_summary}"
        }
    except Exception as e:
        return {"message": "Sorry, couldn't fetch the team list right now. Try again! 😊"}

# Register tools
team_tool = FunctionTool(get_team_member)
all_team_tool = FunctionTool(get_all_team_members)