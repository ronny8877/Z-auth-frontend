import React from "react";
import { getItem } from "../../helpers/storageHelpers";
import { uiReducer } from "../reducers/uiReducer";



let uiState: any;
let dispatch: Function = () => {};
export const UiState = React.createContext({ uiState, dispatch });

// Language: typescript
// Path: src\context\providers\UiContextProvider.tsx

export default function UiContextProvider(props: any): React.ReactElement {
	let initialState = {
		avatarSeed: getItem("AvSeed") || "",
		isLoading: false,
		loadingText: "",
		isError: false,
		errorMessage: "",
		scrollTo: (element: string) => {
			const el = document.getElementById(element);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		},
		darkMode: true,

	};

	const [uiState, dispatch] = React.useReducer(uiReducer, initialState);

	return (
		<UiState.Provider value={{ uiState, dispatch }}>
			{props.children}
		</UiState.Provider>
	);
}