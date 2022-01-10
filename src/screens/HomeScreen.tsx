/** @format */

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";

interface Props {}

export default function HomeScreen(props: Props): ReactElement {
  return (
		<div className="dark:bg-dark-800 min-h-screen">
			<Navbar />
			<br />
			<div className="container m-auto   h-screen mt-20 grid-place-items-center ">
				<p className="text-5xl dark:text-white font-italianno text-center">
					Z-Auth
				</p>
				<p className="text-lg dark:text-white text-center font-montserrat">
					One Solution to all your authentication problems
				</p>
				<Link
					to="/register"
					className="border dark:text-white mt-5 hover:bg-red-500 text-lg font-extralight italic duration-300 border-green-500  block pt-4 pb-4 text-center rounded-xl     w-36 m-auto "
				>
					Join Now
				</Link>
			</div>
			<Footer />
		</div>
	);
}
