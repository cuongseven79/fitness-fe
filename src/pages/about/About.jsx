import React, { useEffect } from "react";
import "./about.css";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_1.jpg";
import StoryImage from "../../images/about1.jpg";
import VisionImage from "../../images/about2.jpg";
import MissionImage from "../../images/about3.jpg";

const About = () => {
	useEffect(() => {
		document.title = `About`;
	}, []);
	return (
		<>
			<Header title="About us" image={HeaderImage}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores
				doloribus, eligendi incidunt modi rerum debitis consequatur molestias?
			</Header>
			<section className="about__story">
				<div className="container about__story-container">
					<div className="about__section-image">
						<img src={StoryImage} alt="OurStoryImage" />
					</div>
					<div className="about__section-content">
						<h1>Our Story</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
							fugit ad neque quo, quas eius quam at sunt quod in atque nulla
							minus nam impedit tempore consectetur esse quibusdam voluptatum
							optio nemo! Aperiam veritatis delectus commodi. Minima tempora
							voluptates natus.
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Laboriosam harum corrupti quas voluptate, perferendis consectetur
							veritatis veniam, ratione, distinctio iste dignissimos alias ipsum
							minima consequuntur?
						</p>
						<p>
							Perferendis consectetur veritatis veniam, ratione, distinctio iste
							dignissimos alias ipsum minima consequuntur?
						</p>
					</div>
				</div>
			</section>

			<section className="about__vision">
				<div className="container about__vision-container">
					<div className="about__section-content">
						<h1>Our Vision</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
							fugit ad neque quo, quas eius quam at sunt quod in atque nulla
							minus nam impedit tempore consectetur esse quibusdam voluptatum.
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Laboriosam harum corrupti quas voluptate, perferendis consectetur
							veritatis veniam?
						</p>
					</div>
					<div className="about__section-image">
						<img src={VisionImage} alt="VisionImage" />
					</div>
				</div>
			</section>

			<section className="about__mission">
				<div className="container about__mission-container">
					<div className="about__section-image">
						<img src={MissionImage} alt="VisionImage" />
					</div>
					<div className="about__section-content">
						<h1>Our Mission</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
							fugit ad neque quo, quas eius quam at sunt quod in atque nulla
							minus nam impedit tempore consectetur esse quibusdam voluptatum.
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Laboriosam harum corrupti quas voluptate, perferendis consectetur
							veritatis veniam?
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;
