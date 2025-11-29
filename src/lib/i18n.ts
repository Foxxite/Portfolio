/**
 * Copyright (c) 2025 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,

		fallbackLng: "nl",

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},

		resources: {
			en: {
				translation: {
					my: "My",
					repositories: "Repositories",
					"open-source": "I'm a big fan of the open source community and I'm always coding something new.",
					"check-out-repos": "Check out some of my public repositories.",
				},
			},
			nl: {
				translation: {
					my: "Mijn",
					repositories: "Repositories",
					"open-source":
						"Ik ben een grote fan van de open source community en ik ben altijd iets nieuws aan het coderen.",
					"check-out-repos": "Bekijk een aantal van mijn openbare repositories.",
				},
			},
		},
	});

export default i18n;
