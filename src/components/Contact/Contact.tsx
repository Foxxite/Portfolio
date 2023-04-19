/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import ReCAPTCHA from "react-google-recaptcha";

import styles from "./Contact.module.scss";
import { useState } from "react";

import ContactInfo from "./ContactInfo";

export default function Contact() {
	const { t } = useTranslation();

	const [showForm, setShowForm] = useState(false);

	function onChange(value: any) {
		setShowForm(value !== null);
	}

	function onErrorOrExpired() {
		setShowForm(false);
	}

	return (
		<div className={styles.contact} id="contact">
			<h2>
				<FontAwesomeIcon icon={faAddressBook} /> {t("contact")}
			</h2>

			{!showForm && (
				<ReCAPTCHA
					className={styles.captcha}
					sitekey="6LdMB6ggAAAAAOtw4riCRmOyNB0thBkH5TOZi2IC"
					onChange={onChange}
					onError={onErrorOrExpired}
					onExpired={onErrorOrExpired}
				/>
			)}

			{showForm && <ContactInfo />}
		</div>
	);
}
