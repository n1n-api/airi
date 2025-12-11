import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Cpu, BarChart3, Radio, Activity, Network } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LatencyDisplay() {
  const [latency, setLatency] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random latency between 85ms and 98ms
      const newLatency = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
      setLatency(newLatency);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine color based on latency
  const getColor = (ms: number) => {
    if (ms < 100) return "text-green-400";
    if (ms < 150) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="mt-8 h-32 flex items-center justify-center relative overflow-hidden rounded-lg bg-black/40 border border-purple-500/20">
       {/* Background Grid Animation */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_100%,transparent_0%)] opacity-30" />
       
       {/* Central Network Node Pulse */}
       <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
                {/* Outer Ripples */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-purple-500/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-purple-500/40 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
                
                {/* Core Icon */}
                <div className="relative z-10 p-3 bg-purple-500/10 rounded-full border border-purple-500/50 backdrop-blur-md">
                    <Network className="w-8 h-8 text-purple-400" />
                </div>
            </div>
       </div>

       {/* Digital Readout */}
       <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm z-20">
          <div className={`w-2 h-2 rounded-full animate-pulse ${getColor(latency).replace('text-', 'bg-')}`} />
          <span className={`font-mono text-sm font-bold ${getColor(latency)} transition-colors duration-300`}>
            {latency}ms
          </span>
       </div>
    </div>
  );
}

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('features.items.0.title'),
      subtitle: t('features.items.0.subtitle'),
      description: t('features.items.0.description'),
      icon: <Radio className="w-6 h-6" />,
      className: "md:col-span-2",
      content: (
        <div className="mt-8 relative overflow-hidden rounded-lg bg-black/40 border border-cyan-500/20 p-4 font-mono text-xs">
          {/* Holographic Scan Line */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/10 to-transparent animate-[scan_3s_linear_infinite]" />
          
          <div className="flex justify-between text-cyan-500/50 mb-2 border-b border-cyan-500/20 pb-1">
              <span>Python-SDK：OpenAI</span>
              <span>MODELS: 500+</span>
          </div>
          <div className="space-y-1 text-cyan-300/80">
            <p>{`client = OpenAI(`}</p>
            <p className="pl-4 text-white">{`base_url="https://api.n1n.ai/v1",`}</p>
            <p className="pl-4 text-white">{`api_key="<n1n_API_key>"`}</p>
            <p>{`)`}</p>
          </div>
        </div>
      )
    },
    {
      title: t('features.items.1.title'),
      subtitle: t('features.items.1.subtitle'),
      description: t('features.items.1.description'),
      icon: <Globe className="w-6 h-6" />,
      className: "md:col-span-1",
      content: <LatencyDisplay />
    },
    {
      title: t('features.items.2.title'),
      subtitle: t('features.items.2.subtitle'),
      description: t('features.items.2.description'),
      icon: <Shield className="w-6 h-6" />,
      className: "md:col-span-1",
    },
    {
      title: t('features.items.3.title'),
      subtitle: t('features.items.3.subtitle'),
      description: t('features.items.3.description'),
      icon: <BarChart3 className="w-6 h-6" />,
      className: "md:col-span-1",
    },
    {
      title: t('features.items.4.title'),
      subtitle: t('features.items.4.subtitle'),
      description: t('features.items.4.description'),
      icon: <Activity className="w-6 h-6" />,
      className: "md:col-span-1",
    }
  ];

  return (
    <section id="features" className="py-32 bg-background relative overflow-hidden">
      
      {/* HUD Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="mb-24 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-cyan-500/70 mb-4 font-mono text-sm tracking-widest uppercase"
            >
                <Activity className="w-4 h-4" />
                <span>{t('features.system_diagnostics')}</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {t('features.title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{t('features.title_highlight')}</span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 ${feature.className}`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />
              
              {/* Corner Accents (HUD style) */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan-500/50 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan-500/50 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan-500/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan-500/50 transition-colors" />

              <div className="p-8 h-full flex flex-col relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors text-gray-400">
                        {feature.icon}
                    </div>
                    {/* Tech Number Decoration */}
                    <span className="font-mono text-[10px] text-white/20 group-hover:text-cyan-500/30">
                        SYS-0{i+1}
                    </span>
                </div>
                
                <div className="mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                        {feature.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-500/60 uppercase tracking-wider mt-1">
                        {feature.subtitle}
                    </p>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Push content to bottom if it exists */}
                <div className="mt-auto">
                  {feature.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
