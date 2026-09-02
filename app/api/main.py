import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from .schemas import AskRequest, AskResponse
from ..agent.rate_limiter import check_and_increment
from ..agent.conversation_store import cleanup_stale_conversations
import uuid
from ..agent.agent import run_agent

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

def get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host

@app.post("/ask")
def ask(
    request: AskRequest,
    ip_req: Request
) -> AskResponse:
    is_ip_allowed = check_and_increment(get_client_ip(ip_req))

    if (is_ip_allowed is False):
        raise HTTPException(
            status_code=429,
            detail="Too many requests were made. Please reach out to the creator if you want to explore more."
        )

    if (request.conversation_id is None):
        new_user_uuid = str(uuid.uuid4())
        cleanup_stale_conversations()
        request.conversation_id = new_user_uuid
    
    try:
        response = run_agent(request.question, request.conversation_id)

        def to_dict(item):
            return item.model_dump() if hasattr(item, "model_dump") else item

        normalized_results = [to_dict(item) for item in response["results"]]

        answer = AskResponse(
            answer = response["answer"],
            conversation_id = request.conversation_id,
            results = normalized_results
        )
        return answer
    except ValueError as e:
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again later."
        )
