/**
 * /*
 *   https://discourse.threejs.org/t/best-way-to-integrate-plain-three-js-inside-a-react-app/27049/2
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";

import styles from "./Skyline.module.scss";
import ViewGL from "./ViewGL";

type SkylineProps = {};

type SkylineState = {
	metadata: string;
};

const Skyline: React.FC<SkylineProps> = (props: SkylineProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [metadata, setMetadata] = useState<string>("Hover over een dag om info te zien.");
	let viewGL: ViewGL | null = null;

	// ******************* COMPONENT LIFECYCLE ******************* //
	useEffect(() => {
		// Get canvas, pass to custom class
		const canvas = canvasRef.current;
		viewGL = new ViewGL(canvas!, setMetadata);

		// Init any event listeners
		window.addEventListener("mousemove", mouseMove);
		window.addEventListener("resize", handleResize);
		window.addEventListener("pointermove", onPointerMove);

		return () => {
			// Remove any event listeners
			window.removeEventListener("mousemove", mouseMove);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("pointermove", onPointerMove);
		};
	}, []);

	useEffect(() => {
		// Pass updated props to
		viewGL?.updateValue(props);
	}, [props]);

	// ******************* EVENT LISTENERS ******************* //
	const mouseMove = (event: MouseEvent) => {
		viewGL?.onMouseMove();
	};

	const handleResize = () => {
		if (!canvasRef.current) return;

		let newWidth = window.innerWidth - window.innerWidth * 0.05;
		let newHeight = window.innerHeight;

		if (window.innerWidth > 768) {
			newWidth = window.innerWidth / 2;
			newHeight = window.innerHeight / 2;
		}

		viewGL?.onWindowResize(newWidth, newHeight);
	};

	const onPointerMove = (event: PointerEvent) => {
		viewGL?.onPointerMove(event);
	};

	return (
		<div className={styles.skyline}>
			<h2>
				<span className="primary">Foxxite's</span>&nbsp;
				<span className="secondary">{new Date().getFullYear() - 1} GitHub Skyline</span>
			</h2>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Skyline;
