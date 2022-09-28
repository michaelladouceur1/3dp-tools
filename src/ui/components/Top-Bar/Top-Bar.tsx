import { useContext } from "react";
import { IoIosSettings } from "react-icons/io";

import { MainContext } from "../../context/MainContext";

import { Button } from "../../common/Button/Button";

import "./Top-Bar.scss";

export default function TopBar() {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const { highlight1Color } = uiSelectedColors.value;

	return (
		<header style={{ backgroundColor: highlight1Color }}>
			<div>HEADER</div>
			<div>
				<Button
					onClick={() => {
						console.log("Button");
					}}
				>
					<IoIosSettings size="100%" />
				</Button>
			</div>
		</header>
	);
}
