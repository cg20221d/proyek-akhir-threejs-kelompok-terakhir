import camera from "./Camera.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import { FlyControls } from "./lib/FlyControls.js";
import renderer from "./Renderer.js";

// const controls = new OrbitControls(camera, renderer.domElement);
const controls = 1;
// const controls = new FlyControls(camera, renderer.domElement);

export { controls };
