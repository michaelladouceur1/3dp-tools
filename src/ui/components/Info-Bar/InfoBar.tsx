import { useContext } from "react";
import { IoIosInformationCircle } from "react-icons/io";

import { MainContext } from "../../context/MainContext";

import "./InfoBar.scss";

export default function InfoBar() {
	const {
		info,
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const { highlight1Color } = uiSelectedColors.value;

	return (
		<div style={{ backgroundColor: highlight1Color }} className="info-bar">
			<span className="info">
				<IoIosInformationCircle size="20px" />
				<h1>{info.message}</h1>
			</span>
		</div>
	);
}
