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

  // Preload images to avoid solid color flashes
  useEffect(() => {
    HERO_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [url]: true }));
      };
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
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhfGVufDF8fHx8MTc2ODA0MTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Building2,
      title: t('header.office'),
      description: 'Navigate workplace differences between India and Korea with practical scenarios and safe actions.',
      link: '/office-culture',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NjgwNDcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: MessageCircle,
      title: t('header.chatbot'),
      description: 'Get answers to your cultural questions from our AI guides representing India and Korea.',
      link: '/chatbot',
      image: '/image/bot.png',
    },
    {
      icon: Users,
      title: t('header.community'),
      description: 'Join topic-based rooms for real cultural exchange with moderated Q&A and scheduled sessions.',
      link: '/community',
      image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYSUyMHNlb3VsfGVufDF8fHx8MTc2ODEzMjIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: FileText,
      title: 'Visa & Doc.',
      description: 'Get help with visa applications, documentation, and other travel requirements.',
      link: '/visa',
      image: 'https://plus.unsplash.com/premium_photo-1684407617236-9baf926474ad?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      icon: Utensils,
      title: 'Exclusive Food',
      description: 'Discover and explore exclusive food items and culinary experiences from both countries.',
      link: '/food',
      image: 'https://images.unsplash.com/photo-1678781416302-d59ed9ed46d0?q=80&w=840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const missionPoints: string[] = t('homepage.mission_points', { returnObjects: true }) as string[];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>IndoKorean - Bridging Cultures Between India and Korea</title>
        <meta name="description" content="Explore cultural guides, navigate workplace differences, and connect with a community of learners. Your one-stop platform for all things India and Korea." />
      </Helmet>
      
      {/* Hero Section with Dynamic Background */}
      <div className="relative min-h-[600px] flex items-center overflow-hidden bg-black">
        {/* Background Images */}
        {HERO_IMAGES.map((url, index) => (
          <div
            key={url}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
              index === currentImageIndex && loadedImages[url] ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={url} 
              alt="Hero Background" 
              className="w-full h-full object-cover" 
            />
            {/* Subtle dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              {t('homepage.title')}
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div
                onClick={() => scrollToSection('features-grid')}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{t('homepage.culture')}</h3>
                <p className="text-indigo-100">{t('homepage.culture_text')}</p>
              </div>

              <div
                onClick={() => scrollToSection('features-grid')}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <Heart className="h-8 w-8 text-pink-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{t('homepage.community')}</h3>
                <p className="text-indigo-100">{t('homepage.community_text')}</p>
              </div>

              <div
                onClick={() => scrollToSection('trust-section')}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-green-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{t('homepage.trust')}</h3>
                <p className="text-indigo-100">{t('homepage.trust_text')}</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/tourism"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors inline-flex items-center gap-2 font-semibold"
              >
                {t('homepage.explore_culture')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/chatbot"
                className="bg-indigo-700 text-white px-8 py-3 rounded-lg hover:bg-indigo-800 transition-colors inline-flex items-center gap-2 font-semibold border border-indigo-500"
              >
                {t('homepage.ask_questions')}
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-900 font-bold">{t('homepage.features_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('homepage.features_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <span className="text-indigo-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <div id="trust-section" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl mb-4 text-gray-900 font-bold">{t('homepage.trust_title')}</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="text-lg mb-2 text-gray-900 font-semibold">{t('homepage.comprehensive')}</h3>
                <p className="text-gray-600">{t('homepage.comprehensive_text')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="text-lg mb-2 text-gray-900 font-semibold">{t('homepage.safe')}</h3>
                <p className="text-gray-600">{t('homepage.safe_text')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">🌏</div>
                <h3 className="text-lg mb-2 text-gray-900 font-semibold">{t('homepage.authentic')}</h3>
                <p className="text-gray-600">{t('homepage.authentic_text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Vision, Value, Mission Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    {t('homepage.vision')}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {t('homepage.vision_text')}
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-400" />
                    {t('homepage.value')}
                  </h3>
                  <p className="text-gray-400">
                    {t('homepage.value_text')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                    {t('homepage.mission')}
                  </h3>
                  <ul className="text-gray-400 space-y-2 list-disc pl-4 text-sm">
                    {missionPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Browse by Destination */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                {t('homepage.footer_destination')}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/tourism" className="hover:text-white transition-colors">India</Link></li>
                <li><Link to="/tourism" className="hover:text-white transition-colors">South Korea</Link></li>
              </ul>
            </div>

            {/* Contact & FAQ */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-400" />
                {t('homepage.footer_support')}
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                    {t('homepage.footer_contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="flex items-center gap-2 hover:text-white transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    {t('homepage.footer_faq')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>{t('homepage.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
