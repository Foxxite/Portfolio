/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	lng: "nl",
	resources: {
		en: {
			translations: require("./locales/en/translations.json"),
		},
		nl: {
			translations: require("./locales/nl/translations.json"),
		},
	},
	ns: ["translations"],
	defaultNS: "translations",
});

i18n.languages = ["en", "nl"];

export default i18n;
