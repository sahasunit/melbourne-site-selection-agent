from unittest.mock import patch
from app.tools.get_foot_traffic import get_foot_traffic

def test_get_foot_traffic_returns_peak_hour():
    fake_sensed_date = [{"sensing_date": "2026-08-18"}] * 5

    fake_hourly_rows = [
        {"sensor_name": "Swa295_T", "sensing_date": "2026-08-18", "hourday": h, "pedestriancount": h * 10}
        for h in range(24)
    ]

    with patch("app.tools.get_foot_traffic.get_cached", return_value=None):
        with patch("app.tools.get_foot_traffic.last_sensed_dates_of_queried_location", return_value=fake_sensed_date):
            with patch("app.tools.get_foot_traffic.get_queried_location_info", return_value=fake_hourly_rows):
                result = get_foot_traffic("cbd")

    assert result.area == "cbd"
    assert result.hour == 23
    assert result.pedestrian_count == 230


def test_get_foot_traffic_returns_full_hourly_breakdown():
    fake_sensed_date = [{"sensing_date": "2026-08-18"}] * 5

    fake_hourly_rows = [
        {"sensor_name": "Swa295_T", "sensing_date": "2026-08-18", "hourday": h, "pedestriancount": h * 10}
        for h in range(24)
    ]

    with patch("app.tools.get_foot_traffic.get_cached", return_value=None):
        with patch("app.tools.get_foot_traffic.last_sensed_dates_of_queried_location", return_value=fake_sensed_date):
            with patch("app.tools.get_foot_traffic.get_queried_location_info", return_value=fake_hourly_rows):
                result = get_foot_traffic("cbd")

    assert len(result.hourly_counts) == 24
    assert [row.hour for row in result.hourly_counts] == list(range(24))
    assert result.hourly_counts[5].pedestrian_count == 50