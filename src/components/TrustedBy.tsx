import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Import logos set 1
import openai from '../assets/logowall/OpenAI_white.png';
import claude from '../assets/logowall/claude_white.png';
import gemini from '../assets/logowall/gemini_white.png';
import deepseek from '../assets/logowall/deepseek_white.png';
import grok from '../assets/logowall/grok_white.png';
import kimi from '../assets/logowall/kimi_white.png';
import minimax from '../assets/logowall/minimax_white.png';
import qwen from '../assets/logowall/qwen_white.png';
import doubao from '../assets/logowall/doubao_white.png';
import ernie from '../assets/logowall/ernie_white.png';

// Import logos set 2
import cherrystudio from '../assets/logowall2/cherrystudio.png';
import claudecode from '../assets/logowall2/claude code.png';
import cline from '../assets/logowall2/cline.png';
import codex from '../assets/logowall2/codex.png';
import dify from '../assets/logowall2/dify.png';
import lobehub from '../assets/logowall2/lobehub.png';
import n8n from '../assets/logowall2/n8n.png';
import roocode from '../assets/logowall2/roocode.png';

const logos1 = [
  { name: 'OpenAI', src: openai },
  { name: 'Claude', src: claude },
  { name: 'Gemini', src: gemini },
  { name: 'DeepSeek', src: deepseek },
  { name: 'Grok', src: grok },
  { name: 'Kimi', src: kimi },
  { name: 'Minimax', src: minimax },
  { name: 'Qwen', src: qwen },
  { name: 'Doubao', src: doubao },
  { name: 'Ernie', src: ernie },
];

const logos2 = [
  { name: 'Cherry Studio', src: cherrystudio },
  { name: 'Claude Code', src: claudecode },
  { name: 'Cline', src: cline },
  { name: 'Codex', src: codex },
  { name: 'Dify', src: dify },
  { name: 'LobeHub', src: lobehub },
  { name: 'n8n', src: n8n },
  { name: 'Roo Code', src: roocode },
];

interface Logo {
  name: string;
  src: string;
}

const getRandomLogos = (arr: Logo[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function TrustedBy() {
  const [currentGroup, setCurrentGroup] = useState(1);
  const [visibleLogos, setVisibleLogos] = useState<Logo[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // Initial load
    setVisibleLogos(getRandomLogos(logos1, 6));

    const interval = setInterval(() => {
      setCurrentGroup((prev) => {
        const nextGroup = prev === 1 ? 2 : 1;
        // If next is group 2, pick from logos2; else from logos1
        const sourceLogos = nextGroup === 2 ? logos2 : logos1;
        setVisibleLogos(getRandomLogos(sourceLogos, 6));
        return nextGroup;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          {t('trusted_by.title')}
        </p>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center h-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGroup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full"
            >
              {visibleLogos.map((logo, index) => (
                <div 
                  key={`${logo.name}-${index}`} 
                  className="flex items-center justify-center w-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img 
                    src={logo.src} 
                    alt={`${logo.name} logo`} 
                    className="max-h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

