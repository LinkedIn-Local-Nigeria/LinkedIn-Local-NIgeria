import requests
from bs4 import BeautifulSoup
from google.adk.tools import FunctionTool 

def scrape_website(url: str, query: str = "") -> dict:
    """Scrape a website for content and optionally filter by a query."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        text = soup.get_text(separator=" ", strip=True)

        if query:
            if query.lower() in text.lower():
                return {
                    "message": f"Found something about '{query}' on {url}",
                    "snippet": text[:1000]
                }
            else:
                return {
                    "message": f"Checked {url} but didn’t find anything directly about '{query}'.",
                    "snippet": text[:500]
                }

        return {
            "message": f"Scraped {url} successfully.",
            "snippet": text[:1500]
        }
    except Exception as e:
        return {"message": f"Error scraping {url}: {str(e)}"}

web_scraper_tool = FunctionTool(scrape_website)
