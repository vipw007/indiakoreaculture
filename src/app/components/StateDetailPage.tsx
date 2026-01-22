import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Utensils, Users, CheckCircle, XCircle, MessageSquare, Shirt, Ticket, Phone, BookOpen } from 'lucide-react';
import { StateData } from '../data/statesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

// In-memory cache
const stateCache = new Map<string, StateData>();

// Use Vite's syntax for environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://us-central1-indokorean.cloudfunctions.net';

// Function to generate dynamic blog content from state data (now more robust)
const generateBlogContent = (state: StateData): string => {
  // Check for `places` array before using it
  const attractionsHtml = (state.places && state.places.length > 0) ? `
    <h2>🏰 Major Tourist Attractions</h2>
    <p>Discover the most iconic landmarks and hidden gems in ${state.name}.</p>
    <ul>
      ${state.places.map(place => `<li><strong>${place.name}:</strong> ${place.description}</li>`).join('')}
    </ul>
  ` : '';

  // Check for `food` array before using it
  const foodHtml = (state.food && state.food.length > 0) ? `
    <hr />
    <h2>🍛 Food & Cuisine</h2>
    <p>The local cuisine is a delightful experience. Here are some must-try dishes:</p>
    <ul>
      ${state.food.map(dish => `<li><strong>${dish.name} (${dish.type}):</strong> ${dish.description}</li>`).join('')}
    </ul>
  ` : '';

  // Check for `culturalNorms` array before using it
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
      // 1. Check cache first
      if (stateCache.has(cacheKey)) {
        setState(stateCache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      // 2. If not in cache, fetch from the API
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/getStateDetails?region=${region}&id=${stateId}`);
        let singleState: StateData = await response.json();

        if (singleState) {
          // If blogContent is missing from the API, generate it dynamically
          if (!singleState.blogContent) {
            const dynamicBlogContent = generateBlogContent(singleState);
            singleState = {
              ...singleState,
              blogContent: dynamicBlogContent
            };
          }
          // 3. Save to cache
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
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-gray-900">
            State not found
          </h2>
          <Link to="/tourism" className="text-indigo-600 hover:text-indigo-700">
            ← Back to Tourism
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-96">
        <ImageWithFallback src={state.image} alt={state.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link
              to="/tourism"
              className="inline-flex items-center gap-2 text-white mb-4 hover:text-orange-200 transition-colors"
            >
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
            <h2 className="text-2xl text-gray-900">Places to Visit</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.places &&
              state.places.map((place, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {place.image && (
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg mb-2 text-gray-900">{place.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{place.description}</p>
                    {place.ticketPrice && (
                      <div className="bg-green-50 rounded-md p-3 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Ticket className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-900">Ticket Pricing</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Indian/Local:</span>
                            <span className="text-gray-900">{place.ticketPrice.indian}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Foreigner:</span>
                            <span className="text-gray-900">{place.ticketPrice.foreigner}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {place.guideContact && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-md p-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>Guide: {place.guideContact}</span>
                      </div>
                    )}
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
              <h2 className="text-2xl text-gray-900">Local Food</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.food.map((dish, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {dish.image && (
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg text-gray-900">{dish.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded flex-shrink-0 ${
                          dish.type === 'veg'
                            ? 'bg-green-100 text-green-700'
                            : dish.type === 'non-veg'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
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
        {state.culturalNorms && state.culturalNorms.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl text-gray-900">Cultural Norms</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <ul className="space-y-3">
                {state.culturalNorms.map((norm, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 mt-1">•</span>
                    <span className="text-gray-700">{norm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Greetings & Clothing */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {state.greetingImage && (
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback src={state.greetingImage} alt="Greetings" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl text-gray-900">Greetings</h3>
              </div>
              <p className="text-gray-700">{state.greetings}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {state.clothingImage && (
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={state.clothingImage}
                  alt="Traditional Clothing"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shirt className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl text-gray-900">Traditional Clothing</h3>
              </div>
              <p className="text-gray-700">{state.clothing}</p>
            </div>
          </div>
        </div>

        {/* Blog Details Section */}
        {state.blogContent && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl text-gray-900">More Details</h2>
            </div>
            <div
              className="prose lg:prose-xl max-w-none bg-orange-50/50 rounded-lg p-6 shadow-sm prose-headings:text-orange-800 prose-blockquote:border-orange-400 prose-blockquote:text-orange-800"
              dangerouslySetInnerHTML={{ __html: state.blogContent }}
            />
          </section>
        )}

        {/* Do's and Don'ts */}
        {state.dos && state.donts && (
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl text-gray-900">Do's</h2>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <ul className="space-y-3">
                  {state.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl text-gray-900">Don'ts</h2>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <ul className="space-y-3">
                  {state.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
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
