/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function ContactInfo() {
	const { t } = useTranslation();

	return (
		<div className="contact-info">
			<a href="mailto:foxxite@foxxite.com" target="_blank">
				<FontAwesomeIcon icon={faEnvelope} />
				<span>{t("email")}</span>
			</a>

			{t("locale") == "en" && (
				<a href="https://www.linkedin.com/in/foxxite" target="_blank">
					<FontAwesomeIcon icon={faLinkedin} />
					<span>{t("linkedin")}</span>
				</a>
			)}
		</div>
	);
}
