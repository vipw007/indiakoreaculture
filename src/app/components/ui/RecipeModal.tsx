import React from 'react';
import { Dish } from '../../data/food-data';
import { X, Leaf, Flame, UtensilsCrossed, CheckCircle, BookOpen } from 'lucide-react';

interface RecipeModalProps {
  dish: Dish | null;
  onClose: () => void;
}

const SpiceLevelDisplay = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Flame
        key={i}
        className={`h-4 w-4 ${i < level ? 'text-red-500 fill-current' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const RecipeModal: React.FC<RecipeModalProps> = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover rounded-t-xl" />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            {dish.name}
            {dish.isVeg ? <Leaf className="h-6 w-6 text-green-500" title="Vegetarian" /> : null}
          </h2>
          <p className="text-gray-600 mb-4">{dish.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Taste Profile:</p>
              <p className="font-semibold text-gray-800">{dish.tasteProfile}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">When Eaten:</p>
              <p className="font-semibold text-gray-800">{dish.whenEaten}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Spice Level:</p>
              <SpiceLevelDisplay level={dish.spiceLevel} />
            </div>
          </div>

          {dish.recipeHighlights && dish.recipeHighlights.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <UtensilsCrossed className="h-6 w-6 text-indigo-600" /> Key Highlights
              </h3>
              <ul className="space-y-2 text-gray-700">
                {dish.recipeHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dish.fullRecipe && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-600" /> Full Recipe
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg font-mono text-sm leading-relaxed">
                {dish.fullRecipe}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
