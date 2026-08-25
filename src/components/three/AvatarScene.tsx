"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

// ─── Types ───────────────────────────────────────────────────────────────────

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh | THREE.SkinnedMesh | THREE.Object3D };
  materials: { [key: string]: THREE.Material };
};

export interface AvatarSceneProps {
  /** Whether the user is hovering any CTA button (triggers smile blendshape) */
  isHoveringCTA?: boolean;
  /** Whether to disable all animations (prefers-reduced-motion) */
  reducedMotion?: boolean;
  /**
   * Scroll progress 0–1, computed outside the Canvas by Framer Motion's
   * useScroll and passed in as a plain number so we stay SSR-safe.
   */
  scrollProgress?: number;
}

// ─── Preload (call once at module level — outside any component) ──────────────

useGLTF.preload("/models/avatar.glb");

// ─── Constants ───────────────────────────────────────────────────────────────

const BLINK_MIN_INTERVAL_MS = 2500;
const BLINK_MAX_INTERVAL_MS = 5000;
const BLINK_CLOSE_FRAC = 0.35; // fraction of BLINK_DURATION for close phase
const BLINK_DURATION_MS = 140;

const HEAD_TRACKING_DAMPING = 8;
const SMILE_DAMPING = 4;
const BREATH_AMPLITUDE = 0.015; // Clearly visible breathing
const BREATH_SPEED = 1.0; // cycles / second

// ─── Helpers ─────────────────────────────────────────────────────────────────

function setMorphInfluence(
  mesh: THREE.SkinnedMesh | null,
  names: string[],
  value: number
) {
  if (!mesh?.morphTargetDictionary || !mesh.morphTargetInfluences) return;
  for (const name of names) {
    const idx = mesh.morphTargetDictionary[name];
    if (idx !== undefined) {
      mesh.morphTargetInfluences[idx] = THREE.MathUtils.clamp(value, 0, 1);
    }
  }
}

// ─── AvatarModel ─────────────────────────────────────────────────────────────

