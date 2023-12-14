/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langEN from "./locales/en/translations.json";
import langNL from "./locales/nl/translations.json";

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	lng: "nl",
	resources: {
		en: {
			translations: langEN,
		},
		nl: {
			translations: langNL,
		},
	},
	ns: ["translations"],
	defaultNS: "translations",
});

i18n.languages = ["en", "nl"];

export default i18n;
