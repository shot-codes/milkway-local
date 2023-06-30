<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import type { Group } from "three";

  const { camera } = useThrelte();
  export let radius = 1;
  export let text = "";
  export let opacity = 0;
  export let position: [number, number, number];

  let group: Group;
  let rot: [number, number, number] = [0, 0, 0];

  useFrame(() => {
    group?.lookAt($camera.position);
  });
</script>

<T.Group {position}>
  <T.Group rotation={rot} bind:ref={group}>
    <T.Group position={[0, radius, 0]}>
      <Text
        {text}
        anchorX={"center"}
        anchorY={"bottom"}
        scale={5}
        font={"fonts/space.woff"}
        fillOpacity={opacity}
        ignorePointer={true}
      />
    </T.Group>
  </T.Group>
</T.Group>
