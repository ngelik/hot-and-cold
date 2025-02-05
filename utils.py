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
    Fetch temperature data from major cities around the world using Open-Meteo API
    Returns tuple of (hottest_place, coldest_place) or None if error occurs
    """
    # List of major cities with their coordinates
    cities = [
        {"name": "Dubai", "country": "UAE", "lat": 25.2048, "lon": 55.2708},
        {"name": "Bangkok", "country": "Thailand", "lat": 13.7563, "lon": 100.5018},
        {"name": "Singapore", "country": "Singapore", "lat": 1.3521, "lon": 103.8198},
        {"name": "Moscow", "country": "Russia", "lat": 55.7558, "lon": 37.6173},
        {"name": "Helsinki", "country": "Finland", "lat": 60.1699, "lon": 24.9384},
        {"name": "Oslo", "country": "Norway", "lat": 59.9139, "lon": 10.7522},
        {"name": "Cape Town", "country": "South Africa", "lat": -33.9249, "lon": 18.4241},
        {"name": "Sydney", "country": "Australia", "lat": -33.8688, "lon": 151.2093},
        {"name": "Tokyo", "country": "Japan", "lat": 35.6762, "lon": 139.6503},
        {"name": "London", "country": "UK", "lat": 51.5074, "lon": -0.1278},
        {"name": "Paris", "country": "France", "lat": 48.8566, "lon": 2.3522},
        {"name": "Cairo", "country": "Egypt", "lat": 30.0444, "lon": 31.2357},
        {"name": "Rio de Janeiro", "country": "Brazil", "lat": -22.9068, "lon": -43.1729},
        {"name": "New York", "country": "US", "lat": 40.7128, "lon": -74.0060},
        {"name": "Mumbai", "country": "India", "lat": 19.0760, "lon": 72.8777},
        {"name": "Beijing", "country": "China", "lat": 39.9042, "lon": 116.4074},
        {"name": "Reykjavik", "country": "Iceland", "lat": 64.1470, "lon": -21.9408},
        {"name": "Yakutsk", "country": "Russia", "lat": 62.0355, "lon": 129.6755}
    ]

    base_url = "https://api.open-meteo.com/v1/forecast"

    hottest_place = {"temp": float('-inf'), "name": "", "temp_f": 0}
    coldest_place = {"temp": float('inf'), "name": "", "temp_f": 0}

    try:
        for city in cities:
            try:
                params = {
                    "latitude": city["lat"],
                    "longitude": city["lon"],
                    "current_weather": True,
                    "temperature_unit": "celsius"
                }

                response = requests.get(base_url, params=params)
                response.raise_for_status()
                data = response.json()

                temp_c = data["current_weather"]["temperature"]
                temp_f = celsius_to_fahrenheit(temp_c)

                if temp_f > hottest_place["temp"]:
                    hottest_place = {
                        "temp": temp_f,
                        "name": city["name"],
                        "temp_f": temp_f,
                        "country": city["country"]
                    }

                if temp_f < coldest_place["temp"]:
                    coldest_place = {
                        "temp": temp_f,
                        "name": city["name"],
                        "temp_f": temp_f,
                        "country": city["country"]
                    }

            except requests.RequestException as e:
                st.warning(f"Couldn't fetch data for {city['name']}: {str(e)}")
                continue
            except (KeyError, ValueError) as e:
                st.warning(f"Error processing data for {city['name']}: {str(e)}")
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