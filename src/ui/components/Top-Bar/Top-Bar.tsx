import { useContext } from "react";
import { IoIosSettings } from "react-icons/io";
import { AiFillApi } from "react-icons/ai";

import { MainContext } from "../../context/MainContext";
import { UIStateContext } from "../../context/UIStateContext";

import { Button } from "../../common/Button/Button";

import "./Top-Bar.scss";

export default function TopBar() {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const { setSettingsMenuVisible } = useContext(UIStateContext);

	const { highlight1Color } = uiSelectedColors.value;

	return (
		<header style={{ backgroundColor: highlight1Color }}>
			<div>HEADER</div>
			<div className="top-bar-nav">
				<Button onClick={() => console.log("Plugins")}>
					<AiFillApi size="20px" />
				</Button>
				<Button onClick={() => setSettingsMenuVisible(true)}>
					<IoIosSettings size="20px" />
				</Button>
			</div>
		</header>
	);
}
