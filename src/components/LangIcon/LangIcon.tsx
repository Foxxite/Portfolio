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

export default function LangIcon(props: { lang: string }) {
	let { lang } = props;
	if (!lang) {
		lang = "unknown";
	}

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

	if (!langIcon) {
		return <span title={lang}>{Capitalize(lang)}</span>;
	} else {
		return (
			<span title={lang}>
				<FontAwesomeIcon icon={langIcon} /> {Capitalize(lang)}
			</span>
		);
	}

	function Capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
