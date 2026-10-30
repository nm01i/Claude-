import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Billboard, Html } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import { projects } from '../content/content';
import { CHARACTER, pickVideoSrc } from '../components/characterVideo';
import { T, clamp01, seg } from './timeline';

type Progress = { hero: MotionValue<number>; contact: MotionValue<number> };

// Monitor geometry (world units)
const MON = new THREE.Vector3(0.7, 1.55, -0.2);
const SCREEN_W = 1.76;
const SCREEN_H = 0.99;
// drei's <Html transform> maps 1 css px to ~1/HTML_K world units at scale=1 (calibrated against screenshots).
const HTML_K = 37;

// Camera keyframes. The wide shot leaves the top ~30% of the frame empty for the HTML heading.
const WIDE_POS = new THREE.Vector3(-0.35, 2.1, 6.1);
const WIDE_LOOK = new THREE.Vector3(-0.35, 1.98, 0);
const SCREEN_POS = new THREE.Vector3(MON.x, MON.y, MON.z + 0.035 + 1.42);
const SCREEN_LOOK = new THREE.Vector3(MON.x, MON.y, MON.z);
const ORBIT_TARGET = new THREE.Vector3(0.1, 1.3, 0);

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

type Active = React.MutableRefObject<'hero' | 'contact' | null>;

function CameraRig({ progress, active }: { progress: Progress; active: Active }) {
  const { camera, invalidate } = useThree();
  useFrame(() => {
    const mode = active.current;
    if (!mode) return;
    if (mode === 'hero') {
      // The camera stays put while the pose changes; it moves only after the pointing pose is established.
      const t = seg(progress.hero.get(), T.camStart, T.camEnd);
      tmpPos.lerpVectors(WIDE_POS, SCREEN_POS, t);
      tmpLook.lerpVectors(WIDE_LOOK, SCREEN_LOOK, t);
    } else {
      const p = progress.contact.get();
      const pull = seg(p, 0, 0.35); // monitor-fill -> wide
      const orbit = seg(p, 0.3, 1); // wide -> side view
      tmpPos.lerpVectors(SCREEN_POS, WIDE_POS, pull);
      tmpLook.lerpVectors(SCREEN_LOOK, WIDE_LOOK, pull);
      if (orbit > 0) {
        const r = Math.hypot(WIDE_POS.x - ORBIT_TARGET.x, WIDE_POS.z - ORBIT_TARGET.z);
        const a0 = Math.atan2(WIDE_POS.x - ORBIT_TARGET.x, WIDE_POS.z - ORBIT_TARGET.z);
        const a = a0 + orbit * (Math.PI / 2.15);
        const rr = r * (1 - orbit * 0.12);
        tmpPos.set(ORBIT_TARGET.x + Math.sin(a) * rr, WIDE_POS.y - orbit * 0.6, ORBIT_TARGET.z + Math.cos(a) * rr);
        tmpLook.copy(WIDE_LOOK).lerp(ORBIT_TARGET, orbit);
      }
    }
    camera.position.copy(tmpPos);
    camera.lookAt(tmpLook);
    invalidate();
  });
  return null;
}

const CHAR_H = 2.15;
const CHAR_W = CHAR_H * CHARACTER.aspect;

/**
 * The character video on a billboard plane. The video follows the hero scroll progress (it never plays by itself).
 * It has a black background, so the plane uses MAX blending: max(video, scene) keeps the figure unchanged and lets the
 * black fall away, with no keying and no halo. Fading the character out is a multiplier on the colour.
 */
