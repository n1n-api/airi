import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

// Import story images
import fragmentationImg from '../assets/story/fragmentation.jpg';
import frictionImg from '../assets/story/friction.jpg';
import unificationImg from '../assets/story/unification.jpg';

export default function Story() {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      
      {/* Uplifting Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header - Optimistic & Clear */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
             <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-purple-300 uppercase mb-6 inline-block backdrop-blur-md">
                {t('story.mission_badge')}
             </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            {t('story.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {t('story.intro')}
          </motion.p>
        </div>

        {/* The Story Arc - Vertical Timeline Style */}
        <div className="relative max-w-6xl mx-auto">
            
            {/* Center Line - Brighter */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent hidden md:block" />

            {/* Chapter 1: The Spark (Abundance) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 relative group items-center">
                {/* Timeline Dot - Playful */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background rounded-full border-4 border-purple-500 z-20 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                
                {/* Content - Left */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-right md:pr-12"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">{t('story.chapter1.title')}</h3>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        <Trans i18nKey="story.chapter1.content" />
                    </p>
                </motion.div>

                {/* Image - Right */}
                <motion.div 
                     initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                     className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 group-hover:scale-[1.02] transition-transform duration-500"
                >
                    <img 
                        src={fragmentationImg} 
                        alt="Colorful explosion of creative potential" 
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </motion.div>
            </div>


            {/* Chapter 2: The Challenge (Growth) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 relative group items-center">
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background rounded-full border-4 border-pink-500 z-20 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                
                {/* Image - Left */}
                 <motion.div 
                     initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                     className="order-2 md:order-1 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-pink-900/20 group-hover:scale-[1.02] transition-transform duration-500"
                >
                    <img 
                        src={frictionImg} 
                        alt="A playful puzzle representing integration challenges" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </motion.div>

                {/* Content - Right */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2 text-left md:pl-12"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">{t('story.chapter2.title')}</h3>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        <Trans i18nKey="story.chapter2.content" />
                    </p>
                </motion.div>
            </div>


            {/* Chapter 3: The Solution (Joy) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative group items-center">
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background rounded-full border-4 border-cyan-500 z-20 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                
                {/* Content - Left */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-right md:pr-12"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">{t('story.chapter3.title')}</h3>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        <Trans i18nKey="story.chapter3.content" />
                    </p>
                </motion.div>

                {/* Image - Right */}
                <motion.div 
                     initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                     className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/20 group-hover:scale-[1.02] transition-transform duration-500"
                >
                     <img 
                        src={unificationImg} 
                        alt="Harmonious and magical unification" 
                        className="w-full h-full object-cover"
                    />
                     <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </motion.div>
            </div>

        </div>
      </div>
    </section>
  );
}
