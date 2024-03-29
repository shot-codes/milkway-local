import type { Prisma } from "@prisma/client";
import { get } from "svelte/store";
import { Vector3, PlaneGeometry } from "three";
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
  zooming,
} from "$lib/stores";

export type System = Prisma.SystemGetPayload<{
  include: {
    planets: {
      include: {
        moons: true;
      };
    };
  };
}>;

export type Planet = Prisma.PlanetGetPayload<{
  include: {
    moons: true;
  };
}>;

export const zoomIn = (position: [number, number, number], moonAmount: number) => {
  zooming.set(true);
  const copyPositionVec = new Vector3(0, 10, 70).applyAxisAngle(
    new Vector3(0, 1, 0),
    Math.atan2(position[0], position[2])
  );
  camCopyPosition.set([copyPositionVec.x, copyPositionVec.y, copyPositionVec.z]);
  cameraPosition.set(
    [get(cameraClone).position.x, get(cameraClone).position.y, get(cameraClone).position.z],
    { duration: 0 }
  ); // Set the cameraPosition to the same value as above so the tweened store starts from there (This is to avoid the jump)
  cameraPosition.set([position[0] * 1.3, position[1] + 1, position[2] * 1.3]).then(() => {
    zooming.set(false);
  });
  cameraPositionScrollMax.set(position[1] + 1);
  targetPosition.set([position[0], position[1] + 1, position[2]]);

  zoomedIn.set(true);
  contentMax.set(position[1] - (moonAmount * 2 + 1));
};

export const zoomInSun = () => {
  zooming.set(true);
  const cam = get(cameraClone);
  const copyPositionVec = new Vector3(0, 10, 70).applyAxisAngle(
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
  cameraPosition.set([camPositionVec.x, camPositionVec.y, camPositionVec.z]).then(() => {
    zooming.set(false);
  });
  zoomedIn.set(true);
  activePlanet.set("Sun");
};

export const zoomOut = () => {
  zooming.set(true);
  cameraPosition.set(
    [get(cameraClone).position.x, get(cameraClone).position.y, get(cameraClone).position.z],
    { duration: 0 }
  ); // Set the cameraPosition to the current spot to avoid the jump
  cameraPosition.set(get(camCopyPosition)).then(() => {
    zooming.set(false);
  }); // Now return back to the same spot as before clicking the "Move camera" button
  targetPosition.set(ogTargetPosition);
  zoomedIn.set(false);
  activePlanet.set("");
};

export const generateOrbitPositions = (args: {
  n: number;
  radius: number;
  yMin: number;
  yMax: number;
}) => {
  const positions: Array<[number, number, number]> = [];
  for (let i = 0; i < args.n; i++) {
    positions[i] = [
      args.radius * Math.cos(((i + 1) * 2 * Math.PI) / args.n),
      Math.floor(Math.random() * (args.yMax - args.yMin + 1) + args.yMin),
      args.radius * Math.sin(((i + 1) * 2 * Math.PI) / args.n),
    ];
  }
  return positions;
};

const generateMoonZoomPositions = (length: number): Array<[number, number, number]> => {
  const positions: Array<[number, number, number]> = [];
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      positions.push([-3.2, -3.3 - i * 2, 0]);
    } else {
      positions.push([-0.7, -3.3 - i * 2, 0]);
    }
  }
  return positions;
};

export const moonZoomLocations = generateMoonZoomPositions(13);

export const moonZoomLocations1: Array<[number, number, number]> = [
  [-3.2, -3.3, 0],
  [-0.7, -5.3, 0],
  [-3.2, -7.3, 0],
  [-0.7, -9.3, 0],
  [-3.2, -11.3, 0],
];

export const lightenHexColor = (hex: string, amount: number) => {
  const match = hex.slice(1).match(/.{2}/g);
  if (match == null) {
    throw new Error("Invalid hex color code");
  }
  let [r, g, b] = match.map((x) => parseInt(x, 16));
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
};

export const createPlaneGeometryFromImage = (image: HTMLImageElement) => {
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;
  const aspectRatio = imageWidth / imageHeight;
  const geometry = new PlaneGeometry(aspectRatio, 1);
  return geometry;
};
