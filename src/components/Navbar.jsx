import React, { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../images/logo.jpg";
import { links } from "../data";
import { FaBars } from 'react-icons/fa';
import { MdOutlineClose } from "react-icons/md";
import "./navbar.css";
import DropdownCustom from "./DropdownCustom";

const NavItem = ({ name, path, handleNavToggle }) => (
	<li>
		<NavLink
			to={path}
			className={({ isActive }) => (isActive ? "active-nav" : "")}
			onClick={handleNavToggle}
		>
			{name}
		</NavLink>
	</li>
);

const Navbar = () => {
	const [isNavShowing, setIsNavShowing] = useState(false);
	const userSession = JSON.parse(sessionStorage.getItem('user'));
	const getDropDownItems = () => {
		const restItems = [
			{
				title: "My profile",
				path: `/profile/${userSession?.userId}`,
			},
		];
		if (userSession?.role === 'customer') {
			return [
				...restItems,
				{
					title: "Manage Coaches",
					path: "/manage-coaches",
				},
			];
		}
		if (userSession?.role === 'pt') {
			return [
				...restItems,
				{
					title: "Manage Customers",
					path: "/manage-customers",
				},
			];
		}

		if (userSession?.role === 'admin') {
			return [
				...restItems,
				{
					title: "Manage Users",
					path: "/manage-users",
				},
				{
					title: "Manage Orders",
					path: "/manage-orders",
				},
			];
		}

		return restItems;
	}
	const DropdownItems = getDropDownItems();

	const handleNavToggle = useCallback(() => {
		setIsNavShowing(prevValue => !prevValue);
	}, []);
	function handleSelected(item) {
		console.log(item)
	}
	return (
		<nav>
			<div className="container nav__container">
				<Link to="/" className="w-20" onClick={handleNavToggle}>
					<img src={Logo} alt="Nav-logo" className="rounded-md" />
				</Link>
				<ul className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}>
					{links.map(({ name, path, id }) => (
						<NavItem key={id} name={name} path={path} handleNavToggle={handleNavToggle} />
					))}
				</ul>
				<div>
					{userSession
						? <DropdownCustom title={userSession.displayName} items={DropdownItems} onSelected={handleSelected} >
							<Link to={'/'} onClick={() => sessionStorage.clear()} reloadDocument
								className="text-white">Sign Out</Link>
						</DropdownCustom>
						:
						<div className="w-full text-center">
							<Link to={'/login'} className="w-20 bg-slate-200 rounded-lg p-2 mr-4 text-black">Login</Link>
							<Link to={'/signup'} className="w-20 bg-slate-200 rounded-lg p-2 mr-4 text-black">Sign Up</Link>
						</div>
					}
				</div>
				<button onClick={handleNavToggle} className="nav__toggle-btn">
					{isNavShowing ? <MdOutlineClose /> : <FaBars />}
				</button>
			</div>
		</nav >
	);
};

export default Navbar;