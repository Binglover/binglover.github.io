'use strict';

const el = (id) => document.getElementById(id);

function setGoldState(isGold) {
  const title = el('title');
  const rarity = el('rarity');
  if (!title || !rarity) return;
  if (isGold) {
    title.classList.add('title--gold');
    title.textContent = 'GOLDEN Plumet Tournament';
    rarity.style.display = 'block';
  } else {
    title.classList.remove('title--gold');
    title.textContent = 'Plumet Tournament';
    rarity.style.display = 'none';
  }
}

function spinNameOnce(target, finalText) {
  if (!target || target.dataset.spun === 'true') return;

  const pool = ['Olivi~r', 'Oliver', 'Ol1ver', 'Olivia', '0liver', 'O-L-I-V-E-R', 'Revilo', 'O.G.', 'Oll—', 'Olive?', 'Oli..', 'Oliver Oil'];
  const duration = 2500;
  const interval = 70;
  let i = 0;

  target.classList.add('slotting');
  target.dataset.spun = 'true'; // prevent triggering twice

  const timer = setInterval(() => {
    target.textContent = pool[i++ % pool.length];
  }, interval);

  setTimeout(() => {
    clearInterval(timer);
    target.textContent = finalText;
    target.classList.remove('slotting');
    target.classList.add('slot-complete');
    target.setAttribute('aria-label', finalText);

    // ✅ UNHIDE PASSWORD BUTTON
    const btn = el('password-btn');
    if (btn) btn.style.display = 'block';

  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {
  // --- GOLD TITLE + OLIVER SPIN LOGIC ---
  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

  const oliver = el('player-oliver');
  if (oliver) {
    oliver.addEventListener('click', () => spinNameOnce(oliver, 'Ollie G'));
    oliver.setAttribute('tabindex', '0');
    oliver.setAttribute('role', 'button');
    oliver.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spinNameOnce(oliver, 'Ollie G');
      }
    });
  }

  // --- PASSWORD PANEL LOGIC ---
  const btn = el('password-btn');
  const panel = el('password-panel');
  const closeBtn = el('close-panel');
  const submit = el('password-submit');
  const input = el('password-input');
  const msg = el('password-message');

  // Hide password button until Ollie G event
  if (btn) btn.style.display = 'none';

  if (btn && panel) {
    btn.addEventListener('click', () => {
      panel.style.display = 'flex';
      input.focus();
    });

    closeBtn.addEventListener('click', () => panel.style.display = 'none');

    panel.addEventListener('click', (e) => {
      if (e.target === panel) panel.style.display = 'none';
    });

    submit.addEventListener('click', () => {
      const entered = input.value.trim();

      // ✅ SECRET KEY: change background to Qing flag
      if (entered === 'thejock') {
        msg.textContent = '⚠️ The Icon watches over all.';
        msg.style.color = 'gold';
        document.body.style.background = "url('https://i.imgur.com/NhMZf8D.jpeg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        panel.style.display = 'none';
        return;
      }

      // ✅ MAIN PASSWORD: open about:blank containing GitHub via iframe
      if (entered === '902197') {
        msg.textContent = '✅ Access granted!';
        msg.style.color = 'lime';

        setTimeout(() => {
          panel.style.display = 'none';

          // Open blank tab and load GitHub in an iframe
          const newPage = window.open('about:blank', '_blank');
          if (newPage) {
            newPage.document.write(`
              <meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Genesis Engine - Solaris</title>
<style>
  * { margin:0; padding:0; box-sizing: border-box; }
  html, body { 
    height:100%; 
    background:#000; 
    overflow:hidden; 
    font-family: 'Inter', sans-serif;
  }
  canvas { 
    width:100%; 
    height:100%; 
    display:block; 
    position:fixed; 
    top:0; 
    left:0; 
  }
  .overlay {
    position: fixed;
    top: 1rem;
    left: 1rem;
    color: white;
    text-shadow: 0 0 5px black;
    pointer-events: none;
    opacity: 0.7;
  }
  .overlay h1 {
      font-size: 1.5rem;
      font-weight: 500;
  }
  .overlay p {
      font-size: 0.9rem;
      font-weight: 300;
  }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap" rel="stylesheet">
<div class="overlay">
  <h1>Solaris</h1>
  <p>Drag to orbit. Scroll to zoom.</p>
</div>
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/"
  }
}
</script>
<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
const DPR = Math.min(window.devicePixelRatio || 1, 2);
renderer.setPixelRatio(DPR);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 14, 80);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.minDistance = 10; 
controls.maxDistance = 260;

const COLORS = {
  core:   new THREE.Color(1.00, 0.90, 0.70),
  shell:  new THREE.Color(1.00, 0.55, 0.10),
  diskA:  new THREE.Color(1.00, 0.65, 0.10),
  diskB:  new THREE.Color(0.98, 0.25, 0.08),
  ring:   new THREE.Color(1.00, 0.50, 0.18),
  emberA: new THREE.Color(1.00, 0.95, 0.80),
  emberB: new THREE.Color(1.00, 0.55, 0.05),
  prominence: new THREE.Color(1.00, 0.65, 0.10)
};

const noiseFunctions = /* glsl */`
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

const coreGroup = new THREE.Group();
scene.add(coreGroup);

const starGeometry = new THREE.IcosahedronGeometry(4, 5);
const starMaterial = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0 }, uCore: { value: COLORS.core } },
  vertexShader: `
    uniform float time;
    varying vec3 vN;
    ${noiseFunctions}
    void main(){
      vN = normalize(normal);
      float displacement = snoise(normal * 3.0 + time * 0.7) * 0.2;
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time; 
    uniform vec3 uCore; 
    varying vec3 vN;
    ${noiseFunctions}
    void main(){
      float pulse = pow(0.5 + 0.5*sin(time*2.15), 1.7);
      float fres = pow(1.0 - abs(dot(vN, vec3(0,0,1))), 3.0);
      float surfaceNoise = snoise(vN * 8.0 + time * 1.2);
      vec3 col = uCore * (0.55 + 2.3*fres) * (0.5 + 1.2*pulse) * (1.0 + 0.3 * surfaceNoise);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
  blending: THREE.AdditiveBlending, depthWrite: false
});
coreGroup.add(new THREE.Mesh(starGeometry, starMaterial));

const shellGeometry = new THREE.IcosahedronGeometry(8, 5);
const shellMaterial = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0 }, uShell: { value: COLORS.shell } },
  vertexShader: `
    uniform float time;
    varying vec3 vN; 
    varying vec2 vUv;
    ${noiseFunctions}
    void main(){ 
      vN = normalize(normal); 
      vUv = uv; 
      float displacement = snoise(position * 1.5 + time * 0.4) * 0.8;
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0); 
    }
  `,
  fragmentShader: `
    uniform float time; 
    uniform vec3 uShell; 
    varying vec3 vN; 
    varying vec2 vUv;
    ${noiseFunctions}
    void main(){
      float fres = pow(1.0 - abs(dot(vN, vec3(0,0,1))), 0.6);
      float n = snoise(vec3(vUv*7.0 + vec2(time*0.22, 0.0), time*0.25));
      float fil = smoothstep(0.55, 0.82, n) * pow(abs(vUv.y*2.0 - 1.0), 14.0);
      vec3 color = uShell * (0.08 + 1.7*fil + 0.6*fres);
      float alpha = clamp(0.06 + 0.5*fres + 0.55*fil, 0.0, 0.9);
      gl_FragColor = vec4(color, alpha);
    }
  `,
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
});
coreGroup.add(new THREE.Mesh(shellGeometry, shellMaterial));

const ringGeom = new THREE.TorusGeometry(60, 2, 4, 128);
const ringMat = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0 }, uRing: { value: COLORS.ring } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float time; 
    uniform vec3 uRing; 
    varying vec2 vUv;
    ${noiseFunctions}
    void main() {
      float n1 = snoise(vec3(vUv.x * 8.0 - time * 0.1, vUv.y * 2.0, time * 0.15));
      float n2 = snoise(vec3(vUv.x * 6.0 + time * 0.05, vUv.y * 3.0, time * 0.1));
      float combinedNoise = smoothstep(0.3, 0.7, n1) * 0.6 + smoothstep(0.4, 0.6, n2) * 0.4;
      float opacity = pow(combinedNoise, 2.0) * 0.8;
      gl_FragColor = vec4(uRing * (0.5 + combinedNoise * 1.5), opacity);
    }
  `,
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
});
const ring1 = new THREE.Mesh(ringGeom, ringMat);
ring1.rotation.x = Math.PI * 0.51;
scene.add(ring1);
const ring2 = ring1.clone();
ring2.scale.set(0.8, 0.8, 0.8);
ring2.rotation.y = Math.PI * 0.1;
scene.add(ring2);

const particleCount = 30000;
const diskPositions = new Float32Array(particleCount * 3);
const diskSeeds = new Float32Array(particleCount);
const diskBands = new Float32Array(particleCount);
for (let i = 0; i < particleCount; i++) {
  const r = 10 + Math.random()*35;
  const theta = Math.random()*Math.PI*2;
  diskPositions[i*3]     = Math.cos(theta)*r;
  diskPositions[i*3 + 1] = (Math.random() - 0.5) * 4.0;
  diskPositions[i*3 + 2] = Math.sin(theta)*r;
  diskSeeds[i] = Math.random()*1000.0;
  diskBands[i] = (r - 10.0) / 35.0;
}
const diskGeom = new THREE.BufferGeometry();
diskGeom.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
diskGeom.setAttribute('aSeed', new THREE.BufferAttribute(diskSeeds, 1));
diskGeom.setAttribute('aBand', new THREE.BufferAttribute(diskBands, 1));
const diskMat = new THREE.ShaderMaterial({
  uniforms: { uColorA: { value: COLORS.diskA }, uColorB: { value: COLORS.diskB }, time: { value: 0 } },
  vertexShader: `
    uniform float time; 
    attribute float aSeed; 
    attribute float aBand;
    varying float vMix; 
    varying float vAlpha;
    vec2 rot(vec2 p, float a){ float c=cos(a), s=sin(a); return vec2(c*p.x - s*p.y, s*p.x + c*p.y); }
    void main(){
      vec3 p = position;
      float r = length(p.xz);
      float speed = (14.5 / max(16.0, r*r));
      float angle = -time * speed;
      vec2 xz = rot(p.xz, angle);
      float breathe = 1.0 + 0.011*sin(time*0.8 + aSeed);
      p.xz = xz * breathe;
      p.y *= (1.0 + 0.2*sin(time*1.4 + aSeed*2.0 + r*0.2));
      vec4 mvp = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mvp;
      gl_PointSize = (45.0 / -mvp.z) * (1.0 - aBand);
      vMix = aBand;
      vAlpha = 0.4 + 0.4 * sin(time*3.0 + aSeed);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorA; 
    uniform vec3 uColorB; 
    varying float vMix; 
    varying float vAlpha;
    void main(){
      if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
      vec3 col = mix(uColorA, uColorB, vMix);
      gl_FragColor = vec4(col, vAlpha);
    }
  `,
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
});
scene.add(new THREE.Points(diskGeom, diskMat));

const emberCount = 5000;
const emberPos = new Float32Array(emberCount * 3);
const emberSeeds = new Float32Array(emberCount * 4);
for (let i = 0; i < emberCount; i++) {
  emberPos.set([0,0,0], i*3);
  emberSeeds.set([Math.random(), 0.1 + Math.random()*0.9, Math.random()*10, 0.5 + Math.random()], i*4);
}
const emberGeom = new THREE.BufferGeometry();
emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
emberGeom.setAttribute('aSeed', new THREE.BufferAttribute(emberSeeds, 4));
const emberMat = new THREE.ShaderMaterial({
  uniforms: { uEmberA: { value: COLORS.emberA }, uEmberB: { value: COLORS.emberB }, time: { value: 0 }},
  vertexShader: `
    uniform float time; 
    attribute vec4 aSeed; 
    varying float vLife;
    void main() {
      float life = mod(time * aSeed.y * 0.3 + aSeed.x, 1.0);
      vec3 p = normalize(vec3(
        sin(aSeed.z * 1.2),
        cos(aSeed.z * 1.7),
        sin(aSeed.z * 1.1)
      )) * (8.0 + life * 40.0);
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = (100.0 / -mvPosition.z) * (1.0 - life) * aSeed.w;
      gl_Position = projectionMatrix * mvPosition;
      vLife = life;
    }
  `,
  fragmentShader: `
    uniform vec3 uEmberA; 
    uniform vec3 uEmberB; 
    varying float vLife;
    void main() {
      if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
      float opacity = pow(1.0 - vLife, 2.0);
      vec3 col = mix(uEmberA, uEmberB, vLife);
      gl_FragColor = vec4(col, opacity);
    }
  `,
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
});
scene.add(new THREE.Points(emberGeom, emberMat));

const prominenceCount = 1000;
const prominencePos = new Float32Array(prominenceCount * 3);
const prominenceSeeds = new Float32Array(prominenceCount * 4);
const q = new THREE.Quaternion();
const v = new THREE.Vector3();
for (let i = 0; i < prominenceCount; i++) {
    prominencePos.set([0, 0, 0], i * 3);
    prominenceSeeds.set([
      Math.random(),
      0.1 + Math.random() * 0.4,
      5.0 + Math.random() * 15.0,
      0.5 + Math.random() * 1.5
    ], i * 4);
}
const prominenceGeom = new THREE.BufferGeometry();
prominenceGeom.setAttribute('position', new THREE.BufferAttribute(prominencePos, 3));
prominenceGeom.setAttribute('aSeed', new THREE.BufferAttribute(prominenceSeeds, 4));
const prominenceMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: COLORS.prominence },
      time: { value: 0 }
    },
    vertexShader: `
      uniform float time;
      attribute vec4 aSeed;
      varying float vLife;

      vec4 quat_from_axis_angle(vec3 axis, float angle) {
          vec4 qr;
          float half_angle = (angle * 0.5);
          qr.x = axis.x * sin(half_angle);
          qr.y = axis.y * sin(half_angle);
          qr.z = axis.z * sin(half_angle);
          qr.w = cos(half_angle);
          return qr;
      }

      vec3 rotate_vertex_position(vec3 position, vec4 q) {
          return position + 2.0 * cross(q.xyz, cross(q.xyz, position) + q.w * position);
      }

      void main() {
          float life = mod(time * aSeed.y + aSeed.x, 1.0);
          vLife = life;
          
          float arc = sin(life * 3.14159);
          vec3 p = vec3(0.0, 0.0, 0.0);
          p.y = arc * aSeed.z;
          p.x = (life - 0.5) * 16.0;

          vec3 axis = normalize(vec3(aSeed.x - 0.5, aSeed.y - 0.5, aSeed.z - 0.5));
          float angle = aSeed.x * 6.28318;
          vec4 q = quat_from_axis_angle(axis, angle);
          p = rotate_vertex_position(p, q);
          
          p += normalize(p) * 8.0;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (150.0 / -mvPosition.z) * arc * (1.0 - life) * aSeed.w;
          gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vLife;
      void main() {
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
          float opacity = pow(sin(vLife * 3.14159), 1.5) * 0.8;
          gl_FragColor = vec4(uColor, opacity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
coreGroup.add(new THREE.Points(prominenceGeom, prominenceMat));

{
  const count = 2400;
  const pos = new Float32Array(count * 3);
  for (let i=0;i<count;i++){
    const r = THREE.MathUtils.randFloat(250, 1000);
    const th = Math.random()*Math.PI*2;
    const ph = Math.acos(THREE.MathUtils.randFloatSpread(2));
    pos[i*3]  = r * Math.sin(ph) * Math.cos(th);
    pos[i*3+1] = r * Math.cos(ph);
    pos[i*3+2] = r * Math.sin(ph) * Math.sin(th);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const m = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, sizeAttenuation: true, transparent:true, opacity:0.5, depthWrite:false });
  scene.add(new THREE.Points(g,m));
}

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new AfterimagePass(0.92));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.8, 0.05);
composer.addPass(bloomPass);
const fxaaPass = new ShaderPass(FXAAShader);
fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * DPR);
fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * DPR);
composer.addPass(fxaaPass);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * renderer.getPixelRatio());
  fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * renderer.getPixelRatio());
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const time = clock.getElapsedTime();
  starMaterial.uniforms.time.value = time;
  shellMaterial.uniforms.time.value = time;
  diskMat.uniforms.time.value = time;
  emberMat.uniforms.time.value = time;
  ringMat.uniforms.time.value = time;
  prominenceMat.uniforms.time.value = time;
  
  const pulse = 0.5 + 0.5 * Math.sin(time * 2.15);
  bloomPass.strength = 0.8 + 0.4 * pulse;

  coreGroup.rotation.y += delta * 0.05;
  controls.update();
  composer.render();
}

animate();
</script>
            `);
            newPage.document.close();
          }
        }, 500);
        return;
      }

      // ❌ WRONG PASSWORD
      msg.textContent = '❌ Incorrect password.';
      msg.style.color = 'red';
    });
  }

  // --- LEADERBOARD NAVIGATION ---
  const leaderboardBtn = el('goto-leaderboard');
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      const section = el('leaderboard-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
