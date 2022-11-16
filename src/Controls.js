import camera from "./Camera.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import { FlyControls } from "./lib/FlyControls.js";
import renderer from "./Renderer.js";

const orbit = new OrbitControls(camera, renderer.domElement);

const flyControls = new FlyControls(camera, renderer.domElement);

export { orbit, flyControls }