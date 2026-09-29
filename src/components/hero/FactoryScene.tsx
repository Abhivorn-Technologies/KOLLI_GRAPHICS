import { Environment, Lightformer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createBrandTextures, createFloorTexture, createSignTexture, type BrandTextures } from "./brandTextures";

export const STAGE_LEN = 6.5;
export const STAGE_COUNT = 7;
const CYCLE = STAGE_LEN * STAGE_COUNT;

type SceneProps = {
  onStageChange: (stage: number) => void;
  seek: { stage: number; key: number };
  scrollProgress?: number;
};


// Production line layout (x positions along the line)
const X = { start: -24, feed: -21, press: -11, coat: -1.5, die: 5.5, foil: 10.5, glue: 17.5, inspect: 21.8, pack: 28.5, end: 26.5 };
const BELT_Y = 1.05;
const METAL_DARK = "#2f363a";
const METAL = "#8b949a";
const BODY = "#dfe2df";
const RED = "#c8202b";

// Camera shots per stage: [position, lookAt]
const SHOTS: [THREE.Vector3, THREE.Vector3][] = [
  [new THREE.Vector3(4, 13, 27), new THREE.Vector3(3, 1.5, 0)],
  [new THREE.Vector3(X.feed + 4.5, 4.2, 8), new THREE.Vector3(X.feed + 0.5, 1.4, 0)],
  [new THREE.Vector3(X.press + 2.5, 5.2, 10.5), new THREE.Vector3(X.press - 0.5, 1.8, 0)],
  [new THREE.Vector3(X.coat + 3, 3.6, 7), new THREE.Vector3(X.coat, 1.3, 0)],
  [new THREE.Vector3(9, 7, 13), new THREE.Vector3(8, 1.2, 0)],
  [new THREE.Vector3(X.glue + 5.5, 4, 8.5), new THREE.Vector3(X.glue + 2, 1.3, 0)],
  [new THREE.Vector3(X.pack + 3.5, 4.8, 9), new THREE.Vector3(X.pack - 1.5, 1.6, 0)],
];

// Intro close-up on the opening carton (stage 0 starts here, pulls back to SHOTS[0])
const INTRO_CAM_CLOSE = new THREE.Vector3(3.5, 4.4, 16.5);
const INTRO_LOOK_CLOSE = new THREE.Vector3(2, 1.6, 5);

type Clock = React.RefObject<number>;

/* ---------------- Product flowing along the line ---------------- */

