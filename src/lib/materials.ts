import { Color } from "three";
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
