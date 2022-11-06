import camera from "./Camera.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import renderer from "./Renderer.js";

const orbit = new OrbitControls(camera, renderer.domElement);

export default orbit