/**
 * /*
 *   https://discourse.threejs.org/t/best-way-to-integrate-plain-three-js-inside-a-react-app/27049/2
 *
 * @format
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as SkylineData from "./data.json";

export default class ViewGL {
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	camera: THREE.PerspectiveCamera;
	controls: OrbitControls;

	center: THREE.Vector3 = new THREE.Vector3(0.7 / 2, 0, 52 / 10 / 2);

	minColor = 0x161b22;
	maxColor = 0x39d353;

	plane: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial>;

	raycaster = new THREE.Raycaster();
	pointer = new THREE.Vector2();

	canvasRef: HTMLCanvasElement;

	meshMetadata: { [mesh: string]: any } = {};

	metaSetter = (metadata: any) => {};

	constructor(canvasRef: HTMLCanvasElement, setMetadata = (metadata: any) => {}) {
		this.canvasRef = canvasRef;
		this.metaSetter = setMetadata;

		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasRef,
			antialias: true,
			alpha: true,
		});
		this.renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);

		this.camera = new THREE.PerspectiveCamera(80, canvasRef.clientWidth / canvasRef.clientHeight, 0.01, 1000);
		this.raycaster.far = 10;

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.enableZoom = true;
		this.controls.minDistance = 1;
		this.controls.maxDistance = 10;
		this.controls.minPolarAngle = 0.1;
		this.controls.maxPolarAngle = Math.PI / 2;

		let weeks = SkylineData.contributions.length;
		this.center = new THREE.Vector3(0.7 / 2, 0, weeks / 10 / 2);

		SkylineData.contributions.forEach((contribution, week) => {
			contribution.days.forEach((day, key) => {
				let size = day.count + 1;

				const material = new THREE.MeshBasicMaterial({
					color: this.lerpMinMaxColor(day.count, SkylineData.max),
				});

				const geometry = new THREE.BoxGeometry(0.1, this.rescale(size) / 10, 0.1);
				const cube = new THREE.Mesh(geometry, material);
				cube.position.x = key / 10;
				// Make sure the bottom of the cube is at the bottom of the screen
				cube.position.y = this.rescale(size) / 10 / 2;

				cube.position.z = (weeks - 0.5) / 10 - week / 10;

				this.scene.add(cube);

				this.meshMetadata[cube.uuid] = {
					color: this.lerpMinMaxColor(day.count, SkylineData.max),
					day: key,
					week: week,
					count: day.count,
				};
			});
		});

		// Create a plane to cover the entire screen
		const planeGeometry = new THREE.BoxGeometry(0.8, 0.1, weeks / 10 + 0.1);
		const planeMaterial = new THREE.MeshNormalMaterial();
		this.plane = new THREE.Mesh(planeGeometry, planeMaterial);

		this.plane.position.set(this.center.x - 0.05, this.center.y - 0.05, this.center.z);
		this.plane.receiveShadow = true;

		this.scene.add(this.plane);

		this.controls.target.set(this.center.x, 0.5, this.center.z);
		this.camera.position.set(3, 0.5, this.center.z);

		this.update(performance.now());
	}

	// This function interpolates between the min and max color
	lerpMinMaxColor(count: number, max: number) {
		const ratio = count / max;
		const minColor = new THREE.Color(this.minColor);
		const maxColor = new THREE.Color(this.maxColor);
		const color = new THREE.Color();
		color.r = minColor.r + (maxColor.r - minColor.r) * ratio;
		color.g = minColor.g + (maxColor.g - minColor.g) * ratio;
		color.b = minColor.b + (maxColor.b - minColor.b) * ratio;
		return color;
	}

	// This function rescales the value to fit the screen
	rescale(value: number) {
		const min = 0;
		const max = SkylineData.max;

		return ((value - min) / (max - min)) * 15;
	}

	// ******************* PUBLIC EVENTS ******************* //
	updateValue(value: any) {
		// Whatever you need to do with React props
	}

	onMouseMove() {
		// Mouse moves
	}

	onWindowResize(vpW: number, vpH: number) {
		this.camera.aspect = vpW / vpH;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(vpW, vpH);
	}

	// ******************* RENDER LOOP ******************* //
	update(t: number) {
		/*
		// Reset the color of all cubes
		this.scene.children.forEach((child) => {
			const metadata = this.meshMetadata[child.uuid];

			const mesh = child as THREE.Mesh;

			// Check if the material is a MeshBasicMaterial, if so, set the color to red
			if (mesh.material instanceof THREE.MeshBasicMaterial) {
				mesh.material.color.set(metadata.color);
			}
		});

		// update the picking ray with the camera and pointer position
		this.raycaster.setFromCamera(this.pointer, this.camera);

		// calculate objects intersecting the picking ray
		const intersects = this.raycaster.intersectObjects(this.scene.children);

		if (intersects.length) {
			const intersect = intersects[0];

			// Convert the intersected object to a THREE.Mesh
			const mesh = intersect.object as THREE.Mesh;

			// Check if the material is a MeshBasicMaterial, if so, set the color to red
			if (mesh.material instanceof THREE.MeshBasicMaterial) {
				mesh.material.color.set(0xffffff);

				const metadata = this.meshMetadata[mesh.uuid];
				this.metaSetter(`
					Day: ${metadata.day + 1}
					Week: ${metadata.week + 1}
					Count: ${metadata.count}
				`);
			}
		}
		*/

		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.update.bind(this));
	}

	onPointerMove(event: PointerEvent) {
		// calculate pointer position in normalized coordinates for the canvas element
		this.pointer.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
		this.pointer.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
	}
}
