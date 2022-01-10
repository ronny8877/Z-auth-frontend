import { Redirect, Route } from "react-router-dom";
import { getItem } from "../../helpers/storageHelpers";

export default function PrivateRoute(props: any) {
	const authLogin = getItem("x-auth-token");
	return authLogin ? (
		<Route {...props} />
	) : (
		<Redirect to={{ pathname: "/login" }} />
	);
}
