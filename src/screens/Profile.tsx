
import React, { ReactElement } from 'react'
import { toast } from 'react-toastify';
import Navbar from '../components/common/Navbar/Navbar';
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/big-smile";
import { getUser, getUserApps, handelSignInWith } from '../services/userServices';
import parse from "html-react-parser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import QrReader from "react-qr-reader";
import { CameraIcon, XIcon } from '@heroicons/react/solid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Footer from '../components/common/Footer/Footer';
import { Link } from 'react-router-dom';


export default function Profile(): ReactElement {


 dayjs.extend(relativeTime);
function createAvatarImage(seed: string) {
    return createAvatar(style, {
      seed: seed,
      flip: true,
      mouth: ["kawaii", "openedSmile", "braces", "teethSmile"],
      eyes: ["cheery", "starstruck", "winking", "normal", "sleepy"],
    });
  }

const [isCameraOpen,setIsCameraOpen] = React.useState<boolean>(false)
  const [user ,setUser] =React.useState<any>({
        display_name:"",
        email:"",
        phone:""
,  })

  const [appList ,setAppList] = React.useState<any>([{
	  app_name:"",
	  alias:"",
	  signed_in_at:""
  }])

const [displayPicture ,setDisplayPicture] = React.useState<any>("")
  React.useEffect(()=>{
		//getting token
		resolver();
		// eslint-disable-next-line
	},[])

const resolver = async () => {
   try{
			let res = await getUser();
			let ap:any= await getUserApps();

		
	

			setAppList(ap.data)
			if (!res) {
				return toast.error("Error");
			}
			if (!res.data.display_picture){
				setUser(res.data)
                return setDisplayPicture(createAvatarImage(res.data.display_name))
            
            }
			if(!ap) toast.error("Something went wrong while fetching your apps")
			setUser(res.data);
			console.log(ap.data)
		}
    catch(err:any){
    toast.error(err.response.data)
        console.log(err)
    }

}



const handelRequest=async(id:string)=>{
    try{
        let res:any = await handelSignInWith(id)
        if(res.status===200){
            toast.success("Session Accepted")
        }
    }
    catch(err:any){
        toast.error(err.response.data)
        console.log(err)
    }
}


 const handleScan = (data:any) => {
		if (data) {
		setIsCameraOpen(false)
        toast.success("QR Code Scanned")
      
    
        // name:name, id:id
        //getting the name of the app
        let name = data.split(",")[0].split(":")[1].split("-")[0]
        let id = data.split(",")[1].split(":")[1]
 confirmAlert({
		title: "Allow Access?",
		message: "You are about to allow access to "+name+"" ,
		buttons: [
			{
				label: "Yes",
				onClick:async () => await handelRequest(id),
			},
			{
				label: "No",
				onClick: () => toast.info("Access Denied"),
			},
		],
 });


		}
 };
const handleError = (err:any) => {
	alert(err);
 };

  return (
		<div className="dark:bg-dark-800 min-h-screen">
			<Navbar />
			<br />
			<header className=" mt-9 dark:bg-gray-900  text-black bg-white shadow">
				<div className="max-w-7xl  mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold dark:text-white text-gray-900">
						Dashboard.
					</h1>
				</div>
			</header>
			<div className="container grid mt-20 h-[80vh] m-auto place-items-center">
				<div className="w-96 dark:text-white bg-white p-5 min-h-96 shadow-lg hover:shadow-xl duration-500  dark:bg-gray-800 rounded-xl">
					<div className="shadow-md duration-500 hover:shadow-xl">
						{displayPicture === "" ? (
							<img
								src={user.display_picture}
								alt="profile"
								className="h-36 w-36 m-auto"
							/>
						) : (
							<div className="h-36 w-36 m-auto">{parse(displayPicture)}</div>
						)}
					</div>
					<div className="text-white font-montserrat text-2xl text-center mt-5">
						{user.display_name}
					</div>
					<div className="text-white font-montserrat  text-center mt-5">
						{user.email}
					</div>
					<div className="text-white font-montserrat  text-center mt-5">
						{user.phone}
					</div>

					<div className="text-white font-montserrat  text-center mt-5">
						With us since {dayjs(user.created_at).fromNow()}
					</div>
					<div className="flex flex-wrap gap-5">
						<button
							onClick={() => setIsCameraOpen(!isCameraOpen)}
							className="bg-blue-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-blue-700 text-white font-bold rounded-full"
						>
							<CameraIcon className="h-5 w-5" />
							<span className="font-montserrat">Scan</span>
						</button>
						{user.type==="developer" ?<Link to="/app/dashboard"
							className="bg-blue-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-blue-700 text-white font-bold rounded-full"
						>
						
							<span className="font-montserrat">Dashboard</span>
						</Link>:null}
						{/*
						 */}
					</div>
				</div>
				<hr/>
				<div className="mt-5">
					<div className="text-center dark:text-white font-montserrat text-2xl text-gray-900">
						Your Applications

<br/>
{!appList.length?<div className="text-center text-gray-500">You have no applications</div>:
appList.map((app:any)=>{
	return(
		<RenderUserApps key={app.app_name} app={app}/>
		)
})}
						</div>


				</div>
			</div>
			<Footer />
			{isCameraOpen ? (
				<QrScannerDisplay
					handleError={handleError}
					setIsCameraOpen={setIsCameraOpen}
					handleScan={handleScan}
				/>
			) : null}
		</div>
	);
};


function QrScannerDisplay(props:any ): ReactElement {
    return (
			<div className="fixed grid place-items-center  top-0 w-full h-screen overflow-hidden filter backdrop-filter  backdrop-blur-sm backdrop-brightness-75">
		
            	<div className="h-96 w-96">

                <QrReader
					delay={300}
					onError={props.handleError}
					onScan={props.handleScan}
					style={{ width: "100%" }}
                    />
                    <div>
                        <button onClick={()=>props.setIsCameraOpen(false)} className="bg-blue-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-blue-700 text-white font-bold rounded-full">
                            
                            <XIcon className="h-5 w-5" />
                            <span className="font-montserrat">Close</span>
                        </button>
                    </div>
                    </div>
			</div>
		);
}

function RenderUserApps(props:any): ReactElement {
return (
	<div className="p-5 mt-5  rounded-xl w-full h-36 dark:bg-dark-500">
		<div className="shadow p-5 rounded-xl">{props.app.alias}</div>
		<div className="shadow p-5 text-sm rounded-xl">
			Connected with {dayjs(props.app.signed_in_at).fromNow()}
		</div>
	</div>
);}