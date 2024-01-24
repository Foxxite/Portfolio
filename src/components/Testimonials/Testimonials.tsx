/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import "react-alice-carousel/lib/alice-carousel.css";

import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { useTranslation } from "react-i18next";

import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

import { testimonialsSchema } from "../../schemas/testimonialSchema";
import type { Testimonials, Testimonial as TTestimonial } from "../../schemas/testimonialSchema";

import Testimonial from "./Testimonial";
import styles from "./Testimonials.module.scss";
import Skeleton from "../Skeleton/Skeleton";

export default function Testimonials() {
	const { t } = useTranslation();

	const {
		data: testimonials,
		error: testimonialsError,
		isLoading: isLoadingTestimonials,
	} = useQuery({
		queryKey: ["testimonials"],
		queryFn: () => {
			return axios
				.get("/assets/data/testimonials.json")
				.then((res) => generateTestimonials(testimonialsSchema.parse(res.data)));
		},
	});

	function generateTestimonials(data: Testimonials) {
		return data.map((testimonial: TTestimonial) => {
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

			{isLoadingTestimonials && (
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						flexDirection: "row",
					}}>
					{[...Array(3)].map((_, i) => (
						<Skeleton key={i} className={styles.testimonial} width="100%" />
					))}
				</div>
			)}

			{testimonials && testimonials.length > 0 && (
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
			)}
		</div>
	);
}
