/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import styles from "./Showcases.module.scss";
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
		const showcases = data.map((showcase: IShowcase, index: number) => {
			return (
				<Showcase
					key={index}
					title={showcase.title}
					enText={showcase.description.en}
					nlText={showcase.description.nl}
					video={showcase.videoId}
					image={showcase.image}
					url={showcase.url}
				/>
			);
		});

		setShowcases(showcases);
	}

	return (
		<div id="showcase">
			<h2>
				<FontAwesomeIcon icon={faLightbulb} /> {t("showcase")}
			</h2>

			<div className={styles["showcase-container"]}>
				{showcases.map((showcase, index) => {
					return showcase;
				})}
			</div>
		</div>
	);
}
