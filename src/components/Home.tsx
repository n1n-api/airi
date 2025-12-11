import Header from './Header';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import Story from './Story';
import Features from './Features';
import Testimonials from './Testimonials';
import Footer from './Footer';
import ReferralWidget from './ReferralWidget';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isZh = i18n.language === 'zh';

  // 结构化数据 (Schema Markup) - SoftwareApplication
  // 增强 Google 搜索结果展示
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "n1n.ai",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cloud",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": isZh 
      ? "企业级大模型 API 聚合平台，一键接入 GPT-5, Claude 4.5, Gemini 3 Pro, DeepSeek V3.2 等 500+ 模型。" 
      : "Unified LLM API Gateway connecting GPT-5, Claude 4.5, Gemini 3 Pro, DeepSeek V3.2, and 500+ AI models via a single interface.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <>
      <Helmet>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <title>{isZh ? 'n1n.ai | 企业级大模型 API 聚合平台 (OpenAI/Claude/DeepSeek 国内直连)' : 'n1n.ai | Unified LLM API Gateway & OpenAI Proxy (One Key for All)'}</title>
        <meta name="description" content={isZh ? "OpenAI 国内直连服务，支持 GPT-5、Claude 4.5、Gemini 3 Pro、DeepSeek V3.2。只需一个 API Key，即可连接全球 500+ 顶尖 AI 模型。企业级稳定性，无惧封号，支持开发票。" : "Stop managing multiple keys. As a premium Unified LLM API and OpenAI Proxy, n1n connects you to GPT-5, Claude 4.5, Gemini 3 Pro, DeepSeek V3.2, and 500+ models with a single key."} />
        {isZh && (
            <meta name="keywords" content="大模型API聚合, OpenAI国内直连, GPT-5 API购买, Claude 4.5 API申请, DeepSeek V3 API转发, Gemini 3 Pro接口, 一站式AI接口, AI Gateway" />
        )}
        <link rel="canonical" href={`https://n1n.ai${location.pathname === '/' ? '' : location.pathname}`} />
        <link rel="alternate" hreflang="en" href="https://n1n.ai/" />
        <link rel="alternate" hreflang="zh" href="https://n1n.ai/zh" />
        <link rel="alternate" hreflang="x-default" href="https://n1n.ai/" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
        <Header />
        <Hero />
        <TrustedBy />
        <Story />
        <Features />
        <Testimonials />
        <Footer />
        <ReferralWidget />
      </main>
    </>
  );
}
