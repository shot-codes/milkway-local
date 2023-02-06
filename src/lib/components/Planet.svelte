<script lang="ts">
  import { Vector3, Color, MeshPhysicalMaterial } from "three";
  import { useThrelte, T, InteractiveObject } from "@threlte/core";
  import { HTML } from "@threlte/extras";
  import { cameraPosition, targetPosition, ogTargetPosition, camCopyPosition } from "$lib/stores";
  import { onDestroy } from "svelte";
  import { spring } from "svelte/motion";
  import { Float } from "@threlte/extras";

  export let position: [number, number, number];

  const { camera } = useThrelte();

  const red = new Color("#FF3E00").convertSRGBToLinear();
  const blue = new Color("#0000ff").convertSRGBToLinear();

  let material = new MeshPhysicalMaterial({
    color: red,
    reflectivity: 0.5,
    metalness: 0.3,
    roughness: 0.4,
    transmission: 0.4,
    transparent: true,
    opacity: 1,
  });
  onDestroy(() => {
    material.dispose();
  });

  const scale = spring(1);

  const onPointerEnter = () => {
    material.color = blue;
    scale.set(1.1);
  };

  const onPointerLeave = () => {
    material.color = red;
    scale.set(1);
  };

  const onClick = () => {
    camCopyPosition.set(new Vector3(position[0] * 8, position[1] * 8 + 4, position[2] * 8)); // This is to save current camera position right when you click the button "Move camera"
    cameraPosition.set($camera.position.clone(), { duration: 0 }); // Set the cameraPosition to the same value as above so the tweened store starts from there (This is to avoid the jump)
    cameraPosition.set(new Vector3(position[0] * 3, position[1] * 3, position[2] * 3));
    targetPosition.set(new Vector3(position[0], position[1], position[2]));
    console.log($targetPosition);
  };

  const onClickBack = () => {
    cameraPosition.set($camera.position.clone(), { duration: 0 }); // Set the cameraPosition to the current spot to avoid the jump
    cameraPosition.set($camCopyPosition); // Now return back to the same spot as before clicking the "Move camera" button
    targetPosition.set(ogTargetPosition);
  };
</script>

<!-- Planet -->
<Float floatIntensity={0.3}>
  <T.Group {position}>
    <T.Mesh let:ref {material} scale={$scale}>
      <InteractiveObject
        object={ref}
        interactive
        on:click={onClick}
        on:pointerenter={onPointerEnter}
        on:pointerleave={onPointerLeave}
      />
      <T.SphereGeometry />
    </T.Mesh>
  </T.Group>
</Float>

<!-- Back Button -->
<HTML
  position={{ x: position[0] * 1.5, y: position[1] - 0.5, z: position[2] * 1.5 }}
  rotation={{ y: 0.3 }}
  transform
  distanceFactor={1}
>
  <button on:click={onClickBack}>Reset camera</button>
</HTML>

<style>
  button {
    background-color: blue;
    padding: 10px;
    font-size: 16px;
  }
</style>
