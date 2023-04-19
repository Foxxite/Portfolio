/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import classes from "./Showcases.module.scss";

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
			className={classes["showcase"]}
			href={props.url}
			target="_blank"
			onClick={(e) => {
				if (!props.url) e.preventDefault();
			}}>
			<div className={classes["showcase-title"]}>
				<h3>{props.title}</h3>
			</div>
			{props.video && (
				<YouTube
					className={classes["showcase-video"]}
					videoId={props.video}
					opts={{
						width: "auto",
						height: "auto",
					}}
				/>
			)}

			{props.image && <img className={classes["showcase-image"]} src={props.image} alt={props.title} />}

			<div className={classes["showcase-text"]}>
				<p>{t("locale") == "en" ? props.enText : props.nlText}</p>
			</div>
		</a>
	);
}