function makeBlankGeometry() {
  // Die-cut reverse-tuck carton blank outline
  const s = new THREE.Shape();
  const pts: [number, number][] = [
    [-1.1, -0.34], [-0.55, -0.34], [-0.55, -0.62], [-0.05, -0.62], [0, -0.34], [0.55, -0.34], [0.55, -0.5], [1.05, -0.5], [1.1, -0.34],
    [1.1, 0.34], [1.05, 0.5], [0.55, 0.5], [0.55, 0.34], [0, 0.34], [-0.05, 0.62], [-0.55, 0.62], [-0.55, 0.34], [-1.1, 0.34],
  ];
  pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  const geo = new THREE.ShapeGeometry(s);
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const uv = geo.getAttribute("uv") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + 1.1) / 2.2, (pos.getY(i) + 0.62) / 1.24);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function ProductStream({ clock, tex }: { clock: Clock; tex: BrandTextures }) {
  const COUNT = 17;
  const SPACING = 3;
  const LENGTH = COUNT * SPACING;
  const items = useRef<(THREE.Group | null)[]>([]);
  const blankGeo = useMemo(makeBlankGeometry, []);

  const mats = useMemo(() => {
    const board = new THREE.MeshStandardMaterial({ color: "#f3f1ea", roughness: 0.85 });
    const printed = new THREE.MeshStandardMaterial({ map: tex.sheet, roughness: 0.7 });
    const coated = new THREE.MeshPhysicalMaterial({ map: tex.sheet, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 });
    const blank = new THREE.MeshPhysicalMaterial({ map: tex.carton, roughness: 0.3, clearcoat: 0.8, side: THREE.DoubleSide });
    const foil = new THREE.MeshStandardMaterial({ color: "#d9b25a", metalness: 1, roughness: 0.22 });
    const side = new THREE.MeshPhysicalMaterial({ map: tex.side, roughness: 0.35, clearcoat: 0.6 });
    const front = new THREE.MeshPhysicalMaterial({ map: tex.carton, roughness: 0.3, clearcoat: 0.8 });
    const white = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.5 });
    return { board, printed, coated, blank, foil, box: [side, side, white, white, front, front] };
  }, [tex]);

  useFrame(() => {
    const t = clock.current ?? 0;
    items.current.forEach((g, i) => {
      if (!g) return;
      const x = X.start + ((t * 1.35 + i * SPACING) % LENGTH);
      g.position.x = x;
      g.visible = x < X.end;
      const [plain, printed, coated, blank, foil, flat, box] = g.children as THREE.Object3D[];
      const stage = x < X.press + 3.5 ? 0 : x < X.coat + 0.8 ? 1 : x < X.die ? 2 : x < X.glue + 1.5 ? 3 : x < X.inspect + 1.2 ? 4 : 5;
      if (plain) plain.visible = stage === 0;
      if (printed) printed.visible = stage === 1;
      if (coated) coated.visible = stage === 2;
      if (blank) blank.visible = stage === 3;
      if (foil) foil.visible = stage === 3 && x > X.foil;
      if (flat) flat.visible = stage === 4;
      if (box) {
        box.visible = stage === 5;
        const erect = THREE.MathUtils.smoothstep(x, X.inspect + 1.2, X.inspect + 2.6);
        box.scale.set(1, 0.08 + 0.92 * erect, 1);
        box.position.y = (0.8 * (0.08 + 0.92 * erect)) / 2 + 0.02;
      }
    });
  });

  return (
    <group position={[0, BELT_Y + 0.06, 0]}>
      {Array.from({ length: COUNT }, (_, i) => (
        <group key={i} ref={(el) => { items.current[i] = el; }}>
          <mesh material={mats.board} castShadow receiveShadow><boxGeometry args={[2.3, 0.02, 1.6]} /></mesh>
          <mesh material={mats.printed} castShadow rotation-x={-Math.PI / 2} position-y={0.012}><planeGeometry args={[2.3, 1.6]} /></mesh>
          <mesh material={mats.coated} castShadow rotation-x={-Math.PI / 2} position-y={0.012}><planeGeometry args={[2.3, 1.6]} /></mesh>
          <mesh material={mats.blank} geometry={blankGeo} castShadow position-y={0.01} />
          <mesh material={mats.foil} position={[-0.3, 0.015, 0]}><boxGeometry args={[0.36, 0.005, 0.1]} /></mesh>
          <mesh material={mats.box} castShadow position-y={0.03}><boxGeometry args={[1.25, 0.06, 0.8]} /></mesh>
          <mesh material={mats.box} castShadow><boxGeometry args={[0.95, 0.8, 0.62]} /></mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Machines ---------------- */

function Sign({ x, y = 4.6, number, title }: { x: number; y?: number; number: string; title: string }) {
  const tex = useMemo(() => createSignTexture(number, title), [number, title]);
  return (
    <group position={[x, y, -1.6]}>
      <mesh><planeGeometry args={[3.8, 0.8]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
      {[-1.6, 1.6].map((dx) => <mesh key={dx} position={[dx, 1.5, 0]}><cylinderGeometry args={[0.015, 0.015, 2.2]} /><meshStandardMaterial color={METAL} /></mesh>)}
    </group>
  );
}

/* ---------------- Intro: branded carton opens to reveal the factory ---------------- */

const INTRO_POS = new THREE.Vector3(2, 0, 6);

function IntroCarton({ clock, tex }: { clock: Clock; tex: BrandTextures }) {
  const group = useRef<THREE.Group>(null);
  const flaps = useRef<(THREE.Group | null)[]>([]);
  const glow = useRef<THREE.PointLight>(null);
  const inner = useRef<THREE.MeshStandardMaterial>(null);

  const mats = useMemo(() => {
    const side = new THREE.MeshPhysicalMaterial({ map: tex.side, roughness: 0.35, clearcoat: 0.6 });
    const front = new THREE.MeshPhysicalMaterial({ map: tex.carton, roughness: 0.3, clearcoat: 0.8 });
    const flap = new THREE.MeshPhysicalMaterial({ map: tex.carton, roughness: 0.35, clearcoat: 0.6, side: THREE.DoubleSide });
    return { walls: [side, side, front, front, side, side], flap };
  }, [tex]);

  const W = 3.4, H = 2.4, D = 2.6;

  useFrame(() => {
    const t = clock.current ?? 0;
    const g = group.current;
    if (!g) return;
    const inIntro = t < STAGE_LEN;
    g.visible = inIntro;
    if (!inIntro) return;
    // rise out of the floor, then open
    const rise = THREE.MathUtils.smoothstep(t, 0.1, 1.1);
    const open = THREE.MathUtils.smoothstep(t, 1.3, 3.6);
    const exit = THREE.MathUtils.smoothstep(t, STAGE_LEN - 0.9, STAGE_LEN - 0.1);
    g.position.y = -H * (1 - rise) - exit * (H + 1.5);
    g.rotation.y = 0.5 - rise * 0.35 + Math.sin(t * 0.4) * 0.04;
    const s = 1 - exit * 0.25;
    g.scale.set(s, s, s);
    flaps.current.forEach((f, i) => {
      if (!f) return;
      const a = open * 2.15;
      if (i === 0) f.rotation.x = a;          // front
      if (i === 1) f.rotation.x = -a;         // back
      if (i === 2) f.rotation.z = a;          // left
      if (i === 3) f.rotation.z = -a;         // right
    });
    if (glow.current) glow.current.intensity = open * (1 - exit) * 60;
    if (inner.current) inner.current.emissiveIntensity = open * (1 - exit) * 2.2;
  });

  return (
    <group ref={group} position={INTRO_POS.toArray()}>
      {/* walls */}
      <mesh material={mats.walls} position-y={H / 2} castShadow receiveShadow><boxGeometry args={[W, H, D]} /></mesh>
      {/* glowing interior */}
      <mesh position-y={H - 0.25} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[W - 0.2, D - 0.2]} />
        <meshStandardMaterial ref={inner} color="#fff1d6" emissive="#ffdf9e" emissiveIntensity={0} toneMapped={false} />
      </mesh>
      <pointLight ref={glow} position={[0, H + 0.6, 0]} color="#ffd98f" intensity={0} distance={14} />
      {/* flaps: front / back / left / right, hinged at top edges */}
      <group ref={(el) => { flaps.current[0] = el; }} position={[0, H, D / 2]}>
        <mesh material={mats.flap} position={[0, 0, -D / 4]} castShadow><boxGeometry args={[W, 0.05, D / 2]} /></mesh>
      </group>
      <group ref={(el) => { flaps.current[1] = el; }} position={[0, H, -D / 2]}>
        <mesh material={mats.flap} position={[0, 0, D / 4]} castShadow><boxGeometry args={[W, 0.05, D / 2]} /></mesh>
      </group>
      <group ref={(el) => { flaps.current[2] = el; }} position={[-W / 2, H, 0]}>
        <mesh material={mats.flap} position={[W / 4, 0, 0]} castShadow><boxGeometry args={[W / 2, 0.05, D]} /></mesh>
      </group>
      <group ref={(el) => { flaps.current[3] = el; }} position={[W / 2, H, 0]}>
        <mesh material={mats.flap} position={[-W / 4, 0, 0]} castShadow><boxGeometry args={[W / 2, 0.05, D]} /></mesh>
      </group>
    </group>
  );
}

function Conveyor() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas"); c.width = 64; c.height = 64;
    const ctx = c.getContext("2d");
    if (ctx) { ctx.fillStyle = "#1b1f21"; ctx.fillRect(0, 0, 64, 64); ctx.fillStyle = "#262b2e"; ctx.fillRect(0, 0, 8, 64); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(120, 1); return t;
  }, []);
  useFrame((_, d) => { tex.offset.x -= Math.min(d, 0.05) * 1.35 * (120 / 52); });
  const len = X.end - X.start + 2;
  const cx = (X.end + X.start) / 2;
  return (
    <group position={[cx, 0, 0]}>
      <mesh position-y={BELT_Y} receiveShadow><boxGeometry args={[len, 0.08, 1.9]} /><meshStandardMaterial map={tex} roughness={0.9} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[0, BELT_Y - 0.05, s * 1.02]} castShadow><boxGeometry args={[len, 0.22, 0.12]} /><meshStandardMaterial color={METAL} metalness={0.8} roughness={0.3} /></mesh>)}
      {Array.from({ length: Math.floor(len / 2.5) }, (_, i) => -len / 2 + 1 + i * 2.5).map((x) => (
        <group key={x} position-x={x}>{[-0.85, 0.85].map((z) => <mesh key={z} position={[0, BELT_Y / 2 - 0.05, z]}><boxGeometry args={[0.1, BELT_Y - 0.1, 0.1]} /><meshStandardMaterial color={METAL_DARK} /></mesh>)}</group>
      ))}
    </group>
  );
}

