'use client';

import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

interface GLTFResult {
  scene: THREE.Group;
  scenes: THREE.Group[];
  animations: THREE.AnimationClip[];
  cameras: THREE.Camera[];
}

export function BlenderModel() {
  const modelRef = useRef<THREE.Group>(null);
  const modelPath = '/images/feto/feto1.glb';
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf: GLTFResult) => {
      if (modelRef.current) {
        modelRef.current.clear();
        
        const model = gltf.scene;
        model.scale.set(5, 5, 5);
        model.position.set(0, 0, 0);
        
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            // Cor mais natural com tom rosado
            const skinColor = new THREE.Color('#E8B4B8');  // Base rosada
            const subsurfaceColor = new THREE.Color('#FF9AA2');  // Tom mais rosado para subsurface

            child.material = new THREE.MeshPhysicalMaterial({
              color: skinColor,
              roughness: 0.5,  // Ajustado para pele natural
              metalness: 0.05,  // Quase não metálico
              clearcoat: 0.3,   // Leve brilho da pele
              clearcoatRoughness: 0.3,
              envMapIntensity: 0.3,
              sheen: 0.2,       // Leve brilho perolado
              sheenColor: new THREE.Color('#FFD1DC'),
              sheenRoughness: 0.3,
              transmission: 0.1, // Leve translucidez
              thickness: 0.5    // Profundidade da translucidez
            });
          }
        });
        
        modelRef.current.add(model);
      }
    });
  }, []);

  useFrame((state) => {
    if (modelRef.current) {
      // Rotação baseada no scroll
      const scrollRotation = scrollYProgress.get() * Math.PI * 4; // 2 rotações completas
      const baseRotation = state.clock.elapsedTime * 0.1; // Rotação base mais lenta
      
      // Combina rotação do scroll com rotação suave
      modelRef.current.rotation.y = baseRotation + scrollRotation;
      
      // Movimento de flutuação suave
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      // Inclinação suave baseada no scroll
      modelRef.current.rotation.z = Math.sin(scrollYProgress.get() * Math.PI) * 0.1;
    }
  });

  return (
    <group ref={modelRef}>
      {/* Iluminação principal */}
      <ambientLight intensity={0.6} color="#FFF0E6" />
      
      {/* Luz frontal quente */}
      <pointLight position={[10, 5, 10]} intensity={0.8} color="#FFD6CC" />
      
      {/* Luz lateral fria para contraste */}
      <pointLight position={[-8, 3, -10]} intensity={0.4} color="#E6F0FF" />
      
      {/* Luz superior suave */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#FFF6E6" />
      
      {/* Luz inferior para preenchimento */}
      <pointLight position={[0, -5, 0]} intensity={0.2} color="#FFE6E6" />
    </group>
  );
} 