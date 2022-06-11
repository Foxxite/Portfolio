/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
	const { i18n } = useTranslation();

	const [activeLang, setActiveLang] = useState("");

	function changeLanguage(e: any) {
		i18n.changeLanguage(e.target.value);
		setActiveLang(e.target.value);
	}

	useEffect(() => {
		// Get the browser language
		const lang = navigator.language;

		// split the language into two parts
		const langParts = lang.split("-");

		console.log(langParts);

		const langCode = langParts[0];

		// Set the language to the browser language
		i18n.changeLanguage(langCode);

		// Set the active language
		setActiveLang(langCode);
	}, []);

	return (
		<div className="header">
			<button title="English" onClick={changeLanguage} value="en" className={activeLang == "en" ? "active" : ""}>
				<i className="twa twa-flag-united-kingdom"></i>
			</button>
			<button
				title="Nederlands"
				onClick={changeLanguage}
				value="nl"
				className={activeLang == "nl" ? "active" : ""}>
				<i className="twa twa-flag-netherlands"></i>
			</button>
		</div>
	);
}