function SheetFeeder({ clock }: { clock: Clock }) {
  const arm = useRef<THREE.Group>(null);
  useFrame(() => { if (arm.current) arm.current.position.y = 2.25 + Math.sin((clock.current ?? 0) * 4.6) * 0.25; });
  return (
    <group position={[X.feed, 0, 0]}>
      <mesh position={[-1.4, 0.55, 0]} castShadow><boxGeometry args={[2.6, 1.1, 2.2]} /><meshStandardMaterial color={METAL_DARK} metalness={0.6} roughness={0.4} /></mesh>
      <mesh position={[-1.4, 1.35, 0]} castShadow><boxGeometry args={[2.4, 0.5, 1.7]} /><meshStandardMaterial color="#f5f3ec" roughness={0.9} /></mesh>
      {[-2.7, -0.1].map((x) => <mesh key={x} position={[x, 1.9, 0]}><boxGeometry args={[0.18, 3.8, 2.3]} /><meshStandardMaterial color={BODY} metalness={0.3} roughness={0.4} /></mesh>)}
      <mesh position={[-1.4, 3.8, 0]}><boxGeometry args={[2.9, 0.3, 2.3]} /><meshStandardMaterial color={RED} roughness={0.5} /></mesh>
      <group ref={arm} position={[-1.4, 2.25, 0]}>
        <mesh><boxGeometry args={[2.2, 0.12, 0.2]} /><meshStandardMaterial color={METAL} metalness={0.9} roughness={0.2} /></mesh>
        {[-0.7, 0, 0.7].map((x) => <mesh key={x} position={[x, -0.15, 0]}><cylinderGeometry args={[0.08, 0.08, 0.2]} /><meshStandardMaterial color="#111" /></mesh>)}
      </group>
      <Sign x={-1.4} y={5} number="01" title="Pre-press & feeding" />
    </group>
  );
}

