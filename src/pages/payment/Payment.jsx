import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPaymentResult } from '../../api/invoiceService';
import './payment.css';

export const Payment = () => {
  const [showDialog, setShowDialog] = useState(true);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [queryResult, setQueryResult] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getQueryResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(queryResult).length !== 0) {
      fetchResultPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResult]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchResultPayment = async () => {
    const getInfoUser = JSON.parse(sessionStorage.getItem('user'));
    const userId = getInfoUser.userId;
    const res = await getPaymentResult(queryResult, userId);
    if (res.RspCode === '00') {
      setModalTitle('Success');
      setModalBody('Payment success!');
    } else {
      setModalTitle('Error');
      res.RspCode === '99'
        ? setModalBody('Payment existed!')
        : setModalBody('Payment failed!');
    }
    setShowDialog(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getQueryResult = () => {
    const vpnReturn = 'http://localhost:3000/payment/callback?';
    const currentUrl = window.location.href;

    const query = currentUrl.replace(vpnReturn, '');
    const params = new URLSearchParams(query);
    const result = {};
    params.forEach((value, key) => {
      if (value.includes('%')) {
        // Decode encoded values
        value = decodeURIComponent(value);
      }
      result[key] = value;
    });
    setQueryResult(result);
  };

  return showDialog ? (
    <section>
      <div className='container notify__container py-6'>
        <div className='text-center'>
          <h2> {modalTitle} </h2>
          <span>{modalBody}</span>
        </div>
        <Link to='/' className='btn'>
          Go back Home
        </Link>
      </div>
    </section>
  ) : (
    <section>
      <div className='text-center py-6'>
        <h2> Loading.... </h2>
      </div>
    </section>
  );
};

export default Payment;
