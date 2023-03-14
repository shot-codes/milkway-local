<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { HTML, Text } from "@threlte/extras";
  import type { Group } from "three";

  const { camera } = useThrelte();
  export let radius = 1;
  export let text = "";
  export let content = "";
  export let showDetails = false;
  export let opacity = 1;
  let group: Group;

  let rot: [number, number, number] = [0, 0, 0];

  useFrame(() => {
    if (group) {
      group.lookAt($camera.position);
    }
  });
</script>

<T.Group>
  <T.Group rotation={rot} bind:ref={group}>
    <T.Group position={[radius + 0.2 * radius, radius + 0.2 * radius, 0]}>
      <Text
        {text}
        anchorX={"right"}
        scale={5}
        font={"fonts/space.woff"}
        position={{ x: 3.0, y: 0.6 }}
        fillOpacity={opacity}
      />
      {#if showDetails && content}
        <HTML transform scale={0.8} position={{ x: 0, y: -0.2 }}>
          <div class="absolute text-sm bg-neutral-900/80 rounded-sm p-1 px-3 w-48">{content}</div>
        </HTML>
      {/if}
      <T.Group rotation.z={-225 * DEG2RAD}>
        <T.Mesh position.y={radius}>
          <T.CylinderGeometry args={[0.01, 0.01, radius * 2, 32]} />
          <T.MeshBasicMaterial {opacity} transparent={true} />
        </T.Mesh>
      </T.Group>
      <T.Group rotation.z={-90 * DEG2RAD}>
        <T.Mesh position.y={1.5}>
          <T.CylinderGeometry args={[0.01, 0.01, 3, 32]} />
          <T.MeshBasicMaterial {opacity} transparent={true} />
        </T.Mesh>
      </T.Group>
    </T.Group>
  </T.Group>
</T.Group>