const INKS = ["#1fa4dc", "#e5097f", "#ffe500", "#1d1d1b", "#1fa4dc", "#e5097f"];

function OffsetPress({ clock }: { clock: Clock }) {
  const cylinders = useRef<THREE.Group>(null);
  useFrame((_, d) => { cylinders.current?.children.forEach((c) => { c.rotation.z -= Math.min(d, 0.05) * 5; }); });
  const lamp = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => { if (lamp.current) lamp.current.emissiveIntensity = 1.5 + Math.sin((clock.current ?? 0) * 6) * 0.6; });
  return (
    <group position={[X.press, 0, 0]}>
      {INKS.map((ink, i) => {
        const x = -4.2 + i * 1.55;
        return (
          <group key={i} position-x={x}>
            <mesh position={[0, 1.7, -0.2]} castShadow receiveShadow><boxGeometry args={[1.4, 3.4, 1.3]} /><meshStandardMaterial color={BODY} metalness={0.25} roughness={0.35} /></mesh>
            <mesh position={[0, 3.45, -0.2]} castShadow><boxGeometry args={[1.42, 0.14, 1.32]} /><meshStandardMaterial color={ink} roughness={0.4} /></mesh>
            <mesh position={[0, 2.4, 0.46]}><boxGeometry args={[1.1, 0.8, 0.02]} /><meshStandardMaterial color="#10181c" metalness={0.4} roughness={0.1} transparent opacity={0.75} /></mesh>
            <mesh position={[0, 0.6, 1.25]} castShadow><boxGeometry args={[1.4, 1.2, 0.3]} /><meshStandardMaterial color={BODY} metalness={0.25} roughness={0.35} /></mesh>
            <mesh position={[0, 0.6, -1.25]} castShadow><boxGeometry args={[1.4, 1.2, 0.3]} /><meshStandardMaterial color={BODY} metalness={0.25} roughness={0.35} /></mesh>
          </group>
        );
      })}
      <group ref={cylinders}>
        {INKS.map((ink, i) => (
          <mesh key={i} position={[-4.2 + i * 1.55, BELT_Y + 0.45, 0]} rotation-x={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 2.2, 32]} />
            <meshStandardMaterial color={ink} metalness={0.5} roughness={0.25} />
          </mesh>
        ))}
      </group>
      {/* bridge over line & delivery */}
      <mesh position={[0, BELT_Y + 0.95, 0]} castShadow><boxGeometry args={[9.4, 0.12, 2.6]} /><meshStandardMaterial color={METAL_DARK} metalness={0.7} roughness={0.3} /></mesh>
      <mesh position={[4.9, 1.6, -0.2]} castShadow><boxGeometry args={[1.3, 3.2, 1.3]} /><meshStandardMaterial color={METAL_DARK} metalness={0.6} roughness={0.35} /></mesh>
      <mesh position={[4.9, 2.6, 0.46]}><boxGeometry args={[1, 0.25, 0.02]} /><meshStandardMaterial ref={lamp} color="#9f7bff" emissive="#9f7bff" emissiveIntensity={1.5} toneMapped={false} /></mesh>
      {/* operator console */}
      <group position={[0, 0, 2.6]}>
        <mesh position-y={0.55} castShadow><boxGeometry args={[1.6, 1.1, 0.6]} /><meshStandardMaterial color={METAL_DARK} /></mesh>
        <mesh position={[0, 1.25, -0.05]} rotation-x={-0.5}><boxGeometry args={[1.3, 0.6, 0.05]} /><meshStandardMaterial color="#0f2733" emissive="#1fa4dc" emissiveIntensity={0.7} /></mesh>
      </group>
      <Sign x={0} y={4.9} number="02" title="Offset printing" />
    </group>
  );
}

