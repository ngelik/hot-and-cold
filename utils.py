import requests
from datetime import datetime
import streamlit as st
import trafilatura
from bs4 import BeautifulSoup

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
    Fetch temperature data from major cities around the world using TimeAndDate.com
    Returns tuple of (hottest_place, coldest_place) or None if error occurs
    """
    url = "https://www.timeanddate.com/weather/?sort=temp"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    hottest_place = {"temp": float('-inf'), "name": "", "temp_f": 0}
    coldest_place = {"temp": float('inf'), "name": "", "temp_f": 0}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the weather table
        table = soup.find('table', {'class': 'zebra'})
        if not table:
            st.error("Could not find the weather table on the page")
            return None

        rows = table.find_all('tr')[1:]  # Skip header row

        for row in rows:
            try:
                # Get location cells
                cells = row.find_all('td')
                if len(cells) < 2:
                    continue

                # Extract location name
                location_cell = cells[0]
                location_link = location_cell.find('a')
                if not location_link:
                    continue

                location_text = location_link.text.strip()
                city = location_text
                country = ""
                if ',' in location_text:
                    city, country = location_text.split(',', 1)

                # Extract temperature
                temp_cell = cells[1]
                if not temp_cell:
                    continue

                temp_text = temp_cell.text.strip().replace('°C', '').strip()
                try:
                    temp_c = float(temp_text)
                    temp_f = celsius_to_fahrenheit(temp_c)

                    if temp_f > hottest_place["temp"]:
                        hottest_place = {
                            "temp": temp_f,
                            "name": city.strip(),
                            "temp_f": temp_f,
                            "country": country.strip()
                        }

                    if temp_f < coldest_place["temp"]:
                        coldest_place = {
                            "temp": temp_f,
                            "name": city.strip(),
                            "temp_f": temp_f,
                            "country": country.strip()
                        }
                except ValueError:
                    st.warning(f"Could not parse temperature for {city}: {temp_text}")
                    continue

            except Exception as e:
                st.warning(f"Error processing row: {str(e)}")
                continue

        if hottest_place["name"] and coldest_place["name"]:
            return hottest_place, coldest_place
        else:
            st.error("Could not find temperature data for any cities")
            return None

    except requests.RequestException as e:
        st.error(f"Error fetching data: {str(e)}")
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