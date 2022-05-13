/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
	const { i18n } = useTranslation();

	function changeLanguage(e: any) {
		i18n.changeLanguage(e.target.value);
	}

	useEffect(() => {
		// Get the browser language
		const lang = navigator.language;

		// split the language into two parts
		const langParts = lang.split("-");

		console.log(langParts);

		// Set the language to the browser language
		i18n.changeLanguage(langParts[0]);
	}, []);

	return (
		<div className="header">
			<button title="English" onClick={changeLanguage} value="en">
				🇬🇧
			</button>
			<button title="Nederlands" onClick={changeLanguage} value="nl">
				🇳🇱
			</button>
		</div>
	);
}
