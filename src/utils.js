// src/utils.js
import { supabase } from './supabaseClient.js'; // Import the supabase client

// Helper functions for temperature conversion (keep as is)
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

// Constants for regions (keep as is)
export const REGIONS = {
  ASIA: 'ASIA',
  EUROPE: 'EUROPE',
  NORTH_AMERICA: 'NORTH_AMERICA',
  SOUTH_AMERICA: 'SOUTH_AMERICA',
  AFRICA: 'AFRICA',
  OCEANIA: 'OCEANIA'
};

// Cache constants
const SUPABASE_CACHE_KEY = 'global_temperature_extremes_data';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// List of cities (keep MAJOR_CITIES as is)
const MAJOR_CITIES = [
  // ASIA (50 cities)
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, region: REGIONS.ASIA },
  { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737, region: REGIONS.ASIA },
  { name: "Delhi", country: "India", lat: 28.6139, lon: 77.2090, region: REGIONS.ASIA },
  { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777, region: REGIONS.ASIA },
  { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074, region: REGIONS.ASIA },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125, region: REGIONS.ASIA },
  { name: "Osaka", country: "Japan", lat: 34.6937, lon: 135.5023, region: REGIONS.ASIA },
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011, region: REGIONS.ASIA },
  { name: "Guangzhou", country: "China", lat: 23.1291, lon: 113.2644, region: REGIONS.ASIA },
  { name: "Chongqing", country: "China", lat: 29.4316, lon: 106.9123, region: REGIONS.ASIA },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780, region: REGIONS.ASIA },
  { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842, region: REGIONS.ASIA },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018, region: REGIONS.ASIA },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, region: REGIONS.ASIA },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lon: 101.6869, region: REGIONS.ASIA },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, region: REGIONS.ASIA },
  { name: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694, region: REGIONS.ASIA },
  { name: "Taipei", country: "Taiwan", lat: 25.0330, lon: 121.5654, region: REGIONS.ASIA },
  { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lon: 106.6297, region: REGIONS.ASIA },
  { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708, region: REGIONS.ASIA },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753, region: REGIONS.ASIA },
  { name: "Hanoi", country: "Vietnam", lat: 21.0285, lon: 105.8542, region: REGIONS.ASIA },
  { name: "Baghdad", country: "Iraq", lat: 33.3152, lon: 44.3661, region: REGIONS.ASIA },
  { name: "Tehran", country: "Iran", lat: 35.6892, lon: 51.3890, region: REGIONS.ASIA },
  { name: "Ankara", country: "Turkey", lat: 39.9334, lon: 32.8597, region: REGIONS.ASIA },
  { name: "Almaty", country: "Kazakhstan", lat: 43.2220, lon: 76.8512, region: REGIONS.ASIA },
  { name: "Yangon", country: "Myanmar", lat: 16.8661, lon: 96.1951, region: REGIONS.ASIA },
  { name: "Lahore", country: "Pakistan", lat: 31.5204, lon: 74.3587, region: REGIONS.ASIA },
  { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639, region: REGIONS.ASIA },
  { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, region: REGIONS.ASIA },
  { name: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, region: REGIONS.ASIA },
  { name: "Shenzhen", country: "China", lat: 22.5431, lon: 114.0579, region: REGIONS.ASIA },
  { name: "Tianjin", country: "China", lat: 39.3434, lon: 117.3616, region: REGIONS.ASIA },
  { name: "Wuhan", country: "China", lat: 30.5928, lon: 114.3055, region: REGIONS.ASIA },
  { name: "Shenyang", country: "China", lat: 41.8057, lon: 123.4315, region: REGIONS.ASIA },
  { name: "Busan", country: "South Korea", lat: 35.1796, lon: 129.0756, region: REGIONS.ASIA },
  { name: "Fukuoka", country: "Japan", lat: 33.5902, lon: 130.4017, region: REGIONS.ASIA },
  { name: "Sapporo", country: "Japan", lat: 43.0618, lon: 141.3545, region: REGIONS.ASIA },
  { name: "Surabaya", country: "Indonesia", lat: -7.2575, lon: 112.7521, region: REGIONS.ASIA },
  { name: "Medan", country: "Indonesia", lat: 3.5952, lon: 98.6722, region: REGIONS.ASIA },
  { name: "Bandung", country: "Indonesia", lat: -6.9175, lon: 107.6191, region: REGIONS.ASIA },
  { name: "Phnom Penh", country: "Cambodia", lat: 11.5564, lon: 104.9282, region: REGIONS.ASIA },
  { name: "Vientiane", country: "Laos", lat: 17.9757, lon: 102.6331, region: REGIONS.ASIA },
  { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lon: 79.8612, region: REGIONS.ASIA },
  { name: "Kathmandu", country: "Nepal", lat: 27.7172, lon: 85.3240, region: REGIONS.ASIA },
  { name: "Ulaanbaatar", country: "Mongolia", lat: 47.8864, lon: 106.9057, region: REGIONS.ASIA },
  { name: "Thimphu", country: "Bhutan", lat: 27.4712, lon: 89.6339, region: REGIONS.ASIA },
  { name: "Dili", country: "East Timor", lat: -8.5586, lon: 125.5736, region: REGIONS.ASIA },
  { name: "Bandar Seri Begawan", country: "Brunei", lat: 4.9031, lon: 114.9398, region: REGIONS.ASIA },
  { name: "Blagoveshchensk", country: "Russia", lat: 50.2785, lon: 127.5391, region: REGIONS.ASIA },
  { name: "Petropavlovsk-Kamchatsky", country: "Russia", lat: 53.0385, lon: 158.6559, region: REGIONS.ASIA },
  { name: "Yuzhno-Sakhalinsk", country: "Russia", lat: 46.9591, lon: 142.7375, region: REGIONS.ASIA },
  { name: "Magadan", country: "Russia", lat: 59.5611, lon: 150.8301, region: REGIONS.ASIA },
  { name: "Abakan", country: "Russia", lat: 53.7156, lon: 91.4292, region: REGIONS.ASIA },
  { name: "Kyzyl", country: "Russia", lat: 51.7147, lon: 94.4534, region: REGIONS.ASIA },
  { name: "Gorno-Altaysk", country: "Russia", lat: 51.9583, lon: 85.9603, region: REGIONS.ASIA },
  { name: "Birobidzhan", country: "Russia", lat: 48.7974, lon: 132.9259, region: REGIONS.ASIA },
  { name: "Anadyr", country: "Russia", lat: 64.7336, lon: 177.4968, region: REGIONS.ASIA },
  { name: "Komsomolsk-on-Amur", country: "Russia", lat: 50.5502, lon: 137.0070, region: REGIONS.ASIA },
  // ... (EUROPE, NORTH_AMERICA, SOUTH_AMERICA, AFRICA, OCEANIA cities remain unchanged)
  // EUROPE (50 cities)
  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278, region: REGIONS.EUROPE },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, region: REGIONS.EUROPE },
  { name: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050, region: REGIONS.EUROPE },
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, region: REGIONS.EUROPE },
  { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, region: REGIONS.EUROPE },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, region: REGIONS.EUROPE },
  { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738, region: REGIONS.EUROPE },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686, region: REGIONS.EUROPE },
  { name: "Prague", country: "Czech Republic", lat: 50.0755, lon: 14.4378, region: REGIONS.EUROPE },
  { name: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683, region: REGIONS.EUROPE },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517, region: REGIONS.EUROPE },
  { name: "Munich", country: "Germany", lat: 48.1351, lon: 11.5820, region: REGIONS.EUROPE },
  { name: "Milan", country: "Italy", lat: 45.4642, lon: 9.1900, region: REGIONS.EUROPE },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0122, region: REGIONS.EUROPE },
  { name: "Hamburg", country: "Germany", lat: 53.5511, lon: 9.9937, region: REGIONS.EUROPE },
  { name: "Budapest", country: "Hungary", lat: 47.4979, lon: 19.0402, region: REGIONS.EUROPE },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734, region: REGIONS.EUROPE },
  { name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275, region: REGIONS.EUROPE },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603, region: REGIONS.EUROPE },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393, region: REGIONS.EUROPE },
  { name: "Frankfurt", country: "Germany", lat: 50.1109, lon: 8.6821, region: REGIONS.EUROPE },
  { name: "Bucharest", country: "Romania", lat: 44.4268, lon: 26.1025, region: REGIONS.EUROPE },
  { name: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522, region: REGIONS.EUROPE },
  { name: "Rotterdam", country: "Netherlands", lat: 51.9244, lon: 4.4777, region: REGIONS.EUROPE },
  { name: "Helsinki", country: "Finland", lat: 60.1699, lon: 24.9384, region: REGIONS.EUROPE },
  { name: "Zagreb", country: "Croatia", lat: 45.8150, lon: 15.9819, region: REGIONS.EUROPE },
  { name: "Riga", country: "Latvia", lat: 56.9496, lon: 24.1052, region: REGIONS.EUROPE },
  { name: "Belgrade", country: "Serbia", lat: 44.7866, lon: 20.4489, region: REGIONS.EUROPE },
  { name: "Valencia", country: "Spain", lat: 39.4699, lon: -0.3763, region: REGIONS.EUROPE },
  { name: "Naples", country: "Italy", lat: 40.8518, lon: 14.2681, region: REGIONS.EUROPE },
  { name: "Turin", country: "Italy", lat: 45.0703, lon: 7.6869, region: REGIONS.EUROPE },
  { name: "Krakow", country: "Poland", lat: 50.0647, lon: 19.9450, region: REGIONS.EUROPE },
  { name: "Sofia", country: "Bulgaria", lat: 42.6977, lon: 23.3219, region: REGIONS.EUROPE },
  { name: "Cologne", country: "Germany", lat: 50.9375, lon: 6.9603, region: REGIONS.EUROPE },
  { name: "Tallinn", country: "Estonia", lat: 59.4370, lon: 24.7536, region: REGIONS.EUROPE },
  { name: "Vilnius", country: "Lithuania", lat: 54.6872, lon: 25.2797, region: REGIONS.EUROPE },
  { name: "Marseille", country: "France", lat: 43.2965, lon: 5.3698, region: REGIONS.EUROPE },
  { name: "Lyon", country: "France", lat: 45.7640, lon: 4.8357, region: REGIONS.EUROPE },
  { name: "Gothenburg", country: "Sweden", lat: 57.7089, lon: 11.9746, region: REGIONS.EUROPE },
  { name: "Seville", country: "Spain", lat: 37.3891, lon: -5.9845, region: REGIONS.EUROPE },
  { name: "Palermo", country: "Italy", lat: 38.1157, lon: 13.3615, region: REGIONS.EUROPE },
  { name: "Düsseldorf", country: "Germany", lat: 51.2277, lon: 6.7735, region: REGIONS.EUROPE },
  { name: "Glasgow", country: "UK", lat: 55.8642, lon: -4.2518, region: REGIONS.EUROPE },
  { name: "Zaragoza", country: "Spain", lat: 41.6488, lon: -0.8891, region: REGIONS.EUROPE },
  { name: "Genoa", country: "Italy", lat: 44.4056, lon: 8.9463, region: REGIONS.EUROPE },
  { name: "Stuttgart", country: "Germany", lat: 48.7758, lon: 9.1829, region: REGIONS.EUROPE },
  { name: "Dortmund", country: "Germany", lat: 51.5136, lon: 7.4653, region: REGIONS.EUROPE },
  { name: "Leeds", country: "UK", lat: 53.8008, lon: -1.5491, region: REGIONS.EUROPE },
  { name: "Málaga", country: "Spain", lat: 36.7213, lon: -4.4214, region: REGIONS.EUROPE },
  { name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173, region: REGIONS.EUROPE },
  { name: "Saint Petersburg", country: "Russia", lat: 59.9343, lon: 30.3351, region: REGIONS.EUROPE },
  { name: "Minsk", country: "Belarus", lat: 53.9045, lon: 27.5615, region: REGIONS.EUROPE },
  { name: "Chisinau", country: "Moldova", lat: 47.0105, lon: 28.8638, region: REGIONS.EUROPE },
  { name: "Lviv", country: "Ukraine", lat: 49.8397, lon: 24.0297, region: REGIONS.EUROPE },
  { name: "Odessa", country: "Ukraine", lat: 46.4825, lon: 30.7233, region: REGIONS.EUROPE },
  { name: "Wroclaw", country: "Poland", lat: 51.1079, lon: 17.0385, region: REGIONS.EUROPE },
  { name: "Gdansk", country: "Poland", lat: 54.3520, lon: 18.6466, region: REGIONS.EUROPE },
  { name: "Cluj-Napoca", country: "Romania", lat: 46.7712, lon: 23.6236, region: REGIONS.EUROPE },
  { name: "Timisoara", country: "Romania", lat: 45.7489, lon: 21.2087, region: REGIONS.EUROPE },
  { name: "Varna", country: "Bulgaria", lat: 43.2141, lon: 27.9147, region: REGIONS.EUROPE },
  { name: "Plovdiv", country: "Bulgaria", lat: 42.1354, lon: 24.7453, region: REGIONS.EUROPE },

  // NORTH AMERICA (50 cities)
  { name: "New York", country: "USA", lat: 40.7128, lon: -74.0060, region: REGIONS.NORTH_AMERICA },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437, region: REGIONS.NORTH_AMERICA },
  { name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298, region: REGIONS.NORTH_AMERICA },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, region: REGIONS.NORTH_AMERICA },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, region: REGIONS.NORTH_AMERICA },
  { name: "Houston", country: "USA", lat: 29.7604, lon: -95.3698, region: REGIONS.NORTH_AMERICA },
  { name: "Phoenix", country: "USA", lat: 33.4484, lon: -112.0740, region: REGIONS.NORTH_AMERICA },
  { name: "Philadelphia", country: "USA", lat: 39.9526, lon: -75.1652, region: REGIONS.NORTH_AMERICA },
  { name: "San Antonio", country: "USA", lat: 29.4241, lon: -98.4936, region: REGIONS.NORTH_AMERICA },
  { name: "San Diego", country: "USA", lat: 32.7157, lon: -117.1611, region: REGIONS.NORTH_AMERICA },
  { name: "Montreal", country: "Canada", lat: 45.5017, lon: -73.5673, region: REGIONS.NORTH_AMERICA },
  { name: "Dallas", country: "USA", lat: 32.7767, lon: -96.7970, region: REGIONS.NORTH_AMERICA },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207, region: REGIONS.NORTH_AMERICA },
  { name: "Guadalajara", country: "Mexico", lat: 20.6597, lon: -103.3496, region: REGIONS.NORTH_AMERICA },
  { name: "San Jose", country: "USA", lat: 37.3382, lon: -121.8863, region: REGIONS.NORTH_AMERICA },
  { name: "Calgary", country: "Canada", lat: 51.0447, lon: -114.0719, region: REGIONS.NORTH_AMERICA },
  { name: "Monterrey", country: "Mexico", lat: 25.6866, lon: -100.3161, region: REGIONS.NORTH_AMERICA },
  { name: "Miami", country: "USA", lat: 25.7617, lon: -80.1918, region: REGIONS.NORTH_AMERICA },
  { name: "Atlanta", country: "USA", lat: 33.7490, lon: -84.3880, region: REGIONS.NORTH_AMERICA },
  { name: "Ottawa", country: "Canada", lat: 45.4215, lon: -75.6972, region: REGIONS.NORTH_AMERICA },
  { name: "Puebla", country: "Mexico", lat: 19.0413, lon: -98.2062, region: REGIONS.NORTH_AMERICA },
  { name: "Boston", country: "USA", lat: 42.3601, lon: -71.0589, region: REGIONS.NORTH_AMERICA },
  { name: "Edmonton", country: "Canada", lat: 53.5461, lon: -113.4938, region: REGIONS.NORTH_AMERICA },
  { name: "Tijuana", country: "Mexico", lat: 32.5149, lon: -117.0382, region: REGIONS.NORTH_AMERICA },
  { name: "Seattle", country: "USA", lat: 47.6062, lon: -122.3321, region: REGIONS.NORTH_AMERICA },
  { name: "Denver", country: "USA", lat: 39.7392, lon: -104.9903, region: REGIONS.NORTH_AMERICA },
  { name: "Winnipeg", country: "Canada", lat: 49.8951, lon: -97.1384, region: REGIONS.NORTH_AMERICA },
  { name: "León", country: "Mexico", lat: 21.1219, lon: -101.6833, region: REGIONS.NORTH_AMERICA },
  { name: "Detroit", country: "USA", lat: 42.3314, lon: -83.0458, region: REGIONS.NORTH_AMERICA },
  { name: "Quebec City", country: "Canada", lat: 46.8139, lon: -71.2080, region: REGIONS.NORTH_AMERICA },
  { name: "Juárez", country: "Mexico", lat: 31.6904, lon: -106.4245, region: REGIONS.NORTH_AMERICA },
  { name: "Portland", country: "USA", lat: 45.5155, lon: -122.6789, region: REGIONS.NORTH_AMERICA },
  { name: "Hamilton", country: "Canada", lat: 43.2557, lon: -79.8711, region: REGIONS.NORTH_AMERICA },
  { name: "Zapopan", country: "Mexico", lat: 20.7214, lon: -103.3913, region: REGIONS.NORTH_AMERICA },
  { name: "Las Vegas", country: "USA", lat: 36.1699, lon: -115.1398, region: REGIONS.NORTH_AMERICA },
  { name: "Mississauga", country: "Canada", lat: 43.5890, lon: -79.6441, region: REGIONS.NORTH_AMERICA },
  { name: "Ecatepec", country: "Mexico", lat: 19.6012, lon: -99.0657, region: REGIONS.NORTH_AMERICA },
  { name: "Minneapolis", country: "USA", lat: 44.9778, lon: -93.2650, region: REGIONS.NORTH_AMERICA },
  { name: "Brampton", country: "Canada", lat: 43.6833, lon: -79.7667, region: REGIONS.NORTH_AMERICA },
  { name: "Nezahualcóyotl", country: "Mexico", lat: 19.4000, lon: -99.0167, region: REGIONS.NORTH_AMERICA },
  { name: "Sacramento", country: "USA", lat: 38.5816, lon: -121.4944, region: REGIONS.NORTH_AMERICA },
  { name: "Surrey", country: "Canada", lat: 49.1913, lon: -122.8490, region: REGIONS.NORTH_AMERICA },
  { name: "Mexicali", country: "Mexico", lat: 32.6245, lon: -115.4522, region: REGIONS.NORTH_AMERICA },
  { name: "Kansas City", country: "USA", lat: 39.0997, lon: -94.5786, region: REGIONS.NORTH_AMERICA },
  { name: "Laval", country: "Canada", lat: 45.5617, lon: -73.7230, region: REGIONS.NORTH_AMERICA },
  { name: "Culiacán", country: "Mexico", lat: 24.8091, lon: -107.3940, region: REGIONS.NORTH_AMERICA },

  // SOUTH AMERICA (50 cities)
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, region: REGIONS.SOUTH_AMERICA },
  { name: "Lima", country: "Peru", lat: -12.0464, lon: -77.0428, region: REGIONS.SOUTH_AMERICA },
  { name: "Bogotá", country: "Colombia", lat: 4.7110, lon: -74.0721, region: REGIONS.SOUTH_AMERICA },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729, region: REGIONS.SOUTH_AMERICA },
  { name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693, region: REGIONS.SOUTH_AMERICA },
  { name: "Caracas", country: "Venezuela", lat: 10.4806, lon: -66.9036, region: REGIONS.SOUTH_AMERICA },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, region: REGIONS.SOUTH_AMERICA },
  { name: "Salvador", country: "Brazil", lat: -12.9714, lon: -38.5014, region: REGIONS.SOUTH_AMERICA },
  { name: "Brasília", country: "Brazil", lat: -15.7975, lon: -47.8919, region: REGIONS.SOUTH_AMERICA },
  { name: "Fortaleza", country: "Brazil", lat: -3.7319, lon: -38.5267, region: REGIONS.SOUTH_AMERICA },
  { name: "Guayaquil", country: "Ecuador", lat: -2.1894, lon: -79.8891, region: REGIONS.SOUTH_AMERICA },
  { name: "Quito", country: "Ecuador", lat: -0.1807, lon: -78.4678, region: REGIONS.SOUTH_AMERICA },
  { name: "Medellín", country: "Colombia", lat: 6.2442, lon: -75.5812, region: REGIONS.SOUTH_AMERICA },
  { name: "Cali", country: "Colombia", lat: 3.4516, lon: -76.5320, region: REGIONS.SOUTH_AMERICA },
  { name: "Belo Horizonte", country: "Brazil", lat: -19.9167, lon: -43.9345, region: REGIONS.SOUTH_AMERICA },
  { name: "Manaus", country: "Brazil", lat: -3.1190, lon: -60.0217, region: REGIONS.SOUTH_AMERICA },
  { name: "Curitiba", country: "Brazil", lat: -25.4290, lon: -49.2671, region: REGIONS.SOUTH_AMERICA },
  { name: "Recife", country: "Brazil", lat: -8.0476, lon: -34.8770, region: REGIONS.SOUTH_AMERICA },
  { name: "Porto Alegre", country: "Brazil", lat: -30.0346, lon: -51.2177, region: REGIONS.SOUTH_AMERICA },
  { name: "La Paz", country: "Bolivia", lat: -16.4897, lon: -68.1193, region: REGIONS.SOUTH_AMERICA },
  { name: "Montevideo", country: "Uruguay", lat: -34.9011, lon: -56.1645, region: REGIONS.SOUTH_AMERICA },
  { name: "Asunción", country: "Paraguay", lat: -25.2867, lon: -57.3333, region: REGIONS.SOUTH_AMERICA },
  { name: "Barranquilla", country: "Colombia", lat: 10.9639, lon: -74.7964, region: REGIONS.SOUTH_AMERICA },
  { name: "Córdoba", country: "Argentina", lat: -31.4201, lon: -64.1888, region: REGIONS.SOUTH_AMERICA },
  { name: "Rosario", country: "Argentina", lat: -32.9468, lon: -60.6393, region: REGIONS.SOUTH_AMERICA },
  { name: "Maracaibo", country: "Venezuela", lat: 10.6544, lon: -71.7297, region: REGIONS.SOUTH_AMERICA },
  { name: "Valencia", country: "Venezuela", lat: 10.1579, lon: -68.0072, region: REGIONS.SOUTH_AMERICA },
  { name: "Goiânia", country: "Brazil", lat: -16.6869, lon: -49.2648, region: REGIONS.SOUTH_AMERICA },
  { name: "Belém", country: "Brazil", lat: -1.4558, lon: -48.4902, region: REGIONS.SOUTH_AMERICA },
  { name: "Guarulhos", country: "Brazil", lat: -23.4543, lon: -46.5337, region: REGIONS.SOUTH_AMERICA },
  { name: "Campinas", country: "Brazil", lat: -22.9099, lon: -47.0626, region: REGIONS.SOUTH_AMERICA },
  { name: "São Luís", country: "Brazil", lat: -2.5297, lon: -44.3028, region: REGIONS.SOUTH_AMERICA },
  { name: "São Gonçalo", country: "Brazil", lat: -22.8269, lon: -43.0539, region: REGIONS.SOUTH_AMERICA },
  { name: "Maceió", country: "Brazil", lat: -9.6498, lon: -35.7089, region: REGIONS.SOUTH_AMERICA },
  { name: "Duque de Caxias", country: "Brazil", lat: -22.7856, lon: -43.3116, region: REGIONS.SOUTH_AMERICA },
  { name: "Natal", country: "Brazil", lat: -5.7793, lon: -35.2009, region: REGIONS.SOUTH_AMERICA },
  { name: "Campo Grande", country: "Brazil", lat: -20.4697, lon: -54.6201, region: REGIONS.SOUTH_AMERICA },
  { name: "Teresina", country: "Brazil", lat: -5.0892, lon: -42.8019, region: REGIONS.SOUTH_AMERICA },
  { name: "Florianópolis", country: "Brazil", lat: -27.5954, lon: -48.5480, region: REGIONS.SOUTH_AMERICA },
  { name: "Nova Iguaçu", country: "Brazil", lat: -22.7556, lon: -43.4603, region: REGIONS.SOUTH_AMERICA },
  { name: "Mendoza", country: "Argentina", lat: -32.8908, lon: -68.8272, region: REGIONS.SOUTH_AMERICA },
  { name: "Arequipa", country: "Peru", lat: -16.4090, lon: -71.5375, region: REGIONS.SOUTH_AMERICA },
  { name: "Trujillo", country: "Peru", lat: -8.1116, lon: -79.0289, region: REGIONS.SOUTH_AMERICA },
  { name: "Chiclayo", country: "Peru", lat: -6.7713, lon: -79.8408, region: REGIONS.SOUTH_AMERICA },
  { name: "Cusco", country: "Peru", lat: -13.5319, lon: -71.9675, region: REGIONS.SOUTH_AMERICA },
  { name: "Santa Cruz", country: "Bolivia", lat: -17.8146, lon: -63.1561, region: REGIONS.SOUTH_AMERICA },
  { name: "Cochabamba", country: "Bolivia", lat: -17.3895, lon: -66.1568, region: REGIONS.SOUTH_AMERICA },
  { name: "Georgetown", country: "Guyana", lat: 6.8013, lon: -58.1553, region: REGIONS.SOUTH_AMERICA },
  { name: "Paramaribo", country: "Suriname", lat: 5.8520, lon: -55.2038, region: REGIONS.SOUTH_AMERICA },
  { name: "Cayenne", country: "French Guiana", lat: 4.9371, lon: -52.3258, region: REGIONS.SOUTH_AMERICA },
  { name: "Mar del Plata", country: "Argentina", lat: -38.0023, lon: -57.5575, region: REGIONS.SOUTH_AMERICA },

  // AFRICA (50 cities)
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, region: REGIONS.AFRICA },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, region: REGIONS.AFRICA },
  { name: "Kinshasa", country: "DR Congo", lat: -4.4419, lon: 15.2663, region: REGIONS.AFRICA },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473, region: REGIONS.AFRICA },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219, region: REGIONS.AFRICA },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lon: -7.5898, region: REGIONS.AFRICA },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.0320, lon: 38.7421, region: REGIONS.AFRICA },
  { name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lon: 39.2083, region: REGIONS.AFRICA },
  { name: "Alexandria", country: "Egypt", lat: 31.2001, lon: 29.9187, region: REGIONS.AFRICA },
  { name: "Abidjan", country: "Ivory Coast", lat: 5.3600, lon: -4.0083, region: REGIONS.AFRICA },
  { name: "Khartoum", country: "Sudan", lat: 15.5007, lon: 32.5599, region: REGIONS.AFRICA },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, region: REGIONS.AFRICA },
  { name: "Accra", country: "Ghana", lat: 5.6037, lon: -0.1870, region: REGIONS.AFRICA },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lon: -17.4677, region: REGIONS.AFRICA },
  { name: "Durban", country: "South Africa", lat: -29.8587, lon: 31.0218, region: REGIONS.AFRICA },
  { name: "Kano", country: "Nigeria", lat: 12.0022, lon: 8.5920, region: REGIONS.AFRICA },
  { name: "Rabat", country: "Morocco", lat: 34.0209, lon: -6.8416, region: REGIONS.AFRICA },
  { name: "Luanda", country: "Angola", lat: -8.8389, lon: 13.2894, region: REGIONS.AFRICA },
  { name: "Algiers", country: "Algeria", lat: 36.7538, lon: 3.0588, region: REGIONS.AFRICA },
  { name: "Kampala", country: "Uganda", lat: 0.3476, lon: 32.5825, region: REGIONS.AFRICA },
  { name: "Bamako", country: "Mali", lat: 12.6392, lon: -8.0029, region: REGIONS.AFRICA },
  { name: "Lusaka", country: "Zambia", lat: -15.3875, lon: 28.3228, region: REGIONS.AFRICA },
  { name: "Maputo", country: "Mozambique", lat: -25.9692, lon: 32.5732, region: REGIONS.AFRICA },
  { name: "Harare", country: "Zimbabwe", lat: -17.8277, lon: 31.0534, region: REGIONS.AFRICA },
  { name: "Ouagadougou", country: "Burkina Faso", lat: 12.3714, lon: -1.5197, region: REGIONS.AFRICA },
  { name: "Antananarivo", country: "Madagascar", lat: -18.8792, lon: 47.5079, region: REGIONS.AFRICA },
  { name: "Conakry", country: "Guinea", lat: 9.6412, lon: -13.5784, region: REGIONS.AFRICA },
  { name: "Lilongwe", country: "Malawi", lat: -13.9626, lon: 33.7741, region: REGIONS.AFRICA },
  { name: "Niamey", country: "Niger", lat: 13.5117, lon: 2.1251, region: REGIONS.AFRICA },
  { name: "Yaoundé", country: "Cameroon", lat: 3.8480, lon: 11.5021, region: REGIONS.AFRICA },
  { name: "Tripoli", country: "Libya", lat: 32.8872, lon: 13.1913, region: REGIONS.AFRICA },
  { name: "Tunis", country: "Tunisia", lat: 36.8065, lon: 10.1815, region: REGIONS.AFRICA },
  { name: "Pretoria", country: "South Africa", lat: -25.7479, lon: 28.2293, region: REGIONS.AFRICA },
  { name: "Port Louis", country: "Mauritius", lat: -20.1609, lon: 57.5012, region: REGIONS.AFRICA },
  { name: "Windhoek", country: "Namibia", lat: -22.5609, lon: 17.0658, region: REGIONS.AFRICA },
  { name: "Gaborone", country: "Botswana", lat: -24.6282, lon: 25.9231, region: REGIONS.AFRICA },
  { name: "Maseru", country: "Lesotho", lat: -29.3167, lon: 27.4833, region: REGIONS.AFRICA },
  { name: "Mbabane", country: "Eswatini", lat: -26.3054, lon: 31.1367, region: REGIONS.AFRICA },
  { name: "Bujumbura", country: "Burundi", lat: -3.3614, lon: 29.3599, region: REGIONS.AFRICA },
  { name: "Kigali", country: "Rwanda", lat: -1.9441, lon: 30.0619, region: REGIONS.AFRICA },
  { name: "Libreville", country: "Gabon", lat: 0.4162, lon: 9.4673, region: REGIONS.AFRICA },
  { name: "Bangui", country: "Central African Republic", lat: 4.3947, lon: 18.5582, region: REGIONS.AFRICA },
  { name: "Brazzaville", country: "Republic of Congo", lat: -4.2634, lon: 15.2429, region: REGIONS.AFRICA },
  { name: "Malabo", country: "Equatorial Guinea", lat: 3.7523, lon: 8.7742, region: REGIONS.AFRICA },
  { name: "Djibouti", country: "Djibouti", lat: 11.5886, lon: 43.1451, region: REGIONS.AFRICA },
  { name: "Asmara", country: "Eritrea", lat: 15.3229, lon: 38.9251, region: REGIONS.AFRICA },
  { name: "Nouakchott", country: "Mauritania", lat: 18.0735, lon: -15.9582, region: REGIONS.AFRICA },
  { name: "Freetown", country: "Sierra Leone", lat: 8.4847, lon: -13.2343, region: REGIONS.AFRICA },
  { name: "Monrovia", country: "Liberia", lat: 6.3004, lon: -10.7969, region: REGIONS.AFRICA },
  { name: "Yamoussoukro", country: "Ivory Coast", lat: 6.8276, lon: -5.2893, region: REGIONS.AFRICA },
  { name: "Porto-Novo", country: "Benin", lat: 6.4969, lon: 2.6283, region: REGIONS.AFRICA },

  // OCEANIA (50 cities)
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, region: REGIONS.OCEANIA },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631, region: REGIONS.OCEANIA },
  { name: "Brisbane", country: "Australia", lat: -27.4705, lon: 153.0260, region: REGIONS.OCEANIA },
  { name: "Perth", country: "Australia", lat: -31.9505, lon: 115.8605, region: REGIONS.OCEANIA },
  { name: "Auckland", country: "New Zealand", lat: -36.8509, lon: 174.7645, region: REGIONS.OCEANIA },
  { name: "Adelaide", country: "Australia", lat: -34.9285, lon: 138.6007, region: REGIONS.OCEANIA },
  { name: "Gold Coast", country: "Australia", lat: -28.0167, lon: 153.4000, region: REGIONS.OCEANIA },
  { name: "Wellington", country: "New Zealand", lat: -41.2866, lon: 174.7756, region: REGIONS.OCEANIA },
  { name: "Christchurch", country: "New Zealand", lat: -43.5320, lon: 172.6306, region: REGIONS.OCEANIA },
  { name: "Newcastle", country: "Australia", lat: -32.9283, lon: 151.7817, region: REGIONS.OCEANIA },
  { name: "Canberra", country: "Australia", lat: -35.2809, lon: 149.1300, region: REGIONS.OCEANIA },
  { name: "Hamilton", country: "New Zealand", lat: -37.7870, lon: 175.2793, region: REGIONS.OCEANIA },
  { name: "Hobart", country: "Australia", lat: -42.8821, lon: 147.3272, region: REGIONS.OCEANIA },
  { name: "Wollongong", country: "Australia", lat: -34.4278, lon: 150.8931, region: REGIONS.OCEANIA },
  { name: "Dunedin", country: "New Zealand", lat: -45.8788, lon: 170.5028, region: REGIONS.OCEANIA },
  { name: "Townsville", country: "Australia", lat: -19.2590, lon: 146.8169, region: REGIONS.OCEANIA },
  { name: "Cairns", country: "Australia", lat: -16.9206, lon: 145.7722, region: REGIONS.OCEANIA },
  { name: "Tauranga", country: "New Zealand", lat: -37.6878, lon: 176.1651, region: REGIONS.OCEANIA },
  { name: "Darwin", country: "Australia", lat: -12.4634, lon: 130.8456, region: REGIONS.OCEANIA },
  { name: "Geelong", country: "Australia", lat: -38.1499, lon: 144.3617, region: REGIONS.OCEANIA },
  { name: "Port Moresby", country: "Papua New Guinea", lat: -9.4438, lon: 147.1803, region: REGIONS.OCEANIA },
  { name: "Suva", country: "Fiji", lat: -18.1416, lon: 178.4419, region: REGIONS.OCEANIA },
  { name: "Nouméa", country: "New Caledonia", lat: -22.2758, lon: 166.4581, region: REGIONS.OCEANIA },
  { name: "Honiara", country: "Solomon Islands", lat: -9.4438, lon: 159.9498, region: REGIONS.OCEANIA },
  { name: "Port Vila", country: "Vanuatu", lat: -17.7334, lon: 168.3272, region: REGIONS.OCEANIA },
  { name: "Nuku'alofa", country: "Tonga", lat: -21.1393, lon: -175.2046, region: REGIONS.OCEANIA },
  { name: "Apia", country: "Samoa", lat: -13.8506, lon: -171.7513, region: REGIONS.OCEANIA },
  { name: "Pago Pago", country: "American Samoa", lat: -14.2757, lon: -170.7020, region: REGIONS.OCEANIA },
  { name: "Papeete", country: "French Polynesia", lat: -17.5334, lon: -149.5667, region: REGIONS.OCEANIA },
  { name: "Hagåtña", country: "Guam", lat: 13.4757, lon: 144.7489, region: REGIONS.OCEANIA },
  { name: "Saipan", country: "Northern Mariana Islands", lat: 15.1894, lon: 145.7475, region: REGIONS.OCEANIA },
  { name: "Majuro", country: "Marshall Islands", lat: 7.1164, lon: 171.1854, region: REGIONS.OCEANIA },
  { name: "Tarawa", country: "Kiribati", lat: 1.3290, lon: 172.9790, region: REGIONS.OCEANIA },
  { name: "Funafuti", country: "Tuvalu", lat: -8.5211, lon: 179.1983, region: REGIONS.OCEANIA },
  { name: "Yaren", country: "Nauru", lat: -0.5477, lon: 166.9209, region: REGIONS.OCEANIA },
  { name: "Palmerston North", country: "New Zealand", lat: -40.3564, lon: 175.6147, region: REGIONS.OCEANIA },
  { name: "Napier", country: "New Zealand", lat: -39.4928, lon: 176.9120, region: REGIONS.OCEANIA },
  { name: "Rotorua", country: "New Zealand", lat: -38.1368, lon: 176.2497, region: REGIONS.OCEANIA },
  { name: "Whangarei", country: "New Zealand", lat: -35.7275, lon: 174.3166, region: REGIONS.OCEANIA },
  { name: "Sunshine Coast", country: "Australia", lat: -26.6500, lon: 153.0666, region: REGIONS.OCEANIA },
  { name: "Launceston", country: "Australia", lat: -41.4332, lon: 147.1572, region: REGIONS.OCEANIA },
  { name: "Bendigo", country: "Australia", lat: -36.7570, lon: 144.2794, region: REGIONS.OCEANIA },
  { name: "Albury", country: "Australia", lat: -36.0737, lon: 146.9135, region: REGIONS.OCEANIA },
  { name: "Ballarat", country: "Australia", lat: -37.5622, lon: 143.8503, region: REGIONS.OCEANIA },
  { name: "Mackay", country: "Australia", lat: -21.1539, lon: 149.1649, region: REGIONS.OCEANIA },
  { name: "Rockhampton", country: "Australia", lat: -23.3791, lon: 150.5100, region: REGIONS.OCEANIA },
  { name: "Bundaberg", country: "Australia", lat: -24.8671, lon: 152.3508, region: REGIONS.OCEANIA },
  { name: "Toowoomba", country: "Australia", lat: -27.5598, lon: 151.9507, region: REGIONS.OCEANIA },
  { name: "Port Macquarie", country: "Australia", lat: -31.4332, lon: 152.9060, region: REGIONS.OCEANIA },
  { name: "Palikir", country: "Micronesia", lat: 6.9248, lon: 158.1618, region: REGIONS.OCEANIA },
];