function Coater({ clock }: { clock: Clock }) {
  const glow = useRef<THREE.MeshStandardMaterial>(null);
  const roller = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (glow.current) glow.current.emissiveIntensity = 2.4 + Math.sin((clock.current ?? 0) * 11) * 0.4;
    if (roller.current) roller.current.rotation.y -= Math.min(d, 0.05) * 5;
  });
  return (
    <group position={[X.coat, 0, 0]}>
      {[-1.25, 1.25].map((z) => <mesh key={z} position={[0, 1.2, z]} castShadow><boxGeometry args={[3, 2.4, 0.35]} /><meshStandardMaterial color={BODY} metalness={0.25} roughness={0.35} /></mesh>)}
      <mesh position={[0, 2.6, 0]} castShadow><boxGeometry args={[3.1, 0.7, 2.9]} /><meshStandardMaterial color={METAL_DARK} metalness={0.6} roughness={0.35} /></mesh>
      <mesh position={[0.5, 2.22, 0]}><boxGeometry args={[1.6, 0.06, 2.1]} /><meshStandardMaterial ref={glow} color="#b89bff" emissive="#8f5cff" emissiveIntensity={2.4} toneMapped={false} /></mesh>
      <pointLight position={[0.5, 1.8, 0]} color="#9b6bff" intensity={6} distance={4} />
      <mesh ref={roller} position={[-0.9, BELT_Y + 0.3, 0]} rotation-x={Math.PI / 2}><cylinderGeometry args={[0.22, 0.22, 2.1, 24]} /><meshStandardMaterial color="#d7dde0" metalness={1} roughness={0.08} /></mesh>
      <Sign x={0} y={4.2} number="03" title="Coating & varnish" />
    </group>
  );
}

