import axios from "axios";

export const API_HOST = "http://localhost:3000";

export const getAllPages = async () => {
  try {
    console.log("Getting All Pages from Database");
    const response = await axios.get(`${API_HOST}/api/editor/`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return null;
  }
};

export const create_page = async (name) => {
  try {
    console.log("Creating page");
    const response = await axios.post(`${API_HOST}/api/editor/`, { name });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error);
    return null;
  }
};

export const deletePageRecord = async (pageId) => {
  try {
    const response = await axios.delete(`${API_HOST}/api/editor/${pageId}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting page:", error);
    return null;
  }
};

export const update_page = async (pageId, content) => {
  try {
    console.log("getting contents from mongo");
    const response = await axios.put(`${API_HOST}/api/editor/${pageId}`, {
      content,
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating page:", error);
    return null;
  }
};

export const loadPageFromBackend = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/editor/${pageId}`);
    const pageContent = response.data.content;
    editor.setComponents(pageContent);
  } catch (error) {
    console.error("Error loading page from backend:", error);
  }
};
