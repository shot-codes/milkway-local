import { get } from "svelte/store";
import { Vector3 } from "three";
import {
  cameraPosition,
  targetPosition,
  cameraPositionScrollMax,
  ogTargetPosition,
  camCopyPosition,
  cameraClone,
  zoomedIn,
  activePlanet,
} from "$lib/stores";

export const orbitRadius = 25;

export const zoomIn = (position: [number, number, number]) => {
  camCopyPosition.set(new Vector3(position[0] * 2, 8, position[2] * 2)); // This is to save current camera position right when you click the button "Move camera"
  cameraPosition.set(get(cameraClone).position.clone(), { duration: 0 }); // Set the cameraPosition to the same value as above so the tweened store starts from there (This is to avoid the jump)
  cameraPosition.set(new Vector3(position[0] * 1.3, position[1] + 1, position[2] * 1.3));
  cameraPositionScrollMax.set(position[1] + 1);
  targetPosition.set(new Vector3(position[0], position[1] + 0.5, position[2]));
  zoomedIn.set(true);
};

export const zoomInSun = () => {
  const cam = get(cameraClone);
  camCopyPosition.set(
    new Vector3(0, 10, 50).applyAxisAngle(
      new Vector3(0, 1, 0),
      Math.atan2(cam.position.x, cam.position.z)
    )
  );
  targetPosition.set(new Vector3(0, 1, 0));
  cameraPosition.set(cam.position.clone(), { duration: 0 });
  cameraPosition.set(
    new Vector3(0, 2, 14).applyAxisAngle(
      new Vector3(0, 1, 0),
      Math.atan2(cam.position.x, cam.position.z)
    )
  );
  zoomedIn.set(true);
};

export const zoomOut = () => {
  cameraPosition.set(get(cameraClone).position.clone(), { duration: 0 }); // Set the cameraPosition to the current spot to avoid the jump
  cameraPosition.set(get(camCopyPosition)); // Now return back to the same spot as before clicking the "Move camera" button
  targetPosition.set(ogTargetPosition);
  zoomedIn.set(false);
  activePlanet.set("");
};

export enum Brand {
  ZibraHolding = "ZibraHolding",
  Confinze = "Confinze",
  ZibraFinans = "ZibraFinans",
  MindFuture = "MindFuture",
  Ocreveus = "Ocreveus",
  Paladin = "Paladin",
  Pleo = "Pleo",
  ZibraSport = "ZibraSport",
  ZibraTech = "ZibraTech",
}

export const planetLocations: Array<[number, number, number]> = [];
const numPlanets = 9;
for (let i = 0; i < numPlanets; i++) {
  planetLocations[i] = [
    orbitRadius * Math.cos(((i + 1) * 2 * Math.PI) / numPlanets),
    1,
    orbitRadius * Math.sin(((i + 1) * 2 * Math.PI) / numPlanets),
  ];
}