function Platen({ x, clock, phase, number, title, foil }: { x: number; clock: Clock; phase: number; number: string; title: string; foil?: boolean }) {
  const platen = useRef<THREE.Group>(null);
  const roll = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    const s = Math.sin((clock.current ?? 0) * 4.4 + phase);
    if (platen.current) platen.current.position.y = BELT_Y + 0.75 + Math.max(0, s) * 0.55;
    if (roll.current) roll.current.rotation.x += Math.min(d, 0.05) * 1.5;
  });
  return (
    <group position={[x, 0, 0]}>
      {[-1.35, 1.35].map((z) => <mesh key={z} position={[0, 1.8, z]} castShadow><boxGeometry args={[3.2, 3.6, 0.4]} /><meshStandardMaterial color={BODY} metalness={0.3} roughness={0.35} /></mesh>)}
      <mesh position={[0, 3.75, 0]} castShadow><boxGeometry args={[3.3, 0.5, 3.1]} /><meshStandardMaterial color={RED} roughness={0.45} /></mesh>
      {[-1.1, 1.1].map((dx) => <mesh key={dx} position={[dx, 2.6, 0]}><cylinderGeometry args={[0.07, 0.07, 2.2]} /><meshStandardMaterial color="#d8dde0" metalness={1} roughness={0.1} /></mesh>)}
      <group ref={platen}>
        <mesh castShadow><boxGeometry args={[2.6, 0.3, 2.2]} /><meshStandardMaterial color={METAL} metalness={0.85} roughness={0.25} /></mesh>
        <mesh position-y={-0.17}><boxGeometry args={[2.3, 0.04, 1.4]} /><meshStandardMaterial color={foil ? "#d9b25a" : "#3b4146"} metalness={1} roughness={0.25} /></mesh>
      </group>
      {foil && (
        <mesh ref={roll} position={[0, 4.35, 0]} rotation-z={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 2.4, 32]} />
          <meshStandardMaterial color="#d9b25a" metalness={1} roughness={0.18} />
        </mesh>
      )}
      <Sign x={0} y={foil ? 5.4 : 5} number={number} title={title} />
    </group>
  );
}

