import scene from "./Scene"
import { cubeTextureLoader } from "./TextureLoader";
import camera from "./Camera";
import orbit from "./Orbit"
// Import
import * as THREE from "three";
import ambientLight from "./Light";
import { earth, earthObj, jupiter, jupiterObj, mars, marsObj, mercury, mercuryObj, neptune, neptuneObj, saturn, saturnObj, saturnRingObj, sun, sunPointLight, uranus, uranusObj, venus, venusObj, saturnRing } from "./Object";
import { distanceScale, earthDistance, earthRevolution, earthRotation, jupiterDistance, jupiterRevolution, jupiterRotation, marsDistance, marsRevolution, marsRotation, mercuryDistance, mercuryRevolution, mercuryRotation, neptuneDistance, neptuneRevolution, neptuneRotation, revolutionScale, rotationScale, saturnDistance, saturnRevolution, saturnRotation, sunRotation, uranusDistance, uranusRevolution, uranusRotation, venusDistance, venusRevolution, venusRotation } from "./Data";
import renderer from "./Renderer";


scene.background = cubeTextureLoader.load([
    "/src/assets/texture/2k_stars.jpg",
    "/src/assets/texture/2k_stars.jpg",
    "/src/assets/texture/2k_stars.jpg",
    "/src/assets/texture/2k_stars.jpg",
    "/src/assets/texture/2k_stars.jpg",
    "/src/assets/texture/2k_stars_milky_way.jpg",
]);


camera.position.set(-60, 30, 50);

// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 3.5;
// flyControls.rollSpeed = 0.1;

orbit.update();

scene.add(ambientLight);

// Planet Object
scene.add(sun);

scene.add(sunPointLight);

scene.add(mercuryObj);
mercury.position.x += mercuryDistance * distanceScale;

scene.add(venusObj);
venus.position.x += venusDistance * distanceScale;

scene.add(earthObj);
earth.position.x += earthDistance * distanceScale;

scene.add(marsObj);
mars.position.x += marsDistance * distanceScale;

scene.add(jupiterObj);
jupiter.position.x += jupiterDistance * distanceScale;

scene.add(saturnObj);
saturn.position.x += saturnDistance * distanceScale;

scene.add(saturnRingObj);
saturnRing.position.x += saturnDistance * distanceScale;
saturnRing.rotation.x = -0.5 * Math.PI;

scene.add(uranusObj);
uranus.position.x += uranusDistance * distanceScale;

scene.add(neptuneObj);
neptune.position.x += neptuneDistance * distanceScale;

//lintasan orbit planet
function orbitPlanet(planet) {
    const orbitLineGeo = new THREE.RingGeometry(planet.position.x, planet.position.x + 0.05, 35, 35);
    const orbitLineMat = new THREE.MeshBasicMaterial();
    orbitLineMat.color = 0x000000;
    orbitLineMat.transparent = true;
    const orbitLine = new THREE.Mesh(orbitLineGeo, orbitLineMat);
    scene.add(orbitLine);
    orbitLine.rotation.x = -0.5 * Math.PI;
}

//orbit tiap planet
orbitPlanet(mercury);
orbitPlanet(venus);
orbitPlanet(earth);
orbitPlanet(mars);
orbitPlanet(jupiter);
orbitPlanet(saturn);
orbitPlanet(uranus);
orbitPlanet(neptune);

let freeze = false;
function onKeyup(event) {
    if (event.keyCode == 32) freeze = !freeze;
}
document.addEventListener("keyup", onKeyup);

function animate() {
    requestAnimationFrame(animate);

    sun.rotateY(sunRotation * rotationScale);
    mercury.rotateY(mercuryRotation * rotationScale);
    venus.rotateY(venusRotation * rotationScale);
    earth.rotateY(earthRotation * rotationScale);
    mars.rotateY(marsRotation * rotationScale);
    jupiter.rotateY(jupiterRotation * rotationScale);
    saturn.rotateY(saturnRotation * rotationScale);
    uranus.rotateY(uranusRotation * rotationScale);
    neptune.rotateY(neptuneRotation * rotationScale);

    if (!freeze) {
        mercuryObj.rotateY(revolutionScale / mercuryRevolution);
        venusObj.rotateY(revolutionScale / venusRevolution);
        earthObj.rotateY(revolutionScale / earthRevolution);
        marsObj.rotateY(revolutionScale / marsRevolution);
        jupiterObj.rotateY(revolutionScale / jupiterRevolution);
        saturnObj.rotateY(revolutionScale / saturnRevolution);
        saturnRingObj.rotateY(revolutionScale / saturnRevolution);
        uranusObj.rotateY(revolutionScale / uranusRevolution);
        neptuneObj.rotateY(revolutionScale / neptuneRevolution);
    }

    // flyControls.update(0.05);

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});