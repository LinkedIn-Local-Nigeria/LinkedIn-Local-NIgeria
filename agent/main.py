import uuid
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from multi_tool_agent.agent import Olutona

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://linkedinlocalnigeria.com", "http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

session_service = InMemorySessionService()
runner = Runner(agent=Olutona, app_name="olutona_app", session_service=session_service)

class QuestionRequest(BaseModel):
    question: str

@app.post("/chat")
async def ask(request: QuestionRequest):
    try:
        user_id = "user1"
        session_id = str(uuid.uuid4())
        
        logger.info(f"Processing question: {request.question}")

        await session_service.create_session(
            app_name=runner.app_name,
            user_id=user_id,
            session_id=session_id
        )

        user_message = types.Content(
            role="user",
            parts=[types.Part(text=request.question)]
        )

        result_generator = runner.run_async(
            user_id=user_id,
            session_id=session_id,
            new_message=user_message
        )

        final_text = ""
        tool_calls = []
        raw_events = []

        async for event in result_generator:
            try:
                # Log event structure for debugging
                logger.debug(f"Event type: {type(event).__name__}")
                
                raw_events.append(str(event))  # Convert to string to avoid NaN serialization issues
                
                # Check for text content in different event structures
                if hasattr(event, 'content') and event.content:
                    if hasattr(event.content, 'parts') and event.content.parts:
                        for part in event.content.parts:
                            if hasattr(part, 'text') and part.text:
                                final_text += part.text
                
                # Also check for direct output_text
                if getattr(event, "output_text", None):
                    final_text += event.output_text
                    
                # Capture tool calls
                if getattr(event, "tool_call", None):
                    tool_calls.append(str(event.tool_call))  # Convert to string

            except Exception as event_error:
                logger.warning(f"Error processing event: {event_error}")
                continue

        # Clean up the final text
        final_text = final_text.strip()
        
        logger.info(f"Final response length: {len(final_text)}")

        return {
            "answer": final_text,
            "status": "success" if final_text else "no_response"
        }
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "olutona_agent"}

@app.get("/")
async def root():
    return {"message": "LinkedIn Local Nigeria Speaker Assistant API"}