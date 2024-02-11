import axios from "axios";

export const API_HOST = "http://localhost:3000/api/editor";

export const create_page = async (name) => {
  try {
    const response = await axios.post(`${API_HOST}/`, { name });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error);
    return null;
  }
};
