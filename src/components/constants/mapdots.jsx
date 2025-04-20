
export const mapdots = [
  // Existing 20 (from your list)
  { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } }, // Alaska → LA
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 40.7128, lng: -74.0060 } }, // Lagos → NYC
  { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } }, // Alaska → Brasilia
  { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } }, // Brasilia → Lisbon
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: -26.2041, lng: 28.0473 } }, // London → Johannesburg
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } }, // London → New Delhi
  { start: { lat: -1.2921, lng: 36.8219 }, end: { lat: 25.2048, lng: 55.2708 } }, // Nairobi → Dubai
  { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } }, // New Delhi → Vladivostok
  { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } }, // New Delhi → Nairobi
  { start: { lat: 35.6895, lng: 139.6917 }, end: { lat: -33.8688, lng: 151.2093 } }, // Tokyo → Sydney
  { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: 55.7558, lng: 37.6176 } }, // Sydney → Moscow
  { start: { lat: 55.7558, lng: 37.6176 }, end: { lat: 40.7128, lng: -74.006 } }, // Moscow → NYC
  { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 51.5074, lng: -0.1278 } }, // NYC → London
  { start: { lat: 40.7128, lng: -74.006 }, end: { lat: -34.6037, lng: -58.3816 } }, // NYC → Buenos Aires
  { start: { lat: -34.6037, lng: -58.3816 }, end: { lat: 6.5244, lng: 3.3792 } }, // Buenos Aires → Lagos
  { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: 48.8566, lng: 2.3522 } }, // Singapore → Paris
  { start: { lat: 50.1109, lng: 8.6821 }, end: { lat: 35.6762, lng: 139.6503 } }, // Frankfurt → Tokyo
  { start: { lat: 37.7749, lng: -122.4194 }, end: { lat: 49.2827, lng: -123.1207 } }, // SF → Vancouver
  { start: { lat: 31.2304, lng: 121.4737 }, end: { lat: 22.3193, lng: 114.1694 } }, // Shanghai → Hong Kong

  // Additional 60 Global Routes
  { start: { lat: 19.4326, lng: -99.1332 }, end: { lat: 34.0522, lng: -118.2437 } }, // Mexico City → LA
  { start: { lat: 52.5200, lng: 13.4050 }, end: { lat: 35.6895, lng: 139.6917 } }, // Berlin → Tokyo
  { start: { lat: 41.9028, lng: 12.4964 }, end: { lat: -33.4489, lng: -70.6693 } }, // Rome → Santiago
  { start: { lat: 13.7563, lng: 100.5018 }, end: { lat: 55.7558, lng: 37.6173 } }, // Bangkok → Moscow
  { start: { lat: 39.9042, lng: 116.4074 }, end: { lat: 51.1657, lng: 10.4515 } }, // Beijing → Germany
  { start: { lat: 41.3851, lng: 2.1734 }, end: { lat: -23.5505, lng: -46.6333 } }, // Barcelona → São Paulo
  { start: { lat: -23.5505, lng: -46.6333 }, end: { lat: 35.6762, lng: 139.6503 } }, // São Paulo → Tokyo
  { start: { lat: 55.9533, lng: -3.1883 }, end: { lat: 45.4215, lng: -75.6972 } }, // Edinburgh → Ottawa
  { start: { lat: 25.7617, lng: -80.1918 }, end: { lat: 59.3293, lng: 18.0686 } }, // Miami → Stockholm
  { start: { lat: -33.9249, lng: 18.4241 }, end: { lat: 52.3676, lng: 4.9041 } }, // Cape Town → Amsterdam
  { start: { lat: 60.472, lng: 8.4689 }, end: { lat: 3.139, lng: 101.6869 } }, // Norway → Kuala Lumpur
  { start: { lat: 33.6844, lng: 73.0479 }, end: { lat: 41.0082, lng: 28.9784 } }, // Islamabad → Istanbul
  { start: { lat: 10.8231, lng: 106.6297 }, end: { lat: -37.8136, lng: 144.9631 } }, // Ho Chi Minh → Melbourne
  { start: { lat: 43.6511, lng: -79.3470 }, end: { lat: -1.2921, lng: 36.8219 } }, // Toronto → Nairobi
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 39.9042, lng: 116.4074 } }, // Paris → Beijing
  { start: { lat: 21.0278, lng: 105.8342 }, end: { lat: 12.9716, lng: 77.5946 } }, // Hanoi → Bangalore
  { start: { lat: 40.4168, lng: -3.7038 }, end: { lat: 3.8480, lng: 11.5021 } }, // Madrid → Yaoundé
  { start: { lat: 59.3293, lng: 18.0686 }, end: { lat: 30.0444, lng: 31.2357 } }, // Stockholm → Cairo
  { start: { lat: -22.9068, lng: -43.1729 }, end: { lat: 41.9028, lng: 12.4964 } }, // Rio → Rome
  { start: { lat: 36.1699, lng: -115.1398 }, end: { lat: 51.1657, lng: 10.4515 } }, // Las Vegas → Germany
  { start: { lat: 35.6895, lng: 139.6917 }, end: { lat: 39.7392, lng: -104.9903 } }, // Tokyo → Denver
  { start: { lat: 45.4215, lng: -75.6972 }, end: { lat: 51.0447, lng: -114.0719 } }, // Ottawa → Calgary
  { start: { lat: -4.4419, lng: 15.2663 }, end: { lat: 14.4974, lng: -14.4524 } }, // Kinshasa → Dakar
  { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 35.9078, lng: 127.7669 } }, // Istanbul → South Korea
  { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 55.8642, lng: -4.2518 } }, // Mumbai → Glasgow
  { start: { lat: 33.4484, lng: -112.0740 }, end: { lat: 43.6532, lng: -79.3832 } }, // Phoenix → Toronto
  { start: { lat: 21.1619, lng: -86.8515 }, end: { lat: 59.9139, lng: 10.7522 } }, // Cancun → Oslo
  { start: { lat: 60.1695, lng: 24.9354 }, end: { lat: 19.4326, lng: -99.1332 } }, // Helsinki → Mexico City
  { start: { lat: 34.6937, lng: 135.5023 }, end: { lat: 40.4168, lng: -3.7038 } }, // Osaka → Madrid
  { start: { lat: 38.9072, lng: -77.0369 }, end: { lat: 1.3521, lng: 103.8198 } }, // DC → Singapore
  { start: { lat: -35.6751, lng: -71.5430 }, end: { lat: 39.9042, lng: 116.4074 } }, // Chile → Beijing
  { start: { lat: 22.3964, lng: 114.1095 }, end: { lat: -22.9068, lng: -43.1729 } }, // Hong Kong → Rio
  { start: { lat: -12.0464, lng: -77.0428 }, end: { lat: 41.3851, lng: 2.1734 } }, // Lima → Barcelona
  { start: { lat: -8.8390, lng: 13.2894 }, end: { lat: 6.3150, lng: -10.8014 } }, // Luanda → Monrovia
  { start: { lat: 50.0755, lng: 14.4378 }, end: { lat: 52.2297, lng: 21.0122 } }, // Prague → Warsaw

  { start: { lat: 19.4326, lng: -99.1332 }, end: { lat: 34.0522, lng: -118.2437 } }, // Mexico City → LA
  { start: { lat: 52.5200, lng: 13.4050 }, end: { lat: 35.6895, lng: 139.6917 } }, // Berlin → Tokyo
  { start: { lat: 41.9028, lng: 12.4964 }, end: { lat: -33.4489, lng: -70.6693 } }, // Rome → Santiago
  { start: { lat: 13.7563, lng: 100.5018 }, end: { lat: 55.7558, lng: 37.6173 } }, // Bangkok → Moscow
  { start: { lat: 39.9042, lng: 116.4074 }, end: { lat: 51.1657, lng: 10.4515 } }, // Beijing → Germany
  { start: { lat: 41.3851, lng: 2.1734 }, end: { lat: -23.5505, lng: -46.6333 } }, // Barcelona → São Paulo
  { start: { lat: -23.5505, lng: -46.6333 }, end: { lat: 35.6762, lng: 139.6503 } }, // São Paulo → Tokyo
  { start: { lat: 55.9533, lng: -3.1883 }, end: { lat: 45.4215, lng: -75.6972 } }, // Edinburgh → Ottawa
  { start: { lat: 25.7617, lng: -80.1918 }, end: { lat: 59.3293, lng: 18.0686 } }, // Miami → Stockholm
  { start: { lat: -33.9249, lng: 18.4241 }, end: { lat: 52.3676, lng: 4.9041 } }, // Cape Town → Amsterdam
  { start: { lat: 60.472, lng: 8.4689 }, end: { lat: 3.139, lng: 101.6869 } }, // Norway → Kuala Lumpur
  { start: { lat: 33.6844, lng: 73.0479 }, end: { lat: 41.0082, lng: 28.9784 } }, // Islamabad → Istanbul
  { start: { lat: 10.8231, lng: 106.6297 }, end: { lat: -37.8136, lng: 144.9631 } }, // Ho Chi Minh → Melbourne
  { start: { lat: 43.6511, lng: -79.3470 }, end: { lat: -1.2921, lng: 36.8219 } }, // Toronto → Nairobi
  { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 39.9042, lng: 116.4074 } }, // Paris → Beijing
  { start: { lat: 21.0278, lng: 105.8342 }, end: { lat: 12.9716, lng: 77.5946 } }, // Hanoi → Bangalore
  { start: { lat: 40.4168, lng: -3.7038 }, end: { lat: 3.8480, lng: 11.5021 } }, // Madrid → Yaoundé
  { start: { lat: 59.3293, lng: 18.0686 }, end: { lat: 30.0444, lng: 31.2357 } }, // Stockholm → Cairo
  { start: { lat: -22.9068, lng: -43.1729 }, end: { lat: 41.9028, lng: 12.4964 } }, // Rio → Rome
  { start: { lat: 36.1699, lng: -115.1398 }, end: { lat: 51.1657, lng: 10.4515 } }, // Las Vegas → Germany
  { start: { lat: 35.6895, lng: 139.6917 }, end: { lat: 39.7392, lng: -104.9903 } }, // Tokyo → Denver
  { start: { lat: 45.4215, lng: -75.6972 }, end: { lat: 51.0447, lng: -114.0719 } }, // Ottawa → Calgary
  { start: { lat: -4.4419, lng: 15.2663 }, end: { lat: 14.4974, lng: -14.4524 } }, // Kinshasa → Dakar
  { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 35.9078, lng: 127.7669 } }, // Istanbul → South Korea
  { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 55.8642, lng: -4.2518 } }, // Mumbai → Glasgow
  { start: { lat: 33.4484, lng: -112.0740 }, end: { lat: 43.6532, lng: -79.3832 } }, // Phoenix → Toronto
  { start: { lat: 21.1619, lng: -86.8515 }, end: { lat: 59.9139, lng: 10.7522 } }, // Cancun → Oslo
  { start: { lat: 60.1695, lng: 24.9354 }, end: { lat: 19.4326, lng: -99.1332 } }, // Helsinki → Mexico City
  { start: { lat: 34.6937, lng: 135.5023 }, end: { lat: 40.4168, lng: -3.7038 } }, // Osaka → Madrid
  { start: { lat: 38.9072, lng: -77.0369 }, end: { lat: 1.3521, lng: 103.8198 } }, // DC → Singapore
  { start: { lat: -35.6751, lng: -71.5430 }, end: { lat: 39.9042, lng: 116.4074 } }, // Chile → Beijing
  { start: { lat: 22.3964, lng: 114.1095 }, end: { lat: -22.9068, lng: -43.1729 } }, // Hong Kong → Rio
  { start: { lat: -12.0464, lng: -77.0428 }, end: { lat: 41.3851, lng: 2.1734 } }, // Lima → Barcelona
  { start: { lat: -8.8390, lng: 13.2893 }, end: { lat: 41.9028, lng: 12.4964 } }, // Luanda → Rome
  { start: { lat: 37.9838, lng: 23.7275 }, end: { lat: 12.9716, lng: 77.5946 } }, // Athens → Bangalore
  { start: { lat: 38.7223, lng: -9.1393 }, end: { lat: -33.4489, lng: -70.6693 } }, // Lisbon → Santiago
  { start: { lat: 34.0522, lng: -118.2437 }, end: { lat: 19.4326, lng: -99.1332 } }, // LA → Mexico City
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: -34.6037, lng: -58.3816 } }, // London → Buenos Aires
  { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 51.5074, lng: -0.1278 } }, // Mumbai → London
  { start: { lat: 36.7783, lng: -119.4179 }, end: { lat: 40.7128, lng: -74.0060 } }, // California → NYC
  { start: { lat: 21.0285, lng: 105.8542 }, end: { lat: 35.6762, lng: 139.6503 } }, // Hanoi → Tokyo
  { start: { lat: 37.7749, lng: -122.4194 }, end: { lat: 41.9028, lng: 12.4964 } }, // SF → Rome
];





