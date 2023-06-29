import { Color, BackSide } from "three";
import { LayerMaterial, Fresnel, Noise, Gradient, Displace, Depth } from "lamina/vanilla";

export const noise = new Noise({
  colorA: new Color("#bfabab"),
  colorB: new Color("#000000"),
  colorC: new Color("#000000"),
  colorD: new Color("#030303"),
  alpha: 0.25,
  scale: 500,
  type: "perlin",
  offset: [0, 0, 0],
  mapping: "local",
  mode: "normal",
  visible: true,
});

export class CustomLayerMaterial extends LayerMaterial {
  constructor(layers: Array<Depth | Displace | Fresnel>) {
    super({
      lighting: "physical",
      roughness: 0.1,
      transmission: 1,
      // @ts-expect-error - https://github.com/pmndrs/lamina/issues/25
      thickness: 2,
      layers,
    });
  }
}

export const sunMaterial = () => {
  const displace = new Displace({
    strength: 5,
    scale: 0.1,
    type: "perlin",
    offset: [0.09189000000357626, 0, 0],
    mode: "normal",
    visible: true,
  });
  const noise = new Noise({
    colorA: new Color("#b91c1c"),
    colorB: new Color("#d97706"),
    colorC: new Color("#b91c1c"),
    colorD: new Color("#ef4444"),
    alpha: 0.6,
    scale: 20,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#ef4444",
    lighting: "physical",
    alpha: 1,
    layers: [
      displace,
      noise,
      new Gradient({
        colorA: new Color("#ea580c"),
        colorB: new Color("#ff0000"),
        alpha: 0.4,
        contrast: 1,
        start: 1,
        end: -5,
        axes: "x",
        mapping: "world",
        visible: true,
      }),
      new Fresnel({
        color: new Color("#ff0000"),
        alpha: 0.2,
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
    displace,
  };
};

export const backgroundMaterial = new LayerMaterial({
  side: BackSide,
  fog: false,
  color: "#000000",
  lighting: "basic",
  layers: [
    noise,
    new Gradient({
      colorA: new Color("#000010"),
      colorB: new Color("#0000f5"),
      alpha: 0.2,
      contrast: 1,
      start: 1,
      end: -5,
      axes: "x",
      mapping: "local",
      visible: true,
    }),
    new Gradient({
      colorA: new Color("#060404"),
      colorB: new Color("#aa00ff"),
      alpha: 0.1,
      contrast: 1,
      start: 1,
      end: -3,
      axes: "y",
      mapping: "local",
      visible: true,
    }),
    new Gradient({
      colorA: new Color("#030202"),
      colorB: new Color("#5b14ff"),
      alpha: 0,
      contrast: 1,
      start: 1,
      end: -1,
      axes: "z",
      mapping: "local",
      visible: true,
    }),
  ],
});

const material1 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#910404",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.4,
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
const material2 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#8a0f59",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.4,
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
const material3 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#0e899c",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.5,
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
const material4 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#a16e16",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
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
const material5 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#184d96",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.8,
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
const material6 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#007878",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.4,
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
const material7 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#2b2705",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.4,
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
const material8 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#2c0f47",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#000000"),
        alpha: 0.4,
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
    noise,
  };
};

const material9 = () => {
  const noise = new Noise({
    colorA: new Color("#aaaaaa"),
    colorB: new Color("#aaaaaa"),
    colorC: new Color("#000000"),
    colorD: new Color("#000000"),
    alpha: 0.1,
    scale: 30,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#1c1917",
    lighting: "physical",
    layers: [
      noise,
      new Fresnel({
        color: new Color("#666666"),
        alpha: 0.4,
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
    noise,
  };
};

export const materials = [
  material1,
  material2,
  material3,
  material4,
  material5,
  material6,
  material7,
  material8,
  material9,
];
