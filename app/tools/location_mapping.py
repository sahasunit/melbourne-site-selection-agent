LOCATION_MAPPING = [
    {
        "area_name": "cbd",
        "location_id": 3,
        "sensor_name": "Swa295_T",
        "latitude": -37.81101524,
        "longitude": 144.96429485,
        "clue_small_area": "Melbourne (CBD)"
    },
    {
        "area_name": "kensington",
        "location_id": 76,
        "sensor_name": "KenMac_T",
        "latitude": -37.79453803,
        "longitude": 144.93036194,
        "clue_small_area": "Kensington"
    },
    {
        "area_name": "carlton",
        "location_id": 37,
        "sensor_name": "Lyg260_T",
        "latitude": -37.80107122,
        "longitude": 144.96704554,
        "clue_small_area": "Carlton"
    },
    {
        "area_name": "docklands",
        "location_id": 11,
        "sensor_name": "WatCit_T",
        "latitude": -37.81566651,
        "longitude": 144.93974366,
        "clue_small_area": "Docklands"
    },
    {
        "area_name": "east melbourne",
        "location_id": 93,
        "sensor_name": "EastLib_T",
        "latitude": -37.81498411,
        "longitude": 144.98638807,
        "clue_small_area": "East Melbourne"
    },
    {
        "area_name": "north melbourne",
        "location_id": 86,
        "sensor_name": "574Qub_T",
        "latitude": -37.80309992,
        "longitude": 144.94908064,
        "clue_small_area": "North Melbourne"
    },
    {
        "area_name": "southbank",
        "location_id": 35,
        "sensor_name": "SouthB_T",
        "latitude": -37.82018685,
        "longitude": 144.96508508,
        "clue_small_area": "Southbank"
    },
    {
        "area_name": "parkville",
        "location_id": 43,
        "sensor_name": "UM2_T",
        "latitude": -37.79844526,
        "longitude": 144.96411782,
        "clue_small_area": "Parkville"
    },
    {
        "area_name": "west melbourne",
        "location_id": 165,
        "sensor_name": "Spen475_T",
        "latitude": -37.80953359,
        "longitude": 144.94939004,
        "clue_small_area": "West Melbourne (Residential)"
    },
]

def create_area_enums() -> list[str]:
    area_enums = list({item["area_name"] for item in LOCATION_MAPPING})
    return area_enums