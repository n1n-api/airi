import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Terminal, Zap, Globe, Shield } from 'lucide-react';
import NeuralCloud from './NeuralCloud';
import { useTypewriter } from '../hooks/useTypewriter';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const text = useTypewriter(t('hero.typewriter', { returnObjects: true }) as string[]);

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center">
      
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40 lg:opacity-80">
        <motion.div 
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1.5} />
          {/* Main Key Light (Cyan) - Increased range and intensity */}
          <pointLight position={[20, 10, 10]} intensity={4} distance={50} color="#06b6d4" />
          {/* Fill Light (Pink) - Increased range and intensity */}
          <pointLight position={[-20, -10, -10]} intensity={4} distance={50} color="#f472b6" />
          {/* Rim Light (White/Blue) - Adds definition to the edges */}
          <spotLight position={[0, 10, 0]} intensity={3} angle={0.5} penumbra={1} color="#ffffff" />
          <group position={[2, 0, 0]}>
            <NeuralCloud />
          </group>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-6 z-10 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">
        
        {/* Left: Text & CTA */}
        <div className="pointer-events-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-32" // Increased from pt-20 to pt-32
          >
            {/* New Kicker / Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t('hero.tagline')}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent min-h-[1.1em] inline-block">
                {text.endsWith('.') || text.endsWith('。') ? (
                  <>
                    {text.slice(0, -1)}
                    <span className="animate-pulse text-accent">.</span>
                  </>
                ) : (
                  text
                )}
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://api.n1n.ai/login" target="_blank" className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 fill-current" />
                <span>{t('hero.cta.primary')}</span>
                <div className="absolute inset-0 rounded-lg ring-2 ring-white/50 group-hover:ring-4 transition-all opacity-0 group-hover:opacity-100" />
              </a>
              
              <a href="https://docs.n1n.ai" target="_blank" className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Terminal className="w-5 h-5" />
                <span>{t('hero.cta.secondary')}</span>
              </a>
            </div>

            {/* Feature Pills */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-500 font-mono">
              <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                <Globe className="w-4 h-4 text-gray-400" />
                <span>{t('hero.features.global')}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>{t('hero.features.security')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Code/Abstract Visual (Optional, or just let the Orb shine) */}
        {/* We leave the right side relatively open so the Orb is visible, creating balance */}
        <div className="hidden lg:block"></div>
      </div>
    </div>
  );
}
