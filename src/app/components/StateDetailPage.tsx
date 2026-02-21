import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Utensils, Users, CheckCircle, XCircle, MessageSquare, Shirt, Ticket, Phone, BookOpen, Star, Clock, Globe, ExternalLink, Plane, Landmark, Waves, Trees, Castle, Award } from 'lucide-react';
import { StateData } from '../data/statesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

// In-memory cache
const stateCache = new Map<string, StateData>();

// Use Vite's syntax for environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://us-central1-indokorean.cloudfunctions.net';

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'Religious': return <Landmark className="h-4 w-4" />;
    case 'Beach': return <Waves className="h-4 w-4" />;
    case 'Nature': return <Trees className="h-4 w-4" />;
    case 'Fort':
    case 'Historical': return <Castle className="h-4 w-4" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'Religious': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Beach': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Nature': return 'bg-green-100 text-green-700 border-green-200';
    case 'Fort':
    case 'Historical': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

export function StateDetailPage() {
  const { region, stateId } = useParams<{ region: string; stateId: string }>();
  const [state, setState] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = `${region}-${stateId}`;

    const fetchData = async () => {
      if (stateCache.has(cacheKey)) {
        setState(stateCache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/getStateDetails?region=${region}&id=${stateId}`);
        let singleState: any = await response.json();

        if (singleState) {
          stateCache.set(cacheKey, singleState);
          setState(singleState);
        } else {
          setState(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setState(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region, stateId]);

  const flag = region === 'india' ? '🇮🇳' : '🇰🇷';
  const country = region === 'india' ? 'India' : 'South Korea';

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-8 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!state) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{`${state.name} Tourism & Culture Guide | IndoKorean`}</title>
      </Helmet>
      
      {/* Header */}
      <div className="relative h-96">
        <ImageWithFallback src={state.image} alt={state.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link to="/tourism" className="inline-flex items-center gap-2 text-white mb-4 hover:text-orange-200 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Back to {region === 'india' ? 'states' : 'provinces'}
            </Link>
            <div className="flex items-center gap-2 text-white mb-2">
              <span className="text-xl">{flag}</span>
              <span className="text-lg">{country}</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-white mb-2 font-bold">{state.name}</h1>
            <p className="text-xl text-gray-200">{state.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Places to Visit Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <MapPin className="h-6 w-6 text-orange-600" />
            <h2 className="text-3xl text-gray-900 font-bold">Places to Visit</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Central Hub Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white flex flex-col justify-center items-center text-center border-4 border-blue-400/30">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Plane className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{state.name} Hub</h3>
              <p className="text-blue-100 text-sm">Main Airport / Railway Station</p>
              <div className="mt-6 pt-6 border-t border-white/10 w-full">
                <p className="text-xs uppercase tracking-widest font-bold text-blue-200">Starting Point</p>
              </div>
            </div>

            {state.places && state.places.map((place: any, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col border-2 transition-all duration-300 hover:shadow-xl ${place.isUNESCO ? 'border-amber-400' : 'border-gray-100'}`}>
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  
                  {/* Distance Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-orange-400" />
                    {place.distanceFromHub || (20 + index * 5)} km from Hub
                  </div>

                  {/* UNESCO Badge */}
                  {place.isUNESCO && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-lg">
                      <Award className="h-3 w-3" />
                      UNESCO Site
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${getCategoryColor(place.category)}`}>
                      {getCategoryIcon(place.category)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{place.category || 'Destination'}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                    {place.name}
                    {place.rating && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded flex items-center gap-0.5"><Star className="h-3 w-3 fill-yellow-700" />{place.rating}</span>}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.description}</p>
                  
                  <div className="space-y-3 pt-3 border-t border-gray-50">
                    {place.address && (
                      <div className="flex items-start gap-2 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{place.address}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {place.phoneNumber && (
                        <a href={`tel:${place.phoneNumber}`} className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                      {place.website && (
                        <a href={place.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                      <div className="flex-grow"></div>
                      <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        <Ticket className="h-3 w-3" />
                        {place.ticketPrice?.indian || 'Free'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Food */}
        {state.food && state.food.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Utensils className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl text-gray-900 font-bold">Local Food</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.food.map((dish, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  {dish.image && (
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{dish.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-bold ${dish.type === 'veg' ? 'bg-green-100 text-green-700' : dish.type === 'non-veg' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {dish.type === 'veg' ? '🟢 Veg' : dish.type === 'non-veg' ? '🔴 Non-Veg' : '🟡 Both'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cultural Norms */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl text-gray-900 font-bold">Cultural Norms</h2>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <ul className="space-y-4">
                {state.culturalNorms?.map((norm, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{norm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Greetings</h3>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{state.greetings}"</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shirt className="h-6 w-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Traditional Clothing</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{state.clothing}</p>
              </div>
            </div>
          </div>
        </div>

        {state.blogContent && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl text-gray-900 font-bold">Travel Guide</h2>
            </div>
            <div className="prose lg:prose-xl max-w-none bg-white rounded-xl p-8 shadow-sm border border-gray-100 prose-headings:text-orange-800 prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg" dangerouslySetInnerHTML={{ __html: state.blogContent }} />
          </section>
        )}

        {state.dos && state.donts && (
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl text-gray-900 font-bold">Do's</h2>
              </div>
              <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                <ul className="space-y-4">
                  {state.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl text-gray-900 font-bold">Don'ts</h2>
              </div>
              <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                <ul className="space-y-4">
                  {state.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