function AvatarModel({
  isHoveringCTA = false,
  reducedMotion = false,
  scrollProgress = 0,
}: AvatarSceneProps) {
  const { scene } = useGLTF("/models/avatar.glb") as GLTFResult;

  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const morphMeshRef = useRef<THREE.SkinnedMesh | null>(null);

  // Smoothed mouse position (-1 to 1)
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Blink
  const blinkPhase = useRef<"idle" | "closing" | "opening">("idle");
  const blinkProgress = useRef(0);
  const blinkTimer = useRef(0);
  const nextBlink = useRef(
    BLINK_MIN_INTERVAL_MS +
      Math.random() * (BLINK_MAX_INTERVAL_MS - BLINK_MIN_INTERVAL_MS)
  );

  // Morph target current values (smoothed)
  const mSmile = useRef(0);
  const mBlinkL = useRef(0);
  const mBlinkR = useRef(0);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const autoRotY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mouse tracking listener
  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, isMobile]);

  // Inspect model structure & find morph mesh and head/neck bones
  useEffect(() => {
    const morphNames: string[] = [];
    const boneNames: string[] = [];

    scene.traverse((obj) => {
      if (obj.type === "Bone") {
        boneNames.push(obj.name);
      }
      const sm = obj as THREE.SkinnedMesh;
      if (sm.isSkinnedMesh && sm.morphTargetDictionary) {
        const dict = sm.morphTargetDictionary;
        morphNames.push(...Object.keys(dict));
        if (
          !morphMeshRef.current ||
          Object.keys(dict).length >
            Object.keys(morphMeshRef.current.morphTargetDictionary ?? {}).length
        ) {
          morphMeshRef.current = sm;
        }
      }

      if (
        !headBoneRef.current &&
        /^(Head|head|mixamorigHead|Bip01_Head|CC_Base_Head|AvatarHead)$/i.test(obj.name)
      ) {
        headBoneRef.current = obj;
      }
      if (
        !neckBoneRef.current &&
        /^(Neck|neck|mixamorigNeck|Bip01_Neck|CC_Base_Neck|AvatarNeck)$/i.test(obj.name)
      ) {
        neckBoneRef.current = obj;
      }
    });

    console.log("[AvatarModel] Discovered bones:", boneNames);
    console.log("[AvatarModel] Discovered morph targets:", morphNames);
    console.log("[AvatarModel] Head bone found:", headBoneRef.current?.name ?? "None (using group fallback)");
    console.log("[AvatarModel] Morph mesh found:", morphMeshRef.current?.name ?? "None");
  }, [scene]);

  // ── Main animation loop ───────────────────────────────────────────────────
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);

    // ── Scroll-linked Y rotation ──────────────────────────────────────────
    const scrollTarget = reducedMotion ? 0 : scrollProgress * 0.4;

    // ── Mobile auto-rotation ──────────────────────────────────────────────
    if (isMobile && !reducedMotion) {
      autoRotY.current += dt * 0.3;
      groupRef.current.rotation.y = Math.sin(autoRotY.current) * 0.25;
    }

    // ── Mouse tracking (Desktop) ─────────────────────────────────────────
    if (!isMobile && !reducedMotion) {
      mouseCurrent.current.x = THREE.MathUtils.damp(
        mouseCurrent.current.x,
        mouseTarget.current.x,
        HEAD_TRACKING_DAMPING,
        dt
      );
      mouseCurrent.current.y = THREE.MathUtils.damp(
        mouseCurrent.current.y,
        mouseTarget.current.y,
        HEAD_TRACKING_DAMPING,
        dt
      );

      // Rotate head bone if found
      if (headBoneRef.current) {
        headBoneRef.current.rotation.y = mouseCurrent.current.x * 0.45;
        headBoneRef.current.rotation.x = mouseCurrent.current.y * -0.25;
      }
      if (neckBoneRef.current) {
        neckBoneRef.current.rotation.y = mouseCurrent.current.x * 0.2;
        neckBoneRef.current.rotation.x = mouseCurrent.current.y * -0.1;
      }

      // Also rotate whole group slightly so body turns towards cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseCurrent.current.x * 0.25 + scrollTarget,
        dt * 4
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseCurrent.current.y * -0.08,
        dt * 4
      );
    }

    // ── Breathing (Y translation + subtle scale) ─────────────────────────
    if (!reducedMotion) {
      const breathPhase = Math.sin(Date.now() * 0.001 * BREATH_SPEED * Math.PI * 2);
      const breathY = breathPhase * BREATH_AMPLITUDE;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        breathY,
        dt * 5
      );
    }

    // ── Blink ─────────────────────────────────────────────────────────────
    if (!reducedMotion) {
      blinkTimer.current += dt * 1000;

      if (blinkPhase.current === "idle" && blinkTimer.current >= nextBlink.current) {
        blinkPhase.current = "closing";
        blinkProgress.current = 0;
        blinkTimer.current = 0;
        nextBlink.current =
          BLINK_MIN_INTERVAL_MS +
          Math.random() * (BLINK_MAX_INTERVAL_MS - BLINK_MIN_INTERVAL_MS);
      }

      if (blinkPhase.current === "closing") {
        blinkProgress.current +=
          (dt * 1000) / (BLINK_DURATION_MS * BLINK_CLOSE_FRAC);
        if (blinkProgress.current >= 1) {
          blinkProgress.current = 1;
          blinkPhase.current = "opening";
        }
      } else if (blinkPhase.current === "opening") {
        blinkProgress.current -=
          (dt * 1000) / (BLINK_DURATION_MS * (1 - BLINK_CLOSE_FRAC));
        if (blinkProgress.current <= 0) {
          blinkProgress.current = 0;
          blinkPhase.current = "idle";
        }
      }

      const bv = blinkProgress.current;
      mBlinkL.current = THREE.MathUtils.lerp(mBlinkL.current, bv, dt * 25);
      mBlinkR.current = THREE.MathUtils.lerp(mBlinkR.current, bv, dt * 25);

      const mesh = morphMeshRef.current;
      setMorphInfluence(mesh, ["eyeBlinkLeft", "eyeBlink_L", "blink_L", "eyesClosed"], mBlinkL.current);
      setMorphInfluence(mesh, ["eyeBlinkRight", "eyeBlink_R", "blink_R", "eyesClosed"], mBlinkR.current);
    }

    // ── CTA hover smile ───────────────────────────────────────────────────
    const smileTarget = isHoveringCTA && !reducedMotion ? 0.65 : 0;
    mSmile.current = THREE.MathUtils.damp(mSmile.current, smileTarget, SMILE_DAMPING, dt);

    const mesh = morphMeshRef.current;
    setMorphInfluence(mesh, ["mouthSmile", "mouthSmileLeft", "mouthSmile_L", "smile"], mSmile.current);
    setMorphInfluence(mesh, ["mouthSmile", "mouthSmileRight", "mouthSmile_R", "smile"], mSmile.current);
    setMorphInfluence(mesh, ["cheekSquintLeft", "cheekSquint_L"], mSmile.current * 0.4);
    setMorphInfluence(mesh, ["cheekSquintRight", "cheekSquint_R"], mSmile.current * 0.4);
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive
        object={scene}
        scale={1.0}
        position={[0, -1.08, 0]}
      />
    </group>
  );
}

// ─── Lights ──────────────────────────────────────────────────────────────────

function SceneLights() {
  return (
    <>
      {/* Key light — front-upper, slightly warm */}
      <directionalLight position={[1.5, 2.5, 2.5]} intensity={1.9} color="#d0e0ff" />
      {/* Fill light — opposite side, cooler */}
      <directionalLight position={[-2, 1, 1]} intensity={0.65} color="#7aacff" />
      {/* Rim / back light — electric blue accent matching site theme */}
      <directionalLight position={[0.3, 1.5, -3]} intensity={1.3} color="#3b82f6" />
      {/* Very subtle ambient */}
      <ambientLight intensity={0.22} color="#1a2744" />
    </>
  );
}

// ─── Public export (the inner-scene component, consumed by AvatarCanvas) ─────

export default function AvatarScene({
  isHoveringCTA = false,
  reducedMotion = false,
  scrollProgress = 0,
}: AvatarSceneProps) {
  return (
    <>
      <SceneLights />
      <Environment preset="city" />
      <AvatarModel
        isHoveringCTA={isHoveringCTA}
        reducedMotion={reducedMotion}
        scrollProgress={scrollProgress}
      />

      {/* Subtle Bloom post-processing (electric blue glow) */}
      {!reducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={0.22}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}
