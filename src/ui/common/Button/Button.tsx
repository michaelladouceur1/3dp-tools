import { useContext, useEffect, useState } from "react";

import { MainContext } from "../../context/MainContext";

import "./Button.scss";

type Props = {
	children: JSX.Element;
	width?: string;
	height?: string;
	backgroundColor?: {
		standard: "background" | "highlight1" | "highlight2";
		hover: "background" | "highlight1" | "highlight2";
	};
	onClick: (e: any) => void;
};

export const Button: React.FC<Props> = ({
	children,
	width = "30px",
	height = "30px",
	backgroundColor = { standard: "highlight1", hover: "highlight2" },
	onClick,
}) => {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const [hovering, setHovering] = useState(false);

	const style = {
		backgroundColor: hovering ? uiSelectedColors.value[`${backgroundColor.hover}Color`] : uiSelectedColors.value[`${backgroundColor.standard}Color`],
		width: width,
		height: height,
	};

	return (
		<button style={style} onClick={onClick} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
			{children}
		</button>
	);
};
