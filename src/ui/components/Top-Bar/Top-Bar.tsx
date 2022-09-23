import { useContext } from "react";

import { MainContext } from "../../context/MainContext";

import "./Top-Bar.scss";

export default function TopBar() {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const { highlight1Color } = uiSelectedColors.value;

	console.log("TopBar");

	return (
		<header style={{ backgroundColor: highlight1Color }}>
			<div>HEADER</div>
		</header>
	);
}
