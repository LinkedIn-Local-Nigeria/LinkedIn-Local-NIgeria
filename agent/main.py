import uuid
from fastapi import FastAPI
from pydantic import BaseModel
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from multi_tool_agent.agent import Olutona
from fastapi.middleware.cors import CORSMiddleware

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
    user_id = "user1"
    session_id = str(uuid.uuid4())

    # Create session
    await session_service.create_session(
        app_name=runner.app_name,
        user_id=user_id,
        session_id=session_id
    )

    # Build user message
    user_message = types.Content(
        role="user",
        parts=[types.Part(text=request.question)]
    )

    # Run async agent
    result_generator = runner.run_async(
        user_id=user_id,
        session_id=session_id,
        new_message=user_message
    )

    final_text = ""

    async for event in result_generator:
        if hasattr(event, "content") and event.content:
            if hasattr(event.content, "parts") and event.content.parts:
                for part in event.content.parts:
                    if getattr(part, "text", None):
                        final_text += part.text + "\n"

                    if getattr(part, "functionResponse", None):
                        func_resp = part.functionResponse.get("response")
                        if isinstance(func_resp, dict) and "message" in func_resp:
                            final_text += func_resp["message"] + "\n"

        if getattr(event, "output_text", None):
            final_text += event.output_text + "\n"

    # Clean up whitespace
    final_text = final_text.strip()

    return {
        "answer": final_text if final_text else "No response found."
    }
