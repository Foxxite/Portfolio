/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { useTranslation } from "react-i18next";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function Testimonials() {
	const { t } = useTranslation();

	const handleDragStart = (e: any) => e.preventDefault();

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 3 },
	};

	const items = [
		<div className="item" data-value="1">
			1
		</div>,
		<div className="item" data-value="2">
			2
		</div>,
		<div className="item" data-value="3">
			3
		</div>,
		<div className="item" data-value="4">
			4
		</div>,
		<div className="item" data-value="5">
			5
		</div>,
	];

	return (
		<AliceCarousel
			mouseTracking
			items={items}
			responsive={responsive}
			controlsStrategy="alternate"
			infinite={true}
			autoPlay={true}
			autoPlayInterval={5000}
		/>
	);
}
