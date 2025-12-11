import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const isZh = i18n.language === 'zh';
    const newLang = isZh ? 'en' : 'zh';
    const newPath = isZh ? '/' : '/zh';
    i18n.changeLanguage(newLang);
    navigate(newPath);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      
      {/* Promotion Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-gradient-to-r from-violet-600 via-primary to-cyan-500 text-white overflow-hidden relative"
          >
            <div className="container mx-auto px-6 py-5 flex items-center justify-center text-sm md:text-base font-medium tracking-wide relative z-30">
              <a 
                href="https://api.n1n.ai/register"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-0.5"
              >
                <span className="bg-white/20 px-2.5 py-1 rounded text-xs uppercase tracking-widest font-bold mr-2">{t('header.banner.new')}</span>
                <span>{t('header.banner.text')}</span>
                <span className="group flex items-center gap-0.5 ml-1 cursor-pointer relative">
                  <span>{t('header.banner.try')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1 will-change-transform" />
                </span>
              </a>
              <button  
                onClick={() => setShowBanner(false)}
                className="absolute right-4 md:right-0 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close banner"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <header 
        className={`w-full transition-all duration-300 ${
          scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 z-50">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">{t('header.nav.features')}</a>
            <a href="https://api.n1n.ai/pricing" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">{t('header.nav.models')}</a>
            <a href="https://api.n1n.ai/pricing" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">{t('header.nav.pricing')}</a>
            <a href="https://docs.n1n.ai" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">{t('header.nav.docs')}</a>
            <a href="https://blog.n1n.ai" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">{t('header.nav.blog')}</a>
            <a href="https://api.n1n.ai/customersupport" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">{t('header.nav.contact')}</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
             {/* Language Switcher */}
             <button
              onClick={toggleLanguage}
              className="p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase font-medium"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === 'zh' ? 'EN' : '中文'}</span>
            </button>

            <a href="https://api.n1n.ai/login" target="_blank" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t('header.nav.login')}
            </a>
            <a href="https://api.n1n.ai/register" target="_blank" className="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-200 transition-colors">
              {t('header.nav.signup')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 text-white flex items-center gap-4"
          >
             {/* Mobile Language Switcher (inside button container) */}
            <div
              onClick={(e) => { e.stopPropagation(); toggleLanguage(); }}
              className="text-gray-400 hover:text-white transition-colors mr-2"
            >
              <span className="text-xs font-medium uppercase border border-white/20 rounded px-1 py-0.5">
                {i18n.language === 'zh' ? 'EN' : 'CN'}
              </span>
            </div>

            <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </div>
          </button>

          {/* Mobile Nav Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 top-0 h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
              >
                <a href="#features" className="text-xl text-gray-300 hover:text-white">{t('header.nav.features')}</a>
                <a href="https://api.n1n.ai/pricing" target="_blank" className="text-xl text-gray-300 hover:text-white">{t('header.nav.models')}</a>
                <a href="https://api.n1n.ai/pricing" target="_blank" className="text-xl text-gray-300 hover:text-white">{t('header.nav.pricing')}</a>
                <a href="https://docs.n1n.ai" target="_blank" className="text-xl text-gray-300 hover:text-white">{t('header.nav.docs')}</a>
                <a href="https://blog.n1n.ai" target="_blank" className="text-xl text-gray-300 hover:text-white">{t('header.nav.blog')}</a>
                <a href="https://api.n1n.ai/customersupport" target="_blank" className="text-xl text-gray-300 hover:text-white">{t('header.nav.contact')}</a>
                <div className="flex flex-col gap-4 mt-8 w-64">
                  <a href="https://api.n1n.ai/login" target="_blank" className="w-full py-3 text-center border border-white/10 rounded-lg text-white">{t('header.nav.login')}</a>
                  <a href="https://api.n1n.ai/register" target="_blank" className="w-full py-3 text-center bg-white text-black rounded-lg">{t('header.nav.signup')}</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
}