function FolderGluer({ clock }: { clock: Clock }) {
  const scan = useRef<THREE.MeshBasicMaterial>(null);
  const beacon = useRef<THREE.MeshStandardMaterial>(null);
  const belts = useRef<THREE.Group>(null);
  useFrame(() => {
    const t = clock.current ?? 0;
    if (scan.current) scan.current.opacity = 0.35 + Math.abs(Math.sin(t * 7)) * 0.5;
    if (beacon.current) beacon.current.emissiveIntensity = Math.sin(t * 5) > 0 ? 3 : 0.4;
    if (belts.current) belts.current.position.x = Math.sin(t * 9) * 0.02;
  });
  return (
    <group position={[X.glue, 0, 0]}>
      <group ref={belts}>
        {[-1.05, 1.05].map((z) => <mesh key={z} position={[0, BELT_Y + 0.25, z]} castShadow><boxGeometry args={[7, 0.5, 0.25]} /><meshStandardMaterial color={BODY} metalness={0.3} roughness={0.35} /></mesh>)}
      </group>
      {[-2.5, -1, 0.5].map((x, i) => (
        <mesh key={x} position={[x, BELT_Y + 0.35, i % 2 ? 0.55 : -0.55]} rotation={[i % 2 ? -0.6 : 0.6, 0, 0]} castShadow>
          <boxGeometry args={[1.1, 0.05, 0.6]} /><meshStandardMaterial color={METAL} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[-1.5, 2.2, -0.9]} castShadow><boxGeometry args={[0.8, 1.4, 0.6]} /><meshStandardMaterial color={RED} roughness={0.5} /></mesh>
      <mesh position={[-1.5, 1.45, -0.6]}><cylinderGeometry args={[0.05, 0.02, 0.4]} /><meshStandardMaterial color={METAL_DARK} /></mesh>
      {/* inspection arch */}
      <group position={[X.inspect - X.glue, 0, 0]}>
        {[-1.2, 1.2].map((z) => <mesh key={z} position={[0, 1.5, z]} castShadow><boxGeometry args={[0.35, 3, 0.35]} /><meshStandardMaterial color={METAL_DARK} metalness={0.6} /></mesh>)}
        <mesh position={[0, 3, 0]} castShadow><boxGeometry args={[0.6, 0.45, 2.8]} /><meshStandardMaterial color={METAL_DARK} metalness={0.6} /></mesh>
        <mesh position={[0, 2.1, 0]}><planeGeometry args={[0.02, 1.8]} /></mesh>
        <mesh position={[0, 1.9, 0]} rotation-y={Math.PI / 2}><planeGeometry args={[2.2, 1.7]} /><meshBasicMaterial ref={scan} color="#35e08a" transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} /></mesh>
        <mesh position={[0, 3.45, 1.1]}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial ref={beacon} color="#35e08a" emissive="#35e08a" emissiveIntensity={2} toneMapped={false} /></mesh>
      </group>
      <Sign x={1.5} y={4.7} number="05" title="Folding, gluing & inspection" />
    </group>
  );
}

function PackingStation({ tex, clock }: { tex: BrandTextures; clock: Clock }) {
  const mats = useMemo(() => {
    const side = new THREE.MeshPhysicalMaterial({ map: tex.side, roughness: 0.35, clearcoat: 0.6 });
    const front = new THREE.MeshPhysicalMaterial({ map: tex.carton, roughness: 0.3, clearcoat: 0.8 });
    const white = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.5 });
    return [side, side, white, white, front, front];
  }, [tex]);
  const hero = useRef<THREE.Group>(null);
  useFrame(() => { if (hero.current) hero.current.rotation.y = -0.5 + Math.sin((clock.current ?? 0) * 0.5) * 0.25; });
  const stack: [number, number, number][] = [];
  for (let l = 0; l < 3; l++) for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) stack.push([c * 1 - 0.5, 0.35 + l * 0.82, r * 0.66 - 0.66]);
  return (
    <group position={[X.pack, 0, 0]}>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow><boxGeometry args={[2.4, 0.24, 2.4]} /><meshStandardMaterial color="#9a7448" roughness={0.9} /></mesh>
      {stack.map((p, i) => <mesh key={i} material={mats} position={p} castShadow receiveShadow><boxGeometry args={[0.95, 0.8, 0.62]} /></mesh>)}
      <group ref={hero} position={[-1.6, 0, 2.6]}>
        <mesh position-y={0.5} castShadow><cylinderGeometry args={[0.8, 0.9, 1, 48]} /><meshStandardMaterial color="#1b1f21" metalness={0.5} roughness={0.3} /></mesh>
        <mesh material={mats} position-y={1.62} scale={1.5} castShadow><boxGeometry args={[0.95, 0.8, 0.62]} /></mesh>
      </group>
      <mesh position={[-2.6, 1.3, -1.4]} castShadow><boxGeometry args={[1.6, 2.6, 1.2]} /><meshStandardMaterial color={BODY} metalness={0.3} roughness={0.35} /></mesh>
      <Sign x={-0.6} y={4.6} number="06" title="Packed & delivered" />
    </group>
  );
}

