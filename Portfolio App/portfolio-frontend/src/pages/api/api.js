import axios from "axios";

export const API_HOST = process.env.BACKEND_PUBLIC_API_BASE_URL;

export const createPage = async (name, visibility, ownerId) => {
  try {
    const response = await axios.post(`${API_HOST}/`, { name, visibility, ownerId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error);
    return null;
  }
};

export const updatePage = async (pageId, { name, html, css, components, styles, visibility, slug }) => {
  try {
    // Include the updated fields in the request body
    const response = await axios.put(`${API_HOST}/${pageId}`, {
      name,
      html,
      css,
      components,
      styles,
      visibility,
      slug
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure this matches your authentication strategy
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating page:", error.response ? error.response.data : error);
    return null;
  }
};


export const getPageDetails = async (pageId) => {
  try {
    const response = await axios.get(`${API_HOST}/${pageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting page details:", error);
    return null;
  }
};

export const listPages = async () => {
  try {
    const response = await axios.get(`${API_HOST}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error listing pages:", error);
    return null;
  }
};

export const changePageContent = async (pageId, content) => {
  try {
    const response = await axios.put(`${API_HOST}/${pageId}/content`, { content }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error changing page content:", error);
    return null;
  }
};

export const loadPageContent = async (pageId) => {
  try {
    const response = await axios.get(`${API_HOST}/${pageId}/content`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error loading page content:", error);
    return null;
  }
};

export const deletePageRecord = async (pageId) => { 
  try {
    const response = await axios.delete(`${API_HOST}/${pageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting page:", error);
    return null;
  }
};

export const getPageByUserId = async () => {
  try {
    const response = await axios.get(`${API_HOST}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    });
    console.log("API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error getting user's page:", error);
    return null;
  }
};

export const getPageBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_HOST}/slug/${slug}`);
    console.log("API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error getting page by slug:", error);
    if (error.response && error.response.status === 404) {
      return { error: 'Page not found or not published', status: 404 };
    } else {
      return { error: 'Failed to load page content', status: error.response?.status };
    }
  }
};

