import streamlit as st

def apply_custom_styles():
    """Apply custom CSS styles to the Streamlit app"""
    st.markdown("""
        <style>
        .temp-card {
            padding: 20px;
            border-radius: 10px;
            margin: 10px 0;
            text-align: center;
        }
        .hot {
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            color: white;
        }
        .cold {
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
        }
        .location-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .temperature {
            font-size: 36px;
            font-weight: bold;
        }
        .loading {
            text-align: center;
            padding: 20px;
        }
        .error-message {
            background-color: #ffebee;
            color: #c62828;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
        }
        </style>
    """, unsafe_allow_html=True)
