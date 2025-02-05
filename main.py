import streamlit as st
import time
from datetime import datetime
from utils import get_global_temperatures, display_temperature_card
from styles import apply_custom_styles

# Page config must be the first Streamlit command
st.set_page_config(
    page_title="Global Temperature Extremes",
    page_icon="🌡️",
    layout="wide"
)

def main():
    # Apply custom styles
    apply_custom_styles()

    # Header
    st.title("🌡️ Global Temperature Extremes")
    st.markdown("Monitoring the hottest and coldest places on Earth")

    # Display last update time
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    st.markdown(f"Last updated: {current_time}")

    # Create two columns for hot and cold temperatures
    col1, col2 = st.columns(2)

    # Show loading state
    with st.spinner("Fetching temperature data..."):
        # Get temperature data
        result = get_global_temperatures()

        if result:
            hottest_place, coldest_place = result

            # Display hottest place
            with col1:
                st.markdown("### 🔥 Hottest Place")
                display_temperature_card(hottest_place, "hot")

            # Display coldest place
            with col2:
                st.markdown("### ❄️ Coldest Place")
                display_temperature_card(coldest_place, "cold")
        else:
            st.error("Unable to fetch temperature data. Please try again later.")

if __name__ == "__main__":
    main()