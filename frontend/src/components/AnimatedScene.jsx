import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ================= PARTICLE (orbiting node) =================
const Particle = ({ position }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 2;
    ref.current.scale.setScalar(1 + Math.sin(t * 4) * 0.3);
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.07, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#cccccc"
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
};

// ================= CURVE PATH LINE =================
const CurvePath = ({ curve, index }) => {
  const ref = useRef();

  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(80);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.5 + index;
    ref.current.material.opacity = 0.12 + Math.sin(t) * 0.08;
  });

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.15}
        linewidth={1}
      />
    </line>
  );
};

// ================= CENTRAL ORB =================
const CentralOrb = () => {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Outer shell — slow steady rotation
    outerRef.current.rotation.y = t * 0.25;
    outerRef.current.rotation.x = Math.sin(t * 0.18) * 0.12;
    outerRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);

    // Inner core — counter-rotation
    innerRef.current.rotation.y = -t * 0.6;
    innerRef.current.rotation.z = t * 0.4;

    // Ring — orbital tilt oscillation
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.3;
    ringRef.current.rotation.y = t * 0.15;
  });

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner solid octahedron core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#f0f0f0"
          emissive="#ffffff"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.05}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.05, 0.012, 8, 120]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#aaaaaa"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
};

// ================= FLOWING PARTICLES =================
const FlowParticles = ({ positions, index }) => {
  const pointsRef = useRef();

  // Keep a mutable copy of positions so we can animate them
  const posArray = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(() => {
    const pts = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < pts.length; i += 3) {
      pts[i + 1] += 0.022 + index * 0.008;
      if (pts[i + 1] > 5.5) pts[i + 1] = -5.5;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={posArray}
          itemSize={3}
          count={posArray.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e8e8e8"
        size={0.045}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// ================= NETWORK NODES (background constellation) =================
const NetworkNodes = () => {
  const groupRef = useRef();

  const { nodePositions, lineSegments } = useMemo(() => {
    const count = 55;
    const spread = 7;
    const pts = Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread * 0.7,
      (Math.random() - 0.5) * spread * 0.5 - 1
    ));

    // Build edges for nearby nodes
    const segs = [];
    const threshold = 2.4;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < threshold) {
          segs.push(pts[i].x, pts[i].y, pts[i].z);
          segs.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return {
      nodePositions: pts.flatMap(p => [p.x, p.y, p.z]),
      lineSegments: segs,
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.018;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.012) * 0.06;
    }
  });

  const nodePosArray = useMemo(() => new Float32Array(nodePositions), [nodePositions]);
  const lineArray = useMemo(() => new Float32Array(lineSegments), [lineSegments]);

  return (
    <group ref={groupRef}>
      {/* Node dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={nodePosArray}
            itemSize={3}
            count={nodePosArray.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#cccccc"
          size={0.055}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={lineArray}
            itemSize={3}
            count={lineArray.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
};

// ================= MAIN TECH SYSTEM =================
const TechParticleSystem = () => {
  const groupRef = useRef();

  const curves = useMemo(() => [
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, -1.2, 0.2),
      new THREE.Vector3(-0.8, 2.2, 1.1),
      new THREE.Vector3(1.2, 0.2, -1.2),
      new THREE.Vector3(2.2, 1.2, 0.2),
    ], true),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.2, 0.2, 1.1),
      new THREE.Vector3(1.1, -2.2, -1.1),
      new THREE.Vector3(-1.1, 1.1, 2.2),
      new THREE.Vector3(-2.2, -0.5, 0.2),
    ], true),
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.5, 0.5),
      new THREE.Vector3(1.8, 0, -1.5),
      new THREE.Vector3(0, -2.5, 0.5),
      new THREE.Vector3(-1.8, 0, -1.5),
    ], true),
  ], []);

  const particlePositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 150; i++) {
      const curve = curves[i % curves.length];
      const point = curve.getPointAt(Math.random());
      const jitter = 0.15;
      arr.push(
        point.x * 1.3 + (Math.random() - 0.5) * jitter,
        point.y * 1.3 + (Math.random() - 0.5) * jitter,
        point.z * 1.3 + (Math.random() - 0.5) * jitter
      );
    }
    return arr;
  }, [curves]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.022;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
    }
  });

  const orbitingParticles = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const radius = 2.2 + Math.sin(i * 1.3) * 0.4;
      const tilt = Math.cos(i * 0.7) * 0.6;
      return [Math.cos(angle) * radius, tilt, Math.sin(angle) * radius];
    }), []
  );

  return (
    <group ref={groupRef}>
      <CentralOrb />

      <FlowParticles positions={particlePositions} index={0} />

      {curves.map((curve, i) => (
        <CurvePath key={i} curve={curve} index={i} />
      ))}

      {orbitingParticles.map((position, i) => (
        <Particle key={i} position={position} />
      ))}
    </group>
  );
};

// ================= EXPORT =================
const AnimatedScene = () => {
  return (
    // pointer-events-none ensures clicks pass through to page content beneath
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Monochrome lighting — cool white key, warm grey fill */}
        <ambientLight intensity={0.35} color="#e8e8e0" />
        <pointLight position={[8, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-8, -5, -4]} intensity={0.7} color="#aaaaaa" />
        <pointLight position={[0, 0, 6]} intensity={0.5} color="#f0f0f0" />

        {/* Background star field — desaturated */}
        <Stars
          radius={100}
          depth={60}
          count={1200}
          factor={3}
          fade
          speed={0.15}
          saturation={0}
        />

        {/* Background network constellation */}
        <NetworkNodes />

        {/* Main animated system */}
        <TechParticleSystem />
      </Canvas>
    </div>
  );
};

export default AnimatedScene;