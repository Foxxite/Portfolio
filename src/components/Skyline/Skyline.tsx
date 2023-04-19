/**
 * /*
 *   https://discourse.threejs.org/t/best-way-to-integrate-plain-three-js-inside-a-react-app/27049/2
 *
 * @format
 */

import React from "react";
import ViewGL from "./ViewGL";

import styles from "./Skyline.module.scss";

type SkylineProps = {};

type SkylineState = {
	metadata: string;
};

export default class Skyline extends React.Component<SkylineProps, SkylineState> {
	canvasRef = React.createRef<HTMLCanvasElement>();
	viewGL: ViewGL | null = null;

	constructor(props: SkylineProps, state: SkylineState) {
		super(props);
		this.state = {
			metadata: "Hover over een dag om info te zien.",
		};
	}

	setMetadata = (metadata: string) => {
		this.setState({ metadata });
	};

	// ******************* COMPONENT LIFECYCLE ******************* //
	componentDidMount() {
		// Get canvas, pass to custom class
		const canvas = this.canvasRef.current;
		this.viewGL = new ViewGL(canvas!, this.setMetadata);

		// Init any event listeners
		window.addEventListener("mousemove", this.mouseMove);
		window.addEventListener("resize", this.handleResize);
		window.addEventListener("pointermove", this.onPointerMove);
	}

	componentDidUpdate(prevProps: SkylineProps, prevState: SkylineState) {
		// Pass updated props to
		this.viewGL?.updateValue(this.props);
	}

	componentWillUnmount() {
		// Remove any event listeners
		window.removeEventListener("mousemove", this.mouseMove);
		window.removeEventListener("resize", this.handleResize);
		window.removeEventListener("pointermove", this.onPointerMove);
	}

	// ******************* EVENT LISTENERS ******************* //
	mouseMove = (event: MouseEvent) => {
		this.viewGL?.onMouseMove();
	};

	handleResize = () => {
		if (!this.canvasRef.current) return;

		let newWidth = window.innerWidth - window.innerWidth * 0.05;
		let newHeight = window.innerHeight;

		if (window.innerWidth > 768) {
			newWidth = window.innerWidth / 2;
			newHeight = window.innerHeight / 2;
		}

		this.viewGL?.onWindowResize(newWidth, newHeight);
	};

	onPointerMove = (event: PointerEvent) => {
		this.viewGL?.onPointerMove(event);
	};

	render() {
		return (
			<div className={styles.skyline}>
				<h2>
					<span className="primary">Foxxite's</span>&nbsp;
					<span className="secondary">{new Date().getFullYear() - 1} GitHub Skyline</span>
				</h2>
				<canvas ref={this.canvasRef} />
			</div>
		);
	}
}
