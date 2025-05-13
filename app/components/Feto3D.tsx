'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export function Feto3D() {
  const modelRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  const [hovered, setHovered] = useState(false);
  
  // Load the 3D model
  const { scene } = useGLTF('/images/feto/feto1.glb');

  // Apply materials to preserve original colors
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const newMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#ffcdb4'), // Base skin tone
            roughness: 0.3,
            metalness: 0.0,
            transmission: 0.2, // Slight translucency
            thickness: 0.5, // For subsurface scattering
            clearcoat: 0.1,
            clearcoatRoughness: 0.4,
            sheen: 1.0,
            sheenRoughness: 0.8,
            sheenColor: new THREE.Color('#ffd6cc'), // Slight rosy tint
            ior: 1.4, // Close to skin's index of refraction
          });
          child.material = newMaterial;
        }
      });
    }
  }, [scene]);
  
  // Handle scroll-based animation
  useFrame((state) => {
    if (modelRef.current) {
      // Base rotation
      const baseRotation = state.clock.elapsedTime * 0.2;
      
      // Scroll-based rotation
      const scrollRotation = scrollYProgress.get() * Math.PI * 2;
      
      // Combine rotations
      modelRef.current.rotation.y = baseRotation + scrollRotation;
      
      // Floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      const floatX = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      modelRef.current.position.y = floatY;
      modelRef.current.position.x = floatX - 0.5; // Offset slightly to the right
      
      // Subtle tilt based on scroll
      modelRef.current.rotation.z = Math.sin(scrollYProgress.get() * Math.PI) * 0.1;
      
      // Mouse interaction - make it responsive to mouse movement when hovered
      if (hovered) {
        // Get mouse position (normalized -1 to 1)
        const mouseX = state.mouse.x;
        const mouseY = state.mouse.y;
        
        // Slightly tilt toward mouse cursor
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          mouseY * 0.1,
          0.1
        );
        
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          -mouseX * 0.1,
          0.1
        );
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={3.5}
      position={[-0.5, 0, -2.0]} // Initial position slightly to the right
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
} 