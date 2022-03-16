import { mat4 } from "gl-matrix";
import { Angle } from "./Angle";

export class PerspectiveProjection {
    private readonly matrixId;

    constructor(private readonly context: any, shaderProgram: any) {
        this.matrixId = context.getUniformLocation(
            shaderProgram,
            "projectionMatrix"
        );
    }

    setValues(fovY: Angle, aspectRatio: number, near: number, far: number) {
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, fovY.rad, aspectRatio, near, far);
        this.context.uniformMatrix4fv(this.matrixId, false, projectionMatrix);
    }
}
