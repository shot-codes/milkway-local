<script lang="ts">
  import {
    Color,
    PointsMaterial,
    AdditiveBlending,
    Float32BufferAttribute,
    Vector3,
    BufferGeometry,
    Points,
  } from "three";
  import { T } from "@threlte/core";
  import { WebGLRenderer, Clock } from "three";
  import { onDestroy } from "svelte";
  export let position: [number, number, number];

  const sunMaterial = () => {
    let gu = {
      time: { value: 0 },
    };

    let sizes: Array<number> = [];
    let shift: Array<number> = [];
    let pushShift = (isSun: Boolean) => {
      if (isSun) {
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
    };

    let pts = new Array(0);

    for (let i = 0; i < 200; i++) {
      let r = 7,
        R = 22;
      let rand = Math.pow(Math.random(), 1.5);
      let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
      pts.push(
        new Vector3().setFromCylindricalCoords(
          radius,
          Math.random() * 2 * Math.PI,
          (Math.random() - 0.5) * 4
        )
      );
      sizes.push(Math.random() * 1.5 + 0.5);
      pushShift(false);
    }

    let g = new BufferGeometry().setFromPoints(pts);
    g.setAttribute("sizes", new Float32BufferAttribute(sizes, 1));
    g.setAttribute("shift", new Float32BufferAttribute(shift, 4));

    const material = new PointsMaterial({
      size: 0.125,
      transparent: true,
      depthTest: true,
      blending: AdditiveBlending,
    });
    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = gu.time;
      shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `
        .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
        .replace(
          `#include <color_vertex>`,
          `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
        )
        .replace(
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
    `
        .replace(
          `#include <clipping_planes_fragment>`,
          `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `
        )
        .replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
        );
      //console.log(shader.fragmentShader);
    };

    return {
      material,
      g,
      gu,
    };
  };

  const { material, g, gu } = sunMaterial();
  let renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
  });
  let clock = new Clock();
  renderer.setAnimationLoop(() => {
    let t = clock.getElapsedTime() * 0.5;
    gu.time.value = t * Math.PI;
  });
  onDestroy(() => {
    material.dispose();
  });
</script>

<!-- SUN -->
<T.Group {position}>
  <T.Mesh {material}>
    <T.Points geometry={g} {material} />
  </T.Mesh>
</T.Group>
