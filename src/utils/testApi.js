import axios from 'axios';

export const testApiConnection = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/activities`, {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY
      }
    });
    console.log('API Connection Success:', response.data);
    return true;
  } catch (error) {
    console.error('API Connection Error:', error);
    return false;
  }
}; 