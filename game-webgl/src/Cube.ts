import { mat4 } from "gl-matrix";

export class Cube {
    constructor(
        private readonly context: WebGL2RenderingContext,
        private readonly shaderProgram: WebGLProgram
    ) {}

    defineVertices() {
        // define the vertices of the cube
        const vertices = [
            // back
            0.0,
            0.0,
            0.0, // v0
            1,
            0.0,
            0.0, // v1
            1,
            1,
            0, // v2
            0,
            1,
            0, // v3
            // front
            0,
            0,
            1, // v4
            1,
            0,
            1, // v5
            1,
            1,
            1, // v6
            0,
            1,
            1, // v7
            // right
            1,
            0,
            0, // v8 = v1
            1,
            1,
            0, // v9 = v2
            1,
            1,
            1, // v10 = v6
            1,
            0,
            1, // v11 = v5
            // left
            0,
            0,
            0, // v12 = v0
            0,
            1,
            0, // v13 = v3
            0,
            1,
            1, // v14 = v7
            0,
            0,
            1, // v15 = v4
            // top
            0,
            1,
            0, // v16 = v3
            0,
            1,
            1, // v17 = v7
            1,
            1,
            1, // v18 = v6
            1,
            1,
            0, // v19 = v2
            //bottom
            0,
            0,
            0, // v20 = v0
            0,
            0,
            1, // v21 = v4
            1,
            0,
            1, // v22 = v5
            1,
            0,
            0 // v23 = v1
        ];
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(vertices),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    defineSides() {
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
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(vertexIndices),
            this.context.STATIC_DRAW
        );

        return buffer;
    }

    defineColors(
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
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(allSides),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    defineTextureCoord() {
        const textureCoords = [
            0.0,
            0.0, // back
            1.0,
            0.0,
            1.0,
            1.0,
            0.0,
            1.0,
            // front
            0.0,
            0.0,
            1.0,
            0.0,
            1.0,
            1.0,
            0.0,
            1.0,
            // right
            0.0,
            0.0,
            1.0,
            0.0,
            1.0,
            1.0,
            0.0,
            1.0,
            // left
            0.0,
            0.0,
            1.0,
            0.0,
            1.0,
            1.0,
            0.0,
            1.0,
            // top
            0.0,
            0.0,
            1.0,
            0.0,
            1.0,
            1.0,
            0.0,
            1.0,
            // bottom
            0.0,
            0.0,
            1.0,
            0.0,
            1.0,
            1.0,
            0.0,
            1.0
        ];
        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(textureCoords),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    defineNormals() {
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

        const buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(allSidesNormal),
            this.context.STATIC_DRAW
        );
        return buffer;
    }

    draw() {
        const modelMatrix = mat4.create();
        mat4.translate(modelMatrix, modelMatrix, [128, 128, 0]);
        mat4.scale(modelMatrix, modelMatrix, [50, 50, 2]);
        const matrixId = this.context.getUniformLocation(
            this.shaderProgram,
            "modelMatrix"
        );
        this.context.uniformMatrix4fv(matrixId, false, modelMatrix);
        const bufferVertices = this.defineVertices();
        const bufferSides = this.defineSides();
        const bufferColors = this.defineColors(
            [1.0, 1.0, 0.0],
            [1.0, 1.0, 0.0],
            [1.0, 1.0, 0.0],
            [1.0, 1.0, 0.0],
            [1.0, 1.0, 0.0],
            [1.0, 1.0, 0.0]
        );

        // position
        this.context.bindBuffer(this.context.ARRAY_BUFFER, bufferVertices);
        const positionId = this.context.getAttribLocation(
            this.shaderProgram,
            "position"
        );
        this.context.vertexAttribPointer(
            positionId,
            3,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(positionId);

        // color buffer
        const colorId = this.context.getAttribLocation(
            this.shaderProgram,
            "color"
        );

        this.context.bindBuffer(this.context.ARRAY_BUFFER, bufferColors);
        this.context.vertexAttribPointer(
            colorId,
            3,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(colorId);

        // bind the element array
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, bufferSides);
        this.context.drawElements(
            this.context.TRIANGLES,
            36,
            this.context.UNSIGNED_SHORT,
            0
        );
    }
}