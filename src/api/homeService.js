import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* GET Feedback*/
export const getDataDashboard = async (endpoint) => {
    const response = await axios.get(API_URL + endpoint);
    return response.data;
}

/* POST */
export const postDataDashboard = async ({endpoint , data}) => {
    const response = await axios.post(API_URL + endpoint, data);
    return response.data;
}