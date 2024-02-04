import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getOrder = async () => {
  const response = await axios.get(API_URL + "/manage-orders");
  
  return response.data;
};
export const postOrder = async (formData) => {
  const response = await axios.post(API_URL + "/manage-orders",formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}