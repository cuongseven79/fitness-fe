import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/images/main_header.png";

const MainHeader = () => {
	return (
		<header className="main__header">
			<div className="container main__header-container">
				<div className="main__header-left">
					<h2>Better life though</h2>
					<h1>Join The Legends of the Fitness World</h1>
					<p>
						Wings for Strong Health and Perfect Muscles: Discover the House that Shares Fitness Knowledge, Effective Exercises, and Diets to Enhance Biological Capacity. Join Us on the Journey Discover Your Strength, And Build The Most Perfect Version Of Yourself!
					</p>
					<div className="flex justify-center text-center">
						<Link to="/trainers" className="btn mr-4 text-sm my-auto sm:py-4 md:p-5 lg:p-5 lg:px-10">
							Booking PT
						</Link>
						<Link to="/plans" className="btn text-base my-auto sm:py-4 md:p-5 lg:p-5 lg:px-10 ">
							You want to be a PT ?
						</Link>
					</div>
				</div>
				<div className="main__header-right">
					<div className="main__header-circle"></div>
					<div className="main__header-image">
						<img src={Image} alt="MainHeaderImage" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default MainHeader;
