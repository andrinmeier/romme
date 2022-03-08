import { ObjectColor } from "./ObjectColor";
import { ObjectNormal } from "./ObjectNormal";
import { ObjectPosition } from "./ObjectPosition";

export class Cube {
    private readonly vertices: any;
    private readonly edges: any;
    private readonly colors: any;
    private readonly normals: any;

    constructor(
        private readonly gl: any,
        private readonly objectPosition: ObjectPosition,
        private readonly objectColor: ObjectColor,
        private readonly objectNormal: ObjectNormal
    ) {
        this.vertices = this.defineVertices(gl);
        this.edges = this.defineEdges(gl);
        this.colors = this.defineColors(
            gl,
            [0.0, 0.0, 0.0],
            [0.5, 0.5, 0.5],
            [1.0, 1.0, 1.0],
            [1.0, 0, 0],
            [0, 1.0, 0],
            [0, 0, 1.0]
        );
        this.normals = this.defineNormals(gl);
    }

    private defineVertices(gl: any) {
        const vertices = [
            // back
            -0.5,
            -0.5,
            -0.5, // v0
            0.5,
            -0.5,
            -0.5, // v1
            0.5,
            0.5,
            -0.5, // v2
            -0.5,
            0.5,
            -0.5, // v3
            // front
            -0.5,
            -0.5,
            0.5, // v4
            0.5,
            -0.5,
            0.5, // v5
            0.5,
            0.5,
            0.5, // v6
            -0.5,
            0.5,
            0.5, // v7
            // right
            0.5,
            -0.5,
            -0.5, // v8 = v1
            0.5,
            0.5,
            -0.5, // v9 = v2
            0.5,
            0.5,
            0.5, // v10 = v6
            0.5,
            -0.5,
            0.5, // v11 = v5
            // left
            -0.5,
            -0.5,
            -0.5, // v12 = v0
            -0.5,
            0.5,
            -0.5, // v13 = v3
            -0.5,
            0.5,
            0.5, // v14 = v7
            -0.5,
            -0.5,
            0.5, // v15 = v4
            // top
            -0.5,
            0.5,
            -0.5, // v16 = v3
            -0.5,
            0.5,
            0.5, // v17 = v7
            0.5,
            0.5,
            0.5, // v18 = v6
            0.5,
            0.5,
            -0.5, // v19 = v2
            //bottom
            -0.5,
            -0.5,
            -0.5, // v20 = v0
            -0.5,
            -0.5,
            0.5, // v21 = v4
            0.5,
            -0.5,
            0.5, // v22 = v5
            0.5,
            -0.5,
            -0.5 // v23 = v1
        ];
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW
        );
        return buffer;
    }

    private defineEdges(gl: any) {
        // define the edges for the cube, there are 12 edges in a cube
        const vertexIndices = [
            0,
            2,
            1, // face 0 (back)
            2,
            0,
            3,
            4,
            5,
            6, // face 1 (front)
            4,
            6,
            7,
            8,
            9,
            10, // face 2 (right)
            10,
            11,
            8,
            12,
            15,
            14, // face 3 (left)
            14,
            13,
            12,
            16,
            17,
            18, // face 4 (top)
            18,
            19,
            16,
            20,
            23,
            22, // face 5 (bottom)
            22,
            21,
            20
        ];
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(vertexIndices),
            gl.STATIC_DRAW
        );

        return buffer;
    }

    private defineColors(
        gl,
        backColor,
        frontColor,
        rightColor,
        leftColor,
        topColor,
        bottomColor
    ) {
        // make 4 entries, one for each vertex
        const backSide = backColor.concat(backColor, backColor, backColor);
        const frontSide = frontColor.concat(frontColor, frontColor, frontColor);
        const rightSide = rightColor.concat(rightColor, rightColor, rightColor);
        const leftSide = leftColor.concat(leftColor, leftColor, leftColor);
        const topSide = topColor.concat(topColor, topColor, topColor);
        const bottomSide = bottomColor.concat(
            bottomColor,
            bottomColor,
            bottomColor
        );

        const allSides = backSide.concat(
            frontSide,
            rightSide,
            leftSide,
            topSide,
            bottomSide
        );
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(allSides),
            gl.STATIC_DRAW
        );
        return buffer;
    }

    private defineNormals(gl: any) {
        const backNormal = [0.0, 0.0, -1.0];
        const frontNormal = [0.0, 0.0, 1.0];
        const rightNormal = [1.0, 0.0, 0.0];
        const leftNormal = [-1.0, 0.0, 0.0];
        const topNormal = [0.0, 1.0, 0.0];
        const bottomNormal = [0.0, -1.0, 0.0];

        // make 4 entries, one for each vertex
        const backSideNormal = backNormal.concat(
            backNormal,
            backNormal,
            backNormal
        );
        const frontSideNormal = frontNormal.concat(
            frontNormal,
            frontNormal,
            frontNormal
        );
        const rightSideNormal = rightNormal.concat(
            rightNormal,
            rightNormal,
            rightNormal
        );
        const leftSideNormal = leftNormal.concat(
            leftNormal,
            leftNormal,
            leftNormal
        );
        const topSideNormal = topNormal.concat(topNormal, topNormal, topNormal);
        const bottomSideNormal = bottomNormal.concat(
            bottomNormal,
            bottomNormal,
            bottomNormal
        );

        const allSidesNormal = backSideNormal.concat(
            frontSideNormal,
            rightSideNormal,
            leftSideNormal,
            topSideNormal,
            bottomSideNormal
        );

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(allSidesNormal),
            gl.STATIC_DRAW
        );
        return buffer;
    }

    private draw() {
        this.objectPosition.setValues(this.vertices);
        this.objectPosition.activate();
        this.objectColor.setValues(this.colors);
        this.objectColor.activate();
        this.objectNormal.setValues(this.normals);
        this.objectNormal.activate();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.edges);
        this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
    }
}
