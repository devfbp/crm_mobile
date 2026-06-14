import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      return null;
    }

    return jwtDecode(token);
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};