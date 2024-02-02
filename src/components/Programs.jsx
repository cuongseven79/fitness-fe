import React from "react";
import Image from "../images/values.jpg";
import SectionHead from "./SectionHead";
import { GiCutDiamond } from "react-icons/gi";
import { programs } from "../data";
import Card from "./Card";


const Programs = () => {
	return (
		<section className="container ">
			<SectionHead icon={<GiCutDiamond />} title="Programs" />
			<p className="my-12">With professional support and a team of experienced coaches, we are committed to providing customers with a unique and effective workout experience. From building muscle, to increasing strength, to improving mental clarity and flexibility, we give people the opportunity to achieve their best health and lifestyle!</p>
			<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-10">
				{programs.map(({ id, icon, title, desc }) => (
					<Card key={id}>
						<span>{icon}</span>
						<h4>{title}</h4>
						<small>{desc}</small>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Programs;