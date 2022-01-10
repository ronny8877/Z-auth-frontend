import Joi from 'joi';
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/common/Footer/Footer';
import Loading from '../components/common/Loading';
import Navbar from '../components/common/Navbar/Navbar';
import http from '../services/http';
import { login } from '../services/userServices';


interface User {
	email: string;
	password: string;
}
// eslint-disable-next-line
export default function LoginScreen(props: any): ReactElement {
	const [user, setUser] = React.useState<User>({
		email: "",
		password: "",
	});

	const [isLoading, setLoading] = React.useState<boolean>(false);

	const handleChange = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	if (localStorage.getItem("x-auth-token")) {
		props.history.push("/");
	}

	const isDataValid = () => {
		const schema = Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required()
				.label("Email"),
			password: Joi.string().required().label("Password"),
		});
		return schema.validate(user);
	};

	const handelClick = async () => {
		//toast.success("Registering...")
		setLoading(true);

		const { error } = isDataValid();
		if (error) {
			toast.error(error.details[0].message);
			setLoading(false);
			return;
		}
		try {
			let res = await login(user);

			if (res.status === 200) {
				setLoading(false);
				toast.success("Login Successfull");
				//saving the the token in the local storage
				//retriving x-auth-toeken from the header
				console.log(res);
				http.saveToken("x-auth-token", res.headers["x-auth-token"]);
				//redirecting to profile page
				window.location.href = "/user/profile";
			}
		} catch (err: any) {
			setLoading(false);
			console.error(err.response.data);
			toast.error("" + err.response.data);
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
											onChange={handleChange}
											name="email"
											value={user?.email}
											type="email"
											placeholder="Email"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-7">
										<input
											onChange={handleChange}
											name="password"
											value={user?.password}
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
										className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
									>
										Login
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
		</div>
	);
}
