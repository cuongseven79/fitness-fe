import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPaymentResult } from '../../api/invoiceService';
import './payment.css';
import { Modal } from 'antd';

export const Payment = () => {
	const [showDialog, setShowDialog] = useState(true);
	const [loading, setLoading] = useState(true);
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
		const userName = getInfoUser.displayName;
		const res = await getPaymentResult(queryResult, userId, userName);
		if (res.RspCode === '00') {
			setModalTitle('Success');
			setModalBody('Payment success!');
		} else {
			setModalTitle('Error');
			res.RspCode === '99'
				? setModalBody('Payment existed!')
				: res.RspCode === '97'
					? setModalBody('You cannnot pay. Because you are booking PT.')
					: setModalBody('Payment failed!');
		}
		setShowDialog(true);
		setLoading(false);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getQueryResult = () => {
		const currentUrl = window.location.href;
		const urlParams = new URLSearchParams(currentUrl.split("?")[1]);
		const result = {};
		urlParams.forEach((value, key) => {
			if (value.includes('%')) {
				// Decode encoded values
				value = decodeURIComponent(value);
			}
			result[key] = value;
		});
		setQueryResult(result);
	};

	return (
		<section>
			<div className="container notify__container py-10">
				<Modal
					title={loading ? 'Loading...' : modalTitle}
					open={showDialog}
					footer={
						!loading && (
							<div className="text-center">
								<Link to="/" className="btn">
									Go back Home
								</Link>
							</div>
						)
					}
				>
					{loading ? (
						<div className="text-center">
							<span>Wait a minute...</span>
						</div>
					) : (
						<div className="text-center">
							<span>{modalBody}</span>
						</div>
					)}
				</Modal>
			</div>
		</section>
	);
};

export default Payment;
