import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Utensils, Users, CheckCircle, XCircle, MessageSquare, Shirt, Ticket, Phone, BookOpen, Star, Clock, Globe, ExternalLink } from 'lucide-react';
import { StateData } from '../data/statesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

// In-memory cache
const stateCache = new Map<string, StateData>();

// Use Vite's syntax for environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://us-central1-indokorean.cloudfunctions.net';

// Function to generate dynamic blog content from state data
const generateBlogContent = (state: StateData): string => {
  const attractionsHtml = (state.places && state.places.length > 0) ? `
    <h2>🏰 Major Tourist Attractions</h2>
    <p>Discover the most iconic landmarks and hidden gems in ${state.name}.</p>
    <ul>
      ${state.places.map(place => `<li><strong>${place.name}:</strong> ${place.description}</li>`).join('')}
    </ul>
  ` : '';

  const foodHtml = (state.food && state.food.length > 0) ? `
    <hr />
    <h2>🍛 Food & Cuisine</h2>
    <p>The local cuisine is a delightful experience. Here are some must-try dishes:</p>
    <ul>
      ${state.food.map(dish => `<li><strong>${dish.name} (${dish.type}):</strong> ${dish.description}</li>`).join('')}
    </ul>
  ` : '';

  const cultureHtml = (state.culturalNorms && state.culturalNorms.length > 0) ? `
    <hr />
    <h2>🎭 Culture & Norms</h2>
    <blockquote>${state.name} has a rich and vibrant culture. Understanding the local customs will make your trip more enjoyable.</blockquote>
    <ul>
      ${state.culturalNorms.map(norm => `<li>${norm}</li>`).join('')}
    </ul>
  ` : '';

  return `${attractionsHtml}${foodHtml}${cultureHtml}`;
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
          if (!singleState.blogContent) {
            const dynamicBlogContent = generateBlogContent(singleState);
            singleState = {
              ...singleState,
              blogContent: dynamicBlogContent
            };
          }
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

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Helmet>
          <title>State Not Found | IndoKorean</title>
        </Helmet>
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-gray-900">State not found</h2>
          <Link to="/tourism" className="text-indigo-600 hover:text-indigo-700">
            ← Back to Tourism
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl md:text-5xl text-white mb-2">{state.name}</h1>
            <p className="text-xl text-gray-200">{state.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Places to Visit */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl text-gray-900 font-bold">Places to Visit</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.places && state.places.map((place: any, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  {place.rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-900">{place.rating}</span>
                      <span className="text-xs text-gray-500">({place.userRatingsTotal})</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{place.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.description}</p>
                  
                  <div className="space-y-3">
                    {place.address && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{place.address}</span>
                      </div>
                    )}
                    
                    {place.openingHours && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Hours:</span>
                            {place.isOpenNow !== undefined && (
                              <span className={place.isOpenNow ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                {place.isOpenNow ? "Open Now" : "Closed"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs mt-1 text-gray-500">{place.openingHours[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {place.phoneNumber && (
                        <a href={`tel:${place.phoneNumber}`} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors">
                          <Phone className="h-3 w-3" />
                          Call
                        </a>
                      )}
                      {place.website && (
                        <a href={place.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-medium hover:bg-orange-100 transition-colors">
                          <Globe className="h-3 w-3" />
                          Website
                          <ExternalLink className="h-2 w-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ticket Pricing Footer */}
                {place.ticketPrice && (
                  <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Ticket Pricing</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Local</p>
                        <p className="font-bold text-gray-900">{place.ticketPrice.indian}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Foreigner</p>
                        <p className="font-bold text-gray-900">{place.ticketPrice.foreigner}</p>
                      </div>
                    </div>
                  </div>
                )}
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

        {/* Cultural Norms, Greetings, Clothing, Blog, Do's/Don'ts sections remain similar but with updated styling */}
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
