import requests
from datetime import datetime
import streamlit as st

def celsius_to_fahrenheit(celsius):
    """Convert temperature from Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert temperature from Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9

def format_temperature(temp, unit='F'):
    """Format temperature with appropriate unit"""
    return f"{temp:.1f}°{unit}"

def get_global_temperatures():
    """
    Fetch temperature data from major US cities using the National Weather Service API
    Returns tuple of (hottest_place, coldest_place) or None if error occurs
    """
    # List of major US cities with their coordinates
    cities = [
        {"name": "Miami, FL", "lat": "25.7617", "lon": "-80.1918"},
        {"name": "Phoenix, AZ", "lat": "33.4484", "lon": "-112.0740"},
        {"name": "Los Angeles, CA", "lat": "34.0522", "lon": "-118.2437"},
        {"name": "Las Vegas, NV", "lat": "36.1699", "lon": "-115.1398"},
        {"name": "Houston, TX", "lat": "29.7604", "lon": "-95.3698"},
        {"name": "Denver, CO", "lat": "39.7392", "lon": "-104.9903"},
        {"name": "Chicago, IL", "lat": "41.8781", "lon": "-87.6298"},
        {"name": "New York, NY", "lat": "40.7128", "lon": "-74.0060"},
        {"name": "Boston, MA", "lat": "42.3601", "lon": "-71.0589"},
        {"name": "Minneapolis, MN", "lat": "44.9778", "lon": "-93.2650"},
        {"name": "Anchorage, AK", "lat": "61.2181", "lon": "-149.9003"},
        {"name": "Honolulu, HI", "lat": "21.3069", "lon": "-157.8583"}
    ]

    base_url = "https://api.weather.gov/points"
    headers = {
        "User-Agent": "(myweatherapp.com, contact@myweatherapp.com)",
        "Accept": "application/json"
    }

    hottest_place = {"temp": float('-inf'), "name": "", "temp_f": 0}
    coldest_place = {"temp": float('inf'), "name": "", "temp_f": 0}

    try:
        for city in cities:
            try:
                # Get the forecast office URL for the location
                point_url = f"{base_url}/{city['lat']},{city['lon']}"
                response = requests.get(point_url, headers=headers)
                response.raise_for_status()
                point_data = response.json()

                # Get the forecast data
                forecast_url = point_data['properties']['forecast']
                response = requests.get(forecast_url, headers=headers)
                response.raise_for_status()
                forecast_data = response.json()

                # Get current temperature from the first period
                temp = float(forecast_data['properties']['periods'][0]['temperature'])

                if temp > hottest_place["temp"]:
                    hottest_place = {
                        "temp": temp,
                        "name": city["name"],
                        "temp_f": temp,
                        "country": "US"
                    }

                if temp < coldest_place["temp"]:
                    coldest_place = {
                        "temp": temp,
                        "name": city["name"],
                        "temp_f": temp,
                        "country": "US"
                    }

            except requests.RequestException as e:
                st.warning(f"Couldn't fetch data for {city['name']}: {str(e)}")
                continue

        if hottest_place["name"] and coldest_place["name"]:
            return hottest_place, coldest_place
        else:
            st.error("Could not fetch temperature data for any cities")
            return None

    except Exception as e:
        st.error(f"Error processing weather data: {str(e)}")
        return None

def display_temperature_card(place_data, temp_type="hot"):
    """Display a temperature card with location and temperature information"""
    temp_f = place_data["temp_f"]
    temp_c = fahrenheit_to_celsius(temp_f)

    html = f"""
        <div class="temp-card {'hot' if temp_type == 'hot' else 'cold'}">
            <div class="location-name">{place_data['name']}, {place_data['country']}</div>
            <div class="temperature">
                {format_temperature(temp_f, 'F')} / {format_temperature(temp_c, 'C')}
            </div>
        </div>
    """
    st.markdown(html, unsafe_allow_html=True)