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
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../Skeleton/Skeleton";
import { showcasesSchema } from "../../schemas/showcaseSchema";

export default function Showcases() {
	const { t } = useTranslation();

	const {
		data: showcases,
		error: showcasesError,
		isLoading: isLoadingShowcases,
		isError: isShowcasesError,
	} = useQuery({
		queryKey: ["showcases"],
		queryFn: () => {
			return axios.get("/assets/data/showcase.json").then((res) => showcasesSchema.parse(res.data));
		},
	});

	return (
		<div id="showcase">
			<h2>
				<FontAwesomeIcon icon={faLightbulb} /> {t("showcase")}
			</h2>

			<div className={styles["showcase-container"]}>
				{isLoadingShowcases &&
					[...Array(2)].map((_, i) => <Skeleton key={i} className={styles["showcase"]} height="20em" />)}

				{!isLoadingShowcases &&
					showcases &&
					showcases.map((showcase: IShowcase, index: number) => {
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
					})}
			</div>
		</div>
	);
}
