import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPaymentResult } from '../../api/invoiceService';
import './payment.css';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@material-ui/core';

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

	return (
		<section>
			<div className="container notify__container py-10">
				<Dialog open={showDialog} maxWidth="lg">
					{loading ? (
						<>
							<DialogTitle>Loading...</DialogTitle>
							<DialogContent>
								<div className="text-center">
									<span>Wait a minute...</span>
								</div>
							</DialogContent>
						</>
					) : (
						<>
							<DialogTitle>{modalTitle}</DialogTitle>
							<DialogContent>
								<div className="text-center">
									<span>{modalBody}</span>
								</div>
							</DialogContent>
							<DialogActions>
								<Link to="/" className="btn">
									Go back Home
								</Link>
							</DialogActions>
						</>
					)}
				</Dialog>
			</div>
		</section>
	);
};

export default Payment;
