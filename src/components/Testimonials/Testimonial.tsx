/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { createRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
		<div ref={containerRef} className="testimonial" data-value="1" onDragStart={props.onDragStart}>
			<div className="testimonial-text">
				<p ref={textRef}>{t("locale") == "en" ? props.enText : props.nlText}</p>
			</div>
			<div className="testimonial-author">
				<p>{props.author}</p>
			</div>
		</div>
	);
}
