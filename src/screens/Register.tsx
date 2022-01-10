import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import Joi from "joi"
import { toast } from "react-toastify";
import { register } from "../services/userServices";
import Loading from "../components/common/Loading";

interface User{
    display_name: string;
    email: string;
    gender: string;
    dob:string,
    repeat_password: string,
    password: string;
    phone:string,

}
export default function Register(): ReactElement {
    const [user,setUser]=React.useState<User>({
        display_name:"",
        email:"",
        gender:"",
        dob: Date.now().toLocaleString(),
        repeat_password:"",
        password:"",
        phone:""

    })
const [isLoading ,setLoading]= useState<boolean>(false)

    const handleChange=(e:any)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
  
  const isDataValid=()=>{

    const schema = Joi.object({
			display_name: Joi.string().required().label("Name"),
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required()
				.label("Email"),
			password: Joi.string().required().label("Password"),
			repeat_password: Joi.ref("password"),
			gender: Joi.string().valid("male", "female", "others").required(),
			phone: Joi.string().min(10).required().label("Phone"),
            //user must be atleast 18 years old
            dob:Joi.date().required().label("Year")
		});
    return schema.validate(user)
   
  }

    const handelClick = async () => {
        //toast.success("Registering...")
        setLoading(true)
		
			const { error } = isDataValid();
			if (error) {
				toast.error(error.details[0].message);
				setLoading(false)
                return;
			}
            try{ 

                let res=  await register(user)
                
                if(res.status===201){  
                    setLoading(false);
                    toast.success("Registered Successfully")
                    window.location.href="/login"
                }
            }
               catch(err:any){
                   setLoading(false);
                   console.error(err.response.data)
                   toast.error(""+err.response.data)
                
            }
		    };


	return (
		<div className="dark:bg-dark-100 overflow-hidden min-h-screen">
			{isLoading ? <Loading /> : null}
			<Navbar />
			<div className="mt-20 sm:mt-0">
				<div className="font-sans">
					<div className="relative min-h-screen flex flex-col sm:justify-center items-center   ">
						<div className="relative sm:max-w-sm w-full">
							<div className="card bg-blue-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
							<div className="card bg-red-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
							<div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-50 shadow-md">
								<label className="block mt-3 text-2xl  text-gray-800 text-center font-extralight ">
									Sign up
								</label>
								<form method="#" action="#" className="mt-10">
									<div>
										<input
											onChange={handleChange}
											value={user?.display_name}
											name="display_name"
											type="text"
											placeholder="Name"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-5">
										<input
											onChange={handleChange}
											value={user?.email}
											name="email"
											type="email"
											placeholder="Email"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-5">
										<input
											onChange={handleChange}
											value={user?.phone}
											name="phone"
											type="tel"
											placeholder="Phone"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>
									<div className="mt-5">
										<input
											onChange={handleChange}
											value={user?.password}
											name="password"
											type="password"
											placeholder="Password"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-5">
										<input
											onChange={handleChange}
											value={user?.repeat_password}
											name="repeat_password"
											type="password"
											placeholder="Confirm Password"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
										/>
									</div>

									<div className="mt-5">
										<fieldset className="flex gap-5 justify-center flex-wrap">
											<legend className="text-xl font-extralight text-gray-800 text-center">
												Gender
											</legend>
											<div>
												<label>Male</label>

												<input
													type="radio"
													name="gender"
													value="male"
													onChange={handleChange}
													placeholder="Confirm Password"
													className="mt-1 block w-full border-none bg-gray-100  rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
												/>
											</div>
											<div>
												<label>female</label>

												<input
													onChange={handleChange}
													value="female"
													type="radio"
													name="gender"
													placeholder="Confirm Password"
													className="mt-1 block w-full border-none bg-gray-100  rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
												/>
											</div>
											<div>
												<label>Others</label>

												<input
													onChange={handleChange}
													value="others"
													type="radio"
													name="gender"
													placeholder="Confirm Password"
													className="mt-1 block w-full border-none bg-gray-100  rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
												/>
											</div>
										</fieldset>
									</div>

									<div className="mt-5">
										<p className="mt-1 text-center p-2 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
											Date of Birth:
										</p>
										<input
											onChange={handleChange}
											value={user?.dob}
											name="dob"
											type="date"
											className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
											placeholder="Dob"
										/>
									</div>

									{/* <div className="flex mt-7 justify-center w-full">
										
                 <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Create an account
                  </button> 
{/* <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Google
                    </button> 
									</div> */}
								</form>
								<div className="mt-7">
									<button
										onClick={handelClick}
										className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
									>
										Sign up
									</button>
								</div>

								<div className="mt-7">
									<div className="flex justify-center items-center">
										<label className="mr-2">Already Have an account?</label>
										<Link
											to="/login"
											className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
										>
											Login
										</Link>
									</div>
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
