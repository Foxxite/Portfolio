/**
 * Copyright (c) 2025 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useEffect, useState } from "react";

import { CodeIcon } from "lucide-react";

function LanguageWithIcon({ language }: { language?: string | null }) {
	language = language || "Unknown";

	const [icon, setIcon] = useState(<CodeIcon />);

	// Check if we have the icon for the language at /public/icons/
	useEffect(() => {
		if (!language || language === "Unknown") return;

		let _language = language.toLowerCase();

		// Some names need to be remapped
		if (_language === "c++") _language = "c-plusplus";
		if (_language === "c#") _language = "csharp";
		if (_language.includes("html")) _language = "html5";

		const iconPath = `/icons/${_language}.svg`;

		fetch(iconPath).then((response) => {
			if (
				response.ok &&
				response.status === 200 &&
				response.headers.get("content-type")?.startsWith("image/svg")
			) {
				setIcon(<img src={iconPath} alt={language} className="w-4 h-4" />);
			}
		});
	}, [language]);

	return (
		<>
			{icon} {language}
		</>
	);
}

export default LanguageWithIcon;
