import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createPayment = async (formData) => {
    const res = await axios.post(
        API_URL + '/payment/create-payment-url',
        formData
    );
    return res.data;
};

export const getPaymentResult = async (params, userId) => {
    params.userId = userId;
    const res = await axios.get(API_URL + `/payment/vnpay-ipn`, {
        params,
    });
    return res.data;
};
