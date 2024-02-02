import React from "react";

// A reuseable component for each section name
const SectionHead = ({ icon, title, className }) => {
	return (
		<div className={`section__head ${className}`}>
			<span>{icon}</span>
			<h2>{title}</h2>
		</div>
	);
};

export default SectionHead;
