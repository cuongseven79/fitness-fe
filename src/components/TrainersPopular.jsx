import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import SectionHead from "./SectionHead";
import Card from "./Card";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import ModalCustom from '../components/ModalCustom';
import { getDataDashboard, getTrainersPopular } from "../api/homeService";
import loadingGIF from "../images/loading.gif";

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
		<ModalCustom title="Trainer Information" open={open} setOpen={setOpen} >
			<div className="py-4 flex justify-between">
				<ul className="space-y-7">
					<TrainerInfoItem label="Display Name: " value={displayName} />
					<TrainerInfoItem label="Gender: " value={gender} />
					<TrainerInfoItem label="Age" value={age} />
					<TrainerInfoItem label="Year Of Experiences: " value={yearsOfExp} />
					<TrainerInfoItem label="Address" value={address} />
					<TrainerInfoItem label="Price: " value={`$ ${price}/month`} />
				</ul>
				<img src={photoURL} className='w-40 h-40 rounded-full' alt="Trainer" />
			</div>
			<div className={`${!certURL && "hidden"}`}>
				<h2 className="py-5 font-medium text-gray-900 dark:text-white">Certificate</h2>
				<div className="overflow-auto flex gap-5">
					{certURL?.map((cert, index) => <img key={index} src={cert} className='w-40' alt={`Certificate ${index + 1}`} />)}
				</div>
			</div>
		</ModalCustom>
	)
}

const TrainersPopular = () => {
	const [open, setOpen] = useState(false)
	const [trainers, setTrainers] = useState([])
	const [trainerInfor, setTrainerInfor] = useState(null)

	function handleClickOnTrainer(trainer) {
		setOpen(true);
		setTrainerInfor(trainer)
	}

	async function fetchTrainer() {
		const { statusCode, trainers } = await getDataDashboard("/best-trainers");
		if (statusCode === 200) {
			setTrainers(trainers)
		}
	}
	useEffect(() => {
		fetchTrainer();
	}, [])

	if (!trainers.length) {
		return <div className="flex justify-center ">
			<img className="w-24" src={loadingGIF} alt="Loading" />
		</div>
	}
	return (
		<section className="trainers">
			<div className="container">
				<SectionHead icon={<FaCrown />} title="Team Of Expert Coaches" />
				<div className="trainers">
					<div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-16">
						{trainers.map((trainer, index) => {
							return (
								<Card className="" key={index}>
									<div onClick={() => handleClickOnTrainer(trainer)} className="relative group mb-5 transition-all duration-200 hover:saturate-100 cursor-pointer">
										<div className="w-full h-60 bg-contain">
											<img src={trainer.photoURL} className=" w-full h-full" style={{ objectPosition: "10px -20px" }} alt="trainer one" />
										</div>
										<div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full "></div>
										<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 ">
											<h1 className="text-lg">View information</h1>
										</div>
									</div>
									<h3 className="text-[20px] text-[#EAB308] font-semibold">{trainer.displayName}</h3>
									<p>{trainer.field}</p>
									<div className="my-3 flex justify-center items-center text-[18px] space-x-12">
										<h1 className="">{`$ ${trainer.price}`}</h1>
										<select name="" id="" className="text-black rounded-md px-5 py-2 font-sans">
											<option value="">1 month</option>
											<option value="">2 month</option>
											<option value="">3 month</option>
										</select>
									</div>
									<div className="flex justify-center mb-5">
										{Array(Math.round(trainer.rating)).fill(<AiFillStar color="yellow" />)}
									</div>
									<Link to={"plans"} className="btn md">Booking</Link>
								</Card>
							);
						})}
					</div>
				</div>
			</div>
			<TrainerModal open={open} setOpen={setOpen} trainer={trainerInfor} />
		</section>
	);
};

export default TrainersPopular;