// Function to fetch cities (keep as is)
export const fetchMajorCities = async () => {
  return MAJOR_CITIES;
};

// Function to get cached data (now uses Supabase)
const getCachedData = async () => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Skipping cache.');
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('temperature_cache')
      .select('payload, cached_at')
      .eq('cache_key', SUPABASE_CACHE_KEY)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching cache from Supabase:', error);
      return null;
    }
    if (!data) return null;
    const { payload, cached_at } = data;
    const cacheTimestamp = new Date(cached_at).getTime();
    const now = new Date().getTime();
    if (now - cacheTimestamp > CACHE_DURATION) {
      console.log('Supabase cache expired');
      return null;
    }
    console.log('Using data from Supabase cache');
    return payload;
  } catch (error) {
    console.error('Error reading from Supabase cache:', error);
    return null;
  }
};

// Function to set cached data (now uses Supabase)
const setCachedData = async (dataToCache) => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Skipping cache update.');
    return;
  }
  try {
    const { error } = await supabase
      .from('temperature_cache')
      .upsert({
        cache_key: SUPABASE_CACHE_KEY,
        payload: dataToCache,
        cached_at: new Date().toISOString(),
      });
    if (error) {
      console.error('Error saving cache to Supabase:', error);
    } else {
      console.log('Temperature data cached in Supabase');
    }
  } catch (error) {
    console.error('Error writing to Supabase cache:', error);
  }
};

