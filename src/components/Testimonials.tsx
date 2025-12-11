import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Define Interface for Type Safety
interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <div className="p-8 rounded-2xl bg-[#08080a] border border-white/5 relative group hover:border-white/10 transition-colors mb-8">
    <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-white/10 transition-colors" />
    
    <div className="flex gap-1 mb-6 text-yellow-500/30">
      {[...Array(5)].map((_, j) => (
        <Star key={j} className="w-4 h-4 fill-current" />
      ))}
    </div>

    <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base line-clamp-6">
      "{item.content}"
    </p>

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
        <div className="w-full h-full rounded-full bg-black overflow-hidden">
            <img src={item.avatar} alt={item.author} className="w-full h-full object-cover opacity-80" />
        </div>
      </div>
      <div>
        <div className="font-medium text-white">{item.author}</div>
        <div className="text-xs text-gray-500">{item.role}</div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const { t } = useTranslation();

  // Retrieve testimonials array from translations
  // Use 'any' type assertion temporarily because i18next return types can be tricky with arrays of objects
  const testimonials = t('testimonials.items', { returnObjects: true }) as Testimonial[];

  const stats = [
    { label: t('testimonials.stats.developers'), value: "50,000+" },
    { label: t('testimonials.stats.requests'), value: "50M+/day" },
    { label: t('testimonials.stats.uptime'), value: "99.99%" }
  ];

  // Safety check: ensure testimonials is an array before slicing
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];

  // Split testimonials into 3 columns for desktop
  const column1 = [safeTestimonials[0], safeTestimonials[3], safeTestimonials[6]].filter(Boolean);
  const column2 = [safeTestimonials[1], safeTestimonials[4], safeTestimonials[7]].filter(Boolean);
  const column3 = [safeTestimonials[2], safeTestimonials[5], safeTestimonials[8]].filter(Boolean);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="relative h-[600px] overflow-hidden mask-gradient-y">
          {/* Gradient Masks for smooth fade out */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="animate-[scroll-up_35s_linear_infinite]">
              {[...column1, ...column1].map((item, i) => (
                <TestimonialCard key={`col1-${i}`} item={item} />
              ))}
            </div>

            {/* Column 2 - Slower/Offset */}
            <div className="hidden md:block animate-[scroll-up_40s_linear_infinite]">
               {[...column2, ...column2].map((item, i) => (
                <TestimonialCard key={`col2-${i}`} item={item} />
              ))}
            </div>

            {/* Column 3 - Even Slower/Offset */}
            <div className="hidden lg:block animate-[scroll-up_45s_linear_infinite]">
               {[...column3, ...column3].map((item, i) => (
                <TestimonialCard key={`col3-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="border-t border-white/5 pt-16 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
            {stats.map((stat, i) => (
              <div key={i} className="py-4 md:py-0">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
