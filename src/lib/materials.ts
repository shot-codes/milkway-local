import { Color, PointsMaterial, AdditiveBlending, MultiplyBlending, Float32BufferAttribute, Vector3, BufferGeometry, Points } from "three";
import { LayerMaterial, Depth, Displace, Fresnel } from "lamina/vanilla";

export class CustomLayerMaterial extends LayerMaterial {
  constructor(layers: Array<Depth | Displace | Fresnel>) {
    super({
      lighting: "physical",
      roughness: 0.2,
      transmission: 0.5,
      reflectivity: 1,
      // @ts-expect-error - https://github.com/pmndrs/lamina/issues/25
      thickness: 0.4,
      layers,
    });
  }
}

// Mindfuture
export const mindfutureMaterials = () => {
  const displace = new Displace({
    strength: 0,
    scale: 3,
    type: "perlin",
    offset: [0.09189000000357626, 0, 0],
    mode: "normal",
    visible: true,
  });
  const material = new CustomLayerMaterial([
    displace,
    new Depth({
      colorA: new Color("#fc8eb2"),
      colorB: new Color("#007afc"),
      alpha: 0.5,
      near: 0.4854,
      far: 0.7661999999999932,
      origin: [-0.4920000000000004, 0.4250000000000003, 0],
      mapping: "vector",
      mode: "multiply",
      visible: true,
    }),
    new Fresnel({
      color: new Color("#fefefe"),
      alpha: 1,
      power: 3.3699999999999903,
      intensity: 3.8999999999999946,
      bias: -0.3430000000000002,
      mode: "screen",
      visible: true,
    }),
  ]);
  return {
    material,
    displace,
  };
};

export const sunMaterial = () => {
  let gu = {
    time: {value: 0}
  }
  
  let sizes = [];
  let shift = [];
  let pushShift = (bigger: Boolean) => {
    if (bigger) {
      shift.push(
        Math.random() * Math.PI, 
        Math.random() * Math.PI * 20, 
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 1
      );
    } else {
      shift.push(
        Math.random() * Math.PI, 
        Math.random() * Math.PI * 2, 
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 0.1
      );
    }
  }

  // THE SUN
  let pts = new Array(15000).fill().map(p => {
    sizes.push(Math.random() + 0.1);
    pushShift(true);
    return new Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 2);
  })

  // THE PARTICLES
  for(let i = 0; i < 2000; i++){
    let r = 12, R = 40;
    let rand = Math.pow(Math.random(), 1.5);
    let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
    pts.push(new Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2 ));
    sizes.push(Math.random() * 1.5 + 0.5);
    pushShift();
  }
  
  let g = new BufferGeometry().setFromPoints(pts);
  g.setAttribute("sizes", new Float32BufferAttribute(sizes, 1));
  g.setAttribute("shift", new Float32BufferAttribute(shift, 4));

  const material = new PointsMaterial({
    size: 0.125,
    transparent: true,
    depthTest: true,
    blending: AdditiveBlending,
    onBeforeCompile: shader => {
      shader.uniforms.time = gu.time;
      shader.vertexShader = `
        uniform float time;
        attribute float sizes;
        attribute vec4 shift;
        varying vec3 vColor;
        ${shader.vertexShader}
      `.replace(
        `gl_PointSize = size;`,
        `gl_PointSize = size * sizes;`
      ).replace(
        `#include <color_vertex>`,
        `#include <color_vertex>
          float d = length(abs(position) / vec3(40., 10., 40));
          d = clamp(d, 0., 1.);
          vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
        `
      ).replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
          float t = time;
          float moveT = mod(shift.x + shift.z * t, PI2);
          float moveS = mod(shift.y + shift.z * t, PI2);
          transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
        `
      );
      //console.log(shader.vertexShader);
      shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `#include <clipping_planes_fragment>
          float d = length(gl_PointCoord.xy - 0.5);
          //if (d > 0.5) discard;
        `
      ).replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
      );
      //console.log(shader.fragmentShader);
    }
  });

  return {
    material, g, gu
  }
}