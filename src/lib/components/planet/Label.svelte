<script lang="ts">
  import { T, useThrelte, useFrame } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import type { Group } from "three";

  const { camera } = useThrelte();
  export let radius = 1;
  export let text = "";
  export let content = "";
  export let opacity = 0;
  let group: Group;

  let rot: [number, number, number] = [0, 0, 0];

  useFrame(() => {
    group?.lookAt($camera.position);
  });
</script>

<T.Group>
  <T.Group rotation={rot} bind:ref={group}>
    <T.Group position={[0, radius + 0.8, 0]}>
      <Text
        {text}
        curveRadius={100}
        anchorX={"center"}
        anchorY={"bottom"}
        scale={10}
        font={"fonts/space.woff"}
        fillOpacity={opacity}
        ignorePointer={true}
      />
    </T.Group>
    <T.Group position={[0, radius + 0.2, 0]}>
      <Text
        text={content}
        anchorX={"center"}
        anchorY={"bottom"}
        scale={6}
        font={"fonts/space.woff"}
        fillOpacity={opacity}
        ignorePointer={true}
      />
    </T.Group>
  </T.Group>
</T.Group>
