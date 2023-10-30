import { WebGLRenderTarget } from "three";
import { Pass } from "../core/Pass.js";
import { LuminanceMaterial } from "../materials/LuminanceMaterial.js";
import { Resolution } from "../utils/Resolution.js";

/**
 * A luminance pass.
 *
 * @group Passes
 */

export class LuminancePass extends Pass<LuminanceMaterial> {

	/**
	 * Constructs a new luminance pass.
	 */

	constructor() {

		super("LuminancePass");

		this.fullscreenMaterial = new LuminanceMaterial();
		const renderTarget = new WebGLRenderTarget(1, 1, { depthBuffer: false });
		this.output.defaultBuffer = renderTarget;

	}

	/**
	 * Alias for {@link output.defaultBuffer}.
	 */

	get renderTarget(): WebGLRenderTarget {

		return this.output.defaultBuffer as WebGLRenderTarget;

	}

	protected override onInputChange(): void {

		this.fullscreenMaterial.inputBuffer = this.input.defaultBuffer;

		if(this.input.frameBufferPrecisionHigh) {

			this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1";

		}

	}

	protected override onResolutionChange(resolution: Resolution): void {

		this.renderTarget.setSize(resolution.width, resolution.height);

	}

	render(): void {

		this.renderer?.setRenderTarget(this.renderTarget);
		this.renderFullscreen();

	}

}
