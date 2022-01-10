import { XIcon } from "@heroicons/react/solid";

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/common/Footer/Footer";
import Loading from "../components/common/Loading";
import Navbar from "../components/common/Navbar/Navbar";
import { checkRequestStatus, getQrCode} from "../services/userServices";

interface Props {}


// eslint-disable-next-line
export default function Test({}: Props): ReactElement {
	// eslint-disable-next-line
	const [isLoading, setLoading] = React.useState<boolean>(false);

	const [isQrVisible, setQrVisible] = React.useState<boolean>(false);
	const [qrCode, setQrCode] = React.useState<string>("");

	const handelClick = async () => {
		//toast.success("Registering...")
		//setLoading(true);
		setQrVisible(true);

		try {
			let res: any = await getQrCode("8fb59469-8269-4d82-b48b-d4cc1c3a0a5c");
			//setting the data in QrCode
			setQrCode(res.data);
		} catch (e: any) {
			console.log(e);
			toast.error(e.response.data);
		}
	};

	return (
		<div className="dark:bg-dark-100 overflow-hidden min-h-screen">
			{isLoading ? <Loading /> : null}
			<Navbar />
			<br />
			<div className=" mt-20 md:mt-0 top-0">
				<div className="font-sans">
					<div className="relative min-h-screen flex flex-col sm:justify-center items-center  ">
						<div className="relative sm:max-w-sm w-full">
							<div className="card bg-blue-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
							<div className="card bg-red-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
							<div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-50 shadow-md">
								<label className="block mt-3 text-2xl  text-gray-800 text-center font-extralight ">
									Login
								</label>
								<form method="#" action="#" className="mt-10">
									<div>
										<input
											disabled
											name="email"
											type="email"
											placeholder="Email"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-7">
										<input
											name="password"
											disabled
											type="password"
											placeholder="Password"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-7 flex">
										<label className="inline-flex items-center w-full cursor-pointer">
											<input
												id="remember_me"
												type="checkbox"
												className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
												name="remember"
											/>
											<span className="ml-2 text-sm text-gray-600">
												Remember me
											</span>
										</label>

										<div className="w-full text-right">
											<Link
												className="underline text-sm text-gray-600 hover:text-gray-900"
												to="/auth/forget"
											>
												Forgot password?
											</Link>
										</div>
									</div>

									<div className="flex mt-7 justify-center w-full">
										{/* <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Create an account
                  </button> */}

										{/* <button
                      disabled={true}
                      className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      Google
                    </button> */}
									</div>
									<div className="mt-7"></div>
								</form>
								<div className="mt-7">
									<button
										onClick={handelClick}
										className="bg-dark-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
									>
										Login with Z-auth
									</button>
								</div>
								<div className="flex justify-center items-center">
									<label className="mr-2">Don't have an account?</label>
									<Link
										to="/auth/register"
										className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
									>
										Create one
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
			{isQrVisible ? (
				<RenderQrCode qrCode={qrCode} handleClose={() => setQrVisible(false)} />
			) : null}
		</div>
	);
}

function RenderQrCode(props:any) {

//chekcing the request status every 5 seconds
    
const resolver=async()=>{
  let res:any = await checkRequestStatus("8fb59469-8269-4d82-b48b-d4cc1c3a0a5c");
  if(res.status===200){
toast.success("Login Successful");
localStorage.setItem("token",JSON.stringify(res.data.token));
console.log(res.data);  
}
}

    React.useEffect(() => {
        const timer = setTimeout(() => {
            resolver();
         
        }, 5000);
        return () => clearTimeout(timer);
    }, []);



    return (
			<div className="fixed grid place-items-center  top-0 w-full h-screen overflow-hidden filter backdrop-filter  backdrop-blur-sm backdrop-brightness-75">
				<div className="h-96 w-96">
			<img src={props.qrCode.qr} alt="qrCode" className="w w-full h-full object-cover"/>
            		<div>
						<button
							onClick={ props.handleClose}
							className="bg-blue-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-blue-700 text-white font-bold rounded-full"
						>
							<XIcon className="h-5 w-5" />
							<span className="font-montserrat">Close</span>
						</button>
					</div>
				</div>
			</div>
		);
}