function Character({ progress, active }: { progress: Progress; active: Active }) {
  const { invalidate } = useThree();
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const st = useRef({ cur: 0 });

  const video = useMemo(() => {
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.setAttribute('aria-hidden', 'true');
    v.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
    v.src = pickVideoSrc();
    return v;
  }, []);

  const tex = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    return t;
  }, [video]);

  useEffect(() => {
    document.body.appendChild(video);
    const refresh = () => {
      tex.needsUpdate = true;
      invalidate();
    };
    video.addEventListener('loadeddata', refresh);
    video.addEventListener('seeked', refresh);
    video.load();
    return () => {
      video.removeEventListener('loadeddata', refresh);
      video.removeEventListener('seeked', refresh);
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.remove();
      tex.dispose();
    };
  }, [video, tex, invalidate]);

  useFrame((_, dt) => {
    const mode = active.current;
    const p = progress.hero.get();
    let target = 0; // contact scene: greeting frame
    let fade = 1;
    if (mode === 'hero') {
      target = CHARACTER.duration * clamp01((p - T.poseStart) / (T.poseEnd - T.poseStart));
      fade = 1 - seg(p, T.charStart, T.charEnd);
    }
    const s = st.current;
    const d = target - s.cur;
    s.cur = Math.abs(d) < 0.004 ? target : s.cur + d * (1 - Math.exp(-Math.min(dt, 0.25) * 18)); // frame-rate independent
    if (!video.seeking && video.readyState >= 1 && Math.abs(video.currentTime - s.cur) > 0.01) video.currentTime = s.cur;
    if (mat.current) mat.current.color.setScalar(fade);
  });

  return (
    <group position={[-1.7, 0.55, 0.2]}>
      <Billboard follow lockX lockZ>
        <mesh position={[0, CHAR_H / 2, 0]} renderOrder={2}>
          <planeGeometry args={[CHAR_W, CHAR_H]} />
          <meshBasicMaterial
            ref={mat}
            map={tex}
            transparent
            blending={THREE.CustomBlending}
            blendEquation={THREE.MaxEquation}
            blendSrc={THREE.OneFactor}
            blendDst={THREE.OneFactor}
            depthWrite={false}
            toneMapped={false}
            fog={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function Chair() {
  return (
    <group position={[-1.45, 0, 0.1]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
        <meshStandardMaterial color="#1b1b22" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
        <meshStandardMaterial color="#2a2a33" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 5]} />
        <meshStandardMaterial color="#2a2a33" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group>
      <mesh position={[-0.3, 0.76, -0.1]}>
        <boxGeometry args={[6.2, 0.09, 1.7]} />
        <meshStandardMaterial color="#1c1c23" roughness={0.45} metalness={0.15} />
      </mesh>
      {[-3.2, 2.6].map((x) =>
        [-0.75, 0.55].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.37, z]}>
            <boxGeometry args={[0.08, 0.74, 0.08]} />
            <meshStandardMaterial color="#2a2a33" metalness={0.6} roughness={0.35} />
          </mesh>
        )),
      )}
      {/* keyboard + mouse */}
      <mesh position={[0.7, 0.815, 0.35]}>
        <boxGeometry args={[0.9, 0.025, 0.28]} />
        <meshStandardMaterial color="#26262e" roughness={0.5} />
      </mesh>
      <mesh position={[1.35, 0.815, 0.38]}>
        <boxGeometry args={[0.09, 0.03, 0.14]} />
        <meshStandardMaterial color="#26262e" roughness={0.4} />
      </mesh>
      {/* mug */}
      <mesh position={[2.1, 0.88, 0.1]}>
        <cylinderGeometry args={[0.1, 0.09, 0.16, 20]} />
        <meshStandardMaterial color="#BE4C00" roughness={0.5} />
      </mesh>
      {/* lamp */}
      <group position={[2.0, 0.805, -0.45]}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.04, 20]} />
          <meshStandardMaterial color="#2a2a33" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.012, 0.012, 0.8, 8]} />
          <meshStandardMaterial color="#8a8a96" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.08, 0.83, 0]}>
          <sphereGeometry args={[0.1, 16, 12]} />
          <meshBasicMaterial color="#ffb27a" />
        </mesh>
        <pointLight position={[-0.1, 0.8, 0.1]} color="#ff9a5c" intensity={3} distance={4.5} />
      </group>
    </group>
  );
}

/** Real DOM rendered on the monitor. It shows the project index only, so it never repeats the hero's
 *  navigation, heading or buttons that sit above the canvas. */
function ScreenSite() {
  return (
    <div
      style={{
        width: 1280,
        height: 720,
        background: '#0C0C0C',
        color: '#D7E2EA',
        fontFamily: 'Kanit, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 56px',
        gap: 8,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>Selected projects</div>
      {projects.map((p) => (
        <div key={p.id} style={{ display: 'flex', alignItems: 'baseline', gap: 28, borderTop: '1px solid rgba(215,226,234,0.18)', padding: '10px 0', flex: 1, minHeight: 0 }}>
          <span className="hero-heading" style={{ fontWeight: 900, fontSize: 56, lineHeight: 1, width: 96 }}>{p.number}</span>
          <span className="hero-heading" style={{ fontWeight: 900, fontSize: 56, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{p.title}</span>
          <span style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>{p.category.split(' / ')[0]}</span>
        </div>
      ))}
    </div>
  );
}

function Monitor() {
  // 1 world unit ≈ 1280px / SCREEN_W px inside drei's transform mode (tuned via `scale`)
  const htmlScale = SCREEN_W / 1280;
  return (
    <group position={MON.toArray()}>
      <mesh>
        <boxGeometry args={[SCREEN_W + 0.1, SCREEN_H + 0.1, 0.06]} />
        <meshStandardMaterial color="#0f0f13" roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial color="#0C0C0C" />
      </mesh>
      <Html transform position={[0, 0, 0.034]} scale={htmlScale * HTML_K} zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
        <ScreenSite />
      </Html>
      <mesh position={[0, -SCREEN_H / 2 - 0.2, -0.08]}>
        <boxGeometry args={[0.1, 0.4, 0.06]} />
        <meshStandardMaterial color="#2a2a33" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, -SCREEN_H / 2 - 0.4, 0.05]}>
        <boxGeometry args={[0.7, 0.03, 0.35]} />
        <meshStandardMaterial color="#2a2a33" metalness={0.7} roughness={0.35} />
      </mesh>
      <pointLight position={[0, 0, 0.9]} color="#9fb4ff" intensity={1.4} distance={4} />
    </group>
  );
}

function Backdrop() {
  const grid = useMemo(() => new THREE.GridHelper(30, 60, '#2a1630', '#17121b'), []);
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0e0e12" roughness={0.9} />
      </mesh>
      <primitive object={grid} position={[0, 0.002, 0]} />
      <mesh position={[0, 3, -2.6]}>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#0C0C0C" roughness={1} />
      </mesh>
      <pointLight position={[-3.5, 2.6, -1.8]} color="#B600A8" intensity={14} distance={9} />
      <pointLight position={[3.8, 2.2, -1.5]} color="#BE4C00" intensity={9} distance={9} />
    </>
  );
}

export default function Workstation3D({ progress, active }: { progress: Progress; active: Active }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ fov: 35, near: 0.1, far: 60, position: WIDE_POS.toArray() }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#0C0C0C']} />
      <fog attach="fog" args={['#0C0C0C', 9, 22]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 5, 4]} intensity={1.6} />
      <Backdrop />
      <Desk />
      <Chair />
      <Monitor />
      <Character progress={progress} active={active} />
      <CameraRig progress={progress} active={active} />
    </Canvas>
  );
}
