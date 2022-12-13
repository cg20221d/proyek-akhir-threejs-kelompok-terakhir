// Import
import * as THREE from "three";
import scene from "./Scene";
import camera from "./Camera";
import renderer from "./Renderer";
import ambientLight from "./Light";
import { BasicCharacterController, ThirdPersonCamera } from "./CharacterController";
import { controls } from "./Controls";
import { cubeTextureLoader } from "./TextureLoader";
import { earth, earthObj, jupiter, jupiterObj, mars, marsObj, mercury, mercuryObj, neptune, neptuneObj, saturn, saturnObj, saturnRingObj, sun, sunPointLight, uranus, uranusObj, venus, venusObj, saturnRing } from "./Object";
// prettier-ignore
import { distanceScale, earthDistance, earthRevolution, earthRotation, jupiterDistance, jupiterRevolution, jupiterRotation, marsDistance, marsRevolution, marsRotation, mercuryDistance, mercuryRevolution, mercuryRotation, neptuneDistance, neptuneRevolution, neptuneRotation, revolutionScale, rotationScale, saturnDistance, saturnRevolution, saturnRotation, sunRotation, uranusDistance, uranusRevolution, uranusRotation, venusDistance, venusRevolution, venusRotation } from "./Data";
import starsTexture from "./assets/texture/2k_stars.jpg";
import starsMilkyWayTexture from "./assets/texture/2k_stars_milky_way.jpg";
import { MeshBasicMaterial, Object3D, SphereGeometry } from "three";

class Main {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = renderer;
    this._scene = scene;
    this._camera = camera;

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    this._scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsMilkyWayTexture]);
    this._scene.add(ambientLight);
    // Planet Object
    this._scene.add(sun);

    this._scene.add(sunPointLight);

    this._scene.add(mercuryObj);
    mercury.position.x += mercuryDistance * distanceScale;

    this._scene.add(venusObj);
    venus.position.x += venusDistance * distanceScale;
    venusObj.rotateY(50);

    this._scene.add(earthObj);
    earth.position.x += earthDistance * distanceScale;
    earthObj.rotateY(100);

    this._scene.add(marsObj);
    mars.position.x += marsDistance * distanceScale;
    marsObj.rotateY(150);

    this._scene.add(jupiterObj);
    jupiter.position.x += jupiterDistance * distanceScale;
    jupiterObj.rotateY(-150);

    this._scene.add(saturnObj);
    saturn.position.x += saturnDistance * distanceScale;
    saturnObj.rotateY(-100);
    this._scene.add(saturnRingObj);
    saturnRing.position.x += saturnDistance * distanceScale;
    saturnRing.rotation.x = -0.5 * Math.PI;
    saturnRingObj.rotateY(-100);

    this._scene.add(uranusObj);
    uranus.position.x += uranusDistance * distanceScale;
    uranusObj.rotateY(-50);

    this._scene.add(neptuneObj);
    neptune.position.x += neptuneDistance * distanceScale;
    neptuneObj.rotateY(0);

    //lintasan orbit planet
    function orbitPlanet(planet) {
      const orbitLineGeo = new THREE.RingGeometry(planet.position.x, planet.position.x + 1, 35, 35);
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

    controls.update();
    // controls.movementSpeed = 3.5;
    // controls.rollSpeed = 0.1;

    const travelMercury = document.getElementById("travel-mercury");
    travelMercury.addEventListener("click", function () {
      travel(870, -5, 25);
    });
    const travelVenus = document.getElementById("travel-venus");
    travelVenus.addEventListener("click", function () {
      travel(1530, -5, 489);
    });
    const travelEarth = document.getElementById("travel-earth");
    travelEarth.addEventListener("click", function () {
      travel(1888, -5, 1194);
    });
    const travelMars = document.getElementById("travel-mars");
    travelMars.addEventListener("click", function () {
      travel(2353, -5, 2454);
    });
    const travelJupiter = document.getElementById("travel-jupiter");
    travelJupiter.addEventListener("click", function () {
      travel(8750, -5, -7709);
    });
    const travelSaturn = document.getElementById("travel-saturn");
    travelSaturn.addEventListener("click", function () {
      travel(18933, -5, -9800);
    });
    const travelUranus = document.getElementById("travel-uranus");
    travelUranus.addEventListener("click", function () {
      travel(41552, -5, -11046);
    });
    const travelNeptune = document.getElementById("travel-neptune");
    travelNeptune.addEventListener("click", function () {
      travel(67430, -5, 340);
    });

    function travel(a, b, c) {
      const astronot = scene.getObjectByName("Astronot");
      astronot.position.set(a, b, c);
    }

    this._freeze = false;

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
  }

  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    };
    this._controls = new BasicCharacterController(params);
    this._thirdPersonCamera = new ThirdPersonCamera({
      camera: this._camera,
      target: this._controls,
    });
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._camera.add(fbx);
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }
      // controls.update(0.05);

      sun.rotateY(sunRotation * rotationScale);
      mercury.rotateY(mercuryRotation * rotationScale);
      venus.rotateY(venusRotation * rotationScale);
      earth.rotateY(earthRotation * rotationScale);
      mars.rotateY(marsRotation * rotationScale);
      jupiter.rotateY(jupiterRotation * rotationScale);
      saturn.rotateY(saturnRotation * rotationScale);
      uranus.rotateY(uranusRotation * rotationScale);
      neptune.rotateY(neptuneRotation * rotationScale);

      if (!this._freeze) {
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

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map((m) => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }

    this._thirdPersonCamera.Update(timeElapsedS);
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new Main();
});
