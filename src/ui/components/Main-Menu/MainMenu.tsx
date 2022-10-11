import { useContext } from "react";

import { MainContext } from "../../context/MainContext";

export default function MainMenu() {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const { highlight1Color, highlight2Color } = uiSelectedColors.value;

	return <aside style={{ backgroundColor: highlight1Color, borderRight: `1px solid ${highlight2Color}` }}></aside>;
}
