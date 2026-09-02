from pydantic import BaseModel, field_validator


class AskRequest(BaseModel):
    question: str
    conversation_id: str | None = None

    @field_validator("question")
    @classmethod
    def question_must_not_be_empty(cls, value: str):
        if not value.strip():
            raise ValueError("Question must not be empty")
        return value

class AskResponse(BaseModel):
    answer: str
    conversation_id: str
    results: list[dict]
