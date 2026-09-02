import httpx
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception
from .is_server_error import is_server_error


@retry (
    stop= stop_after_attempt(3),
    wait = wait_exponential(multiplier=1, min=1, max=2),
    retry=retry_if_exception(is_server_error)
)
def fetch_last_sensed_date_of_location(location_id: int) -> str:
    response = httpx.get(
        "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-monthly-counts-per-hour/records",
        params={
            "select": "sensing_date",
            "where": f'location_id={location_id}',
            "order_by": "sensing_date DESC",
            "limit": 75,
        },
        timeout=3
    )
    response.raise_for_status()

    data = response.json()
    return data["results"]


def last_sensed_dates_of_queried_location(location_id: int) -> str:
    try:
        return fetch_last_sensed_date_of_location(location_id)
    except Exception as e:
        raise ValueError(f"Something went wrong while fetching last sensed date of requested location: {e}")


@retry (
    stop= stop_after_attempt(3),
    wait = wait_exponential(multiplier=1, min=1, max=2),
    retry=retry_if_exception(is_server_error)
)
def fetch_location_info(location_id: int, sensing_date: str) -> list[dict]:
    response = httpx.get(
            "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-monthly-counts-per-hour/records",
            params={
                "where": f"location_id={location_id} and sensing_date=date'{sensing_date}'",
                "order_by": "hourday ASC",
                "limit": 24,
            },
            timeout=3
        )
    response.raise_for_status()
    data = response.json()
    return data["results"]


def get_queried_location_info(location_id: int, sensing_date: str) -> list[dict]:
    try:
        return fetch_location_info(location_id, sensing_date)
    except Exception as e:
        raise ValueError(f"Something went wrong while fetching requested location info: {e}")

    
    
if __name__ == "__main__":
    result = last_sensed_dates_of_queried_location(35)
    # result = get_queried_location_info(35, "2026-08-03")
    print(result)