from unittest.mock import patch
from app.tools.get_nearby_competition import get_nearby_competition, fetch_nearby_venues_paginated

def test_get_nearby_competition():
    fake_cafe_and_restaurant_data_response = [
        {'census_year': '2024', 'block_id': 523, 'property_id': '104380', 'base_property_id': '104380', 
         'building_address': '3 Gower Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Cafe 1565', 'business_address': '3 Gower Street KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4512', 'industry_anzsic4_description': 'Takeaway Food Services', 
         'seating_type': 'Seats - Indoor', 'number_of_seats': 20, 'longitude': 144.930071271, 'latitude': -37.79470942, 
         'location': {'lon': 144.930071271, 'lat': -37.79470942}, 'dist_m': 31.875031431364082
        }, 
        {'census_year': '2024', 'block_id': 2524, 'property_id': '616022', 'base_property_id': '616022', 
         'building_address': '198-204 Bellair Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'The Premises Espresso', 'business_address': '202 Bellair Street KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
         'seating_type': 'Seats - Indoor', 'number_of_seats': 70, 'longitude': 144.93017684, 'latitude': -37.79426147, 
         'location': {'lon': 144.93017684, 'lat': -37.79426147}, 'dist_m': 34.78752350585035
        }, 
        {'census_year': '2024', 'block_id': 547, 'property_id': '103380', 'base_property_id': '103380', 
         'building_address': '43 Epsom Road KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Local Folk Cafe', 'business_address': '43 Epsom Road KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 'seating_type': 'Seats - Indoor', 
         'number_of_seats': 45, 'longitude': 144.925609612, 'latitude': -37.79223674, 
         'location': {'lon': 144.925609612, 'lat': -37.79223674}, 'dist_m': 489.75184881064143
        },
        {'census_year': '2024', 'block_id': 2524, 'property_id': '616022', 'base_property_id': '616022', 
         'building_address': '198-204 Bellair Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'The Premises Espresso', 'business_address': '202 Bellair Street KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
         'seating_type': 'Seats - Outdoor', 'number_of_seats': 16, 'longitude': 144.93017684, 'latitude': -37.79426147, 
         'location': {'lon': 144.93017684, 'lat': -37.79426147}, 'dist_m': 34.78752350585035
        },
        {'census_year': '2024', 'block_id': 571, 'property_id': '602256', 'base_property_id': '602256', 
         'building_address': 'Showgrounds Village 320-386 Epsom Road FLEMINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Rye Cafe', 'business_address': 'Shop 16, 320-380 Epsom Road FLEMINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 'seating_type': 'Seats - Outdoor', 
         'number_of_seats': 16, 'longitude': 144.915521168, 'latitude': -37.78257295, 
         'location': {'lon': 144.915521168, 'lat': -37.78257295}, 'dist_m': 1863.0301493389459
        }
    ]

    with patch("app.tools.get_nearby_competition.get_cached", return_value=None):
        with patch("app.tools.get_nearby_competition.fetch_nearby_venues_paginated", return_value=fake_cafe_and_restaurant_data_response):
            result = get_nearby_competition("Kensington")

    assert result.area == "kensington"
    assert result.total_seats == 106
    assert result.competitor_count == 2

