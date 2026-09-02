from pydantic import BaseModel
from datetime import date
from typing import cast
from .location_mapping import LOCATION_MAPPING, create_area_enums
from ..data_access.foot_traffic_api import last_sensed_dates_of_queried_location, get_queried_location_info
from ..data_access.cache import get_cached, set_cached, _foot_traffic_cache
from datetime import datetime, timedelta


get_foot_traffic_tool_schema = {
    "name": "get_foot_traffic",
    "description": "Get real pedestrian foot-traffic data for a Melbourne area. Returns the "
                    "busiest (peak) hour of the most recent complete day of data, the pedestrian "
                    "count for that hour, and the full hour-by-hour breakdown for that day "
                    "(hourly_counts). Use this when comparing foot traffic "
                    "between candidate business locations to help inform a site-selection "
                    "decision. Only areas listed in the 'area' parameter's enum are supported "
                    "— if the user asks about an area outside that list, tell them it isn't "
                    "currently supported rather than substituting the nearest option or "
                    "guessing. If the underlying data source is unavailable or the request "
                    "fails, this tool will return an error message describing what went "
                    "wrong — relay that to the user plainly rather than inventing an answer.",
    "input_schema": {
        "type": "object",
        "properties":{
            "area": {
                "type": "string",
                "enum": create_area_enums(),
                "description": "Which Melbourne area to check — must be one of the supported enum values."
            }
        },
        "required": ["area"]
    }
}



class HourlyPedestrianCount(BaseModel):
    hour: int
    pedestrian_count: int

class FootTrafficSchema(BaseModel):
    area: str
    sensor_name: str
    sensing_date: date
    hour: int
    pedestrian_count: int
    schemaType: str
    hourly_counts: list[HourlyPedestrianCount]

def get_foot_traffic(area: str) -> FootTrafficSchema:
    location_result = next((location for location in LOCATION_MAPPING if location.get("area_name") == area.lower()), None)
    if (location_result == None):
        raise ValueError("Location not found.")
    
    location_id: int = cast(int, location_result["location_id"])

    #hit the cache first
    cached_data = get_cached(_foot_traffic_cache, location_result["area_name"])
    if (cached_data is not None and (datetime.now() - cached_data["cached_at"]) < timedelta(days=2)):
        return cached_data["data"]

    location_info_response = pedestrian_counting_system_api_handler(location_id)
    
    if (len(location_info_response) > 0):
        response_with_max_pedestriancount = max(location_info_response, key=lambda x: x["pedestriancount"])
    else:
        raise ValueError("No information was found on the location entered")

    hourly_counts = sorted(
        (
            {"hour": row["hourday"], "pedestrian_count": row["pedestriancount"]}
            for row in location_info_response
        ),
        key=lambda row: row["hour"],
    )

    foot_traffic_response = {
        "area": area.lower(),
        "sensor_name": response_with_max_pedestriancount["sensor_name"],
        "sensing_date": response_with_max_pedestriancount["sensing_date"],
        "hour": response_with_max_pedestriancount["hourday"],
        "pedestrian_count": response_with_max_pedestriancount["pedestriancount"],
        "schemaType": "foot_traffic",
        "hourly_counts": hourly_counts,
    }
    
    schema_response = FootTrafficSchema(**foot_traffic_response)

    #save it in cache first
    set_cached(_foot_traffic_cache, location_result["area_name"], schema_response)
    
    return schema_response

#Helper function to get the sensed_dates of the queried location and return a complete location info with accounted 24 hours
def pedestrian_counting_system_api_handler(location_id: int):
    last_sensed_date_response = last_sensed_dates_of_queried_location(location_id)
    sanistised_list_of_sensed_dates = get_sanitised_sensed_dates_list(last_sensed_date_response)

    MAX_GET_LOCATION_INFO_CALL_RETRIES = min(4, len(sanistised_list_of_sensed_dates))
    RETRY = 0

    #sensed_dates can return less than 24 hours hence the data comparion will be skewed 
    #and will not have a fair comparison so running through a loop of dates
    #that have complete 24 hours starting from the most recent sensed_date till 3 days back. 
    while RETRY < MAX_GET_LOCATION_INFO_CALL_RETRIES:
        response = []
        response = get_queried_location_info(location_id, sanistised_list_of_sensed_dates[RETRY])
        if (len(response) >= 20):
            return response
        else:
            RETRY += 1
        
    raise ValueError(f"Pedestrian Counting System API didn't have any 24 hourday sensed dates.")


#Helper func receives a list of 75 objects that contains different sensed dates from api
def get_sanitised_sensed_dates_list(sensed_dates: list[dict]): 
    #return unsorted list of 4 distinct dates to backtrack on 
    response =  list({date["sensing_date"] for date in sensed_dates})
    #sort the list
    sorted_response = sorted(response, reverse=True)
    return sorted_response


if __name__ == "__main__":
    # print("CBD 1: ", get_foot_traffic("CBD"))
    # print("CBD:", cbd_result)
    # print("CBD 2:", get_foot_traffic("CBD"))
    # print("CBD:", cbd_result)
    result = get_foot_traffic("Southbank")
    print("Southbank:", result)
    # kensington_result = get_foot_traffic("Kensington")
    # print("Kensington:", kensington_result)
    # resp = create_area_enums()
    # print(resp)