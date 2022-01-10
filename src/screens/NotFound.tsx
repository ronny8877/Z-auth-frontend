import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/notFound.svg";
import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";

export default function NotFound() {
    
	return (
		<div className="dark:bg-gray-900">
			<br />
            
			<Navbar />
			<div className="mt-20">
				<div className="container  m-auto">
					<img
						src={bg}
						alt="Error 404"
						className=" animate-pulse h-96 w-96  m-auto"
					/>
					<h1 className="text-sm italic text-gray-500 text-center">
						Sorry the page you are looking for either do not exist or have been
						moved permanently.
					</h1>
					<Link
						to="/"
						className="border dark:text-white mt-5 hover:bg-red-500 text-lg font-extralight italic duration-300 border-green-500  block pt-4 pb-4 pl-12 rounded-xl     w-36 m-auto "
					>
						Home
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}
