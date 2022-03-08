const vertexShader = `
attribute vec3 position;
attribute vec3 normal;
attribute vec3 color;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
varying vec3 normalEye;
varying vec3 positionEye3;
varying vec3 vColor;

void main () {
    vec4 vertexPositionEye4 = viewMatrix * modelMatrix * vec4(position, 1.0);
    positionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;
    normalEye = normalize(normalMatrix * normal);
    vColor = color;
    gl_Position = projectionMatrix * vertexPositionEye4;
}
`;
export default vertexShader;
