import { AmbientLight } from "./AmbientLight";
import { DiffuseLight } from "./DiffuseLight";
import { SpecularLight } from "./SpecularLight";

export class SceneLightning {
    private diffuseLights: DiffuseLight[] = [];
    private specularLights: SpecularLight[] = [];
    private ambient: AmbientLight;

    constructor(private readonly gl, private readonly shaderProgram) {}

    setAmbientLight(factor) {
        this.ambient = new AmbientLight();
        this.ambient.setup(this.gl, this.shaderProgram, factor);
    }

    addDiffuseLight(position, color, factor) {
        const light = new DiffuseLight();
        light.setup(
            this.gl,
            this.shaderProgram,
            this.diffuseLights.length,
            position,
            color,
            factor
        );
        this.diffuseLights.push(light);
    }

    addSpecularLight(position, color, factor, materialColor, shininess) {
        const light = new SpecularLight();
        light.setup(
            this.gl,
            this.shaderProgram,
            this.specularLights.length,
            position,
            color,
            factor,
            materialColor,
            shininess
        );
        this.specularLights.push(light);
    }

    draw() {
        const enableLights = this.gl.getUniformLocation(
            this.shaderProgram,
            "uEnableLighting"
        );
        this.gl.uniform1i(enableLights, 1);

        const numberOfDiffuseLights = this.gl.getUniformLocation(
            this.shaderProgram,
            "numberOfDiffuseLights"
        );
        this.gl.uniform1i(numberOfDiffuseLights, this.diffuseLights.length);

        const numberOfSpecularLights = this.gl.getUniformLocation(
            this.shaderProgram,
            "numberOfSpecularLights"
        );
        this.gl.uniform1i(numberOfSpecularLights, this.specularLights.length);
    }
}
