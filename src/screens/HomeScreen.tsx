/** @format */

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import hero from "../assets/BG.svg";
import bg from "../assets/Illustration.png";
import motion from "../assets/motion.svg";
import { QrcodeIcon } from "@heroicons/react/solid";
interface Props {}

export default function HomeScreen(props: Props): ReactElement {
	return (
		<div className="dark:bg-dark-800 min-h-screen">
			<div
				className="bg-no-repeat  bg-cover  bg-fixed"
				style={{ background: `url(${hero})` }}
			>
				<Navbar />
				<br />

				<div className="container m-auto   h-screen mt-20 grid-place-items-center ">
					<p className="text-[8rem] text-red-500 font-italianno text-center">
						Z-Auth
					</p>
					<p className="text-lg text-white text-center font-montserrat">
						One Solution to all your authentication problems
					</p>
					<Link
						to="/register"
						className="border dark:text-white mt-5 hover:bg-red-500 text-lg font-extralight italic duration-300 border-green-500  block pt-4 pb-4 text-center rounded-xl     w-36 m-auto "
					>
						Join Now
					</Link>
				</div>
			</div>
			<div className="bg-gray-100 h-screen">
				<br />
				<section
					style={{ background: `url(${motion})` }}
					className="container relative mt-5 shadow-md text-white bg-white m-auto rounded-xl h-[90vh]"
				>
					<h1 className="text-xl pt-10 text-center font-montserrat ">
						Easy Auth Solution
					</h1>
					<img
						src={bg}
						alt="Illustration"
						className="h-64 w-64 absolute top-0 right-0  m-auto"
					/>
					<h1 className="pt-10 text-center font-montserrat text-4xl ">
						Scan a Qr and Done.
					</h1>
					<QrcodeIcon className="w-96 h-96 m-auto" />
					<h1 className="text-center font-montserrat">
						Easy Once click Authentication
					</h1>
				</section>
			</div>
			<Footer />
		</div>
	);
}

