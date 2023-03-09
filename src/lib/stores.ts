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

export const ogCameraPosition = new Vector3(0, 10, 55);
export const ogTargetPosition = new Vector3(0, 0, 0);

export const camCopyPosition = writable(new Vector3());

export const cameraPosition = tweened(ogCameraPosition, tweenedOptions);
export const targetPosition = tweened(ogTargetPosition, tweenedOptions);
