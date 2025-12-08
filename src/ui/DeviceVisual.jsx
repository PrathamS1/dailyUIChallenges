import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  RoundedBox, 
  Environment, 
  Float, 
  PresentationControls,
  ContactShadows,
  useCursor
} from '@react-three/drei';
import * as THREE from 'three';

function ExplodingDevice() {
  const group = useRef();
  
  const topLayer = useRef();
  const midLayer = useRef();
  const botLayer = useRef();
  const chipRef = useRef();

  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered);

  // Animation Loop
  useFrame((state, delta) => {
    // 1. Idle Rotation (Gentle sway when not interacting)
    // We dampen this when hovered so it's easier to inspect
    const t = state.clock.getElapsedTime();
    if (!hovered) {
      group.current.rotation.y = Math.sin(t / 4) * 0.1;
      group.current.rotation.x = Math.sin(t / 6) * 0.05;
    }

    // 2. Explosion Logic (Lerp positions based on hover state)
    const damp = 4 * delta; 

    // Top Layer (Solid Cover) lifts UP significantly
    topLayer.current.position.z = THREE.MathUtils.lerp(topLayer.current.position.z, hovered ? 1.5 : 0.25, damp);
    
    // Middle Layer (PCB) stays central
    midLayer.current.position.z = THREE.MathUtils.lerp(midLayer.current.position.z, hovered ? 0 : 0, damp);
    
    // Bottom Layer (Chassis) drops DOWN
    botLayer.current.position.z = THREE.MathUtils.lerp(botLayer.current.position.z, hovered ? -1.5 : -0.25, damp);

    // Pulse the Chip glow intensity
    if (chipRef.current) {
        chipRef.current.intensity = hovered ? 2 : 0.5; // Brighter when opened
    }
  });

  // Shared Geometry Constants
  const width = 2.4;
  const height = 3.8;
  const radius = 0.2;

  return (
    <group 
      ref={group} 
      dispose={null}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      
      {/* --- LAYER 1: Top Cover (Solid Matte Black + Screen) --- */}
      <group ref={topLayer}>
        {/* Main Body */}
        <RoundedBox args={[width, height, 0.15]} radius={radius} smoothness={4}>
          <meshStandardMaterial 
            color="#18181b" // zinc-900
            roughness={0.2} // Satin finish
            metalness={0.8}
          />
        </RoundedBox>
        
        {/* The "Screen" or Interface Strip - Glossy Black */}
        <group position={[0, 0.8, 0.08]}>
           <RoundedBox args={[width - 0.4, 1.2, 0.02]} radius={0.05} smoothness={2}>
              <meshStandardMaterial color="#000000" roughness={0.0} metalness={0.9} />
           </RoundedBox>
           {/* Tiny "Status LED" dot inside the screen */}
           <mesh position={[0.7, 0.3, 0.02]}>
              <circleGeometry args={[0.04, 16]} />
              <meshBasicMaterial color="#06b6d4" toneMapped={false} />
           </mesh>
        </group>
      </group>


      {/* --- LAYER 2: The PCB / Internals (Hidden until hover) --- */}
      <group ref={midLayer}>
        {/* Main Board */}
        <RoundedBox args={[width - 0.3, height - 0.3, 0.1]} radius={radius - 0.05} smoothness={4}>
          <meshStandardMaterial 
            color="#27272a" 
            roughness={0.4} 
            metalness={0.9} 
          />
        </RoundedBox>

        {/* The Secure Element (Chip) */}
        <group position={[0, 0.2, 0.06]}>
          <RoundedBox args={[0.8, 0.8, 0.05]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
          </RoundedBox>
          
          {/* Cyan Circuit Pattern */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.6, 0.6]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} side={THREE.DoubleSide} /> 
          </mesh>
          
          {/* The Internal Light Source */}
          <pointLight ref={chipRef} distance={2} decay={2} color="#06b6d4" />
        </group>

        {/* Battery / Capacitor block */}
        <group position={[0, -1.0, 0.06]}>
           <RoundedBox args={[1.2, 0.8, 0.05]} radius={0.05}>
              <meshStandardMaterial color="#52525b" metalness={0.5} roughness={0.4} />
           </RoundedBox>
        </group>
      </group>


      {/* --- LAYER 3: Bottom Chassis (Titanium/Zinc) --- */}
      <group ref={botLayer}>
        <RoundedBox args={[width, height, 0.3]} radius={radius} smoothness={4}>
          <meshStandardMaterial 
            color="#27272a" 
            roughness={0.3}
            metalness={1.0} 
          />
        </RoundedBox>
      </group>

    </group>
  );
}

export default function DeviceVisual() {
  return (
    <div className="w-full h-full min-h-[400px] touch-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 35 }}>
        
        {/* 1. Lighting Environment */}
        <color attach="background" args={['#09090b']} /> 
        <ambientLight intensity={0.5} />
        
        {/* Main Key Light */}
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={15} color="#ffffff" />
        {/* Fill Light */}
        <spotLight position={[-10, 0, -5]} intensity={5} color="#ffffff" />
        {/* Cyan Rim Light (Subtle Cyberpunk edge) */}
        <spotLight position={[0, 5, -5]} angle={0.5} penumbra={1} intensity={20} color="#06b6d4" />

        {/* Studio Reflections for the metal/glossy parts */}
        <Environment preset="city" />

        {/* 2. Controls - Drag to rotate */}
        <PresentationControls
          global={false} // Dragging applies to the canvas area
          cursor={true}
          snap={true} // Snaps back to center (remove this if you want it to stay rotated)
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits (45 degrees)
          azimuth={[-Math.PI / 2, Math.PI / 2]} // Horizontal limits (90 degrees)
        >
          <Float 
            speed={2} 
            rotationIntensity={0.2} 
            floatIntensity={0.5} 
            floatingRange={[-0.1, 0.1]}
          >
            <ExplodingDevice />
          </Float>
        </PresentationControls>

        {/* 3. Shadow */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#06b6d4" />
      </Canvas>
    </div>
  );
}