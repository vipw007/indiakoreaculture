import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Utensils, Users, CheckCircle, XCircle, MessageSquare, Shirt } from 'lucide-react';
import { koreanProvincesData } from '../data/koreanProvincesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function KoreanProvinceDetailPage() {
  const { provinceId } = useParams<{ provinceId: string }>();
  const province = koreanProvincesData.find((p) => p.id === provinceId);

  if (!province) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-gray-900">Province not found</h2>
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
        <ImageWithFallback
          src={province.image}
          alt={province.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link
              to="/tourism"
              className="inline-flex items-center gap-2 text-white mb-4 hover:text-orange-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to tourism
            </Link>
            <h1 className="text-4xl md:text-5xl text-white mb-2">{province.name}</h1>
            <p className="text-xl text-gray-200">{province.description}</p>
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
            {province.places.map((place, index) => (
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
                  <p className="text-gray-600 text-sm">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Food */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Utensils className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl text-gray-900">Local Food</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {province.food.map((dish, index) => (
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
                      {dish.type === 'veg' ? `🟢 Veg` : dish.type === 'non-veg' ? `🔴 Non Veg` : 'Both'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cultural Norms */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl text-gray-900">Cultural Norms</h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ul className="space-y-3">
              {province.culturalNorms.map((norm, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{norm}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Greetings & Clothing */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {province.greetingImage && (
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={province.greetingImage}
                  alt="Greetings"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl text-gray-900">Greetings</h3>
              </div>
              <p className="text-gray-700">{province.greetings}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {province.clothingImage && (
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={province.clothingImage}
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
              <p className="text-gray-700">{province.clothing}</p>
            </div>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-6">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl text-gray-900">Do's</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <ul className="space-y-3">
                {province.dos.map((item, index) => (
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
                {province.donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
