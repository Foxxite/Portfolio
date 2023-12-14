/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Header.module.scss";
import { usePreferredLanguage } from "@uidotdev/usehooks";
import { set } from "date-fns";

export default function Header() {
	const { i18n } = useTranslation();
	const { t } = useTranslation();

	const prefLanguage = usePreferredLanguage();

	const [activeLang, setActiveLang] = useState(i18n.language);
	const [showMenu, setShowMenu] = useState(false);

	const changeLanguage = (lang: string) => {
		const newLang = lang == "nl" ? "nl" : "en";

		i18n.changeLanguage(newLang);
		setActiveLang(i18n.language);
	};

	useEffect(() => {
		// Get the browser language
		const lang = prefLanguage;

		// split the language into two parts
		const langParts = lang.split("-");

		const langCode = langParts[0];

		changeLanguage(langCode);
	}, [prefLanguage]);

	return (
		<div className={styles.header}>
			<button className={styles["menu-toggle"]} title="Toggle Menu" onClick={() => setShowMenu(!showMenu)}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div className={`${styles.menu} ${showMenu ? styles.show : ""}`}>
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
					onClick={(e) => changeLanguage("nl")}
					value="nl"
					className={activeLang == "nl" ? "active" : ""}>
					<i className="twa twa-flag-netherlands"></i>
				</button>
				<button
					title="English"
					onClick={(e) => changeLanguage("en")}
					value="en"
					className={activeLang == "en" ? "active" : ""}>
					<i className="twa twa-flag-united-kingdom"></i>
				</button>
			</div>
		</div>
	);
}
