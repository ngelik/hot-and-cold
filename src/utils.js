// Helper functions for temperature conversion
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

// Constants for regions
export const REGIONS = {
  ASIA: 'ASIA',
  EUROPE: 'EUROPE',
  NORTH_AMERICA: 'NORTH_AMERICA',
  SOUTH_AMERICA: 'SOUTH_AMERICA',
  AFRICA: 'AFRICA',
  OCEANIA: 'OCEANIA'
};

// List of cities with 50 per region
const MAJOR_CITIES = [
  // ASIA (50 cities)
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, region: REGIONS.ASIA },
  { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737, region: REGIONS.ASIA },
//   { name: "Delhi", country: "India", lat: 28.6139, lon: 77.2090, region: REGIONS.ASIA },
//   { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777, region: REGIONS.ASIA },
//   { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074, region: REGIONS.ASIA },
//   { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125, region: REGIONS.ASIA },
//   { name: "Osaka", country: "Japan", lat: 34.6937, lon: 135.5023, region: REGIONS.ASIA },
//   { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011, region: REGIONS.ASIA },
//   { name: "Guangzhou", country: "China", lat: 23.1291, lon: 113.2644, region: REGIONS.ASIA },
//   { name: "Chongqing", country: "China", lat: 29.4316, lon: 106.9123, region: REGIONS.ASIA },
//   { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780, region: REGIONS.ASIA },
//   { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842, region: REGIONS.ASIA },
//   { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018, region: REGIONS.ASIA },
//   { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, region: REGIONS.ASIA },
//   { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lon: 101.6869, region: REGIONS.ASIA },
//   { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, region: REGIONS.ASIA },
//   { name: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694, region: REGIONS.ASIA },
//   { name: "Taipei", country: "Taiwan", lat: 25.0330, lon: 121.5654, region: REGIONS.ASIA },
//   { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lon: 106.6297, region: REGIONS.ASIA },
//   { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708, region: REGIONS.ASIA },
//   { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753, region: REGIONS.ASIA },
//   { name: "Hanoi", country: "Vietnam", lat: 21.0285, lon: 105.8542, region: REGIONS.ASIA },
//   { name: "Baghdad", country: "Iraq", lat: 33.3152, lon: 44.3661, region: REGIONS.ASIA },
//   { name: "Tehran", country: "Iran", lat: 35.6892, lon: 51.3890, region: REGIONS.ASIA },
//   { name: "Ankara", country: "Turkey", lat: 39.9334, lon: 32.8597, region: REGIONS.ASIA },
//   { name: "Almaty", country: "Kazakhstan", lat: 43.2220, lon: 76.8512, region: REGIONS.ASIA },
//   { name: "Yangon", country: "Myanmar", lat: 16.8661, lon: 96.1951, region: REGIONS.ASIA },
//   { name: "Lahore", country: "Pakistan", lat: 31.5204, lon: 74.3587, region: REGIONS.ASIA },
//   { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639, region: REGIONS.ASIA },
//   { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, region: REGIONS.ASIA },
//   { name: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, region: REGIONS.ASIA },
//   { name: "Shenzhen", country: "China", lat: 22.5431, lon: 114.0579, region: REGIONS.ASIA },
//   { name: "Tianjin", country: "China", lat: 39.3434, lon: 117.3616, region: REGIONS.ASIA },
//   { name: "Wuhan", country: "China", lat: 30.5928, lon: 114.3055, region: REGIONS.ASIA },
//   { name: "Shenyang", country: "China", lat: 41.8057, lon: 123.4315, region: REGIONS.ASIA },
//   { name: "Busan", country: "South Korea", lat: 35.1796, lon: 129.0756, region: REGIONS.ASIA },
//   { name: "Fukuoka", country: "Japan", lat: 33.5902, lon: 130.4017, region: REGIONS.ASIA },
//   { name: "Sapporo", country: "Japan", lat: 43.0618, lon: 141.3545, region: REGIONS.ASIA },
//   { name: "Surabaya", country: "Indonesia", lat: -7.2575, lon: 112.7521, region: REGIONS.ASIA },
//   { name: "Medan", country: "Indonesia", lat: 3.5952, lon: 98.6722, region: REGIONS.ASIA },
//   { name: "Bandung", country: "Indonesia", lat: -6.9175, lon: 107.6191, region: REGIONS.ASIA },
//   { name: "Phnom Penh", country: "Cambodia", lat: 11.5564, lon: 104.9282, region: REGIONS.ASIA },
//   { name: "Vientiane", country: "Laos", lat: 17.9757, lon: 102.6331, region: REGIONS.ASIA },
//   { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lon: 79.8612, region: REGIONS.ASIA },
//   { name: "Kathmandu", country: "Nepal", lat: 27.7172, lon: 85.3240, region: REGIONS.ASIA },
//   { name: "Ulaanbaatar", country: "Mongolia", lat: 47.8864, lon: 106.9057, region: REGIONS.ASIA },
//   { name: "Thimphu", country: "Bhutan", lat: 27.4712, lon: 89.6339, region: REGIONS.ASIA },
//   { name: "Dili", country: "East Timor", lat: -8.5586, lon: 125.5736, region: REGIONS.ASIA },
//   { name: "Bandar Seri Begawan", country: "Brunei", lat: 4.9031, lon: 114.9398, region: REGIONS.ASIA },
  // ... Add 30 more Asian cities

  // EUROPE (50 cities)
  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278, region: REGIONS.EUROPE },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, region: REGIONS.EUROPE },
