import { Github, Twitter, Disc, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Logo from './Logo';
import Planet from './Planet';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-black pt-48 overflow-hidden">
      
      {/* 3D Space Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -5, -5]} intensity={1} color="#8b5cf6" />
            
            {/* Background small stars */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Foreground larger, brighter stars */}
            <Stars radius={50} depth={50} count={150} factor={10} saturation={0} fade speed={2} />
            
            <Planet />
        </Canvas>
      </div>

      {/* Gradient Overlay for Content Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-1 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Call to Action Section */}
        <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {t('footer.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mb-10">
                {t('footer.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://api.n1n.ai/login" target="_blank" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    {t('footer.cta.primary')}
                    <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://api.n1n.ai/customersupport" target="_blank" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-colors">
                    {t('footer.cta.secondary')}
                </a>
            </div>
        </div>

        <div className="border-t border-white/10 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                <Logo />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                {t('footer.description')}
                </p>
                <div className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                    <Disc className="w-5 h-5" />
                </a>
                </div>
            </div>

            {/* Links Columns */}
            <div>
                <h3 className="text-white font-semibold mb-4">{t('footer.columns.product')}</h3>
                <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="https://api.n1n.ai/pricing" target="_blank" className="hover:text-primary transition-colors">{t('footer.links.pricing')}</a></li>
                <li><a href="https://api.n1n.ai/pricing" target="_blank" className="hover:text-primary transition-colors">{t('footer.links.models')}</a></li>
                <li><a href="https://docs.n1n.ai/openai-api-chat-create" target="_blank" className="hover:text-primary transition-colors">{t('footer.links.api_ref')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.links.status')}</a></li>
                </ul>
            </div>

            <div>
                <h3 className="text-white font-semibold mb-4">{t('footer.columns.resources')}</h3>
                <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="https://docs.n1n.ai" target="_blank" className="hover:text-primary transition-colors">{t('footer.links.docs')}</a></li>
                <li><a href="https://blog.n1n.ai" target="_blank" className="hover:text-primary transition-colors">{t('footer.links.blog')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.links.community')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.links.help')}</a></li>
                </ul>
            </div>

            <div>
                <h3 className="text-white font-semibold mb-4">{t('footer.columns.company')}</h3>
                <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.links.about')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.links.careers')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.links.legal')}</a></li>
                <li><a href="https://api.n1n.ai/customersupport" target="_blank" className="hover:text-primary transition-colors">{t('footer.links.contact')}</a></li>
                </ul>
            </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>{t('footer.copyright')}</p>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-gray-400">{t('footer.privacy')}</a>
                <a href="#" className="hover:text-gray-400">{t('footer.terms')}</a>
            </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
