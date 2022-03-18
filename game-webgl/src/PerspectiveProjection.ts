import { mat3, mat4, vec3 } from "gl-matrix";
import { Angle } from "./Angle";
import { NormalizedScreenPoint2D } from "./NormalizedScreenPoint2D";
import { Vector3D } from "./Vector3D";

export class PerspectiveProjection {
    private readonly matrixId;
    private readonly projectionMatrix: mat4;

    constructor(private readonly context: any, shaderProgram: any) {
        this.matrixId = context.getUniformLocation(
            shaderProgram,
            "projectionMatrix"
        );
        this.projectionMatrix = mat4.create();
    }

    resize(width: number, height: number) {
        mat4.perspective(
            this.projectionMatrix,
            Angle.fromDegrees(95).rad,
            width / height,
            5,
            256 + 10 * 5
        );
    }

    getRayFromCameraThroughPixel(pixel: NormalizedScreenPoint2D): Vector3D {
        const M = mat3.create();
        const p4 = vec3.fromValues(
            this.projectionMatrix[0][3],
            this.projectionMatrix[1][3],
            this.projectionMatrix[2][3]
        );
        mat3.fromMat4(M, this.projectionMatrix);
        const Minv = mat3.create();
        mat3.invert(Minv, M);
        const Minvneg = mat3.create();
        mat3.multiplyScalar(Minvneg, Minv, -1);
        const camera_center_3x1 = vec3.create();
        vec3.transformMat3(camera_center_3x1, p4, Minvneg);
        const sub_pixels_homo_3xn = vec3.fromValues(pixel.x, pixel.y, 1);
        const ray_dir = vec3.create();
        vec3.transformMat3(ray_dir, sub_pixels_homo_3xn, Minv);
        return new Vector3D(ray_dir[0], ray_dir[1], ray_dir[2]);
    }

    activate() {
        this.context.uniformMatrix4fv(
            this.matrixId,
            false,
            this.projectionMatrix
        );
    }
}
