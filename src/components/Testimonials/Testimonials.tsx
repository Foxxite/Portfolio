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

export default function Testimonials() {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		axios.get("/testimonials.json").then((res) => {
			generateTestimonials(res.data);
		});
	}, []);

	function generateTestimonials(data: any) {
		const testimonials = data.map((testimonial: any) => {
			console.log(testimonial);

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
		568: { items: 2 },
		1024: { items: 3 },
	};

	return (
		<AliceCarousel
			mouseTracking
			items={testimonials}
			responsive={responsive}
			controlsStrategy="alternate"
			infinite={true}
			autoPlay={true}
			autoPlayInterval={5000}
		/>
	);
}
