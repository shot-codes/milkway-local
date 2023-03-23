import { Color, BackSide, Vector2, RepeatWrapping } from "three";
import { LayerMaterial, Fresnel, Noise, Gradient, Displace, Depth } from "lamina/vanilla";
import { useTexture } from "@threlte/core";

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
      lighting: "toon",
      roughness: 0,
      transmission: 1,
      reflectivity: 1,
      // @ts-expect-error - https://github.com/pmndrs/lamina/issues/25
      thickness: 2,
      layers,
    });
  }
}

export const sunMaterial = () => {
  const displace = new Displace({
    strength: 6,
    scale: 0.1,
    type: "perlin",
    offset: [0.09189000000357626, 0, 0],
    mode: "normal",
    visible: true,
  });
  const noise = new Noise({
    colorA: new Color("#ffffff"),
    colorB: new Color("#883366"),
    colorC: new Color("#33ff55"),
    colorD: new Color("#0000ff"),
    alpha: 0.1,
    scale: 3,
    type: "cell",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });
  const material = new LayerMaterial({
    color: "#ea580c",
    lighting: "toon",
    layers: [
      displace,
      noise,
      new Gradient({
        colorA: new Color("#ea580c"),
        colorB: new Color("#ff0000"),
        alpha: 0.2,
        contrast: 1,
        start: 1,
        end: -5,
        axes: "x",
        mapping: "local",
        visible: true,
      }),
      new Fresnel({
        color: new Color("#ff0000"),
        alpha: 1,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });
  // const material = new CustomLayerMaterial([
  //   displace,
  //   new Depth({
  //     colorA: new Color("#ff0000"),
  //     colorB: new Color("#eab308"),
  //     alpha: 1,
  //     near: 2.4854,
  //     far: 0.7661999999999932,
  //     origin: [-0.4920000000000004, 0.4250000000000003, 0],
  //     mapping: "vector",
  //     mode: "reflect",
  //     visible: true,
  //   }),
  //   new Fresnel({
  //     color: new Color("#eab308"),
  //     alpha: 1,
  //     power: 3.3699999999999903,
  //     intensity: 3.8999999999999946,
  //     bias: 2.3430000000000002,
  //     mode: "reflect",
  //     visible: true,
  //   }),
  // ]);
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
      colorA: new Color("#000000"),
      colorB: new Color("#b400f5"),
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
      colorB: new Color("#ff5900"),
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
    // new Noise({
    //   colorA: new Color("#bfabab"),
    //   colorB: new Color("#000000"),
    //   colorC: new Color("#000000"),
    //   colorD: new Color("#030303"),
    //   alpha: 0.25,
    //   scale: 500,
    //   type: "perlin",
    //   offset: [0,0,0],
    //   mapping: "local",
    //   mode: "normal",
    //   visible: true,
    // }),
  ],
});

const material1 = () => {
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
    lighting: "toon",
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
const material2 = () => {
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
    lighting: "toon",
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
const material3 = () => {
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
    lighting: "toon",
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
const material4 = () => {
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
    lighting: "toon",
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
const material5 = () => {
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
    lighting: "toon",
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
const material6 = () => {
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
    lighting: "toon",
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
const material7 = () => {
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
    lighting: "toon",
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
const material8 = () => {
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
    lighting: "toon",
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

const material9 = () => {
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
    lighting: "toon",
    layers: [
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

const mf1Color = useTexture("/textures/MindFuture/diffuse2.png");
const mf1Normal = useTexture("/textures/MindFuture/normal2.png");
const mf1Displace = useTexture("/textures/MindFuture/height2.png");

mf1Color.wrapS = RepeatWrapping;
mf1Color.wrapT = RepeatWrapping;
mf1Normal.wrapS = RepeatWrapping;
mf1Normal.wrapT = RepeatWrapping;
mf1Displace.wrapS = RepeatWrapping;
mf1Displace.wrapT = RepeatWrapping;

mf1Color.repeat = new Vector2(2, 2);
mf1Normal.repeat = new Vector2(2, 2);
mf1Displace.repeat = new Vector2(2, 2);

export const moonMaterials = [{ color: mf1Color, normal: mf1Normal, displace: mf1Displace }];
