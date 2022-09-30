import { useEffect, useState } from "react";

import "./ColorPicker.scss";

type Props = {
	value?: string;
	onChange: (e: any) => void;
};

// TODO: Update styling of component
export const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
	return <input type="color" style={{ width: "30px", height: "30px", borderRadius: "50%" }} value={value} onChange={onChange} />;
};