// Function to fetch temperature data (keep as is)
export const fetchCityTemperature = async (city) => {
  try {
    const baseUrl = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
      latitude: city.lat.toString(),
      longitude: city.lon.toString(),
      current: "temperature_2m",
      timezone: "auto"
    });
    
    const response = await fetch(`${baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${city.name}`);
    }
    
    const data = await response.json();
    
    return {
      ...city,
      temperature: data.current.temperature_2m,
      time: new Date(data.current.time).toLocaleString(),
      location: `${city.name}, ${city.country}`
    };
  } catch (error) {
    console.error(`Error fetching temperature for ${city.name}:`, error);
    throw error; // Re-throw to be caught by getTemperaturesWithCache
  }
};

// Updated function to get temperatures with Supabase caching
export const getTemperaturesWithCache = async () => {
  try {
    // Try to get cached data first
    const cachedData = await getCachedData();
    if (cachedData) {
      return cachedData;
    }
    // If no cache or cache expired, fetch fresh data
    console.log('Fetching fresh temperature data from API');
    const cities = await fetchMajorCities();
    const cityTempPromises = cities.map(city => fetchCityTemperature(city).catch(e => ({ ...city, error: e.message, temperature: null })));
    const results = await Promise.allSettled(cityTempPromises);
    const citiesWithTemp = results
      .filter(result => result.status === 'fulfilled' && result.value.temperature !== null)
      .map(result => result.value);
    const failedFetches = results.filter(result => result.status === 'rejected' || (result.status === 'fulfilled' && result.value.temperature === null));
    if (failedFetches.length > 0) {
      console.warn(`Failed to fetch temperature for ${failedFetches.length} cities.`);
    }
    if (citiesWithTemp.length === 0 && cities.length > 0) {
      throw new Error('Failed to fetch temperature for any city.');
    }
    // Group cities by region and find extremes
    const groupedExtremes = citiesWithTemp.reduce((acc, city) => {
      if (!acc[city.region]) {
        acc[city.region] = {
          hottest: { temperature: -Infinity, name: 'N/A', country: '', time: 'N/A' },
          coldest: { temperature: Infinity, name: 'N/A', country: '', time: 'N/A' }
        };
      }
      const temp = parseFloat(city.temperature);
      if (isNaN(temp)) return acc;
      if (temp > acc[city.region].hottest.temperature) {
        acc[city.region].hottest = city;
      }
      if (temp < acc[city.region].coldest.temperature) {
        acc[city.region].coldest = city;
      }
      return acc;
    }, {});
    Object.values(REGIONS).forEach(regionKey => {
      if (!groupedExtremes[regionKey]) {
        groupedExtremes[regionKey] = {
          hottest: { temperature: -Infinity, name: 'N/A', country: '', time: 'N/A' },
          coldest: { temperature: Infinity, name: 'N/A', country: '', time: 'N/A' }
        };
      }
      if (groupedExtremes[regionKey].hottest.temperature === -Infinity) {
        groupedExtremes[regionKey].hottest = { name: 'Data unavailable', temperature: NaN, country: '', time: '' };
      }
      if (groupedExtremes[regionKey].coldest.temperature === Infinity) {
        groupedExtremes[regionKey].coldest = { name: 'Data unavailable', temperature: NaN, country: '', time: '' };
      }
    });
    await setCachedData(groupedExtremes);
    return groupedExtremes;
  } catch (error) {
    console.error('Error getting temperatures:', error);
    throw error;
  }
};

