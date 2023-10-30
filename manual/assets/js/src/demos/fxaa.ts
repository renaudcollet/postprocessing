import {
	CubeTexture,
	CubeTextureLoader,
	LoadingManager,
	PerspectiveCamera,
	SRGBColorSpace,
	Scene,
	VSMShadowMap,
	WebGLRenderer
} from "three";

import {
	BlendFunction,
	EffectPass,
	FXAAEffect,
	GeometryPass,
	RenderPipeline
} from "postprocessing";

import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import { ControlMode, SpatialControls } from "spatial-controls";
import { calculateVerticalFoV } from "../utils/CameraUtils.js";
import * as CornellBox from "../objects/CornellBox.js";

function load(): Promise<Map<string, unknown>> {

	const assets = new Map<string, unknown>();
	const loadingManager = new LoadingManager();
	const cubeTextureLoader = new CubeTextureLoader(loadingManager);

	const path = document.baseURI + "img/textures/skies/sunset/";
	const format = ".png";
	const urls = [
		path + "px" + format, path + "nx" + format,
		path + "py" + format, path + "ny" + format,
		path + "pz" + format, path + "nz" + format
	];

	return new Promise<Map<string, unknown>>((resolve, reject) => {

		loadingManager.onLoad = () => resolve(assets);
		loadingManager.onError = (url) => reject(new Error(`Failed to load ${url}`));

		cubeTextureLoader.load(urls, (t) => {

			t.colorSpace = SRGBColorSpace;
			assets.set("sky", t);

		});

	});

}

window.addEventListener("load", () => void load().then((assets) => {

	// Renderer

	const renderer = new WebGLRenderer({
		powerPreference: "high-performance",
		antialias: false,
		stencil: false,
		depth: false
	});

	renderer.debug.checkShaderErrors = (window.location.hostname === "localhost");
	renderer.shadowMap.type = VSMShadowMap;
	renderer.shadowMap.autoUpdate = false;
	renderer.shadowMap.needsUpdate = true;
	renderer.shadowMap.enabled = true;

	const container = document.querySelector(".viewport") as HTMLElement;
	container.prepend(renderer.domElement);

	// Camera & Controls

	const camera = new PerspectiveCamera();
	const controls = new SpatialControls(camera.position, camera.quaternion, renderer.domElement);
	const settings = controls.settings;
	settings.general.mode = ControlMode.THIRD_PERSON;
	settings.rotation.sensitivity = 2.2;
	settings.rotation.damping = 0.05;
	settings.zoom.damping = 0.1;
	settings.translation.enabled = false;
	controls.position.set(0, 0, 5);

	// Scene, Lights, Objects

	const scene = new Scene();
	scene.background = assets.get("sky") as CubeTexture;
	scene.add(CornellBox.createLights());
	scene.add(CornellBox.createEnvironment());
	scene.add(CornellBox.createActors());

	// Post Processing

	const effect = new FXAAEffect({ blendFunction: BlendFunction.NORMAL });
	const pipeline = new RenderPipeline(renderer);
	pipeline.addPass(new GeometryPass(scene, camera, { samples: 4 }));
	pipeline.addPass(new EffectPass(effect));

	// Settings

	const pane = new Pane({ container: container.querySelector(".tp") as HTMLElement });
	pane.registerPlugin(EssentialsPlugin);
	const fpsMeter = pane.addBlade({ view: "fpsgraph", label: "FPS", rows: 2 }) as EssentialsPlugin.FpsGraphBladeApi;

	const folder = pane.addFolder({ title: "Settings" });
	folder.addBinding(effect, "samples", { min: 0, max: 24, step: 1 });
	folder.addBinding(effect, "minEdgeThreshold", { min: 0.01, max: 0.3, step: 1e-4 });
	folder.addBinding(effect, "maxEdgeThreshold", { min: 0.01, max: 0.3, step: 1e-4 });
	folder.addBinding(effect, "subpixelQuality", { min: 0, max: 1.0, step: 1e-4 });

	folder.addBinding(effect.blendMode, "opacity", { min: 0, max: 1, step: 0.01 });
	folder.addBinding(effect.blendMode, "blendFunction", { options: BlendFunction });

	// Resize Handler

	function onResize(): void {

		const width = container.clientWidth, height = container.clientHeight;
		camera.aspect = width / height;
		camera.fov = calculateVerticalFoV(90, Math.max(camera.aspect, 16 / 9));
		camera.updateProjectionMatrix();
		pipeline.setSize(width, height);

	}

	window.addEventListener("resize", onResize);
	onResize();

	// Render Loop

	requestAnimationFrame(function render(timestamp: number): void {

		fpsMeter.begin();
		controls.update(timestamp);
		pipeline.render(timestamp);
		fpsMeter.end();
		requestAnimationFrame(render);

	});

}));
