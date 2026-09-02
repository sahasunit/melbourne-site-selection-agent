from datetime import datetime, timedelta

_conversations: dict = {}

def get_conversation(conversation_id: str) -> list:
    entry = _conversations.get(conversation_id)
    if entry is None:
        return[]
    if (datetime.now() - entry["last_active"]) > timedelta(days=2):
        return []
    return entry["messages"]

def save_conversation(conversation_id: str, messages: list) -> None:
    _conversations[conversation_id] = {"messages": messages, "last_active": datetime.now()}

def cleanup_stale_conversations() -> None:
    now = datetime.now()
    stale_keys = [
        key for key, entry in _conversations.items()
        if (now - entry["last_active"] > timedelta(days=2))
    ]
    for key in stale_keys:
        del _conversations[key]