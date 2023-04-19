/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import styles from "./Showcases.module.scss";

import { useTranslation } from "react-i18next";
import YouTube from "react-youtube";

export default function Showcase(props: {
	title: string;
	enText: string;
	nlText: string;
	video?: string;
	image?: string;
	url: string;
}) {
	const { t } = useTranslation();

	return (
		<a
			className={styles["showcase"]}
			href={props.url}
			target="_blank"
			onClick={(e) => {
				if (!props.url) e.preventDefault();
			}}>
			<div className={styles["showcase-title"]}>
				<h3>{props.title}</h3>
			</div>
			{props.video && (
				<YouTube
					className={styles["showcase-video"]}
					videoId={props.video}
					opts={{
						width: "auto",
						height: "auto",
					}}
				/>
			)}

			{props.image && <img className={styles["showcase-image"]} src={props.image} alt={props.title} />}

			<div className={styles["showcase-text"]}>
				<p>{t("locale") == "en" ? props.enText : props.nlText}</p>
			</div>
		</a>
	);
}
