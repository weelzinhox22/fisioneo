'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Stage, OrbitControls, AccumulativeShadows, RandomizedLight, SoftShadows } from '@react-three/drei';
import { Feto3D } from './Feto3D';

export const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-[#1a0000]">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left Side - Content */}
        <div className="relative z-10 flex items-center justify-center md:justify-start px-8 md:pl-16 lg:pl-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl max-w-xl">
              Fisioterapia Neonatal
            </h1>
            <p className="text-lg text-gray-200 max-w-lg">
            Portal educacional dedicado ao estudo e prática da fisioterapia em recém-nascidos e crianças, com foco em desenvolvimento neuromotor, avaliação e intervenção precoce.
            </p>
          </motion.div>
        </div>

        {/* Right Side - 3D Scene */}
        <div className="absolute md:relative inset-0 md:inset-auto">
          <Canvas
            camera={{ position: [3, 2, 8], fov: 45 }}
            gl={{ antialias: true }}
            shadows
          >
            <SoftShadows size={25} samples={16} />
            <Suspense fallback={null}>
              <Stage
                environment="sunset"
                intensity={1}
                adjustCamera={false}
                shadows="contact"
                position={[0, -1, 0]}
              >
                <Feto3D />
                <AccumulativeShadows temporal frames={100} scale={10}>
                  <RandomizedLight
                    amount={8}
                    radius={4}
                    position={[5, 5, -10]}
                    bias={0.001}
                  />
                </AccumulativeShadows>
              </Stage>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay gradient for mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none md:hidden" />
      </div>
    </div>
  );
}; 