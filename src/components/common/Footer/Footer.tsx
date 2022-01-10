
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { becomeADev } from "../../../services/userServices";

export default function Footer() {
    const handelBecomeDev=async()=>{
        alert("Thank you for your interest in becoming a developer. We will get back to you soon.")
        try{

           let res: any = await becomeADev();
              if(res.status===200){
                    toast.success(res.data)
                }

        }catch(err:any){
            toast.error(err.response.data)
            console.log(err)
        }
    }
	return (
		<footer className=" mt-20 block dark:bg-dark-800 dark:text-white min-h-80  w-full overflow-hidden text-left sm:text-center bg-gray-50 shadow-inner  p-2 md:p-5">
			{/* <p className="text-2xl font-serif h-12 font-semibold">Trending Anime</p> */}
			<div className=" flex flex-col md:flex-row w-80 text-xs sm:text-sm  gap-5  text-center m-auto mt-5 ">
				<Link to="/termsAndConditions">Terms and conditions</Link>
				<Link to="/privacyPolicy">Privacy Policy</Link>
				<Link to="/about">About us</Link>
				<button className="cursor-pointer" onClick={handelBecomeDev}>
					Develope with Us
				</button>
			</div>

			<div className="flex flex-col sm:px-7 m-auto gap-1   flex-wrap">
				<h1 className="text-center text-2xl dark:text-white font-montserrat">
					Z-auth
				</h1>
				<p className="m-auto  pb-4 text-sm font-serif text-center font-bold mt-5">
					Z-Auth © 2022. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
