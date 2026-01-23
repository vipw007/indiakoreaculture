import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Globe } from 'lucide-react';
import { StateData } from '../data/statesData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCache, setCache } from '../data/cache';

// Use Vite's syntax for environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://us-central1-indokorean.cloudfunctions.net';

const priorityStates = [
  'rajasthan', 'maharashtra', 'uttar-pradesh', 'karnataka', 'kerala', 
  'gujarat', 'punjab', 'tamil-nadu', 'telangana', 'west-bengal', 'goa'
];

const moodOptions = [
  'All', 'Relax', 'Adventure', 'Romantic', 'Spiritual', 'Nature', 'Party',
  'Culture', 'Food', 'Photography', 'History'
];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl text-center md:text-left">Tourism & Culture</h1>
            
            <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setSelectedRegion('india')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-semibold ${
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
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-semibold ${
                  selectedRegion === 'korea'
                    ? 'bg-white text-orange-600 shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe className="h-5 w-5" />
                <span>🇰🇷 Korea</span>
              </button>
            </div>
          </div>
          
          <p className="text-xl text-orange-100 max-w-3xl text-center md:text-left">
            {selectedRegion === 'india'
              ? "Explore Indian states with comprehensive guides on places to visit, local food, cultural norms, and essential do's and don'ts"
              : 'Discover Korean provinces with detailed information on attractions, cuisine, cultural etiquette, and travel tips'}
          </p>
          
          <div className="mt-8">
            <label className="block text-sm font-medium text-orange-200 mb-2">Filter by Mood</label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map(mood => (
                <button
                  key={mood}
                  onClick={() => setMoodFilter(mood)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${
                    moodFilter === mood
                      ? 'bg-white text-orange-600 shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
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
                <h2 className="text-2xl mb-4 text-gray-900">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {states.map((state) => (
                    <Link
                      key={state.id}
                      to={`/tourism/${selectedRegion}/${state.id}`}
                      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <ImageWithFallback
                          src={state.image}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white mb-1">
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm">{flag} {country}</span>
                          </div>
                          <h3 className="text-2xl text-white">{state.name}</h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 mb-4 line-clamp-2">{state.description}</p>
                        <span className="text-orange-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore details
                          <ArrowRight className="h-4 w-4" />
                        </span>
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
