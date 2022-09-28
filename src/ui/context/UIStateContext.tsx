import { createContext, useState, PropsWithChildren } from "react";

type uiState = { settingsMenuVisible: boolean; setSettingsMenuVisible: (value: boolean) => void };

const uiStateInitial = {
	settingsMenuVisible: false,
	setSettingsMenuVisible: () => {},
};

export const UIStateContext = createContext<uiState>(uiStateInitial);

export const UIStateContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);

	const value = { settingsMenuVisible: settingsMenuVisible, setSettingsMenuVisible: setSettingsMenuVisible };

	return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};
