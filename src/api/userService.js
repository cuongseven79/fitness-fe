import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* GET Feedback*/
export const getUsers = async (endpoint) => {
    const response = await axios.get(API_URL + endpoint);
    console.log(response.data)
    return response.data;
}
