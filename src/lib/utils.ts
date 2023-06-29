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
  contentMax,
} from "$lib/stores";

export const zoomIn = (position: [number, number, number], moonAmount: number) => {
  camCopyPosition.set([position[0] * 2, 8, position[2] * 2]); // This is to save current camera position right when you click the button "Move camera"
  cameraPosition.set(
    [get(cameraClone).position.x, get(cameraClone).position.y, get(cameraClone).position.z],
    { duration: 0 }
  ); // Set the cameraPosition to the same value as above so the tweened store starts from there (This is to avoid the jump)
  cameraPosition.set([position[0] * 1.3, position[1] + 1, position[2] * 1.3]);
  cameraPositionScrollMax.set(position[1] + 1);
  targetPosition.set([position[0], position[1] + 1, position[2]]);

  zoomedIn.set(true);
  contentMax.set(position[1] - moonAmount * 3.5);
};

export const zoomInSun = () => {
  const cam = get(cameraClone);
  const copyPositionVec = new Vector3(0, 10, 50).applyAxisAngle(
    new Vector3(0, 1, 0),
    Math.atan2(cam.position.x, cam.position.z)
  );
  const camPositionVec = new Vector3(0, 2, 14).applyAxisAngle(
    new Vector3(0, 1, 0),
    Math.atan2(cam.position.x, cam.position.z)
  );
  camCopyPosition.set([copyPositionVec.x, copyPositionVec.y, copyPositionVec.z]);
  targetPosition.set([0, 1, 0]);
  cameraPosition.set([cam.position.x, cam.position.y, cam.position.z], { duration: 0 });
  cameraPosition.set([camPositionVec.x, camPositionVec.y, camPositionVec.z]);
  zoomedIn.set(true);
  activePlanet.set("Sun");
};

export const zoomOut = () => {
  cameraPosition.set(
    [get(cameraClone).position.x, get(cameraClone).position.y, get(cameraClone).position.z],
    { duration: 0 }
  ); // Set the cameraPosition to the current spot to avoid the jump
  cameraPosition.set(get(camCopyPosition)); // Now return back to the same spot as before clicking the "Move camera" button
  targetPosition.set(ogTargetPosition);
  zoomedIn.set(false);
  activePlanet.set("");
};

export enum Brand {
  ZibraAS = "ZibraAS",
  Confinze = "Confinze",
  ZibraPartner = "ZibraPartner",
  MindFuture = "MindFuture",
  LactoBio = "LactoBio",
  PeopleVentures = "PeopleVentures",
  Bregnerødgård = "Bregnerødgård",
}

export const planetLocations: Array<[number, number, number]> = [];
const numPlanets = Object.keys(Brand).length;
const min = -5;
const max = 5;
export const orbitRadius = 20;

for (let i = 0; i < numPlanets; i++) {
  planetLocations[i] = [
    orbitRadius * Math.cos(((i + 1) * 2 * Math.PI) / numPlanets),
    Math.floor(Math.random() * (max - min + 1) + min),
    orbitRadius * Math.sin(((i + 1) * 2 * Math.PI) / numPlanets),
  ];
}

export const moonLocations = (moonAmount: number) => {
  const moonPositions: Array<[number, number, number]> = [];
  const numMoons = moonAmount;
  const minMoon = -3;
  const maxMoon = 1;
  const moonOrbitRadius = 4;

  for (let i = 0; i < numMoons; i++) {
    moonPositions[i] = [
      moonOrbitRadius * Math.cos(((i + 1) * 2 * Math.PI) / numMoons),
      Math.floor(Math.random() * (maxMoon - minMoon + 1) + minMoon),
      moonOrbitRadius * Math.sin(((i + 1) * 2 * Math.PI) / numMoons),
    ];
  }

  return moonPositions;
};

export const moonZoomLocations: Array<[number, number, number]> = [
  [-5, -5.3, 0],
  [-1.6, -8.3, 0],
  [-5, -11.3, 0],
  [-1.6, -14.3, 0],
  [-5, -17.3, 0],
];
