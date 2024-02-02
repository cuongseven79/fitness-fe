import React from "react";

const Header = ({ title, image, children }) => {
	return (
		<header className="header">
			<div className="header__container">
				<div className="header__container-lg">
					<img src={image} alt="Header Background image" />
				</div>
				<div className="header__content">
					<h2>{title}</h2>
					<p>{children}</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
