import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Flame, Leaf, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { foodComparisons, Dish } from '../data/food-data';
import RecipeModal from './ui/RecipeModal'; // Import the new modal component

// --- Sub-components ---

const SpiceLevel = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    <span className="text-xs font-semibold">Spice:</span>
    {[...Array(5)].map((_, i) => (
      <Flame
        key={i}
        className={`h-4 w-4 ${i < level ? 'text-red-500 fill-current' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const DishCard = ({ dish, onClick }: { dish: Dish; onClick: (dish: Dish) => void }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    onClick={() => onClick(dish)}
  >
    <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        {dish.name}
        {dish.isVeg ? <Leaf className="h-5 w-5 text-green-500" title="Vegetarian" /> : null}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
      <div className="text-xs bg-gray-100 rounded-full px-2 py-1 inline-block mb-3">
        <strong>Taste:</strong> {dish.tasteProfile}
      </div>
      <div className="flex justify-between items-center">
        <SpiceLevel level={dish.spiceLevel} />
        <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{dish.whenEaten}</span>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

export function FoodPage() {
  const [filters, setFilters] = useState({
    vegOnly: false,
    streetFood: false,
    spicy: false,
  });
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const filteredComparisons = foodComparisons.filter(({ india, korea }) => {
    if (filters.vegOnly && (!india.isVeg || !korea.isVeg)) return false;
    if (filters.streetFood && (india.whenEaten !== 'Street' && korea.whenEaten !== 'Street')) return false;
    if (filters.spicy && (india.spiceLevel < 3 && korea.spiceLevel < 3)) return false;
    return true;
  });

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>India vs Korea: A Culinary Face-Off | IndoKorean</title>
        <meta name="description" content="A deep dive into the flavors, traditions, and iconic dishes of India and Korea." />
      </Helmet>

      {isModalOpen && <RecipeModal dish={selectedDish} onClose={handleCloseModal} />}

      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <div className="absolute inset-0 w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589301760014-d929f39791e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pfGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080')" }}></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588166524941-3bf6a2ab4a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080')" }}></div>
        <div className="relative h-full flex flex-col justify-center items-center bg-black bg-opacity-60 text-white text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold">India vs Korea: A Culinary Face-Off</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">A deep dive into flavors, traditions, and iconic dishes that define two rich cultures.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dish Comparison Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Iconic Dish Showdown</h2>
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => handleFilterChange('vegOnly')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filters.vegOnly ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Veg Only</button>
            <button onClick={() => handleFilterChange('streetFood')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filters.streetFood ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Street Food</button>
            <button onClick={() => handleFilterChange('spicy')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filters.spicy ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Spicy</button>
          </div>

          <div className="space-y-12">
            {filteredComparisons.map((comp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                <DishCard dish={comp.india} onClick={handleDishClick} />
                <DishCard dish={comp.korea} onClick={handleDishClick} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border">
                  <UtensilsCrossed className="h-8 w-8 text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Final Takeaway */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">So... Which Cuisine Wins?</h2>
            <p className="max-w-2xl mx-auto mb-6">There is no winner. India offers a universe of complex spices and regional diversity, while Korea presents a world of balanced, savory, and fermented flavors. The best choice depends on your mood, your palate, and your lifestyle.</p>
            <div className="flex justify-center gap-4">
                <a href="/tourism" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold flex items-center gap-2">Explore India <ArrowRight className="h-5 w-5" /></a>
                <a href="/tourism" className="bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">Explore Korea <ArrowRight className="h-5 w-5" /></a>
            </div>
        </div>
      </div>
    </div>
  );
}
