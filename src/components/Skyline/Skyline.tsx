/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import React from "react";
import ViewGL from "./ViewGL";

import "./Skyline.scss";

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
		this.viewGL?.onWindowResize(this.canvasRef.current!.clientWidth, this.canvasRef.current!.clientHeight);
	};

	onPointerMove = (event: PointerEvent) => {
		this.viewGL?.onPointerMove(event);
	};

	render() {
		return (
			<div className="skyline">
				<p>{this.state.metadata}</p>
				<canvas ref={this.canvasRef} />
			</div>
		);
	}
}
