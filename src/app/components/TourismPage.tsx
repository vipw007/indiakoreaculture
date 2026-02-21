import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, ArrowRight, Globe } from 'lucide-react';
import { StateData } from '../data/statesData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCache, setCache } from '../data/cache';

// Use Vite's syntax for environment variables
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:5001/indokorean/us-central1'
  : import.meta.env.VITE_API_BASE_URL || 'https://us-central1-indokorean.cloudfunctions.net';

const priorityStates = [
  'rajasthan', 'maharashtra', 'uttar-pradesh', 'karnataka', 'kerala', 
  'gujarat', 'punjab', 'tamil-nadu', 'telangana', 'west-bengal', 'goa'
];

const moodOptions = [
  'All', 'Relax', 'Adventure', 'Romantic', 'Spiritual', 'Nature', 'Party',
  'Culture', 'Food', 'Photography', 'History'
];

const REGION_BGS = {
  india: 'https://plus.unsplash.com/premium_photo-1697730342875-3788c28451cd?q=80&w=2992&auto=format&fit=crop',
  korea: 'https://images.unsplash.com/photo-1740785978879-506357754d72?q=80&w=1740&auto=format&fit=crop'
};

export function TourismPage() {
  const [selectedRegion, setSelectedRegion] = useState<'india' | 'korea'>('india');
  const [data, setData] = useState<StateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<StateData[]>([]);
  const [moodFilter, setMoodFilter] = useState<string>('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cachedData = getCache(selectedRegion);

      if (cachedData) {
        setData(cachedData);
        setFilteredData(cachedData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/getStatesList?region=${selectedRegion}`);
        let result = await response.json();

        if (selectedRegion === 'india') {
          const priorityData = result.filter((s: StateData) => priorityStates.includes(s.id));
          const otherData = result.filter((s: StateData) => !priorityStates.includes(s.id));
          otherData.sort((a: StateData, b: StateData) => a.name.localeCompare(b.name));
          result = [...priorityData, ...otherData];
        }

        setData(result);
        setFilteredData(result);
        setCache(selectedRegion, result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRegion]);

  useEffect(() => {
    let filtered = data;

    if (moodFilter !== 'All') {
      filtered = filtered.filter(state => state.mood && state.mood.includes(moodFilter));
    }

    setFilteredData(filtered);
  }, [data, moodFilter]);

  const groupedData = filteredData.reduce((acc, state) => {
    const category = state.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(state);
    return acc;
  }, {} as { [key: string]: StateData[] });

  const flag = selectedRegion === 'india' ? '🇮🇳' : '🇰🇷';
  const country = selectedRegion === 'india' ? 'India' : 'South Korea';

  const pageTitle = `Tourism & Culture in ${country} | IndoKorean`;
  const pageDescription = selectedRegion === 'india'
    ? "Explore Indian states with comprehensive guides on places to visit, local food, cultural norms, and essential do's and don'ts."
    : 'Discover Korean provinces with detailed information on attractions, cuisine, cultural etiquette, and travel tips.';

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      {/* Dynamic Header with Background Image */}
      <div className="relative py-16 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={REGION_BGS[selectedRegion]} 
            alt={country} 
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          {/* Overlay for text readability - Removed blur */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl text-center md:text-left font-bold drop-shadow-lg">Tourism & Culture</h1>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Region Toggle */}
              <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg p-1 border border-white/30">
                <button
                  onClick={() => setSelectedRegion('india')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-bold ${
                    selectedRegion === 'india'
                      ? 'bg-white text-orange-600 shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span>🇮🇳 India</span>
                </button>
                <button
                  onClick={() => setSelectedRegion('korea')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-bold ${
                    selectedRegion === 'korea'
                      ? 'bg-white text-indigo-600 shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span>🇰🇷 Korea</span>
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-white/90 max-w-3xl text-center md:text-left leading-relaxed drop-shadow-md">
            {pageDescription}
          </p>
          
          <div className="mt-8">
            <label className="block text-sm font-bold text-white/70 uppercase tracking-widest mb-2">Filter by Mood</label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood}
                  onClick={() => setMoodFilter(mood)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm font-bold border ${
                    moodFilter === mood
                      ? 'bg-white text-gray-900 border-white shadow-md'
                      : 'bg-black/20 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            {Object.entries(groupedData).map(([category, states]) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {states.map((state) => (
                    <Link
                      key={state.id}
                      to={`/tourism/${selectedRegion}/${state.id}`}
                      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <ImageWithFallback
                          src={state.image}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white/90 mb-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase tracking-wider">{flag} {country}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white">{state.name}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">{state.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-orange-600 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Explore details
                            <ArrowRight className="h-4 w-4" />
                          </span>
                          {state.category && (
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">
                              {state.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
