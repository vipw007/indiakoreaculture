export interface Dish {
  name: string;
  image: string;
  description: string;
  tasteProfile: string;
  whenEaten: 'Daily' | 'Festival' | 'Street';
  isVeg: boolean;
  spiceLevel: 1 | 2 | 3 | 4 | 5; // 1 (Mild) to 5 (Very Spicy)
  recipeHighlights: string[];
  fullRecipe: string; // New field for detailed recipe
}

export const foodComparisons: { india: Dish; korea: Dish }[] = [
  {
    india: {
      name: 'Butter Chicken',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf6a2ab4a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Tender chicken in a mildly spiced, creamy tomato sauce.',
      tasteProfile: 'Creamy, tangy, aromatic',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 2,
      recipeHighlights: [
        'Chicken marinated overnight in yogurt & spices.',
        'Cooked in a tandoor for a smoky flavor.',
        'Finished in a rich, buttery tomato gravy.',
      ],
      fullRecipe: `Ingredients:
- 500g boneless chicken, cut into pieces
- 1 cup plain yogurt
- 2 tbsp ginger-garlic paste
- 1 tsp red chili powder
- 1/2 tsp turmeric powder
- 1 tsp garam masala
- Salt to taste
- 2 tbsp butter
- 1 large onion, chopped
- 2 tomatoes, pureed
- 1/2 cup cashew paste
- 1/4 cup fresh cream
- Fresh coriander for garnish

Instructions:
1. Marinate chicken with yogurt, ginger-garlic paste, chili powder, turmeric, garam masala, and salt for at least 2 hours (preferably overnight).
2. Grill or pan-fry chicken until cooked through and slightly charred.
3. In a pan, melt butter. Sauté onion until golden. Add tomato puree and cook until oil separates.
4. Add cashew paste, cooked chicken, and a little water. Simmer for 10-15 minutes.
5. Stir in fresh cream. Garnish with coriander and serve hot with naan or rice.`,
    },
    korea: {
      name: 'Bulgogi',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf6a2ab4a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Thinly sliced, marinated beef grilled to perfection.',
      tasteProfile: 'Sweet, savory, smoky',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 1,
      recipeHighlights: [
        'Uses thinly sliced sirloin or ribeye.',
        'Marinated in soy sauce, sugar, & pear juice.',
        'Quickly grilled over high heat.',
      ],
      fullRecipe: `Ingredients:
- 500g thinly sliced beef (sirloin or ribeye)
- 1/2 cup soy sauce
- 1/4 cup brown sugar
- 2 tbsp sesame oil
- 1 tbsp minced garlic
- 1/2 pear, grated
- 1/4 cup chopped green onion
- Black pepper to taste

Instructions:
1. In a large bowl, combine soy sauce, brown sugar, sesame oil, minced garlic, grated pear, green onion, and black pepper to make the marinade.
2. Add the thinly sliced beef to the marinade, ensuring all pieces are coated. Marinate for at least 30 minutes (preferably 2-4 hours in the refrigerator).
3. Heat a grill or a large skillet over medium-high heat.
4. Cook the beef in batches until nicely browned and cooked through, about 2-3 minutes per side.
5. Serve hot with rice and kimchi.`,
    },
  },
  {
    india: {
      name: 'Biryani',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f39791e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHxiaXJ5YW5pfGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Aromatic rice dish with spices, meat, or vegetables.',
      tasteProfile: 'Aromatic, spicy, layered',
      whenEaten: 'Festival',
      isVeg: false, // Can be veg, but classic is non-veg
      spiceLevel: 3,
      recipeHighlights: [
        'Long-grain Basmati rice is key.',
        'Meat and rice are layered and slow-cooked ("dum").',
        'Infused with saffron, mint, and fried onions.',
      ],
      fullRecipe: `Ingredients:
- 500g chicken/mutton/vegetables
- 2 cups Basmati rice, soaked
- 1 cup yogurt
- 2 onions, sliced and fried golden
- 2 tomatoes, chopped
- Ginger-garlic paste, green chilies
- Whole spices (cardamom, cinnamon, cloves)
- Biryani masala, red chili powder, turmeric
- Fresh mint and coriander
- Saffron strands soaked in milk
- Ghee or oil

Instructions:
1. Marinate meat/veg with yogurt, ginger-garlic paste, spices, mint, and coriander.
2. Partially cook Basmati rice (70% done).
3. In a heavy-bottomed pot, layer marinated meat/veg, fried onions, and partially cooked rice.
4. Drizzle saffron milk, ghee, and garnish with more mint/coriander.
5. Seal the pot and cook on low heat (dum style) for 20-30 minutes until rice is fully cooked and flavors meld.
6. Serve hot with raita.`,
    },
    korea: {
      name: 'Bibimbap',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f39791e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHxiaXJ5YW5pfGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Mixed rice bowl with assorted vegetables, meat, and gochujang.',
      tasteProfile: 'Savory, spicy, fresh',
      whenEaten: 'Daily',
      isVeg: false, // Can be veg
      spiceLevel: 2,
      recipeHighlights: [
        'Means "mixed rice" in Korean.',
        'Topped with a raw or fried egg.',
        'Stir everything together before eating!',
      ],
      fullRecipe: `Ingredients:
- 1 cup cooked short-grain rice
- Assorted sautéed vegetables (spinach, carrots, zucchini, bean sprouts)
- 100g seasoned beef or tofu, cooked
- 1 fried egg
- Gochujang (Korean chili paste)
- Sesame oil, sesame seeds

Instructions:
1. Arrange a bed of warm cooked rice in a large bowl.
2. Artfully arrange the sautéed vegetables and cooked meat/tofu over the rice.
3. Place a fried egg (sunny-side up or soft-boiled) in the center.
4. Add a dollop of gochujang to taste.
5. Drizzle with sesame oil and sprinkle with sesame seeds.
6. Before eating, mix all ingredients thoroughly with a spoon until everything is well combined. Enjoy!`,
    },
  },
  {
    india: {
      name: 'Samosa',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHxzYW1vc2F8ZW58MHx8fHwxNjc1NzYyNjUw&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Fried pastry with a savory filling, such as spiced potatoes.',
      tasteProfile: 'Savory, crispy, spicy',
      whenEaten: 'Street',
      isVeg: true,
      spiceLevel: 2,
      recipeHighlights: [
        'Crispy, flaky pastry is essential.',
        'Filling is typically potato, peas, and spices.',
        'Often served with mint or tamarind chutney.',
      ],
      fullRecipe: `Ingredients:
- For the dough: All-purpose flour, water, salt, oil
- For the filling: Boiled potatoes, green peas, ginger, green chilies, cumin seeds, coriander powder, garam masala, amchur (dry mango powder), salt, oil
- Oil for deep frying

Instructions:
1. Prepare the dough: Mix flour, salt, and oil. Add water gradually to form a stiff dough. Rest for 30 minutes.
2. Prepare the filling: Heat oil, sauté cumin seeds, ginger, green chilies. Add boiled and mashed potatoes, green peas, and all dry spices. Mix well.
3. Roll out small portions of dough into oval shapes. Cut in half to form two semi-circles.
4. Form a cone with each semi-circle, fill with potato mixture, and seal the edges.
5. Deep fry samosas on medium-low heat until golden brown and crispy.
6. Serve hot with chutney.`,
    },
    korea: {
      name: 'Tteokbokki',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHxzYW1vc2F8ZW58MHx8fHwxNjc1NzYyNjUw&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Spicy stir-fried rice cakes with fish cakes and gochujang sauce.',
      tasteProfile: 'Spicy, sweet, chewy',
      whenEaten: 'Street',
      isVeg: false,
      spiceLevel: 4,
      recipeHighlights: [
        'Made with chewy cylindrical rice cakes (tteok).',
        'The sauce is a mix of gochujang and gochugaru.',
        'A quintessential Korean street food.',
      ],
      fullRecipe: `Ingredients:
- 300g garaetteok (cylindrical rice cakes)
- 2 cups anchovy broth or water
- 1/4 cup gochujang (Korean chili paste)
- 1 tbsp gochugaru (Korean chili flakes)
- 1 tbsp sugar
- 1 tbsp soy sauce
- 2 sheets fish cakes (eomuk), sliced
- 1/2 onion, sliced
- 2 green onions, chopped

Instructions:
1. If rice cakes are hard, soak them in warm water for 10-15 minutes.
2. In a large pan, combine anchovy broth, gochujang, gochugaru, sugar, and soy sauce. Bring to a boil.
3. Add rice cakes, fish cakes, and onion slices. Simmer for 10-15 minutes, stirring occasionally, until the sauce thickens and rice cakes are tender.
4. Stir in green onions just before serving.
5. Serve hot, often with boiled eggs or ramen noodles.`,
    },
  },
];
