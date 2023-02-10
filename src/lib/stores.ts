import { tweened } from "svelte/motion";
import { derived, writable } from "svelte/store";
import { sineInOut } from "svelte/easing";
import { Camera, Vector3 } from "three";

export const tweenedOptions = {
  duration: 1500,
  easing: sineInOut,
};

export const zoomedIn = writable(false);

export const cameraClone = writable(new Camera());

export const ogCameraPosition = new Vector3(10, 5, 45);
export const ogTargetPosition = new Vector3(0, 0, 0);

export const camCopyPosition = writable(new Vector3());

export const cameraPosition = tweened(ogCameraPosition, tweenedOptions);
export const targetPosition = tweened(ogTargetPosition, tweenedOptions);

const contentString = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque sit amet porttitor eget. Erat velit scelerisque in dictum non consectetur a erat. In nulla posuere sollicitudin aliquam ultrices sagittis. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Elementum tempus egestas sed sed risus pretium quam vulputate. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Viverra vitae congue eu consequat ac felis donec et odio. In tellus integer feugiat scelerisque varius morbi enim nunc. Molestie nunc non blandit massa enim nec dui nunc mattis. Sit amet nisl suscipit adipiscing bibendum est. Enim lobortis scelerisque fermentum dui faucibus in. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Feugiat nisl pretium fusce id velit ut tortor pretium. Auctor elit sed vulputate mi. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet.

Sed ullamcorper morbi tincidunt ornare massa eget. Lacus vel facilisis volutpat est velit. Morbi tristique senectus et netus. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Proin fermentum leo vel orci porta non. Turpis egestas pretium aenean pharetra magna. Aliquam eleifend mi in nulla. Malesuada pellentesque elit eget gravida cum sociis natoque. Auctor neque vitae tempus quam. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Lobortis mattis aliquam faucibus purus in. Adipiscing enim eu turpis egestas pretium aenean pharetra. Nulla facilisi morbi tempus iaculis urna id. Urna cursus eget nunc scelerisque viverra. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Congue eu consequat ac felis donec et. Egestas congue quisque egestas diam in arcu cursus euismod quis. Vel eros donec ac odio tempor. Est ante in nibh mauris cursus mattis molestie a iaculis.

Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Nulla porttitor massa id neque aliquam vestibulum morbi. Diam maecenas ultricies mi eget mauris. Enim ut tellus elementum sagittis vitae et leo duis ut. Elementum tempus egestas sed sed. Ut pharetra sit amet aliquam id diam. Mauris a diam maecenas sed. Id nibh tortor id aliquet lectus proin nibh nisl. Dignissim suspendisse in est ante in nibh mauris. Elementum nibh tellus molestie nunc non blandit massa enim. Nunc id cursus metus aliquam. Sit amet mauris commodo quis imperdiet massa. Quis vel eros donec ac odio tempor orci. Sed lectus vestibulum mattis ullamcorper velit. Elementum eu facilisis sed odio morbi. Et ultrices neque ornare aenean euismod elementum nisi. Vestibulum morbi blandit cursus risus at ultrices. Habitant morbi tristique senectus et netus et malesuada fames.

Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Eu nisl nunc mi ipsum faucibus. Non arcu risus quis varius quam. A erat nam at lectus urna duis convallis convallis tellus. Donec et odio pellentesque diam volutpat. Rhoncus dolor purus non enim praesent elementum. Urna porttitor rhoncus dolor purus non. Pellentesque diam volutpat commodo sed egestas. Cras tincidunt lobortis feugiat vivamus at. Ultrices sagittis orci a scelerisque purus semper. Odio euismod lacinia at quis. Ultrices in iaculis nunc sed augue lacus viverra vitae. In vitae turpis massa sed elementum tempus egestas sed. Amet mauris commodo quis imperdiet massa tincidunt nunc. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero.

In eu mi bibendum neque egestas congue. Diam quam nulla porttitor massa. Eros donec ac odio tempor orci. Dui id ornare arcu odio ut sem. Vitae congue eu consequat ac. Tellus elementum sagittis vitae et leo. Eu consequat ac felis donec et odio. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Tellus elementum sagittis vitae et leo duis. Tempor commodo ullamcorper a lacus vestibulum. Aenean et tortor at risus viverra. Viverra ipsum nunc aliquet bibendum. Volutpat est velit egestas dui.
`;

export const pageContent = writable({
  title: "MindFuture",
  content: contentString,
  link: "hyperlink",
});