def test_fetch_nearby_venues_paginated_stops_after_second_page():
    fake_response_page_1 = [
        {'census_year': '2024', 'block_id': 523, 'property_id': '104380', 'base_property_id': '104380', 
         'building_address': '3 Gower Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Cafe 1565', 'business_address': '3 Gower Street KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4512', 'industry_anzsic4_description': 'Takeaway Food Services', 
         'seating_type': 'Seats - Indoor', 'number_of_seats': 20, 'longitude': 144.930071271, 'latitude': -37.79470942, 
         'location': {'lon': 144.930071271, 'lat': -37.79470942}, 'dist_m': 31.875031431364082
        }, 
        {'census_year': '2024', 'block_id': 2524, 'property_id': '616022', 'base_property_id': '616022', 
          'building_address': '198-204 Bellair Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
          'trading_name': 'The Premises Espresso', 'business_address': '202 Bellair Street KENSINGTON VIC 3031', 
          'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
          'seating_type': 'Seats - Indoor', 'number_of_seats': 70, 'longitude': 144.93017684, 'latitude': -37.79426147, 
          'location': {'lon': 144.93017684, 'lat': -37.79426147}, 'dist_m': 34.78752350585035
        }, 
        {'census_year': '2024', 'block_id': 2524, 'property_id': '616022', 'base_property_id': '616022', 
         'building_address': '198-204 Bellair Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'The Premises Espresso', 'business_address': '202 Bellair Street KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
         'seating_type': 'Seats - Outdoor', 'number_of_seats': 16, 'longitude': 144.93017684, 'latitude': -37.79426147, 
         'location': {'lon': 144.93017684, 'lat': -37.79426147}, 'dist_m': 34.78752350585035
        }, 
        {'census_year': '2024', 'block_id': 2524, 'property_id': '616011', 'base_property_id': '616011', 
         'building_address': '482 Macaulay Road KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'London K Burgers', 'business_address': '482 Macaulay Road KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
         'seating_type': 'Seats - Indoor', 'number_of_seats': 18, 'longitude': 144.929970327, 'latitude': -37.79424521, 
         'location': {'lon': 144.929970327, 'lat': -37.79424521}, 'dist_m': 47.37477406973119
        },
    ]

    fake_response_page_2 = [
        {'census_year': '2024', 'block_id': 2523, 'property_id': '614821', 'base_property_id': '614821', 
         'building_address': '532-534 Macaulay Road KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Crust Gourmet Pizza Bar Kensington', 'business_address': 'Shop Ground 532-534 Macaulay Road KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4512', 'industry_anzsic4_description': 'Takeaway Food Services', 
         'seating_type': 'Seats - Outdoor', 'number_of_seats': 8, 'longitude': 144.928433661, 'latitude': -37.79401627, 
         'location': {'lon': 144.928433661, 'lat': -37.79401627}, 'dist_m': 179.09477882568817
        }, 
        {'census_year': '2024', 'block_id': 513, 'property_id': '597960', 'base_property_id': '597960', 
         'building_address': '429-431 Macaulay Road KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'MANG KORN Thai Restaurant', 'business_address': '431 Macaulay Road KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4512', 'industry_anzsic4_description': 'Takeaway Food Services', 
         'seating_type': 'Seats - Indoor', 'number_of_seats': 12, 'longitude': 144.932491422, 'latitude': -37.79496478, 
         'location': {'lon': 144.932491422, 'lat': -37.79496478}, 'dist_m': 193.03388633500066
        }, 
        {'census_year': '2024', 'block_id': 512, 'property_id': '106306', 'base_property_id': '106306', 
         'building_address': '34-44 Albermarle Street KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Cassette', 'business_address': '399 Macaulay Road KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
         'seating_type': 'Seats - Indoor', 'number_of_seats': 80, 'longitude': 144.933807982, 'latitude': -37.79511706, 
         'location': {'lon': 144.933807982, 'lat': -37.79511706}, 'dist_m': 309.5609240745495
        }, 
        {'census_year': '2024', 'block_id': 547, 'property_id': '103380', 'base_property_id': '103380', 
         'building_address': '43 Epsom Road KENSINGTON VIC 3031', 'clue_small_area': 'Kensington', 
         'trading_name': 'Local Folk Cafe', 'business_address': '43 Epsom Road KENSINGTON VIC 3031', 
         'industry_anzsic4_code': '4511', 'industry_anzsic4_description': 'Cafes and Restaurants', 
         'seating_type': 'Seats - Outdoor', 'number_of_seats': 15, 'longitude': 144.925609612, 'latitude': -37.79223674, 
         'location': {'lon': 144.925609612, 'lat': -37.79223674}, 'dist_m': 489.75184881064143
        }
    ]

    fake_location_result_data = {"clue_small_area": "Kensington", "latitude":-37.79453803, "longitude": 144.93036194}

    with patch("app.tools.get_nearby_competition.get_hospitality_sector_competition", side_effect=[fake_response_page_1, fake_response_page_2]) as mock_fetch:
        result = fetch_nearby_venues_paginated(fake_location_result_data)
    
    assert mock_fetch.call_count == 2
    assert len(result) == 8
    assert any(venue["trading_name"] == "The Premises Espresso" for venue in result)
    assert any(venue["trading_name"] == "London K Burgers" for venue in result)
    assert any(venue["trading_name"] == "MANG KORN Thai Restaurant" for venue in result)