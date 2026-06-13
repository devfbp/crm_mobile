import Constants from 'expo-constants';

const getBaseUrl = () => {
  console.log('Expo Constants:', Constants);
  const pathend = "/api/app-mobile/";
  // Physical device or production
  if (!__DEV__) return 'https://your-production-url.com'+pathend;

  // Get debugger host (works for both device and emulator)
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (!localhost) return 'http://localhost:8000'+pathend; // iOS simulator fallback

  return `http://${localhost}:8000${pathend}`;
};

export const BASE_URL = getBaseUrl();