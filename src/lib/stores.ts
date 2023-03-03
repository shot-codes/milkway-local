import { tweened } from "svelte/motion";
import { writable } from "svelte/store";
import { sineInOut } from "svelte/easing";
import { Camera, Vector3 } from "three";

export const tweenedOptions = {
  duration: 1500,
  easing: sineInOut,
};

export const zoomedIn = writable(false);
export const activePlanet = writable("");

export const cameraClone = writable(new Camera());

export const ogCameraPosition = new Vector3(10, 5, 45);
export const ogTargetPosition = new Vector3(0, 0, 0);

export const camCopyPosition = writable(new Vector3());

export const cameraPosition = tweened(ogCameraPosition, tweenedOptions);
export const targetPosition = tweened(ogTargetPosition, tweenedOptions);

const contentString = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque sit amet porttitor eget. Erat velit scelerisque in dictum non consectetur a erat. In nulla posuere sollicitudin aliquam ultrices sagittis. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Elementum tempus egestas sed sed risus pretium quam vulputate. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Viverra vitae congue eu consequat ac felis donec et odio. In tellus integer feugiat scelerisque varius morbi enim nunc. Molestie nunc non blandit massa enim nec dui nunc mattis. Sit amet nisl suscipit adipiscing bibendum est. Enim lobortis scelerisque fermentum dui faucibus in. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Feugiat nisl pretium fusce id 
`;

export const pageContent = writable({
  title: "MindFuture",
  content: contentString,
  link: "hyperlink",
});
