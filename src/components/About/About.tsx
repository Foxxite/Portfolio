/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useTranslation } from "react-i18next";

import styles from "./About.module.scss";

export default function About() {
	const { t } = useTranslation();

	return (
		<div className={styles.about} id="about">
			<h1>
				{t("about.greet")} <span className="primary">Fox</span>
				<span className="secondary">xite</span>
			</h1>
			<h2>{t("who_am_i")}</h2>
			<p>{t("about.description")}</p>
			<br />
			<p>{t("about.current")}</p>
			<br />
			<p>{t("about.doing")}</p>
		</div>
	);
}
