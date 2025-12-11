import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Share2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

// Import images
import ninoGiftIcon from '../assets/referral/nino-gift-icon.jpg';
import ninoFlyModal from '../assets/referral/nino-fly-modal.jpg';

export default function ReferralWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/* Floating Trigger Button - Neon Style */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-cyan-400/20 blur-md group-hover:bg-cyan-400/30 transition-colors rounded-full" />
          
          {/* Icon or Small Image */}
          <img src={ninoGiftIcon} alt="Nino Gift" className="w-full h-full object-cover relative z-10 rounded-full" />
          
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 flex h-4 w-4 z-20 translate-x-0 translate-y-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 border-2 border-background"></span>
          </span>
        </motion.button>
        
        {/* Tooltip text */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          {t('referral.tooltip')}
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content - Enterprise Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-[420px] bg-white text-zinc-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Section - Clean Image */}
              <div className="h-48 w-full bg-zinc-100 relative overflow-hidden">
                 <img src={ninoFlyModal} alt="Share" className="w-full h-full object-cover" />
              </div>

              {/* Content Section - Clean Typography */}
              <div className="p-8">
                <div className="text-center space-y-2 mb-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                      <Trans i18nKey="referral.modal.title" />
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {t('referral.modal.description')}
                    </p>
                </div>

                {/* Data Points - Clean Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                    <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">{t('referral.modal.give')}</div>
                    <div className="text-2xl font-bold text-zinc-900">$0.40</div>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                    <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">{t('referral.modal.get')}</div>
                    <div className="text-2xl font-bold text-zinc-900">$0.20</div>
                  </div>
                </div>

                {/* Action Button - Enterprise Blue */}
                <a 
                  href="https://n1n.ai/console/topup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <Share2 className="w-4 h-4" />
                  {t('referral.modal.cta')}
                </a>
                
                <p className="mt-4 text-center text-xs text-zinc-400">
                  {t('referral.modal.note')}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
