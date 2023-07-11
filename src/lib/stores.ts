import { tweened } from "svelte/motion";
import { derived, writable } from "svelte/store";
import { sineInOut } from "svelte/easing";
import { Camera } from "three";

export const tweenedOptions = {
  duration: 1500,
  easing: sineInOut,
};

export const zoomedIn = writable(false);
export const zoomedInWithDelay = derived(zoomedIn, ($zoomedIn, set) => {
  if ($zoomedIn == true) {
    setTimeout(() => set($zoomedIn), 1500);
  } else {
    set($zoomedIn);
  }
});
export const activePlanet = writable("");
export const contentMax = writable(0);

// @ts-expect-error TS complains about calling the abstract Camera class, but it works fine.
export const cameraClone = writable(new Camera());

export const ogCameraPosition: [number, number, number] = [0, 10, 70];
export const ogTargetPosition: [number, number, number] = [0, 0, 0];

export const camCopyPosition = writable<[number, number, number]>([0, 0, 0]);

export const cameraPosition = tweened(ogCameraPosition, tweenedOptions);
export const cameraPositionScrollMax = writable(0);
export const targetPosition = tweened(ogTargetPosition, tweenedOptions);
export const zooming = writable(false);