function FactoryShell({ tex }: { tex: BrandTextures }) {
  const floor = useMemo(createFloorTexture, []);
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[2, 0, 0]}><planeGeometry args={[80, 34]} /><meshStandardMaterial map={floor} roughness={0.75} metalness={0.15} /></mesh>
      {[-2.6, 2.6].map((z) => <mesh key={z} rotation-x={-Math.PI / 2} position={[2, 0.005, z * 1.55]}><planeGeometry args={[60, 0.14]} /><meshStandardMaterial color="#e3b23c" /></mesh>)}
      <mesh position={[2, 8, -9]} receiveShadow><planeGeometry args={[80, 16]} /><meshStandardMaterial color="#3d4447" roughness={0.85} /></mesh>
      <mesh position={[3, 7.2, -8.9]}><planeGeometry args={[12.8, 4]} /><meshBasicMaterial map={tex.banner} toneMapped={false} /></mesh>
      {[-28, -18, -8, 14, 24, 34].map((x) => <mesh key={x} position={[x, 7, -8.4]} castShadow><boxGeometry args={[0.5, 14, 0.5]} /><meshStandardMaterial color={METAL_DARK} metalness={0.7} /></mesh>)}
      {[-24, -14, -4, 6, 16, 26].map((x) => (
        <mesh key={x} position={[x, 11, 0]} rotation-x={Math.PI / 2}>
          <boxGeometry args={[5, 0.12, 0.9]} />
          <meshStandardMaterial color="#fff4dc" emissive="#fff4dc" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

/* ---------------- Scene ---------------- */

export function FactoryScene({ onStageChange, seek, scrollProgress }: SceneProps) {
  const clock = useRef(0);
  const lastStage = useRef(-1);
  const { camera } = useThree();
  const tex = useMemo(createBrandTextures, []);
  const look = useRef(SHOTS[0]![1].clone());

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => tex.redraw(img);
    img.src = "/assets/logo/kolli-logo.png";
    return () => tex.dispose();
  }, [tex]);

  useEffect(() => {
    if (typeof scrollProgress !== "number") {
      clock.current = seek.stage * STAGE_LEN + 0.01;
    }
  }, [seek, scrollProgress]);

  useFrame((_, raw) => {
    const d = Math.min(raw, 0.05);
    if (typeof scrollProgress === "number") {
      const scaledProgress = Math.min(1, scrollProgress / 0.90);
      const targetClock = scaledProgress * (CYCLE - 0.01);
      clock.current = THREE.MathUtils.lerp(clock.current, targetClock, 1 - Math.exp(-12 * d));
    } else {


      clock.current = (clock.current + d) % CYCLE;
    }

    const t = clock.current;
    const stage = Math.min(STAGE_COUNT - 1, Math.floor(t / STAGE_LEN));
    if (stage !== lastStage.current) { lastStage.current = stage; onStageChange(stage); }
    let [pos, target] = SHOTS[stage]!;
    const local = (t % STAGE_LEN) / STAGE_LEN;
    if (stage === 0) {
      // start close on the opening carton, then pull back to the wide factory view
      const pull = THREE.MathUtils.smoothstep(local, 0.35, 0.85);
      pos = INTRO_CAM_CLOSE.clone().lerp(SHOTS[0]![0], pull);
      target = INTRO_LOOK_CLOSE.clone().lerp(SHOTS[0]![1], pull);
    }
    const drift = new THREE.Vector3(Math.sin(t * 0.35) * 0.6 + (local - 0.5) * 1.2, Math.sin(t * 0.5) * 0.15, 0);
    camera.position.lerp(pos.clone().add(drift), 1 - Math.exp(-2.5 * d));
    look.current.lerp(target, 1 - Math.exp(-3 * d));
    camera.lookAt(look.current);
  });


  return (
    <>
      <color attach="background" args={["#1c2123"]} />
      <fog attach="fog" args={["#1c2123", 22, 58]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[10, 16, 10]} intensity={2.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-34} shadow-camera-right={34} shadow-camera-top={14} shadow-camera-bottom={-10} shadow-bias={-0.0004} />
      <pointLight position={[-12, 6, 5]} color="#ffb870" intensity={30} distance={22} />
      <pointLight position={[20, 6, 5]} color="#bfe3ff" intensity={25} distance={22} />
      <Environment resolution={256}>
        <Lightformer intensity={2.2} color="#fff4de" position={[0, 9, 5]} scale={[30, 6, 1]} />
        <Lightformer intensity={1.2} color="#9fb6bd" position={[-14, 4, 0]} rotation-y={Math.PI / 2} scale={[16, 4, 1]} />
        <Lightformer intensity={1} color="#ff6aa8" position={[14, 3, 4]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
      </Environment>
      <FactoryShell tex={tex} />
      <Conveyor />
      <SheetFeeder clock={clock} />
      <OffsetPress clock={clock} />
      <Coater clock={clock} />
      <Platen x={X.die} clock={clock} phase={0} number="04" title="BOBST die cutting" />
      <Platen x={X.foil} clock={clock} phase={1.4} number="04" title="Foil stamping" foil />
      <FolderGluer clock={clock} />
      <PackingStation tex={tex} clock={clock} />
      <ProductStream clock={clock} tex={tex} />
      <IntroCarton clock={clock} tex={tex} />
    </>
  );
}
