/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { createRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Testimonials.module.scss";

export default function Testimonial(props: {
	enText: string;
	nlText: string;
	author: string;
	onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}) {
	const { t } = useTranslation();

	const containerRef = createRef<HTMLDivElement>();
	const textRef = createRef<HTMLParagraphElement>();

	return (
		<div ref={containerRef} className={styles.testimonial} data-value="1" onDragStart={props.onDragStart}>
			<div className={styles["testimonial-text"]}>
				<p ref={textRef}>{t("locale") == "en" ? props.enText : props.nlText}</p>
			</div>
			<div className={styles["testimonial-author"]}>
				<p>{props.author}</p>
			</div>
		</div>
	);
}
