/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import "./Showcases.scss";
import Showcase from "./Showcase";

import { useEffect, useState } from "react";
import axios from "axios";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { IShowcase } from "../../types/types";

export default function Showcases() {
	const { t } = useTranslation();

	const [showcases, setShowcases] = useState([]);

	useEffect(() => {
		axios.get("/assets/data/showcase.json").then((res) => {
			generateShowcases(res.data);
		});
	}, []);

	function generateShowcases(data: any) {
		const showcases = data.map((showcase: IShowcase) => {
			return (
				<Showcase
					title={showcase.title}
					enText={showcase.description.en}
					nlText={showcase.description.nl}
					video={showcase.videoId}
					url={showcase.url}
				/>
			);
		});

		setShowcases(showcases);
	}

	const responsive = {
		0: { items: 1 },
		576: { items: 2 },
		1200: { items: 3 },
	};

	return (
		<div id="showcase">
			<h2>
				<FontAwesomeIcon icon={faLightbulb} /> {t("showcase")}
			</h2>

			<div className="showcase-container">
				{showcases.map((showcase, index) => {
					return showcase;
				})}
			</div>
		</div>
	);
}
