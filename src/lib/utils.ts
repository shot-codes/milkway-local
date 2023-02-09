import { get } from "svelte/store";
import { Vector3 } from "three";
import {
  cameraPosition,
  targetPosition,
  ogTargetPosition,
  camCopyPosition,
  cameraClone,
  zoomedIn,
} from "$lib/stores";

// TODO: The zoom in and zoom out levels are defined relatively by multiplying the position vector of the
// focused planet. This should be changed to absolute values. Probably best to add a fixed vector in the
// same direction as the position vector.

export const zoomIn = (position: [number, number, number]) => {
  camCopyPosition.set(new Vector3(position[0] * 4, position[1] * 8 + 8, position[2] * 4)); // This is to save current camera position right when you click the button "Move camera"
  cameraPosition.set(get(cameraClone).position.clone(), { duration: 0 }); // Set the cameraPosition to the same value as above so the tweened store starts from there (This is to avoid the jump)
  cameraPosition.set(new Vector3(position[0] * 1.3, position[1] * 3, position[2] * 1.3));
  targetPosition.set(new Vector3(position[0], position[1], position[2]));
  zoomedIn.set(true);
};

export const zoomOut = () => {
  cameraPosition.set(get(cameraClone).position.clone(), { duration: 0 }); // Set the cameraPosition to the current spot to avoid the jump
  cameraPosition.set(get(camCopyPosition)); // Now return back to the same spot as before clicking the "Move camera" button
  targetPosition.set(ogTargetPosition);
  zoomedIn.set(false);
};
