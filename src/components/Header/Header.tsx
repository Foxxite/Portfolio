/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./Header.scss";

export default function Header() {
	const { i18n } = useTranslation();
	const { t } = useTranslation();

	const [activeLang, setActiveLang] = useState("");
	const [showMenu, setShowMenu] = useState(false);

	function changeLanguage(e: any) {
		i18n.changeLanguage(e.target.value);
		setActiveLang(e.target.value);
	}

	useEffect(() => {
		// Get the browser language
		const lang = navigator.language;

		// split the language into two parts
		const langParts = lang.split("-");

		const langCode = langParts[0];

		// Set the language to the browser language
		i18n.changeLanguage(langCode);

		// Set the active language
		setActiveLang(langCode);
	}, []);

	return (
		<div className="header">
			<button id="menu-toggle" title="Toggle Menu" onClick={() => setShowMenu(!showMenu)}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div className={`menu ${showMenu ? "show" : ""}`}>
				<a className="button" href="#about">
					{t("who_am_i")}
				</a>
				<a className="button" href="#repos">
					{t("repos")}
				</a>
				<a className="button" href="#showcase">
					{t("showcase")}
				</a>
				<a className="button" href="#testimonials">
					{t("testimonials")}
				</a>
				<a className="button" href="#contact">
					{t("contact")}
				</a>

				<button
					title="Nederlands"
					onClick={changeLanguage}
					value="nl"
					className={activeLang == "nl" ? "active" : ""}>
					<i className="twa twa-flag-netherlands"></i>
				</button>
				<button
					title="English"
					onClick={changeLanguage}
					value="en"
					className={activeLang == "en" ? "active" : ""}>
					<i className="twa twa-flag-united-kingdom"></i>
				</button>
			</div>
		</div>
	);
}
