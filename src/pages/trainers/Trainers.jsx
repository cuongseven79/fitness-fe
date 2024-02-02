import React, { useEffect } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_5.jpg";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { trainers } from "../../data";
import Trainer from "../../components/Trainer";
import "./trainers.css";

const Trainers = () => {
	useEffect(() => {
		document.title = `Trainers`;
	}, []);
	return (
		<>
			<Header image={HeaderImage} title="Our Trainers">
				Adipisicing labore laboris ea sunt cillum ea velit.Adipisicing labore la
				boris ea sunt cillum ea velit. sunt cillum ea velit.
			</Header>
			<section className="trainers">
				<div className="container trainers__container">
					{trainers.map(({ id, image, name, job, socials }) => {
						return (
							<Trainer
								key={id}
								image={image}
								name={name}
								job={job}
								socials={[
									{ icon: <BsInstagram />, link: socials[0] },
									{ icon: <AiOutlineTwitter />, link: socials[1] },
									{ icon: <FaFacebookF />, link: socials[2] },
									{ icon: <FaLinkedinIn />, link: socials[3] },
								]}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default Trainers;
