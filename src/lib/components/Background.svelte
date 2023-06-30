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
        scale: 300,
        type: "perlin",
        offset: [0, 0, 0],
        mapping: "local",
        mode: "normal",
        visible: true,
      }),

      new Gradient({
        colorA: new Color("#003950"),
        colorB: new Color("#000000"),
        alpha: 0.2,
        contrast: 1.5,
        start: 1,
        end: -2,
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
    <T.SphereGeometry args={[1, 64, 64]} />
  </T.Mesh>
</T.Group>