// The getRegionExtremes function and its usage example can remain as is,
// as it's separate from the main app's data fetching.
// It's not directly used by the React app components.
function getRegionExtremes() {
  const regionExtremes = {};
  
  Object.values(REGIONS).forEach(region => {
    regionExtremes[region] = {
      northernmost: { lat: -90, name: '', country: '' },
      southernmost: { lat: 90, name: '', country: '' }
    };
  });
  
  MAJOR_CITIES.forEach(city => {
    const regionData = regionExtremes[city.region];
    if (!regionData) return;
    
    if (city.lat > regionData.northernmost.lat) {
      regionData.northernmost = {
        lat: city.lat,
        name: city.name,
        country: city.country
      };
    }
    
    if (city.lat < regionData.southernmost.lat) {
      regionData.southernmost = {
        lat: city.lat,
        name: city.name,
        country: city.country
      };
    }
  });
  
  return Object.entries(regionExtremes).map(([region, data]) => {
    const { northernmost, southernmost } = data;
    return {
      region,
      coldest: region === REGIONS.SOUTH_AMERICA || region === REGIONS.OCEANIA 
        ? southernmost 
        : northernmost,
      hottest: region === REGIONS.SOUTH_AMERICA || region === REGIONS.OCEANIA 
        ? northernmost 
        : southernmost
    };
  });
}

const extremes = getRegionExtremes();
console.log('Regional Latitude Extremes (based on latitude, not temperature):');
extremes.forEach(({ region, coldest, hottest }) => {
  console.log(`\n${region}:`);
  console.log(`Potentially Coldest (Northernmost/Southernmost): ${coldest.name}, ${coldest.country} (${coldest.lat.toFixed(2)}°)`);
  console.log(`Potentially Hottest (Southernmost/Northernmost): ${hottest.name}, ${hottest.country} (${hottest.lat.toFixed(2)}°)`);
});
