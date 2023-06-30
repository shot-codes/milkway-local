<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { LayerMaterial, Gradient, Noise } from "lamina/vanilla";
  import { Color, BackSide } from "three";

  // let x = 0;

  const material = new LayerMaterial({
    side: BackSide,
    fog: false,
    color: "#000000",
    lighting: "basic",
    layers: [
      new Noise({
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
      }),
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

  useFrame(() => {
    // x += 0.00002;
    // @ts-ingore unknown prop for some reason. Its there at runtime.
    // noise.offset = [x, -x, x];
  });
</script>

<T.Group rotation.x={90 * DEG2RAD} rotation.y={180 * DEG2RAD}>
  <T.Mesh {material} scale={1000}>
    <T.SphereGeometry />
  </T.Mesh>
</T.Group>
