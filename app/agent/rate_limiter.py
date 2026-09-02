from datetime import datetime, timedelta

_rate_limits: dict = {}
MAX_REQUESTS = 6
WINDOW = timedelta(days=2)

def check_and_increment(ip: str) -> bool:
    now = datetime.now()
    entry = _rate_limits.get(ip)

    if entry is None or (now - entry["first_request_at"] > WINDOW):
        _rate_limits[ip] = {"count": 1, "first_request_at": now}
        return True
    
    if entry["count"] >= MAX_REQUESTS:
        return False
    
    entry["count"] += 1
    return True