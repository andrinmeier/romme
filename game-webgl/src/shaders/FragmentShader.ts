const fragmentShader = `#version 300 es
precision mediump float;
in vec3 vColor;
out vec4 finalColor;

void main() {
    finalColor = vec4(vColor, 1);
}`;

export default fragmentShader;
