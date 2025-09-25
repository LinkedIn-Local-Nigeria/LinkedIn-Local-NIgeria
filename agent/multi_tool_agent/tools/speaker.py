import os
import pandas as pd
from google.adk.tools import FunctionTool

csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "speakers.csv")
df = pd.read_csv(csv_path)

def get_speaker_info(name: str = "") -> str:
    """
    Retrieve information about a specific speaker by name,
    or list all speakers if no name is provided.
    """
    try:
        if not name:  # No name → return list of speakers
            speakers = df[["name", "role"]].fillna("")
            response = "**List of Speakers:**\n"
            for _, row in speakers.iterrows():
                response += f"- {row['name']} ({row['role']})\n"
            return response.strip()

        # Clean query (remove extra words like 'the speaker')
        query = name.lower().replace("the speaker", "").strip()

        # Look up a specific speaker
        speaker = df[df["name"].str.lower().str.contains(query, na=False)]
        if speaker.empty:
            return f"Sorry, I couldn’t find information on '{name}'."

        row = speaker.iloc[0]
        response = f"**{row.get('name','Unknown')}**\n"
        if row.get("role"): 
            response += f"Role: {row['role']}\n"
        response += f"Bio: {row.get('bio', 'No bio available.')}\n"
        if row.get("linkedinUrl"): 
            response += f"LinkedIn: {row['linkedinUrl']}\n"
        if row.get("image"): 
            response += f"Image: {row['image']}\n"

        return response.strip()

    except Exception as e:
        return f"Error fetching speaker info: {e}"

speaker_tool = FunctionTool(
    get_speaker_info,
)
