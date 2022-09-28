import { useEffect, useState } from "react";

import "./Tabs.scss";

type Props = {
	tabs: Tab[];
};

type Tab = {
	title: string;
	onClick: () => void;
};

export const Tabs: React.FC<Props> = ({ tabs }) => {
	const [hoveredTab, setHoveredTab] = useState<number | null>(null);
	const [selectedTab, setSelectedTab] = useState<number>(0);

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
				color: "green",
			};
		}

		if (hoveredTab === idx) {
			return {
				color: "blue",
			};
		}

		return {};
	};

	return (
		<div className="tabs">
			{tabs.map((tab: Tab, idx: number) => {
				return (
					<span
						key={idx}
						style={style(idx)}
						className="tab"
						onClick={() => handleClick(idx, tab)}
						onMouseEnter={() => setHoveredTab(idx)}
						onMouseLeave={() => setHoveredTab(null)}
					>
						{tab.title}
					</span>
				);
			})}
		</div>
	);
};
