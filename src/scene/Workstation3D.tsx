import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Billboard, Html, useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import { profile } from '../content/content';

type Progress = { hero: MotionValue<number>; contact: MotionValue<number> };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const seg = (p: number, a: number, b: number) => smooth((p - a) / (b - a));

// Monitor geometry (world units)
const MON = new THREE.Vector3(0.7, 1.55, -0.2);
const SCREEN_W = 1.76;
const SCREEN_H = 0.99;
// drei's <Html transform> maps 1 css px to ~1/HTML_K world units at scale=1 (calibrated against screenshots).
const HTML_K = 37;

// Camera keyframes
const WIDE_POS = new THREE.Vector3(0.1, 1.9, 5.8);
const WIDE_LOOK = new THREE.Vector3(0, 1.35, 0);
const SCREEN_POS = new THREE.Vector3(MON.x, MON.y, MON.z + 0.035 + 1.42);
const SCREEN_LOOK = new THREE.Vector3(MON.x, MON.y, MON.z);
const ORBIT_TARGET = new THREE.Vector3(0.1, 1.3, 0);

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

function CameraRig({ progress, active }: { progress: Progress; active: React.MutableRefObject<'hero' | 'contact' | null> }) {
  const { camera, invalidate } = useThree();
  useFrame(() => {
    const mode = active.current;
    if (!mode) return;
    if (mode === 'hero') {
      const p = progress.hero.get();
      const t = seg(p, 0.05, 0.95);
      tmpPos.lerpVectors(WIDE_POS, SCREEN_POS, t);
      tmpLook.lerpVectors(WIDE_LOOK, SCREEN_LOOK, t);
      // gentle arc: swing slightly left then centre as we dolly in
      tmpPos.x += Math.sin(t * Math.PI) * -0.9;
      tmpPos.y += Math.sin(t * Math.PI) * 0.15;
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
        tmpPos.set(ORBIT_TARGET.x + Math.sin(a) * rr, WIDE_POS.y - orbit * 0.35, ORBIT_TARGET.z + Math.cos(a) * rr);
        tmpLook.copy(WIDE_LOOK).lerp(ORBIT_TARGET, orbit);
      }
    }
    camera.position.copy(tmpPos);
    camera.lookAt(tmpLook);
    invalidate();
  });
  return null;
}

function Character() {
  const tex = useTexture(`${import.meta.env.BASE_URL}anastasiia-doll.webp`);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.02;
  });
  const h = 2.0;
  const w = h * (897 / 1189);
  return (
    <group position={[-1.45, 1.45, 0.85]}>
      <Billboard follow lockX lockZ>
        <group ref={ref}>
          <mesh>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial map={tex} transparent alphaTest={0.02} toneMapped={false} />
          </mesh>
        </group>
      </Billboard>
    </group>
  );
}

function Chair() {
  return (
    <group position={[-1.45, 0, 0.75]}>
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
      <mesh position={[0.3, 0.76, -0.1]}>
        <boxGeometry args={[4.6, 0.09, 1.7]} />
        <meshStandardMaterial color="#1c1c23" roughness={0.45} metalness={0.15} />
      </mesh>
      {[-1.9, 2.5].map((x) =>
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

/** Real DOM rendered on the monitor, so the "site inside the screen" is readable HTML, not a texture. */
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
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '28px 44px', fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
        <span>About</span><span>Skills</span><span>Projects</span><span>Contact</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 44px' }}>
        <div className="hero-heading" style={{ fontWeight: 900, fontSize: 150, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          {profile.firstName}
        </div>
        <div style={{ fontSize: 30, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 18 }}>{profile.title}</div>
      </div>
      <div style={{ padding: '0 44px 36px', display: 'flex', gap: 16 }}>
        <span style={{ borderRadius: 999, padding: '14px 36px', background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)', color: '#fff', fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{profile.primaryCta}</span>
        <span style={{ borderRadius: 999, padding: '12px 34px', border: '2px solid #D7E2EA', fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{profile.secondaryCta}</span>
      </div>
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

export default function Workstation3D({ progress, active }: { progress: Progress; active: React.MutableRefObject<'hero' | 'contact' | null> }) {
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
      <Character />
      <CameraRig progress={progress} active={active} />
    </Canvas>
  );
}
