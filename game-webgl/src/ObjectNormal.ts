export class ObjectNormal {
    private readonly id: any;
    private readonly buffer: any;

    constructor(readonly context: any, shaderProgram: any) {
        this.id = context.getAttribLocation(shaderProgram, "normal");
        this.buffer = context.createBuffer();
    }

    setValues(values: number[]) {
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
        this.context.bufferData(
            this.context.ARRAY_BUFFER,
            new Float32Array(values),
            this.context.STATIC_DRAW
        );
    }

    activate() {
        this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
        this.context.vertexAttribPointer(
            this.id,
            2,
            this.context.FLOAT,
            false,
            0,
            0
        );
        this.context.enableVertexAttribArray(this.id);
    }
}
