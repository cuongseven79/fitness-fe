import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createPaymentBooking = async (formData) => {
    const res = await axios.post(
        API_URL + '/booking/create-payment-url',
        formData
    );
    return res.data;
};

export const getPaymentResultBooking = async (params, userId, userName) => {
    params.userId = userId;
    params.userName = userName;
    const res = await axios.get(API_URL + `/booking/vnpay-ipn`, {
        params,
    });
    return res.data;
};
