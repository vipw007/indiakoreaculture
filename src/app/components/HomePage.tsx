import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Globe, Building2, MessageCircle, Users, ArrowRight, Heart, ShieldCheck, Sparkles, MapPin, Mail, HelpCircle, FileText, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1636625716229-0e72a641e3c5?q=80&w=1740&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617541016107-b62971c6e27f?q=80&w=1738&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1661878589476-bcad7fe1b8c5?q=80&w=1740&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583833008338-31a6657917ab?q=80&w=1740&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1661962699053-3f216d2f4c48?q=80&w=1548&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1740&auto=format&fit=crop&q=80',
  'https://plus.unsplash.com/premium_photo-1661962542692-4fe7a4ad6b54?q=80&w=1742&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1697729844084-c03db2377161?q=80&w=1738&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1738&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521354719423-661a3204204f?q=80&w=1548&auto=format&fit=crop'
];

export function HomePage() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    HERO_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => setLoadedImages((prev) => ({ ...prev, [url]: true }));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Globe,
      title: t('header.tourism'),
      description: 'Explore 10 priority Indian states with detailed guides on places, food, customs, and cultural norms.',
      link: '/tourism',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1080',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Building2,
      title: t('header.office'),
      description: 'Navigate workplace differences between India and Korea with practical scenarios and safe actions.',
      link: '/office-culture',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1080',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: MessageCircle,
      title: t('header.chatbot'),
      description: 'Get answers to your cultural questions from our AI guides representing India and Korea.',
      link: '/chatbot',
      image: '/image/bot.png',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: t('header.community'),
      description: 'Join topic-based rooms for real cultural exchange with moderated Q&A and scheduled sessions.',
      link: '/community',
      image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1080',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      icon: FileText,
      title: 'Visa & Doc.',
      description: 'Get help with visa applications, documentation, and other travel requirements.',
      link: '/visa',
      image: 'https://plus.unsplash.com/premium_photo-1684407617236-9baf926474ad?q=80&w=1080',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Utensils,
      title: 'Exclusive Food',
      description: 'Discover and explore exclusive food items and culinary experiences from both countries.',
      link: '/food',
      image: 'https://images.unsplash.com/photo-1678781416302-d59ed9ed46d0?q=80&w=1080',
      color: 'from-red-500 to-rose-600'
    },
  ];

  const missionPoints: string[] = t('homepage.mission_points', { returnObjects: true }) as string[];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>IndoKorean - Bridging Cultures Between India and Korea</title>
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-black">
        {HERO_IMAGES.map((url, index) => (
          <div
            key={url}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
              index === currentImageIndex && loadedImages[url] ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={url} alt="Hero" className="w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl mb-8 font-bold text-white drop-shadow-2xl tracking-tight">
              {t('homepage.title')}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
              {[
                { id: 'features-grid', icon: Sparkles, title: 'homepage.culture', text: 'homepage.culture_text', color: 'text-yellow-300' },
                { id: 'features-grid', icon: Heart, title: 'homepage.community', text: 'homepage.community_text', color: 'text-pink-300' },
                { id: 'trust-section', icon: ShieldCheck, title: 'homepage.trust', text: 'homepage.trust_text', color: 'text-green-300' }
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => scrollToSection(item.id)}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{t(item.title)}</h3>
                  <p className="text-white/80 text-sm">{t(item.text)}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/tourism" className="bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-xl font-bold text-lg flex items-center gap-2">
                {t('homepage.explore_culture')} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/chatbot" className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all font-bold text-lg border border-white/30 flex items-center gap-2">
                {t('homepage.ask_questions')} <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-4 text-gray-900 font-extrabold tracking-tight">{t('homepage.features_title')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t('homepage.features_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Floating Icon Badge */}
                  <div className={`absolute bottom-6 left-6 p-3 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 mb-6 leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-indigo-600 font-bold text-sm uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
                    Explore Now <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <div id="trust-section" className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl mb-16 text-gray-900 font-bold">{t('homepage.trust_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { emoji: '📚', title: 'homepage.comprehensive', text: 'homepage.comprehensive_text' },
                { emoji: '🔒', title: 'homepage.safe', text: 'homepage.safe_text' },
                { emoji: '🌏', title: 'homepage.authentic', text: 'homepage.authentic_text' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">{item.emoji}</div>
                  <h3 className="text-xl mb-3 text-gray-900 font-bold">{t(item.title)}</h3>
                  <p className="text-gray-500 leading-relaxed">{t(item.text)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-yellow-400"><Sparkles className="h-5 w-5" /> {t('homepage.vision')}</h3>
                  <p className="text-gray-400 leading-relaxed">{t('homepage.vision_text')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-400"><ShieldCheck className="h-5 w-5" /> {t('homepage.mission')}</h3>
                  <ul className="text-gray-400 space-y-2 list-disc pl-4 text-sm">
                    {missionPoints.map((point, index) => <li key={index}>{point}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400"><MapPin className="h-5 w-5" /> {t('homepage.footer_destination')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/tourism" className="hover:text-white transition-colors">India</Link></li>
                <li><Link to="/tourism" className="hover:text-white transition-colors">South Korea</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-400"><HelpCircle className="h-5 w-5" /> {t('homepage.footer_support')}</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors"><Mail className="h-4 w-4" /> {t('homepage.footer_contact')}</Link></li>
                <li><Link to="/faq" className="flex items-center gap-2 hover:text-white transition-colors"><HelpCircle className="h-4 w-4" /> {t('homepage.footer_faq')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
            <p>{t('homepage.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
