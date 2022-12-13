import * as THREE from "three";
import { textureLoader } from "./TextureLoader";
import { sunRadius, radiusScale, mercuryRadius, venusRadius, earthRadius, marsRadius, jupiterRadius, saturnRadius, innerRadius, outerRadius, uranusRadius, neptuneRadius } from "./Data";

import sunTexture from "./assets/texture/2k_sun.jpg";
import earthTexture from "./assets/texture/2k_earth_daymap.jpg";
import jupiterTexture from "./assets/texture/2k_jupiter.jpg";
import marsTexture from "./assets/texture/2k_mars.jpg";
import mercuryTexture from "./assets/texture/2k_mercury.jpg";
import neptuneTexture from "./assets/texture/2k_neptune.jpg";
import saturnTexture from "./assets/texture/2k_saturn.jpg";
import uranusTexture from "./assets/texture/2k_uranus.jpg";
import venusTexture from "./assets/texture/2k_venus_atmosphere.jpg";
import saturnRingTexture from "./assets/texture/2k_saturn_ring_alpha.png";

const sunGeo = new THREE.SphereGeometry(sunRadius * radiusScale, 35, 35);
const sunMat = new THREE.MeshBasicMaterial();
sunMat.map = textureLoader.load(sunTexture);
const sun = new THREE.Mesh(sunGeo, sunMat);

const sunPointLight = new THREE.PointLight(0xffffff, 2, 150000);

const mercuryGeo = new THREE.SphereGeometry(mercuryRadius * 10 * radiusScale, 35, 35);
const mercuryMat = new THREE.MeshStandardMaterial();
mercuryMat.map = textureLoader.load(mercuryTexture);
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercury);

const venusGeo = new THREE.SphereGeometry(venusRadius * 10 * radiusScale, 35, 35);
const venusMat = new THREE.MeshStandardMaterial();
venusMat.map = textureLoader.load(venusTexture);
const venus = new THREE.Mesh(venusGeo, venusMat);
const venusObj = new THREE.Object3D();
venusObj.add(venus);

const earthGeo = new THREE.SphereGeometry(earthRadius * 10 * radiusScale, 35, 35);
const earthMat = new THREE.MeshStandardMaterial();
earthMat.map = textureLoader.load(earthTexture);
const earth = new THREE.Mesh(earthGeo, earthMat);
const earthObj = new THREE.Object3D();
earthObj.add(earth);

const marsGeo = new THREE.SphereGeometry(marsRadius * 10 * radiusScale, 35, 35);
const marsMat = new THREE.MeshStandardMaterial();
marsMat.map = textureLoader.load(marsTexture);
const mars = new THREE.Mesh(marsGeo, marsMat);
const marsObj = new THREE.Object3D();
marsObj.add(mars);

const jupiterGeo = new THREE.SphereGeometry(jupiterRadius * 10 * radiusScale, 35, 35);
const jupiterMat = new THREE.MeshStandardMaterial();
jupiterMat.map = textureLoader.load(jupiterTexture);
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
const jupiterObj = new THREE.Object3D();
jupiterObj.add(jupiter);

const saturnGeo = new THREE.SphereGeometry(saturnRadius * 10 * radiusScale, 35, 35);
const saturnMat = new THREE.MeshStandardMaterial();
saturnMat.map = textureLoader.load(saturnTexture);
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn);

const saturnRingGeo = new THREE.RingGeometry(innerRadius * 10 * radiusScale, outerRadius * 10 * radiusScale, 35); // ukuran belum sesuai
const saturnRingMat = new THREE.MeshBasicMaterial();
saturnRingMat.map = textureLoader.load(saturnRingTexture);
saturnRingMat.side = THREE.DoubleSide;
saturnRingMat.transparent = true;
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
const saturnRingObj = new THREE.Object3D();
saturnRingObj.add(saturnRing);

const uranusGeo = new THREE.SphereGeometry(uranusRadius * 10 * radiusScale, 35, 35);
const uranusMat = new THREE.MeshStandardMaterial();
uranusMat.map = textureLoader.load(uranusTexture);
const uranus = new THREE.Mesh(uranusGeo, uranusMat);
const uranusObj = new THREE.Object3D();
uranusObj.add(uranus);

const neptuneGeo = new THREE.SphereGeometry(neptuneRadius * 10 * radiusScale, 35, 35);
const neptuneMat = new THREE.MeshStandardMaterial();
neptuneMat.map = textureLoader.load(neptuneTexture);
const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
const neptuneObj = new THREE.Object3D();
neptuneObj.add(neptune);

export { sun, sunPointLight, mercuryObj, mercury, venus, venusObj, earthObj, earth, marsObj, mars, jupiterObj, jupiter, saturn, saturnObj, saturnRingObj, saturnRing, uranusObj, uranus, neptuneObj, neptune };
