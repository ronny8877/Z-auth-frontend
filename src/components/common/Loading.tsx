/** @format */

import React, { ReactElement } from "react";

interface Props {}

export default function Loading(props: Props): ReactElement {
  return (
		<div className="fixed top-0 w-full dark:bg-dark-800 h-screen bg-white z-[500] overflow-hidden grid place-items-center">
			<div className="ring">
				Z-Auth
				{/* Change this with either a gif or a loading animation or logo */}
				<span></span>
			</div>
		</div>
	);
}
