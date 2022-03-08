const fragmentShader = `
precision mediump float;
uniform vec3 color;
uniform bool enableLighting;
varying vec3 normalEye;
varying vec3 positionEye3;
varying vec3 vColor;

struct AmbientLight {
    float factor;
};
uniform AmbientLight ambientLight;

struct DiffuseLight {
    vec3 position;
    vec3 color;
    float factor;
};
uniform DiffuseLight diffuseLights[10];
uniform int numberOfDiffuseLights;

struct SpecularLight {
    vec3 position;
    vec3 color;
    float factor;
    float shininess;
    vec3 materialColor;
};
uniform SpecularLight specularLights[10];
uniform int numberOfSpecularLights;

const int MAX_ITERATIONS = 100;

vec3 calculateAmbientColor(vec3 baseColor) {
    return ambientLight.factor * baseColor.rgb;
}

vec3 calculateDiffuseColor(vec3 baseColor) {
    vec3 normal = normalize(normalEye);
    vec3 diffuseColor = vec3(0, 0, 0);
    for (int i = 0; i < MAX_ITERATIONS; i++)
    {
        if (i >= numberOfDiffuseLights) {
            break;
        }
        DiffuseLight diffuseLight = diffuseLights[i];
        vec3 lightDirectionEye = normalize(diffuseLight.position - positionEye3);
        float cosTheta = clamp(dot(normal, lightDirectionEye), 0.0, 1.0);
        diffuseColor += baseColor.rgb * diffuseLight.color * diffuseLight.factor * cosTheta;
    }
    return diffuseColor;
}

vec3 calculateSpecularColor() {
    vec3 normal = normalize(normalEye);
    vec3 specularColor = vec3(0, 0, 0);
    for (int i = 0; i < MAX_ITERATIONS; i++)
    {
        if (i >= numberOfSpecularLights) {
            break;
        }
        SpecularLight specularLight = specularLights[i];
        vec3 lightDirectionEye = normalize(specularLight.position - positionEye3);
        if (dot(normal, lightDirectionEye) > 0.0) {
            vec3 reflectionDir = normalize(reflect(-lightDirectionEye, normal));
            vec3 eyeDir = -normalize(positionEye3);
            float cosPhi = clamp(dot(reflectionDir, eyeDir), 0.0, 1.0);
            specularColor += specularLight.factor * specularLight.color * specularLight.materialColor * pow(cosPhi, specularLight.shininess);
        }
    }
    return specularColor;
}


void main() {
    vec3 baseColor = vColor;
    if (enableLighting) {
        vec3 color = calculateAmbientColor(baseColor) + calculateDiffuseColor(baseColor) + calculateSpecularColor();
        gl_FragColor = vec4(color, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}`;

export default fragmentShader;
