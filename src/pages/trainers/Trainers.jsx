import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Row, Pagination } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import Card from "../../components/Card";
import Header from "../../components/Header";
import SectionHead from "../../components/SectionHead";
import ModalCustom from "../../components/ModalCustom";

import { AiFillStar } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";

import HeaderImage from "../../images/header_bg_5.jpg";
import loadingGIF from "../../images/loading.gif";

import { getAllTrainers } from "../../api/trainerService";

const paginate = (items, currentPage, pageSize) => {
	if (!items) return [];
	const startIndex = (currentPage - 1) * pageSize;
	return items.slice(startIndex, startIndex + pageSize);
};

const TrainerInfoItem = ({ label, value }) => (
	value && (
		<li className="flex justify-between items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
			<label>{label}</label>
			<span>{value}</span>
		</li>
	)
);

const TrainerModal = ({ open, setOpen, trainer }) => {
	const { displayName, price, photoURL, certURL, yearsOfExp, age, address, gender } = trainer || {};

	return (
		<ModalCustom className="text-black" title="Trainer Information" open={open} setOpen={setOpen}>
			<div className="py-4 flex justify-between">
				<ul className="space-y-7">
					<TrainerInfoItem label="Display Name: " value={displayName} />
					<TrainerInfoItem label="Gender: " value={gender} />
					<TrainerInfoItem label="Age" value={age} />
					<TrainerInfoItem label="Year Of Experiences: " value={yearsOfExp} />
					<TrainerInfoItem label="Address" value={address} />
					<TrainerInfoItem label="Price: " value={`$ ${price}/month`} />
				</ul>
				<img src={photoURL} className="w-40 h-40 rounded-full" alt="Trainer" />
			</div>
			<div className={`${!certURL && "hidden"}`}>
				<h2 className="py-5 font-medium text-gray-900 dark:text-white">Certificate</h2>
				<div className="overflow-auto flex gap-5">
					{certURL?.map((cert, index) => (
						<img
							key={index}
							src={cert}
							className="w-40"
							alt={`Certificate ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</ModalCustom>
	);
};

const Trainers = () => {
	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState([]);
	const [sortedList, setSortedList] = useState([]);
	const [trainerInfo, setTrainerInfo] = useState(null);
	const [filter, setFilter] = useState("all");
	const [selectedMenuItem, setSelectedMenuItem] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(6);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);
			const { statusCode, trainers } = await getAllTrainers();
			if (statusCode === 200) {
				setUsers(trainers);
				setSortedList(trainers);
			}
		} catch (error) {
			console.error("Error fetching trainers:", error);
		} finally {
			setLoading(false);
		}
	};

	const priceIntervals = {
		1: { min: 0, max: 2000 },
		2: { min: 2001, max: 4000 },
		3: { min: 4001, max: 6000 },
		4: { min: 6001, max: 8000 },
		5: { min: 8001, max: 10000 },
	};
	const getAll = () => {
		setLoading(true);
		setFilter("all");
		setTimeout(() => {
			setSortedList(users);
			setLoading(false);
		}, 1000);
	};

	const sortRating = (rating) => {
		setLoading(true);
		setFilter("rating");
		setTimeout(() => {
			setSortedList(users.filter((user) => user.rating === rating));
			setLoading(false);
		}, 1000);
	};

	const sortField = (field) => {
		setLoading(true);
		setFilter("field");
		setTimeout(() => {
			setSortedList(users.filter((user) => user.field === field));
			setLoading(false);
		}, 1000);
	};

	const sortPrice = (minPrice, maxPrice) => {
		setLoading(true);
		setFilter("price");
		setTimeout(() => {
			setSortedList(
				users.filter((user) => user.price >= minPrice && user.price <= maxPrice)
			);
			setLoading(false);
		}, 1000);
	};
	const handleRatingClick = ({ key }) => {
		setCurrentPage(1);
		sortRating(key);
		setSelectedMenuItem(key);
	};
	const handleFieldClick = ({ key }) => {
		setCurrentPage(1);
		sortField(key);
		setSelectedMenuItem(key);
	};

	const handlePriceClick = ({ key }) => {
		const priceInterval = priceIntervals[key];
		if (priceInterval) {
			sortPrice(parseInt(priceInterval.min), parseInt(priceInterval.max));
			setCurrentPage(1);
			setSelectedMenuItem(key);
		}
	};

	const handlePaginationChange = (page, pageSize) => {
		setSelectedMenuItem(null);
		setCurrentPage(page);
		setFilter("all");
	};
	const ratingMenu = (
		<Menu onClick={handleRatingClick}>
			<Menu.Item key="1" className={selectedMenuItem === "1" ? "selected" : ""}>1 star</Menu.Item>
			<Menu.Item key="2" className={selectedMenuItem === "2" ? "selected" : ""}>2 star</Menu.Item>
			<Menu.Item key="3" className={selectedMenuItem === "3" ? "selected" : ""}>3 star</Menu.Item>
			<Menu.Item key="4" className={selectedMenuItem === "4" ? "selected" : ""}>4 star</Menu.Item>
			<Menu.Item key="5" className={selectedMenuItem === "5" ? "selected" : ""}>5 star</Menu.Item>
		</Menu>
	);
	const fieldMenu = (
		<Menu onClick={handleFieldClick}>
			<Menu.Item key="yoga" className={selectedMenuItem === "yoga" ? "selected" : ""}>Yoga</Menu.Item>
			<Menu.Item key="boxing" className={selectedMenuItem === "boxing" ? "selected" : ""}>Boxing</Menu.Item>
			<Menu.Item key="aerobic" className={selectedMenuItem === "aerobic" ? "selected" : ""}>Aerobic</Menu.Item>
			<Menu.Item key="taekwondo" className={selectedMenuItem === "taekwondo" ? "selected" : ""}>Taekwondo</Menu.Item>
			<Menu.Item key="pilates" className={selectedMenuItem === "pilates" ? "selected" : ""}>Pilates</Menu.Item>
		</Menu >
	);
	const priceMenu = (
		<Menu onClick={handlePriceClick}>
			<Menu.Item key="1" className={selectedMenuItem === "1" ? "selected" : ""}>0$ - 2000$</Menu.Item>
			<Menu.Item key="2" className={selectedMenuItem === "2" ? "selected" : ""}>2001$ - 4000$</Menu.Item>
			<Menu.Item key="3" className={selectedMenuItem === "3" ? "selected" : ""}>4001$ - 6000$</Menu.Item>
			<Menu.Item key="4" className={selectedMenuItem === "4" ? "selected" : ""}>6001$ - 8000$</Menu.Item>
			<Menu.Item key="5" className={selectedMenuItem === "5" ? "selected" : ""}>8001$ - 10000$</Menu.Item>
		</Menu>
	);

	const paginatedList = paginate(sortedList, currentPage, pageSize);

	return (
		<>
			<Header image={HeaderImage} title="Our Trainers">
				Adipisicing labore laboris ea sunt cillum ea velit.Adipisicing labore laboris ea sunt cillum ea velit. sunt cillum ea velit.
			</Header>
			<section className="trainers">
				<div className="container">
					<SectionHead icon={<FaCrown />} title="Trainers" />
					<Row style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", width: "100%", margin: "30px 10px" }}>
						<div className="button-group space-x-4">
							<Button type="primary" style={{ background: filter === "all" ? "#0080ff" : "#4b5c988f", }} onClick={() => getAll()}>
								<span>All</span>
							</Button>
							<Dropdown overlay={ratingMenu} placement="bottomLeft">
								<Button type="primary" style={{ background: filter === "rating" ? "#0080ff" : "#4b5c988f", textAlign: "center", display: "inline-flex", alignItems: "center", }}>
									<span>Rating</span>
									<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
								</Button>
							</Dropdown>
							<Dropdown overlay={fieldMenu} placement="bottomLeft">
								<Button type="primary" style={{ background: filter === "field" ? "#0080ff" : "#4b5c988f", textAlign: "center", display: "inline-flex", alignItems: "center", }}>
									<span>Field</span>
									<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
								</Button>
							</Dropdown>
							<Dropdown overlay={priceMenu} placement="bottomLeft">
								<Button type="primary" style={{ background: filter === "price" ? "#0080ff" : "#4b5c988f", textAlign: "center", display: "inline-flex", alignItems: "center", }}>
									<span>Price</span>
									<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
								</Button>
							</Dropdown>
						</div>
					</Row>
					{loading ? (
						<div className="w-40 mt-44 mx-auto">
							<img src={loadingGIF} alt="Loading" />
						</div>
					) : (
						<div className="trainers">
							<div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-16">
								{paginatedList && paginatedList.length > 0 ? (
									paginatedList.map((trainer) => (
										<Card className="" key={trainer.id} >
											<div
												onClick={() => {
													setOpen(true);
													setTrainerInfo(trainer);
												}}
												className="relative group mb-5 transition-all duration-200 hover:saturate-100 cursor-pointer">
												<div className="w-full h-60 bg-contain">
													<img src={trainer.photoURL} className="rounded-3xl w-full h-full" style={{ objectPosition: "10px -20px" }} alt="trainer one" />
												</div>
												<div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full "></div>
												<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 ">
													<h1 className="text-lg">View information</h1>
												</div>
											</div>
											<h3 className="text-[20px] text-[#EAB308] font-semibold">
												{trainer.displayName}
											</h3>
											<p>{trainer.field}</p>
											<div className="my-3 flex justify-evenly mx-auto items-center">
												<h1>{`$ ${trainer.price}`}</h1>
												<select className="text-black px-1 rounded-md">
													<option value="">1 month</option>
													<option value="">2 month</option>
													<option value="">3 month</option>
												</select>
											</div>
											<div className="flex justify-center mb-5">
												{trainer.rating > 0 &&
													Array(Math.round(trainer.rating)).fill(
														<AiFillStar color="yellow" />
													)}
											</div>
											<Link to={"plans"} className="btn sm">
												Booking
											</Link>
										</Card>
									))
								) : (
									<div className="text-white text-[20px]">
										No coach information found
									</div>
								)}
							</div>
						</div>
					)}
					<Pagination
						style={{ margin: "30px 0", display: "flex", justifyContent: "center", }}
						current={currentPage}
						pageSize={pageSize}
						total={sortedList.length}
						onChange={handlePaginationChange}
						prevIcon={<LeftOutlined style={{ color: '#ffcc00' }} />}
						nextIcon={<RightOutlined style={{ color: '#ffcc00' }} />}
						itemRender={(current, type, originalElement) => {
							if (type === 'prev' || type === 'next') {
								return originalElement;
							}
							if (type === 'page') {
								return (
									<a style={{ color: '#ffcc00' }} href={`#${current}`}>{current}</a>
								);
							}
							return originalElement;
						}}
					/>
				</div>
				<TrainerModal open={open} setOpen={setOpen} trainer={trainerInfo} />
			</section>
		</>
	);
};

export default Trainers;