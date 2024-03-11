import React, { useEffect } from 'react';
import './plans.css';
import { plans } from '../../data';
import Header from '../../components/Header';
import HeaderImage from "../../assets/images/header_bg_4.jpg";
import Card from '../../components/Card';
import { createPayment } from '../../api/invoiceService';
import { useNavigate } from 'react-router-dom';

function convertUSDtoVND(amountUSD) {
	const amountVND = amountUSD * 24000;
	const roundedAmountVND = Math.round(amountVND * 100) / 100;
	return roundedAmountVND;
}

const Plans = () => {
	const navigate = useNavigate();
	useEffect(() => {
		document.title = `Plans`;
	}, []);

	async function handleClickPlan(e, name, price) {
		e.preventDefault();
		const getInfoUser = JSON.parse(sessionStorage.getItem('user'));
		const vndPrice = convertUSDtoVND(price);
		if (getInfoUser) {
			const res = await createPayment({ name, vndPrice });
			if (res.url) {
				window.location.replace(res.url);
			} else {
				return;
			}
		} else {
			navigate('/login');
		}
	}
	return (
		<>
			<Header title='Membership Plans' image={HeaderImage}>
				Plan your workout with us today and see the results for yourself!
			</Header>
			<section className='plans'>
				<div className='flex justify-between p-10 gap-20'>
					<div className=''>
						<h1 className='py-4'>Benefits of PT</h1>
						<p className=''>
							Improve the quality of your coaching! Become a member now and reap
							the benefits of our platform. As a Personal Trainer, you will have
							the opportunity to use easy client engagement tools, flexible
							scheduling, and access an extensive professional resource - all
							designed to enhance your effectiveness. your results and achieve
							great success.
						</p>
					</div>
					<span className='max-lg:hidden'>
						<img src={HeaderImage} className='rounded-3xl' alt="" />
					</span>
				</div>
				<div className='container plans__container'>
					{plans.map(({ id, name, desc, price, features }) => {
						return (
							<Card key={id} className='plan'>
								<h3>{name}</h3>
								<small>{desc}</small>
								<h1>{`$ ${price}`}</h1>
								<h2>/month</h2>
								{features.map(({ feature, available, index }) => {
									return (
										<p key={index} className={available ? '' : 'disabled'}>
											{feature}
										</p>
									);
								})}
								<button
									className='btn lg'
									onClick={(e) => handleClickPlan(e, name, price)}
								>
									Choose Plan
								</button>
							</Card>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default Plans;
