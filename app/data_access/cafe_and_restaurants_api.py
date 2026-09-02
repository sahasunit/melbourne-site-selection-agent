import httpx
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception
from .is_server_error import is_server_error

@retry (
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=2),
    retry=retry_if_exception(is_server_error)
)
def fetch_hospitality_sector_competition(area: str, lat: float, long: float, offset: int) -> list[dict]:
    response = httpx.get(
        "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/cafes-and-restaurants-with-seating-capacity/records",
        params={
            "select": f"*,distance(location, GEOM'POINT({long} {lat})') as dist_m",
            "where": f"clue_small_area='{area}' and census_year=date'2024-01-01'",
            "order_by": f"distance(location, GEOM'POINT({long} {lat})')",
            "limit": 100,
            "offset": offset
        },
        timeout=3
    )
    response.raise_for_status()

    data = response.json()
    return data["results"]

def get_hospitality_sector_competition(area: str, lat: float, long: float, offset: int) -> list[dict]:
    print("get_hospitality_sector_competition api called")
    try:
        return fetch_hospitality_sector_competition(area, lat, long, offset)
    except Exception as e:
        raise ValueError(f"Something went wrong while fetching nearby competition: {e}")

if __name__ == "__main__":
    result = get_hospitality_sector_competition("Kensington", -37.79453803, 144.93036194, 0)
    print(result)