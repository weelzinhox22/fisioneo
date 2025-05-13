/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Configuração para o PDF.js
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Otimizações para Three.js
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 100 * 1024, // 100kb - inlining pequenos modelos melhora performance
        },
      },
    });
    
    return config;
  },
  // Otimizar carregamento de chunks para melhor performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
  // Reduzir tamanho do JS
  swcMinify: true,
}

export default nextConfig
