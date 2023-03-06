import { Color } from "three";
import { LayerMaterial, Depth, Displace, Fresnel, Noise } from "lamina/vanilla";

export class CustomLayerMaterial extends LayerMaterial {
  constructor(layers: Array<Depth | Displace | Fresnel>) {
    super({
      lighting: "physical",
      roughness: 0,
      transmission: 0.99,
      reflectivity: 0.15,
      // @ts-expect-error - https://github.com/pmndrs/lamina/issues/25
      thickness: 2,
      layers,
    });
  }
}

// Mindfuture
export const sunMaterial = () => {
  const displace = new Displace({
    strength: 12,
    scale: 0.1,
    type: "perlin",
    offset: [0.09189000000357626, 0, 0],
    mode: "normal",
    visible: true,
  });
  const material = new CustomLayerMaterial([
    displace,
    new Depth({
      colorA: new Color("#000000"),
      colorB: new Color("#000000"),
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

export const material1 = () => {
  const noise = new Noise({
    colorA: new Color("#ffffff"),
    colorB: new Color("#883366"),
    colorC: new Color("#33ff55"),
    colorD: new Color("#0000ff"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#FF2327",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#ff00ff"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material2 = () => {
  const noise = new Noise({
    colorA: new Color("#1720a8"),
    colorB: new Color("#9428a9"),
    colorC: new Color("#f2feeb"),
    colorD: new Color("#f0fef4"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#5ea1fd",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#fc0000"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material3 = () => {
  const noise = new Noise({
    colorA: new Color("#0000ff"),
    colorB: new Color("#fff000"),
    colorC: new Color("#0000ff"),
    colorD: new Color("#0000ff"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#00ff00",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#ffff00"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material4 = () => {
  const noise = new Noise({
    colorA: new Color("#d23923"),
    colorB: new Color("#442211"),
    colorC: new Color("#00ff00"),
    colorD: new Color("#0000ff"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#dd9922",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#ffffff"),
        alpha: 0.3,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material5 = () => {
  const noise = new Noise({
    colorA: new Color("#ffffff"),
    colorB: new Color("#ffffff"),
    colorC: new Color("#ff00ff"),
    colorD: new Color("#ff00ff"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#3388ff",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#00ffff"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material6 = () => {
  const noise = new Noise({
    colorA: new Color("#000000"),
    colorB: new Color("#000000"),
    colorC: new Color("#dcdd10"),
    colorD: new Color("#dcdd10"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#00ffff",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#ff00ff"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material7 = () => {
  const noise = new Noise({
    colorA: new Color("#ff00ff"),
    colorB: new Color("#000000"),
    colorC: new Color("#ffffff"),
    colorD: new Color("#ffffff"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#ffe910",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#ffff00"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material8 = () => {
  const noise = new Noise({
    colorA: new Color("#0000ff"),
    colorB: new Color("#0000ff"),
    colorC: new Color("#dcdd10"),
    colorD: new Color("#dcdd10"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#6000bb",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#ff00ff"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    noise,
  };
};

export const material9 = () => {
  const displace = new Displace({
    strength: 1.1,
    scale: 0.4,
    type: "perlin",
    offset: [-100, 200, -100],
    mode: "normal",
    visible: true,
  });
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 3,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#000000",
    lighting: "physical",
    layers: [
      displace,
      noise,
      new Fresnel({
        color: new Color("#bbbbbb"),
        alpha: 1,
        power: 2,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  return {
    material,
    displace,
    noise,
  };
};
