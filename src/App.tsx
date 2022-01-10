/** @format */

import React, { ContextType, Suspense } from "react";
import { Route, Switch } from "react-router";

//imported components
import Loading from "./components/common/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { UiState } from "./context/providers/UiContextProvider";
import NotFound from "./screens/NotFound";
import LoginScreen from "./screens/LoginScreen";
import Register from "./screens/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./screens/Profile";
import AppAdminPanel from "./screens/AppAdminPanel";
import Test from "./screens/Test";
//Lazy imports
const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));

function App() {
  const { uiState } = React.useContext(UiState) as ContextType<typeof UiState>;
	React.useEffect(() => {
		AOS.init();

		//eslint-disable-next-line
	}, []);
  return (
		<div className={uiState.darkMode ? "dark App" : "App"}>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				limit={2}
				pauseOnHover
				theme={uiState.isDarkMode ? "dark" : "light"}
			/>
			<Suspense fallback={Loading}>
				<Switch>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/login" component={LoginScreen} />
					<Route component={Register} exact path="/register" />
          <Route path="/user/profile" exact component={Profile} />
          <Route path="/app/dashboard" exact component={AppAdminPanel} />
          <Route path="/test/app" exact component={Test} />
					<Route component={NotFound} />
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
