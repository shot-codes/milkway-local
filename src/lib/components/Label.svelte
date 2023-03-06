<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Text } from "@threlte/extras";
  import type { Group } from "three";

  const { camera } = useThrelte();
  export let radius = 1;
  export let text = "";
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
      <Text {text} scale={5} font={"fonts/space.woff"} position={{ x: 0.1, y: 0.6 }} />
      <T.Group rotation.z={-225 * DEG2RAD}>
        <T.Mesh position.y={radius}>
          <T.CylinderGeometry args={[0.02, 0.02, radius * 2, 32]} />
          <T.MeshBasicMaterial />
        </T.Mesh>
      </T.Group>
      <!-- <T.Group rotation.z={-90 * DEG2RAD}>
            <T.Mesh  position.y={0.9}>
              <T.CylinderGeometry args={[0.02, 0.02, 1.8, 32]}/>
              <T.MeshBasicMaterial/>
            </T.Mesh>
          </T.Group> -->
    </T.Group>
  </T.Group>
</T.Group>
