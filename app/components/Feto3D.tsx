'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { useGLTF, MeshDistortMaterial } from '@react-three/drei';

// Hook para detectar dispositivo móvel
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

export function Feto3D() {
  const modelRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const [modelLoaded, setModelLoaded] = useState(false);
  const pointLightRef = useRef<THREE.PointLight>(null);
  
  // Carregar modelo com qualidade baseada no dispositivo
  const modelPath = isMobile ? '/images/feto/feto1_lowpoly.glb' : '/images/feto/feto1.glb';
  
  // Tentar carregar modelo de baixa qualidade para mobile, cair de volta para o normal se não existir
  const { scene } = useGLTF(modelPath);
  
  // Lidar com carregamento de fallback se o modelo de baixa qualidade não estiver disponível
  useEffect(() => {
    const onError = () => {
      if (isMobile) {
        console.log('Modelo de baixa qualidade não encontrado, usando o padrão');
        useGLTF('/images/feto/feto1.glb');
      }
    };
    
    // Tentativa de detectar erro ao carregar o modelo
    if (!scene && isMobile) {
      onError();
    }
  }, [scene, isMobile]);

  // Criar cor personalizada para pele mais realista
  const skinColor = new THREE.Color('#ffcdb4');
  const skinHightlightColor = new THREE.Color('#ffd6cc');
  
  // Função para criar textura procedural para pele
  const createSkinTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Criar gradiente de base
      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 512);
      gradient.addColorStop(0, '#ffcdb4');
      gradient.addColorStop(0.7, '#ffd6cc');
      gradient.addColorStop(1, '#ffcdb4');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);
      
      // Adicionar pequenos detalhes para simular pele
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 2 + 0.5;
        const alpha = Math.random() * 0.05;
        
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 230, 220, ${alpha})`;
        context.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    
    return texture;
  };

  // Aplicar materiais com configurações otimizadas para o tipo de dispositivo
  useEffect(() => {
    if (scene) {
      // Criar textura de pele (apenas para desktop)
      const skinTexture = !isMobile ? createSkinTexture() : null;
      
      // Aplicar materiais a cada mesh
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Configurações de material simplificadas para mobile
          if (isMobile) {
            child.material = new THREE.MeshStandardMaterial({
              color: skinColor,
              roughness: 0.6,
              metalness: 0.1,
              // Remover efeitos caros em dispositivos móveis
              envMapIntensity: 0.5,
            });
            
            // Simplificar geometria para dispositivos móveis se possível
            if (child.geometry.attributes.position.count > 5000) {
              // Nota: em produção, seria melhor ter modelos otimizados pré-criados
              console.log('Geometria complexa detectada, usar modelo simplificado');
            }
          } else {
            // Configuração rica para desktop
            // Subsurface scattering effect
            child.material = new THREE.MeshPhysicalMaterial({
              color: skinColor,
              roughness: 0.3,
              metalness: 0.05,
              transmission: 0.3, // Translucidez para efeito subsurface scattering
              thickness: 0.6, // Para subsurface scattering
              clearcoat: 0.2,
              clearcoatRoughness: 0.3,
              sheen: 1.0,
              sheenRoughness: 0.7,
              sheenColor: skinHightlightColor,
              ior: 1.4, // Índice de refração próximo ao da pele
              map: skinTexture,
              envMapIntensity: 0.8,
              iridescence: 0.1,
              iridescenceIOR: 1.2,
              attenuationDistance: 0.5,
              attenuationColor: new THREE.Color('#ffcdb4'),
            });
          }
          
          // Adicionar recepção de sombras
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
      
      setModelLoaded(true);
    }
  }, [scene, isMobile]);
  
  // Luz ambiente dinâmica
  useFrame((state) => {
    if (pointLightRef.current) {
      // Animação suave da luz
      const t = state.clock.getElapsedTime();
      pointLightRef.current.intensity = 0.8 + Math.sin(t * 0.5) * 0.2;
      
      // Movimento suave da luz
      pointLightRef.current.position.x = Math.sin(t * 0.3) * 2;
      pointLightRef.current.position.y = Math.cos(t * 0.5) * 1 + 1;
      pointLightRef.current.position.z = Math.sin(t * 0.2) * 2;
    }
  });
  
  // Animações otimizadas para dispositivos diferentes
  useFrame((state) => {
    if (modelRef.current && modelLoaded) {
      // Reduza a frequência de atualização em dispositivos móveis
      if (isMobile && state.clock.elapsedTime % 2 !== 0) {
        return; // Atualiza a cada 2 frames em dispositivos móveis
      }
      
      // Base rotation - mais lenta em dispositivos móveis
      const baseRotation = state.clock.elapsedTime * (isMobile ? 0.1 : 0.2);
      
      // Scroll-based rotation - simplificada em dispositivos móveis
      const scrollRotation = isMobile ? 0 : scrollYProgress.get() * Math.PI * 2;
      
      // Combine rotations com transição suave
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        baseRotation + scrollRotation,
        0.05
      );
      
      // Animações de flutuação - reduzidas/desabilitadas em dispositivos móveis
      if (!isMobile) {
        const floatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
        const floatX = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        
        // Aplicar flutuação com suavização
        modelRef.current.position.y = THREE.MathUtils.lerp(
          modelRef.current.position.y,
          floatY,
          0.05
        );
        
        modelRef.current.position.x = THREE.MathUtils.lerp(
          modelRef.current.position.x, 
          floatX - 0.5,
          0.05
        );
        
        // Subtle tilt baseado no scroll - apenas em desktop
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          Math.sin(scrollYProgress.get() * Math.PI) * 0.1,
          0.05
        );
      }
      
      // Interação com mouse - apenas em desktop
      if (hovered && !isMobile) {
        const mouseX = state.mouse.x;
        const mouseY = state.mouse.y;
        
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          mouseY * 0.2,
          0.1
        );
        
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          -mouseX * 0.2,
          0.1
        );
        
        // Efeito de aproximação suave ao passar o mouse
        modelRef.current.scale.x = THREE.MathUtils.lerp(
          modelRef.current.scale.x,
          isMobile ? 2.6 : 3.7,
          0.1
        );
        
        modelRef.current.scale.y = THREE.MathUtils.lerp(
          modelRef.current.scale.y,
          isMobile ? 2.6 : 3.7,
          0.1
        );
        
        modelRef.current.scale.z = THREE.MathUtils.lerp(
          modelRef.current.scale.z,
          isMobile ? 2.6 : 3.7,
          0.1
        );
      } else {
        // Retornar ao tamanho normal
        modelRef.current.scale.x = THREE.MathUtils.lerp(
          modelRef.current.scale.x,
          isMobile ? 2.5 : 3.5,
          0.1
        );
        
        modelRef.current.scale.y = THREE.MathUtils.lerp(
          modelRef.current.scale.y,
          isMobile ? 2.5 : 3.5,
          0.1
        );
        
        modelRef.current.scale.z = THREE.MathUtils.lerp(
          modelRef.current.scale.z,
          isMobile ? 2.5 : 3.5,
          0.1
        );
      }
    }
  });

  return (
    <>
      {/* Adicionar luz pontual para realçar características */}
      <pointLight
        ref={pointLightRef}
        position={[2, 2, 2]}
        intensity={1}
        color="#fff9f5"
        distance={10}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={8}
        shadow-bias={-0.0001}
      />
      
      {/* Adicionar uma luz ambiente suave */}
      <ambientLight intensity={0.4} color="#e6f5ff" />
      
      {/* Luz direcional para sombras suaves */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        color="#fff9f5" 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Modelo 3D */}
    <primitive
      ref={modelRef}
      object={scene}
      position={isMobile ? [0, 0, -1.0] : [-0.5, 0, -2.0]} // Posição ajustada para mobile
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => !isMobile && setHovered(false)}
    />
      
      {/* Adicionar efeito de brilho/aura ao redor do modelo */}
      {!isMobile && (
        <mesh position={[-0.5, 0, -3.0]} scale={[10, 10, 0.1]}>
          <planeGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#fff"
            transparent
            opacity={0.03}
            distort={0.3}
            speed={2}
            bumpScale={0.01}
          />
        </mesh>
      )}
    </>
  );
} 