//   { name: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050, region: REGIONS.EUROPE },
//   { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, region: REGIONS.EUROPE },
//   { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, region: REGIONS.EUROPE },
//   { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, region: REGIONS.EUROPE },
//   { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738, region: REGIONS.EUROPE },
//   { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686, region: REGIONS.EUROPE },
//   { name: "Prague", country: "Czech Republic", lat: 50.0755, lon: 14.4378, region: REGIONS.EUROPE },
//   { name: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683, region: REGIONS.EUROPE },
  // ... Add 40 more European cities

  // NORTH AMERICA (50 cities)
  { name: "New York", country: "USA", lat: 40.7128, lon: -74.0060, region: REGIONS.NORTH_AMERICA },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437, region: REGIONS.NORTH_AMERICA },
//   { name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298, region: REGIONS.NORTH_AMERICA },
//   { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, region: REGIONS.NORTH_AMERICA },
//   { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, region: REGIONS.NORTH_AMERICA },
  // ... Add 45 more North American cities

  // SOUTH AMERICA (50 cities)
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, region: REGIONS.SOUTH_AMERICA },
  { name: "Lima", country: "Peru", lat: -12.0464, lon: -77.0428, region: REGIONS.SOUTH_AMERICA },
//   { name: "Bogotá", country: "Colombia", lat: 4.7110, lon: -74.0721, region: REGIONS.SOUTH_AMERICA },
//   { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729, region: REGIONS.SOUTH_AMERICA },
//   { name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693, region: REGIONS.SOUTH_AMERICA },
  // ... Add 45 more South American cities

  // AFRICA (50 cities)
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, region: REGIONS.AFRICA },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, region: REGIONS.AFRICA },
//   { name: "Kinshasa", country: "DR Congo", lat: -4.4419, lon: 15.2663, region: REGIONS.AFRICA },
//   { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473, region: REGIONS.AFRICA },
//   { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219, region: REGIONS.AFRICA },
//   { name: "Casablanca", country: "Morocco", lat: 33.5731, lon: -7.5898, region: REGIONS.AFRICA },
//   { name: "Addis Ababa", country: "Ethiopia", lat: 9.0320, lon: 38.7421, region: REGIONS.AFRICA },
//   { name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lon: 39.2083, region: REGIONS.AFRICA },
//   { name: "Alexandria", country: "Egypt", lat: 31.2001, lon: 29.9187, region: REGIONS.AFRICA },
//   { name: "Abidjan", country: "Ivory Coast", lat: 5.3600, lon: -4.0083, region: REGIONS.AFRICA },
//   { name: "Khartoum", country: "Sudan", lat: 15.5007, lon: 32.5599, region: REGIONS.AFRICA },
//   { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, region: REGIONS.AFRICA },
//   { name: "Accra", country: "Ghana", lat: 5.6037, lon: -0.1870, region: REGIONS.AFRICA },
//   { name: "Dakar", country: "Senegal", lat: 14.7167, lon: -17.4677, region: REGIONS.AFRICA },
//   { name: "Durban", country: "South Africa", lat: -29.8587, lon: 31.0218, region: REGIONS.AFRICA },
//   { name: "Kano", country: "Nigeria", lat: 12.0022, lon: 8.5920, region: REGIONS.AFRICA },
//   { name: "Rabat", country: "Morocco", lat: 34.0209, lon: -6.8416, region: REGIONS.AFRICA },
//   { name: "Luanda", country: "Angola", lat: -8.8389, lon: 13.2894, region: REGIONS.AFRICA },
//   { name: "Algiers", country: "Algeria", lat: 36.7538, lon: 3.0588, region: REGIONS.AFRICA },
//   { name: "Kampala", country: "Uganda", lat: 0.3476, lon: 32.5825, region: REGIONS.AFRICA },
//   { name: "Bamako", country: "Mali", lat: 12.6392, lon: -8.0029, region: REGIONS.AFRICA },
//   { name: "Lusaka", country: "Zambia", lat: -15.3875, lon: 28.3228, region: REGIONS.AFRICA },
//   { name: "Maputo", country: "Mozambique", lat: -25.9692, lon: 32.5732, region: REGIONS.AFRICA },
//   { name: "Harare", country: "Zimbabwe", lat: -17.8277, lon: 31.0534, region: REGIONS.AFRICA },
//   { name: "Ouagadougou", country: "Burkina Faso", lat: 12.3714, lon: -1.5197, region: REGIONS.AFRICA },
//   { name: "Antananarivo", country: "Madagascar", lat: -18.8792, lon: 47.5079, region: REGIONS.AFRICA },
//   { name: "Conakry", country: "Guinea", lat: 9.6412, lon: -13.5784, region: REGIONS.AFRICA },
//   { name: "Lilongwe", country: "Malawi", lat: -13.9626, lon: 33.7741, region: REGIONS.AFRICA },
//   { name: "Niamey", country: "Niger", lat: 13.5117, lon: 2.1251, region: REGIONS.AFRICA },
//   { name: "Yaoundé", country: "Cameroon", lat: 3.8480, lon: 11.5021, region: REGIONS.AFRICA },
//   { name: "Tripoli", country: "Libya", lat: 32.8872, lon: 13.1913, region: REGIONS.AFRICA },
//   { name: "Tunis", country: "Tunisia", lat: 36.8065, lon: 10.1815, region: REGIONS.AFRICA },
//   { name: "Pretoria", country: "South Africa", lat: -25.7479, lon: 28.2293, region: REGIONS.AFRICA },
//   { name: "Port Louis", country: "Mauritius", lat: -20.1609, lon: 57.5012, region: REGIONS.AFRICA },
//   { name: "Windhoek", country: "Namibia", lat: -22.5609, lon: 17.0658, region: REGIONS.AFRICA },
//   { name: "Gaborone", country: "Botswana", lat: -24.6282, lon: 25.9231, region: REGIONS.AFRICA },
//   { name: "Maseru", country: "Lesotho", lat: -29.3167, lon: 27.4833, region: REGIONS.AFRICA },
//   { name: "Mbabane", country: "Eswatini", lat: -26.3054, lon: 31.1367, region: REGIONS.AFRICA },
//   { name: "Bujumbura", country: "Burundi", lat: -3.3614, lon: 29.3599, region: REGIONS.AFRICA },
//   { name: "Kigali", country: "Rwanda", lat: -1.9441, lon: 30.0619, region: REGIONS.AFRICA },
//   { name: "Libreville", country: "Gabon", lat: 0.4162, lon: 9.4673, region: REGIONS.AFRICA },
//   { name: "Bangui", country: "Central African Republic", lat: 4.3947, lon: 18.5582, region: REGIONS.AFRICA },
//   { name: "Brazzaville", country: "Republic of Congo", lat: -4.2634, lon: 15.2429, region: REGIONS.AFRICA },
//   { name: "Malabo", country: "Equatorial Guinea", lat: 3.7523, lon: 8.7742, region: REGIONS.AFRICA },
//   { name: "Djibouti", country: "Djibouti", lat: 11.5886, lon: 43.1451, region: REGIONS.AFRICA },
//   { name: "Asmara", country: "Eritrea", lat: 15.3229, lon: 38.9251, region: REGIONS.AFRICA },
//   { name: "Nouakchott", country: "Mauritania", lat: 18.0735, lon: -15.9582, region: REGIONS.AFRICA },
//   { name: "Freetown", country: "Sierra Leone", lat: 8.4847, lon: -13.2343, region: REGIONS.AFRICA },
//   { name: "Monrovia", country: "Liberia", lat: 6.3004, lon: -10.7969, region: REGIONS.AFRICA },
//   { name: "Yamoussoukro", country: "Ivory Coast", lat: 6.8276, lon: -5.2893, region: REGIONS.AFRICA },
//   { name: "Porto-Novo", country: "Benin", lat: 6.4969, lon: 2.6283, region: REGIONS.AFRICA },
  // ... Add 45 more African cities

  // OCEANIA (50 cities)
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, region: REGIONS.OCEANIA },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631, region: REGIONS.OCEANIA },
//   { name: "Brisbane", country: "Australia", lat: -27.4705, lon: 153.0260, region: REGIONS.OCEANIA },
//   { name: "Perth", country: "Australia", lat: -31.9505, lon: 115.8605, region: REGIONS.OCEANIA },
//   { name: "Auckland", country: "New Zealand", lat: -36.8509, lon: 174.7645, region: REGIONS.OCEANIA },
//   { name: "Adelaide", country: "Australia", lat: -34.9285, lon: 138.6007, region: REGIONS.OCEANIA },
//   { name: "Gold Coast", country: "Australia", lat: -28.0167, lon: 153.4000, region: REGIONS.OCEANIA },
//   { name: "Wellington", country: "New Zealand", lat: -41.2866, lon: 174.7756, region: REGIONS.OCEANIA },
//   { name: "Christchurch", country: "New Zealand", lat: -43.5320, lon: 172.6306, region: REGIONS.OCEANIA },
//   { name: "Newcastle", country: "Australia", lat: -32.9283, lon: 151.7817, region: REGIONS.OCEANIA },
//   { name: "Canberra", country: "Australia", lat: -35.2809, lon: 149.1300, region: REGIONS.OCEANIA },
//   { name: "Hamilton", country: "New Zealand", lat: -37.7870, lon: 175.2793, region: REGIONS.OCEANIA },
//   { name: "Hobart", country: "Australia", lat: -42.8821, lon: 147.3272, region: REGIONS.OCEANIA },
//   { name: "Wollongong", country: "Australia", lat: -34.4278, lon: 150.8931, region: REGIONS.OCEANIA },
//   { name: "Dunedin", country: "New Zealand", lat: -45.8788, lon: 170.5028, region: REGIONS.OCEANIA },
//   { name: "Townsville", country: "Australia", lat: -19.2590, lon: 146.8169, region: REGIONS.OCEANIA },
//   { name: "Cairns", country: "Australia", lat: -16.9206, lon: 145.7722, region: REGIONS.OCEANIA },
//   { name: "Tauranga", country: "New Zealand", lat: -37.6878, lon: 176.1651, region: REGIONS.OCEANIA },
//   { name: "Darwin", country: "Australia", lat: -12.4634, lon: 130.8456, region: REGIONS.OCEANIA },
//   { name: "Geelong", country: "Australia", lat: -38.1499, lon: 144.3617, region: REGIONS.OCEANIA },
//   { name: "Port Moresby", country: "Papua New Guinea", lat: -9.4438, lon: 147.1803, region: REGIONS.OCEANIA },
//   { name: "Suva", country: "Fiji", lat: -18.1416, lon: 178.4419, region: REGIONS.OCEANIA },
//   { name: "Nouméa", country: "New Caledonia", lat: -22.2758, lon: 166.4581, region: REGIONS.OCEANIA },
//   { name: "Honiara", country: "Solomon Islands", lat: -9.4438, lon: 159.9498, region: REGIONS.OCEANIA },
//   { name: "Port Vila", country: "Vanuatu", lat: -17.7334, lon: 168.3272, region: REGIONS.OCEANIA },
//   { name: "Nuku'alofa", country: "Tonga", lat: -21.1393, lon: -175.2046, region: REGIONS.OCEANIA },
//   { name: "Apia", country: "Samoa", lat: -13.8506, lon: -171.7513, region: REGIONS.OCEANIA },
//   { name: "Pago Pago", country: "American Samoa", lat: -14.2757, lon: -170.7020, region: REGIONS.OCEANIA },
//   { name: "Papeete", country: "French Polynesia", lat: -17.5334, lon: -149.5667, region: REGIONS.OCEANIA },
//   { name: "Hagåtña", country: "Guam", lat: 13.4757, lon: 144.7489, region: REGIONS.OCEANIA },
//   { name: "Saipan", country: "Northern Mariana Islands", lat: 15.1894, lon: 145.7475, region: REGIONS.OCEANIA },
//   { name: "Majuro", country: "Marshall Islands", lat: 7.1164, lon: 171.1854, region: REGIONS.OCEANIA },
//   { name: "Tarawa", country: "Kiribati", lat: 1.3290, lon: 172.9790, region: REGIONS.OCEANIA },
//   { name: "Funafuti", country: "Tuvalu", lat: -8.5211, lon: 179.1983, region: REGIONS.OCEANIA },
//   { name: "Yaren", country: "Nauru", lat: -0.5477, lon: 166.9209, region: REGIONS.OCEANIA },
//   { name: "Palmerston North", country: "New Zealand", lat: -40.3564, lon: 175.6147, region: REGIONS.OCEANIA },
//   { name: "Napier", country: "New Zealand", lat: -39.4928, lon: 176.9120, region: REGIONS.OCEANIA },
//   { name: "Rotorua", country: "New Zealand", lat: -38.1368, lon: 176.2497, region: REGIONS.OCEANIA },
//   { name: "Whangarei", country: "New Zealand", lat: -35.7275, lon: 174.3166, region: REGIONS.OCEANIA },
//   { name: "Sunshine Coast", country: "Australia", lat: -26.6500, lon: 153.0666, region: REGIONS.OCEANIA },
//   { name: "Launceston", country: "Australia", lat: -41.4332, lon: 147.1572, region: REGIONS.OCEANIA },
//   { name: "Bendigo", country: "Australia", lat: -36.7570, lon: 144.2794, region: REGIONS.OCEANIA },
//   { name: "Albury", country: "Australia", lat: -36.0737, lon: 146.9135, region: REGIONS.OCEANIA },
//   { name: "Ballarat", country: "Australia", lat: -37.5622, lon: 143.8503, region: REGIONS.OCEANIA },
//   { name: "Mackay", country: "Australia", lat: -21.1539, lon: 149.1649, region: REGIONS.OCEANIA },
//   { name: "Rockhampton", country: "Australia", lat: -23.3791, lon: 150.5100, region: REGIONS.OCEANIA },
//   { name: "Bundaberg", country: "Australia", lat: -24.8671, lon: 152.3508, region: REGIONS.OCEANIA },
//   { name: "Toowoomba", country: "Australia", lat: -27.5598, lon: 151.9507, region: REGIONS.OCEANIA },
//   { name: "Port Macquarie", country: "Australia", lat: -31.4332, lon: 152.9060, region: REGIONS.OCEANIA },
//   { name: "Palikir", country: "Micronesia", lat: 6.9248, lon: 158.1618, region: REGIONS.OCEANIA },
];

