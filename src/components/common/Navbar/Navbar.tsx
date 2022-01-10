import React, { ReactElement } from 'react'
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { UiState } from "../../../context/providers/UiContextProvider";
import { Link } from "react-router-dom";

import { Switch } from "@headlessui/react";
import { SET_DARK_MODE } from "../../../context/actions";

export default function Navbar(): ReactElement {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const handelClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="fixed  top-0  h-16 md:h-20      dark:text-white   z-50  w-full    ">
			<div className="absolute cursor-pointer m-2 md:m-5 top-0 dark:text-white text-black z-50 text-3xl font-italianno ">
				<Link to="/">Z-Auth</Link>
			</div>

			<div className="absolute right-3   md:right-10 top-0 z-50 text-black ">
				{!isOpen ? (
					<MenuIcon
						onClick={handelClick}
						className="dark:text-white h-10 m-2 md:m-5 w-10"
					/>
				) : (
					<XIcon
						onClick={handelClick}
						className="h-10 dark:text-white w-10 m-2 md:m-5"
					/>
				)}
			</div>

			<Transition
				show={isOpen}
				enterFrom="transform -translate-y-full duration-300"
				enterTo="transform translate-y-0 duration-300 "
				leave="transition ease-in duration-300"
				leaveFrom="transform translate-y-0"
				leaveTo="transform -translate-y-full duration-300"
			>
				<RenderSideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
			</Transition>
		</div>
	);
}

function RenderSideMenu({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: Function;
}) {
	const { uiState, dispatch } = React.useContext(UiState);

	return (
		<div className="relative transition-opacity dark:bg-dark-800  bg-gray-50  w-full h-screen overflow-hidden ">
			<div className="w-full h-auto  p-5 z-50 ">
				<div className="flex mt-14 px-5   md:px-10 w-full m-auto gap-10 text-left  font-bold flex-wrap flex-col font-montserrat">
					<Link to="/" data-aos="fade-right" data-aos-delay="300">
						<RenderTags>Home</RenderTags>
					</Link>
					<Link to="/user/profile" data-aos="fade-left" data-aos-delay="300">
						<RenderTags>Profile</RenderTags>
					</Link>
					<Link to="/test/app" data-aos="fade-right" data-aos-delay="300">
						<RenderTags>Test App</RenderTags>
					</Link>
					<Link to="/login" data-aos="fade-left" data-aos-delay="300">
						<RenderTags>Login</RenderTags>
					</Link>
					<Link to="/login" data-aos="fade-left" data-aos-delay="300">
						<Switch
							checked={uiState.darkMode}
							onChange={() => dispatch({ type: SET_DARK_MODE })}
							className={`${uiState.darkMode ? "bg-gray-800" : "bg-gray-200"}  
            relative flex flex-shrink-0 mt-1 h-[20px] w-[60px]  border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Dark Mode</span>
							<span
								aria-hidden="true"
								className={`${
									uiState.darkMode ? "translate-x-8" : "translate-x-0"
								}
              pointer-events-none block   -mt-1 h-[25px] w-[25px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
							>
								{!uiState.darkMode ? (
									<img
										src="https://img.icons8.com/carbon-copy/100/000000/sun--v1.png "
										alt="light"
									/>
								) : (
									<img
										src="https://img.icons8.com/carbon-copy/100/000000/crescent-moon.png"
										alt="dark"
									/>
								)}
							</span>
						</Switch>
					</Link>
					<div className="grid place-items-center w-full">
						<div className="w-20 m-auto">{/* <DarkModeSwitch /> */}</div>
					</div>
				</div>
			</div>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="overflow-hidden  cursor-pointer   w-full h-full   "
			></div>
		</div>
	);
}

function RenderTags({ children }: any) {
  return (
    <div className=" group text-black dark:text-white relative w-full m-auto  duration-300  group text-4xl rounded-xl cursor-pointer md:text-5xl  ">
      <div className="group-hover:text-white p-5 hover:underline z-30 w-full  ">
        {children}
      </div>
      <div className="absolute overflow-hidden group-hover:rounded-xl group-hover:font-bold rounded-2xl duration-500   group-hover:bg-yellow-200 w-1 md:group-hover:w-full group-hover:w-80 dark:bg-yellow-200 dark:group-hover:bg-red-500 bg-red-500 h-24  top-0 z-20">
        <div className="group-hover:text-white p-5 hover:underline  w-80 md:w-96 z-30 ">
          {children}
        </div>
      </div>
    </div>
  );
}