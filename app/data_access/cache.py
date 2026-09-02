from datetime import datetime

_foot_traffic_cache = {}
_competition_cache = {}

def get_cached(cache: dict, key: str) -> dict | None:
    return cache.get(key)

def set_cached(cache: dict, key: str, value: dict) -> None:
    cache[key] = {"data": value, "cached_at": datetime.now()}
