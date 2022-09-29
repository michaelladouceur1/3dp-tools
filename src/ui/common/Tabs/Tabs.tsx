import { useContext, useEffect, useState } from "react";

import { MainContext } from "../../context/MainContext";
import "./Tabs.scss";

type Props = {
	tabs: Tab[];
};

type Tab = {
	title: string;
	onClick: () => void;
};

export const Tabs: React.FC<Props> = ({ tabs }) => {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const [hoveredTab, setHoveredTab] = useState<number | null>(null);
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const { fontColor, fontColor2 } = uiSelectedColors.value;

	useEffect(() => {
		tabs[selectedTab].onClick();
	}, []);

	const handleClick = (idx: number, tab: Tab) => {
		setSelectedTab(idx);
		tab.onClick();
	};

	const style = (idx: number) => {
		if (selectedTab === idx) {
			return {
				div: {
					color: fontColor2,
				},
				span: {
					borderBottom: `solid 1px ${fontColor2}`,
				},
			};
		}

		if (hoveredTab === idx) {
			return {
				div: {
					color: fontColor2,
				},
			};
		}

		return {};
	};

	return (
		<div className="tabs">
			{tabs.map((tab: Tab, idx: number) => {
				return (
					<div
						key={idx}
						style={style(idx).div}
						className="tab"
						onClick={() => handleClick(idx, tab)}
						onMouseEnter={() => setHoveredTab(idx)}
						onMouseLeave={() => setHoveredTab(null)}
					>
						<span style={style(idx).span}>{tab.title}</span>
					</div>
				);
			})}
		</div>
	);
};
