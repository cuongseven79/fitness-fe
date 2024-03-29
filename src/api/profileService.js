import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async (userId) => {
  const response = await axios.get(API_URL + "/profile", {
    params: { userId: userId }
  });
  return response.data;
};
export const postProfile = async (formData) => {
  const response = await axios.post(API_URL + "/profile",formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}
export const updateProfile = async (formData,id) => {
  const response = await axios.put(API_URL + "/profile/update", {formData:formData,id:id})
  return response.data;
}
export const updateSwitch = async(id,trainerStatus) => {
    const response = await axios.put(API_URL + '/profile/switch', {id:id, trainerStatus:trainerStatus});
    return response.data;
}

export const deleteImage = async (fileName, userId, typeImage) => {
  const response = await axios.delete(API_URL + "/profile/delete", {
    data: {
      fileName: fileName,
      userId: userId,
      typeImage: typeImage
    }
  });
  return response.data;
};
