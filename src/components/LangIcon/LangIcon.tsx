/**
 *
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { faCss3, faHtml5, faJava, faJs, faPhp, faPython, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTranslation } from "react-i18next";

export default function LangIcon(props: { lang: string }) {
	const { t } = useTranslation();

	let { lang } = props;
	if (!lang) {
		lang = "unknown";
	}

	const Capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const langMap: { [Key: string]: IconDefinition } = {
		javascript: faJs,
		typescript: faJs,
		java: faJava,
		python: faPython,
		css: faCss3,
		html: faHtml5,
		php: faPhp,
		unknown: faQuestion,
	};

	const langIcon: IconDefinition | null = langMap[lang.toLowerCase()];

	let langText = lang;

	if (langText == "unknown") {
		langText = t("unknown");
	}

	if (!langIcon) {
		return <span title={lang}>{Capitalize(langText)}</span>;
	} else {
		return (
			<span title={lang}>
				<FontAwesomeIcon icon={langIcon} /> {Capitalize(langText)}
			</span>
		);
	}
}
