from pydantic import BaseModel
from datetime import date
from .location_mapping import LOCATION_MAPPING, create_area_enums
from ..data_access.cafe_and_restaurants_api import get_hospitality_sector_competition
from ..data_access.cache import get_cached, set_cached, _competition_cache
from datetime import datetime, timedelta


get_nearby_competition_tool_schema = {
    "name": "get_nearby_competition",
    "description": "Get real cafe and restaurants data for a melbourne area. Return the "
                    "competitor count, total seats, and venue list within 200 meters; "
                    "Use this when comparing the competition around the area for business locations "
                    "to help inform a site location paired with foot trafiic in that particular area "
                    "Only areas listed in the 'area' parameter's enum are supported - if the user asks "
                    "about an area outside that list, tell them it isn't  currently supported rather than "
                    "substituting the nearest option or guessing. If the underlying data source is unavailable "
                    "or the request fails, this tool will return an error message describing what went wrong - "
                    "relay that to the user plainly rather than inventing an answer.",
    "input_schema": {
        "type": "object",
        "properties":{
            "area": {
                "type": "string",
                "enum": create_area_enums(),
                "description": "Which Melbourne area to check - must be one of the supported enum values."
            }
        },
        "required": ["area"]
    }
}

class VenueSchema(BaseModel):
    building_address: str
    business_name: str
    business_address: str
    industry_type: str
    seating_type: str
    number_of_seats: int
    distance_from_nearby_sensor: float

class NearbyCompetitionSchema(BaseModel):
    area: str
    radius_meters: int
    competitor_count: int
    total_seats: int
    schemaType: str
    venues: list[VenueSchema]

def get_nearby_competition(area: str) -> NearbyCompetitionSchema:
    location_result = next((location for location in LOCATION_MAPPING if location.get("area_name") == area.lower()), None)

    if (location_result == None):
        raise ValueError("Location not found.")
    
    #hit the cache first
    cached_data = get_cached(_competition_cache, location_result["area_name"])
    if (cached_data is not None and (datetime.now() - cached_data["cached_at"]) < timedelta(weeks=12)):
        return cached_data["data"]
    

    response  = fetch_nearby_venues_paginated(location_result)

    sanitised_response = remove_duplicate_venues(response)

    venuesList = []
    total_seats = 0
    RADIUS_METERS = 200
    if (len(sanitised_response) > 0):
        for location in sanitised_response:
            if (location["dist_m"] <= RADIUS_METERS):
                nearby_venue_response = {
                    "building_address": location["building_address"],
                    "business_name": location["trading_name"],
                    "business_address": location["business_address"],
                    "industry_type": location["industry_anzsic4_description"],
                    "seating_type": location["seating_type"],
                    "number_of_seats": location["number_of_seats"],
                    "distance_from_nearby_sensor": location["dist_m"]
                }
                total_seats+= location["number_of_seats"]
                venuesList.append(nearby_venue_response)
    else:
        raise ValueError("The dataset was too small to give a good comparison on the nearby competition.")

    nearby_competition_response = {
        "area": area.lower(),
        "radius_meters": RADIUS_METERS,
        "competitor_count": len(venuesList),
        "total_seats": total_seats,
        "schemaType": "nearby_competition",
        "venues": venuesList
    }

    print("venuesList:", venuesList)

    schema_response =  NearbyCompetitionSchema(**nearby_competition_response)

    #save it in cache first
    set_cached(_competition_cache, area.lower(), schema_response)
    
    return schema_response

def fetch_nearby_venues_paginated(location_result: dict) -> list[dict]:
    

    offset = 0
    all_venues = []
    page_count = 0
    MAX_PAGES = 3

    while page_count  < MAX_PAGES:
        response = get_hospitality_sector_competition(
            location_result["clue_small_area"],
            location_result["latitude"],
            location_result["longitude"],
            offset
        )

        if (len(response) == 0):
            break

        all_venues.extend(response)

        last_venue = response[-1]
        if (last_venue["dist_m"] > 200):
            break
        
        offset += 100
        page_count += 1

    return all_venues


def remove_duplicate_venues(venuesList: list[dict]) -> list[dict]:
    venue_lookup = {}

    for venue in venuesList:
        key = (venue["trading_name"], venue["business_address"])
        if key not in venue_lookup:
            venue_lookup[key] = {**venue}
        else:
            total_number_of_seats = venue_lookup[key]["number_of_seats"] + venue["number_of_seats"]
            updated_seating_type = "Indoor & Outdoor"
            venue_lookup[key] = {
                **venue_lookup[key],
                "number_of_seats": total_number_of_seats,
                "seating_type": updated_seating_type
            }

    return list(venue_lookup.values())

if __name__ == "__main__": 
    print(get_nearby_competition("Kensington"))
    # print(get_nearby_competition("Kensington"))
    

