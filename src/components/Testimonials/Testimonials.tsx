/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import "./Testimonials.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Testimonial from "./Testimonial";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function Testimonials() {
	const { t } = useTranslation();

	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		axios.get("/testimonials.json").then((res) => {
			generateTestimonials(res.data);
		});
	}, []);

	function generateTestimonials(data: any) {
		const testimonials = data.map((testimonial: any) => {
			return (
				<Testimonial
					enText={testimonial.text.en}
					nlText={testimonial.text.nl}
					author={testimonial.author}
					onDragStart={(e) => {
						e.preventDefault();
					}}
				/>
			);
		});

		setTestimonials(testimonials);
	}

	const responsive = {
		0: { items: 1 },
		576: { items: 2 },
		1200: { items: 3 },
	};

	return (
		<div id="testimonials">
			<h2>
				<FontAwesomeIcon icon={faCommentDots} /> {t("testimonials")}
			</h2>
			<AliceCarousel
				// paddingRight={155}
				mouseTracking
				items={testimonials}
				responsive={responsive}
				controlsStrategy="alternate"
				infinite={true}
				autoPlay={false}
				autoPlayInterval={5000}
			/>
		</div>
	);
}