// Function to fetch cities
export const fetchMajorCities = async () => {
  return MAJOR_CITIES;
};

// Function to simulate fetching temperature data
export const fetchCityTemperature = async (city) => {
  // For now, returning random temperature data
  const randomTemp = Math.floor(Math.random() * 35) + 5; // Random temp between 5-40°C
  const currentTime = new Date().toLocaleTimeString();
  
  return {
    ...city,
    temperature: randomTemp,
    time: currentTime,
    location: `${city.name}, ${city.country}`
  };
};

export async function getGlobalTemperatures() {
  try {
    const cities = await fetchMajorCities();
    
    if (!cities.length) {
      throw new Error("Failed to fetch city list");
    }

    console.log(`Processing temperatures for ${cities.length} cities...`);

    // Initialize extremes for each region
    const regionExtremes = Object.values(REGIONS).reduce((acc, region) => {
      acc[region] = {
        hottest: { temperature: -Infinity },
        coldest: { temperature: Infinity }
      };
      return acc;
    }, {});

    // Process cities in batches
    const batchSize = 5;
    const results = [];
    
    for (let i = 0; i < cities.length; i += batchSize) {
      const batch = cities.slice(i, i + batchSize);
      const batchPromises = batch.map(city => 
        fetchCityTemperature(city)
          .catch(error => {
            console.warn(`Error fetching data for ${city.name}:`, error);
            return null;
          })
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter(result => result !== null));

      console.log(`Processed ${Math.min(i + batchSize, cities.length)}/${cities.length} cities`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Find extremes for each region
    results.forEach(cityData => {
      if (!cityData || !cityData.region) return;
      
      const regionData = regionExtremes[cityData.region];
      if (cityData.temperature > regionData.hottest.temperature) {
        regionData.hottest = cityData;
      }
      if (cityData.temperature < regionData.coldest.temperature) {
        regionData.coldest = cityData;
      }
    });

    // Validate results
    Object.values(REGIONS).forEach(region => {
      if (regionExtremes[region].hottest.temperature === -Infinity ||
          regionExtremes[region].coldest.temperature === Infinity) {
        console.warn(`No valid temperature data for region: ${region}`);
      }
    });

    return regionExtremes;
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    return null;
  }
} 