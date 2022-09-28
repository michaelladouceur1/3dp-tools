import { useContext, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import { MainContext } from "../../context/MainContext";
import { Button } from "../Button/Button";

import "./Modal.scss";

type Props = {
	children: JSX.Element;
	isVisible: boolean;
	setIsVisible: (value: boolean) => void;
	duration?: number;
	width?: string;
	height?: string;
	title?: string;
};

export const Modal: React.FC<Props> = (props) => {
	const { isVisible, duration = 150 } = props;
	const [isRendered, setIsRendered] = useState(isVisible);

	useEffect(() => {
		if (isVisible) {
			setIsRendered(true);
		} else {
			setTimeout(() => setIsRendered(false), duration);
		}
	}, [isVisible]);

	return isRendered === true ? <ModalContent {...props} /> : <></>;
};

const ModalContent: React.FC<Props> = ({ children, isVisible, setIsVisible, duration = 300, width = "400px", height = "400px", title }) => {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const { highlight1Color, highlight2Color } = uiSelectedColors.value;

	const styles = {
		panel: {
			width: width,
			height: height,
			backgroundColor: highlight1Color,
			animation: isVisible ? `fadeIn ${duration}ms` : "",
		},
		menu: {
			backgroundColor: highlight2Color,
		},
		overlay: {
			animation: isVisible ? `blur ${duration}ms` : "",
		},
	};

	const setHidden = (event: any) => {
		setIsVisible(false);
	};

	return (
		<div className="modal">
			<div style={styles.overlay} className="modal-overlay" onClick={setHidden} />
			<div style={styles.panel} className="modal-panel">
				<div style={styles.menu} className="modal-menu">
					<span>{title}</span>
					<Button width="20px" height="20px" backgroundColor={{ standard: "highlight2", hover: "highlight1" }} onClick={setHidden}>
						<IoIosClose size="100%" />
					</Button>
				</div>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
};
