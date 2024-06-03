import axios from "axios";

export const predict = async (districtId) => {
  try {
    // const baseURL = import.meta.env.VITE_API_BASE_URL; 
    // const response = await axios.get(`${baseURL}/predict?district=${districtId}`); 
    const response = await axios.get(`src/data/district${districtId}.json`);
    return response.data;
  } catch (error) {
    console.error(error.toString());
    throw error;
  }
};
