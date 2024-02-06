import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllTrainers = async () => {
  const response = await axios.get(API_URL + "/trainers")
  return response.data;
};
export const getMyCoaches = async (userId) => {
  const response = await axios.get(API_URL + "/manage-coaches", {
    params: { userId: userId }
  })

  return response.data;
}
