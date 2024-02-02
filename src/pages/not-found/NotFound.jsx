import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
	useEffect(() => {
		document.title = `404  |   Page Not Found`;
	}, []);

	return (
		<section>
			<div className="container notFound__container">
				<h2> Page Not Found </h2>
				<Link to="/" className="btn">
					Go back Home
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
