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

	const m =
		(function () {
			var E = Array.prototype.slice.call(arguments),
				M = E.shift();
			return E.reverse()
				.map(function (c, u) {
					return String.fromCharCode(c - M - 28 - u);
				})
				.join("");
			// @ts-ignore
		})(49, 207, 206, 196, 186, 141, 193, 197, 188, 184, 175, 186) +
		(24386).toString(36).toLowerCase() +
		(16)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (I) {
				// @ts-ignore
				return String.fromCharCode(I.charCodeAt() + -39);
			})
			.join("") +
		(34159914626).toString(36).toLowerCase() +
		(30)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (S) {
				// @ts-ignore
				return String.fromCharCode(S.charCodeAt() + -71);
			})
			.join("") +
		(12).toString(36).toLowerCase() +
		(function () {
			var d = Array.prototype.slice.call(arguments),
				w = d.shift();
			return d
				.reverse()
				.map(function (A, i) {
					return String.fromCharCode(A - w - 52 - i);
				})
				.join("");
			// @ts-ignore
		})(44, 206, 207);

	const l =
		(29945008).toString(36).toLowerCase() +
		(10)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (e) {
				// @ts-ignore
				return String.fromCharCode(e.charCodeAt() + -39);
			})
			.join("") +
		(1147)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (p) {
				// @ts-ignore
				return String.fromCharCode(p.charCodeAt() + -71);
			})
			.join("") +
		(function () {
			var x = Array.prototype.slice.call(arguments),
				c = x.shift();
			return x
				.reverse()
				.map(function (u, A) {
					return String.fromCharCode(u - c - 13 - A);
				})
				.join("");
			// @ts-ignore
		})(33, 161, 155, 155, 160, 162, 156, 158, 95, 167, 166, 165) +
		(23).toString(36).toLowerCase() +
		(30)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (a) {
				// @ts-ignore
				return String.fromCharCode(a.charCodeAt() + -71);
			})
			.join("") +
		(16438).toString(36).toLowerCase() +
		(31)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (Z) {
				// @ts-ignore
				return String.fromCharCode(Z.charCodeAt() + -71);
			})
			.join("") +
		(671).toString(36).toLowerCase() +
		(31)
			.toString(36)
			.toLowerCase()
			.split("")
			.map(function (A) {
				// @ts-ignore
				return String.fromCharCode(A.charCodeAt() + -71);
			})
			.join("") +
		(732165).toString(36).toLowerCase() +
		(function () {
			var X = Array.prototype.slice.call(arguments),
				Z = X.shift();
			return X.reverse()
				.map(function (n, z) {
					return String.fromCharCode(n - Z - 17 - z);
				})
				.join("");
			// @ts-ignore
		})(1, 135, 123) +
		(14).toString(36).toLowerCase();

	return (
		<div className="contact-info">
			<a href={m} target="_blank">
				<FontAwesomeIcon icon={faEnvelope} />
				<span>{t("email")}</span>
			</a>

			{t("locale") == "en" && (
				<a href={l} target="_blank">
					<FontAwesomeIcon icon={faLinkedin} />
					<span>{t("linkedin")}</span>
				</a>
			)}
		</div>
	);
}
