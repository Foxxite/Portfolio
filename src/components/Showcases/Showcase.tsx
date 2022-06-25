/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useTranslation } from "react-i18next";
import YouTube from "react-youtube";

export default function Showcase(props: { title: string; enText: string; nlText: string; video: string; url: string }) {
	const { t } = useTranslation();

	return (
		<a
			className="showcase"
			href={props.url}
			target="_blank"
			onClick={(e) => {
				if (!props.url) e.preventDefault();
			}}>
			<div className="showcase-title">
				<h3>{props.title}</h3>
			</div>
			{props.video && (
				<YouTube
					className="showcase-video"
					videoId={props.video}
					opts={{
						width: "auto",
						height: "auto",
					}}
				/>
			)}

			<div className="showcase-text">
				<p>{t("locale") == "en" ? props.enText : props.nlText}</p>
			</div>
		</a>
	);
}
