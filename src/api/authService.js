import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
        const res = await axios.get(API_URL + "/signup");
        return res.data;
}
export const addUser = async (formData) => {
         const res = await axios.post(API_URL + "/signup/create", formData);
        return res.data;
}
export const verifyLogin = async (formData) => {
        const res = await axios.post(API_URL + "/login", formData);
        return res.data;
}       


// !NOT delete this lines below 
// export const updateUser = async (formData) => {
//         const res = await axios.post(API_URL + "/signup/update", {formData:formData});
//         return res.data
// }
// export const deleteUserById = async (userId) => {
//         const res = await axios.post(API_URL + "/signup/delete", {id: userId});
//         return res.data
// }

