import React, { ReactElement } from 'react'
import { toast} from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Footer from "../components/common/Footer/Footer";
import Navbar from '../components/common/Navbar/Navbar';
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import { createNewApp, getAppList, getAppUser } from '../services/userServices';
import parse from "html-react-parser";
import Loading from '../components/common/Loading';
import { EyeOffIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function AppAdminPanel(): ReactElement {
dayjs.extend(relativeTime);
    function createAvatarImage(seed: string) {
	return createAvatar(style, {
		seed: seed,
		flip: true,
		colorful: true,
	});
}
   const [appList ,setAppList]= React.useState<any>([])
   const [isLoading ,setIsLoading] = React.useState<boolean>(false)
   // const [app,setApp] = React.useState<any>()
    const [isAppInputOpen ,setIsAppInputOpen] = React.useState<boolean>(false)

	const [appUsers,setAppUsers]= React.useState<any>([])
	const [isAppUsersVisible ,setIsAppUsersVisible] = React.useState<boolean>(false)


const resolver = async () => {
    try{
        setIsLoading(true)
        let res = await getAppList();
        if (!res) {
            return toast.error("Error");
        }
        setAppList(res.data)
        setIsLoading(false)
    }
    catch(err:any){
        toast.error(err.response.data)
        setIsLoading(false)
        console.log(err)
    }
}

const getAppUsers = async(id:string)=>{
try{
	let res = await getAppUser(id);
	if (!res) {
		return toast.error("Error");
	}
	setAppUsers(res.data)
	setIsAppUsersVisible(true)
}
catch(err:any){
	toast.error(err.response.data)
	console.log(err)
	setAppUsers([]);
	setIsAppUsersVisible(false);

}

}


React.useEffect(()=>{
    //getting token
    resolver()

    },[])

    return (
			<div className="dark:bg-dark-800">
				{isLoading ? <Loading /> : null}
				<br />
				<Navbar />
				<header className=" mt-9 dark:bg-gray-900  text-black bg-white shadow">
					<div className="max-w-7xl  mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold dark:text-white text-gray-900">
							Manage Apps <button onClick={()=>setIsAppInputOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                <PlusIcon className="w-6 h-6" />
                            </button>
						</h1>
					</div>
				</header>
				<div className="container flex flex-wrap gap-5 m-auto min-h-screen">
					{appList.map((app: any) => (
						<RenderCard
						getAppUsers={getAppUsers}
							key={app.secrete_key}
							data={app}
							createAvatarImage={createAvatarImage}
						/>
					))}
				</div>

		{ isAppUsersVisible? !appUsers.length ? <div className="font-montserrat text-2xl text-center">No Users  </div>  :   <RenderUserTable   users={appUsers} />:null}
				<Footer />
				<div className="w-full shadow-md p-5">

{isAppInputOpen?<RenderAppInput  setIsAppInputOpen={setIsAppInputOpen} setIsLoading={setIsLoading} />:null}
				</div>
			</div>
		);
}


function RenderCard(props:any){
    const [showKey ,setShowKey] = React.useState<boolean>(false)
    console.log(props.data)
    return (
			<div className="w-96 mt-20 dark:text-white bg-white p-5 h-96 shadow-lg hover:shadow-xl duration-500  dark:bg-gray-800 rounded-xl">
				<div className="shadow-md duration-500 hover:shadow-xl">
					<div className="h-36 w-36 m-auto">
						{parse(props.createAvatarImage(props.data.app_name))}
					</div>
				</div>
				<div className="text-white font-montserrat  text-center mt-5">
					{ props.data.app_name}
				</div>
				<div className="text-white font-montserrat text-2xl text-center mt-5">
					{props.data.alias}
				</div>

				<div className="text-white font-montserrat  text-center mt-5">
					Created {dayjs(props.data.created_at).fromNow()}
				</div>
                <div className="text-white font-montserrat  text-center mt-5">
                  {
                        !showKey?
                        <div className="text-white w-36 m-auto font-montserrat text-center flex flex-wrap">

Secrete Key
                      <EyeOffIcon className="cursor-pointer h-6 w-6" onClick={()=>setShowKey(!showKey)}/>
                        </div>:
                   <span>

                    {props.data.secrete_key}
                   </span> 
                  }
                </div>

				<div className="flex flex-wrap gap-5">
					<button
					onClick={()=>props.getAppUsers(props.data._id)}
						
						className="bg-blue-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-blue-700 text-white font-bold rounded-full"
					>
					
						<span className="font-montserrat">View Users</span>
					</button>
                    </div>
                    {/* 			
					{user.type === "developer" ? (
						<Link
							to="/app/dashboard"
							className="bg-blue-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-blue-700 text-white font-bold rounded-full"
						>
							<span className="font-montserrat">Dashboard</span>
						</Link>
					) : null}
					{/*
					 
				</div> */}
			</div>
		);
}


function RenderAppInput(props:any){
    const [newApp ,setNewApp] = React.useState<any>({
        app_name:"",
        alias:"",
    });
    const handelChange = (e:any) => {
        setNewApp({
            ...newApp,
            [e.target.name]:e.target.value
        })
    }

const confirmNewApp = async () => {
     confirmAlert({
				title: "Create New App?",
				message: "You are about to Create a new App " + newApp.app_name + "",
				buttons: [
					{
						label: "Yes",
						onClick: async () => await handelSubmit(),
					},
					{
						label: "No",
						onClick: () => toast("App Creation Canceled"),
					},
				],
			});
}

    const handelSubmit = async () => {
        if( newApp.app_name==="" || newApp.alias==="")return toast.error("Please fill all the fields")
        try{
            props.setIsLoading(true)
            let res = await createNewApp(newApp)
            if (!res) {
                return toast.error("Error");
            }
            props.setIsLoading(false)
            props.setIsAppInputOpen(false)
            toast.success("App Created")
            props.setIsLoading(false)
        }
        catch(err:any){
            toast.error(err.response.data)
            props.setIsLoading(false)
        }
    }
      return (
				<div className="fixed grid place-items-center  top-0 w-full h-screen overflow-hidden filter backdrop-filter  backdrop-blur-sm backdrop-brightness-75">
					<div className="w-96 mt-20 dark:text-white bg-white p-5 h-auto shadow-lg hover:shadow-xl duration-500  dark:bg-gray-800 rounded-xl">
						<div>
							<input
								onChange={handelChange}
								value={newApp.app_name}
								name="app_name"
								type="text"
								placeholder="App Name"
								className="mt-1 pl-2 block w-full border-none dark:bg-dark-500 bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
							/>
						</div>
						<div className="mt-5">
							<input
								onChange={handelChange}
								value={newApp.alias}
								name="alias"
								type="text"
								placeholder="Alias ie. My App"
								className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 dark:bg-dark-500"
							/>
						</div>
						<button
							onClick={confirmNewApp}
							className="bg-green-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-green-700 text-white font-bold rounded-full"
						>
							<span className="font-montserrat">Create App</span>
						</button>
						<div>
							<button
								onClick={() => props.setIsAppInputOpen(false)}
								className="bg-red-500 px-5 w-36 flex flex-wrap py-3 text-center mt-3 m-auto hover:bg-red-700 text-white font-bold rounded-full"
							>
								<XIcon className="h-5 w-5" />
								<span className="font-montserrat">Close</span>
							</button>
						</div>
					</div>
				</div>
			);
}


function RenderUserTable(props:any){
return(
<div className="mt-20">
	<hr/>
	<table className="table table-hover m-auto dark:bg-dark-800 p-5 text-lg dark:text-white font-montserrat mt-5 table-dark">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Email</th>
				
				<th scope="col">Gender</th>
				</tr></thead>


				<tbody>
					{props.users.map((user:any,index:number)=>{
						return(

							<tr key={index}>
								<th scope="row">{index+1}</th>
								<td>{user.name}</td>
								<td className="p-5">{user.email}</td>
								
								<td>
								{user.gender}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	);
}

