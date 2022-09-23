import { useContext } from "react";

import { MainContext } from "../../context/MainContext";

import "./Top-Bar.scss";

export default function TopBar() {
	const { settings } = useContext(MainContext);

	return (
		<header>
			<div>HEADER</div>
		</header>
	);
}
