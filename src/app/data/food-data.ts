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

const GOOGLE_PLACES_API_KEY = "AIzaSyDLHiQrphl5_maE1ovvNWHLjA6gXBPb7mM";

/**
 * Helper to construct a Google Places Photo URL for a given food item.
 * Note: This uses a static search query to generate a reliable URL.
 */
const getFoodImage = (query: string) => {
  // We use a placeholder that will be replaced by the actual photo reference if we were doing this dynamically.
  // However, for a static file, we'll provide high-quality Unsplash images that look like Google results,
  // OR you can use the Google Maps static API if you have the photo references.
  
  // Since this is a static TS file, we can't make async API calls here.
  // I will update the images to high-quality specific ones.
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${query}&key=${GOOGLE_PLACES_API_KEY}`;
};

export const foodComparisons: { india: Dish; korea: Dish }[] = [
  {
    india: {
      name: 'Butter Chicken',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
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
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800',
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
      name: 'Paneer Tikka',
      image: 'https://images.unsplash.com/photo-1601050690532-2d5d32f8a2a4?w=800',
      description: 'Char-grilled paneer cubes marinated in yogurt and spices.',
      tasteProfile: 'Smoky, tangy, savory',
      whenEaten: 'Street',
      isVeg: true,
      spiceLevel: 3,
      recipeHighlights: [
        'Paneer marinated in yogurt, chili, and garam masala.',
        'Grilled on skewers with peppers and onions.',
        'Best served with mint chutney.',
      ],
      fullRecipe: `Ingredients:
- 250g paneer, cubed
- 1/2 cup yogurt
- 1 tbsp ginger-garlic paste
- 1 tsp chili powder, 1 tsp garam masala
- Lemon juice, salt, oil
- Bell peppers, onions

Instructions:
1. Mix yogurt, spices, lemon, salt. Coat paneer and veggies.
2. Marinate 30-60 minutes.
3. Skewer and grill until charred.
4. Serve hot with chutney.`,
    },
    korea: {
      name: 'Dakgalbi',
      image: 'https://images.unsplash.com/photo-1604908554027-3fb983f58bd1?w=800',
      description: 'Spicy stir-fried chicken with cabbage and rice cakes.',
      tasteProfile: 'Spicy, sweet, savory',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 4,
      recipeHighlights: [
        'Marinated chicken cooked with gochujang sauce.',
        'Includes cabbage, sweet potato, and tteok.',
        'Often finished with 볶음밥 (fried rice).',
      ],
      fullRecipe: `Ingredients:
- 400g chicken, bite-sized
- 2 tbsp gochujang, 1 tbsp gochugaru
- 1 tbsp soy sauce, 1 tbsp sugar
- Cabbage, sweet potato, scallions
- Rice cakes (tteok), oil

Instructions:
1. Marinate chicken with gochujang, gochugaru, soy, sugar.
2. Stir-fry chicken, add vegetables and tteok.
3. Cook until tender and sauce thickens.
4. Serve hot; add rice to pan for 볶음밥 if desired.`,
    },
  },
  {
    india: {
      name: 'Rogan Josh',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
      description: 'Slow-cooked Kashmiri lamb curry with aromatic spices.',
      tasteProfile: 'Rich, aromatic, mildly spicy',
      whenEaten: 'Festival',
      isVeg: false,
      spiceLevel: 3,
      recipeHighlights: [
        'Uses Kashmiri chili for color.',
        'Cooked low and slow for depth.',
        'Finished with yogurt and warming spices.',
      ],
      fullRecipe: `Ingredients:
- 500g lamb pieces
- 1 cup yogurt
- Kashmiri chili powder, fennel, ginger
- Whole spices (cardamom, cloves)
- Onions, garlic, oil, salt

Instructions:
1. Brown lamb with whole spices.
2. Add onions, ginger, garlic; cook until golden.
3. Stir in yogurt and spices; simmer gently.
4. Cook until lamb is tender and gravy thick.`,
    },
    korea: {
      name: 'Samgyetang',
      image: 'https://images.unsplash.com/photo-1604908554027-4dd9e9a8b7d7?w=800',
      description: 'Ginseng chicken soup traditionally eaten in summer.',
      tasteProfile: 'Mild, herbal, comforting',
      whenEaten: 'Festival',
      isVeg: false,
      spiceLevel: 1,
      recipeHighlights: [
        'Whole chicken stuffed with glutinous rice.',
        'Simmered with ginseng, garlic, and jujube.',
        'Believed to restore energy.',
      ],
      fullRecipe: `Ingredients:
- 1 small whole chicken
- 1/4 cup glutinous rice
- Ginseng root, garlic cloves, jujubes
- Salt, water

Instructions:
1. Stuff chicken with rice, ginseng, garlic, jujubes.
2. Simmer in water until chicken is tender.
3. Season and serve hot with salt.`,
    },
  },
  {
    india: {
      name: 'Idli Sambar',
      image: 'https://images.unsplash.com/photo-1626509653291-0a0f3fef2f6c?w=800',
      description: 'Steamed rice cakes served with lentil stew and chutney.',
      tasteProfile: 'Soft, tangy, mild',
      whenEaten: 'Daily',
      isVeg: true,
      spiceLevel: 1,
      recipeHighlights: [
        'Idli batter is fermented for fluffiness.',
        'Sambar is lentil-based with vegetables.',
        'Eaten with coconut chutney.',
      ],
      fullRecipe: `Ingredients:
- Idli batter (rice + urad dal)
- Toor dal, sambar powder, tamarind
- Mixed vegetables

Instructions:
1. Ferment batter and steam idlis.
2. Cook dal with vegetables and spices.
3. Add tamarind and finish sambar.
4. Serve hot with chutney.`,
    },
    korea: {
      name: 'Gimbap',
      image: 'https://images.unsplash.com/photo-1604908554027-82c962f8d833?w=800',
      description: 'Seaweed rice rolls with vegetables and meat or egg.',
      tasteProfile: 'Savory, fresh, lightly sweet',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 1,
      recipeHighlights: [
        'Seasoned rice with sesame oil.',
        'Filled with pickled radish, spinach, egg.',
        'Great for picnics and lunches.',
      ],
      fullRecipe: `Ingredients:
- Cooked rice, sesame oil, salt
- Gim (seaweed sheets)
- Fillings: egg, spinach, carrot, pickled radish, beef

Instructions:
1. Season rice with sesame oil and salt.
2. Layer rice and fillings on gim sheet.
3. Roll tightly and slice.`,
    },
  },
  {
    india: {
      name: 'Gulab Jamun',
      image: 'https://images.unsplash.com/photo-1601050690294-88cbf54bbed8?w=800',
      description: 'Milk-solid dumplings fried and soaked in sugar syrup.',
      tasteProfile: 'Sweet, rich, syrupy',
      whenEaten: 'Festival',
      isVeg: true,
      spiceLevel: 1,
      recipeHighlights: [
        'Made with khoya or milk powder.',
        'Fried slowly for even color.',
        'Soaked in cardamom syrup.',
      ],
      fullRecipe: `Ingredients:
- 1 cup milk powder or khoya
- 2 tbsp flour
- Milk to bind
- Sugar, water, cardamom

Instructions:
1. Make soft dough and roll small balls.
2. Fry on low heat until golden.
3. Soak in warm sugar-cardamom syrup.`,
    },
    korea: {
      name: 'Hotteok',
      image: 'https://images.unsplash.com/photo-1617093727343-19f2c18f0b86?w=800',
      description: 'Sweet stuffed Korean pancakes with brown sugar and nuts.',
      tasteProfile: 'Sweet, nutty, caramelized',
      whenEaten: 'Street',
      isVeg: true,
      spiceLevel: 1,
      recipeHighlights: [
        'Yeast dough for chewy texture.',
        'Filled with brown sugar, cinnamon, nuts.',
        'Pressed on the griddle until syrupy.',
      ],
      fullRecipe: `Ingredients:
- 1 cup flour
- 1 tsp yeast, sugar, warm water
- Filling: brown sugar, cinnamon, chopped nuts

Instructions:
1. Make dough and let it rise.
2. Fill with sugar-nut mix and seal.
3. Cook on a hot griddle, pressing flat until golden.`,
    },
  },
  {
    india: {
      name: 'Dosa',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
      description: 'Crispy fermented rice-lentil crepe served with chutney and sambar.',
      tasteProfile: 'Crisp, tangy, savory',
      whenEaten: 'Daily',
      isVeg: true,
      spiceLevel: 2,
      recipeHighlights: [
        'Batter is fermented overnight for tang.',
        'Cooked thin on a hot tawa until crisp.',
        'Served with coconut chutney and sambar.',
      ],
      fullRecipe: `Ingredients:
- 2 cups rice
- 1/2 cup urad dal
- 1 tsp fenugreek seeds
- Salt to taste
- Oil or ghee

Instructions:
1. Soak rice, urad dal, and fenugreek for 4-6 hours.
2. Grind to a smooth batter, add salt, and ferment overnight.
3. Heat a tawa, pour batter, spread thin, and drizzle oil.
4. Cook until golden and crisp. Serve with chutney and sambar.`,
    },
    korea: {
      name: 'Kimchi Jeon (Kimchi Pancake)',
      image: 'https://images.unsplash.com/photo-1631737188734-1c7e3f8f1a0a?w=800',
      description: 'Savory pancake made with kimchi and a light batter.',
      tasteProfile: 'Savory, tangy, crispy',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 3,
      recipeHighlights: [
        'Uses well-fermented kimchi for depth.',
        'Crispy edges with a soft center.',
        'Great with soy-vinegar dipping sauce.',
      ],
      fullRecipe: `Ingredients:
- 1 cup chopped kimchi
- 1/2 cup kimchi juice
- 1 cup all-purpose flour
- 1/2 cup water
- 1 scallion, sliced
- Oil for pan-frying

Instructions:
1. Mix flour, water, kimchi juice into a batter.
2. Fold in kimchi and scallions.
3. Pour into a hot oiled pan and cook both sides until crisp.
4. Serve with soy-vinegar dipping sauce.`,
    },
  },
  {
    india: {
      name: 'Chole Bhature',
      image: 'https://images.unsplash.com/photo-1626509653291-0a0f3fef2f6c?w=800',
      description: 'Spiced chickpea curry served with fluffy fried bread.',
      tasteProfile: 'Spicy, tangy, hearty',
      whenEaten: 'Street',
      isVeg: true,
      spiceLevel: 3,
      recipeHighlights: [
        'Chickpeas simmered with onion-tomato masala.',
        'Bhature made from fermented dough.',
        'Often served with pickles and onions.',
      ],
      fullRecipe: `Ingredients:
- 2 cups chickpeas, soaked overnight
- 2 onions, chopped
- 2 tomatoes, pureed
- Ginger-garlic paste, chole masala, chili powder, salt
- For bhature: flour, yogurt, baking soda, oil

Instructions:
1. Pressure cook chickpeas until soft.
2. Cook onions, add spices and tomato puree, then chickpeas.
3. For bhature, knead dough and rest 1 hour.
4. Roll and deep-fry until puffed. Serve hot with chole.`,
    },
    korea: {
      name: 'Jajangmyeon',
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800',
      description: 'Noodles topped with a rich black bean sauce.',
      tasteProfile: 'Savory, slightly sweet, umami',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 1,
      recipeHighlights: [
        'Black bean paste (chunjang) is key.',
        'Pork and onions add depth.',
        'Often enjoyed with pickled radish.',
      ],
      fullRecipe: `Ingredients:
- 200g fresh noodles
- 2 tbsp chunjang (black bean paste)
- 150g pork, diced
- 1 onion, diced
- 1 zucchini, diced
- 1 tbsp sugar, soy sauce, oil

Instructions:
1. Stir-fry pork and vegetables.
2. Add chunjang, cook briefly, then add water to make sauce.
3. Simmer until thickened and slightly sweet.
4. Boil noodles, top with sauce, and serve.`,
    },
  },
  {
    india: {
      name: 'Pani Puri',
      image: 'https://images.unsplash.com/photo-1601050690284-3b0d9df15f8d?w=800',
      description: 'Crisp hollow puris filled with tangy spiced water and potato.',
      tasteProfile: 'Tangy, spicy, refreshing',
      whenEaten: 'Street',
      isVeg: true,
      spiceLevel: 4,
      recipeHighlights: [
        'Puri must be crisp and airy.',
        'Spiced mint-tamarind water is essential.',
        'Best eaten immediately.',
      ],
      fullRecipe: `Ingredients:
- Puris (ready-made or homemade)
- Boiled potatoes, chickpeas
- Mint, coriander, tamarind, green chili
- Roasted cumin, salt, chaat masala

Instructions:
1. Blend mint, coriander, tamarind, chili with spices to make pani.
2. Fill puris with potato/chickpea mix.
3. Add pani and eat immediately.`,
    },
    korea: {
      name: 'Sundubu Jjigae',
      image: 'https://images.unsplash.com/photo-1604908554027-3fa93b9c9e20?w=800',
      description: 'Spicy soft tofu stew with seafood or pork.',
      tasteProfile: 'Spicy, silky, comforting',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 4,
      recipeHighlights: [
        'Soft tofu gives a silky texture.',
        'Gochugaru adds heat and color.',
        'Served bubbling hot with rice.',
      ],
      fullRecipe: `Ingredients:
- 1 tube soft tofu
- 1 tbsp gochugaru
- 100g seafood or pork
- 1 cup anchovy broth or water
- Garlic, soy sauce, sesame oil
- 1 egg (optional)

Instructions:
1. Sauté garlic and protein, add gochugaru.
2. Add broth and simmer.
3. Gently add tofu and cook 5 minutes.
4. Crack an egg on top and serve hot.`,
    },
  },
  {
    india: {
      name: 'Masala Chai',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
      description: 'Spiced milk tea brewed with ginger, cardamom, and cloves.',
      tasteProfile: 'Warm, aromatic, mildly sweet',
      whenEaten: 'Daily',
      isVeg: true,
      spiceLevel: 1,
      recipeHighlights: [
        'Spices are simmered with tea leaves.',
        'Milk and sugar balance the spice.',
        'Ginger adds a warming kick.',
      ],
      fullRecipe: `Ingredients:
- 2 cups water
- 1 cup milk
- 2 tsp black tea
- Ginger, cardamom, cloves
- Sugar to taste

Instructions:
1. Boil water with crushed spices and ginger.
2. Add tea leaves and simmer.
3. Add milk and sugar, boil once.
4. Strain and serve hot.`,
    },
    korea: {
      name: 'Sikhye',
      image: 'https://images.unsplash.com/photo-1604908554027-6a12fdc1b5fb?w=800',
      description: 'Traditional sweet rice drink served cold.',
      tasteProfile: 'Sweet, lightly malty, refreshing',
      whenEaten: 'Festival',
      isVeg: true,
      spiceLevel: 1,
      recipeHighlights: [
        'Made from malted barley and cooked rice.',
        'Often served with pine nuts.',
        'Popular after meals and at celebrations.',
      ],
      fullRecipe: `Ingredients:
- 1/2 cup malted barley powder
- 2 cups cooked rice
- Sugar to taste
- Pine nuts (optional)

Instructions:
1. Soak malted barley in warm water, strain liquid.
2. Add cooked rice to malt liquid and keep warm until a few grains float.
3. Strain, sweeten, chill, and serve with pine nuts.`,
    },
  },
  {
    india: {
      name: 'Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800',
      description: 'Aromatic rice dish with spices, meat, or vegetables.',
      tasteProfile: 'Aromatic, spicy, layered',
      whenEaten: 'Festival',
      isVeg: false,
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
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
      description: 'Mixed rice bowl with assorted vegetables, meat, and gochujang.',
      tasteProfile: 'Savory, spicy, fresh',
      whenEaten: 'Daily',
      isVeg: false,
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
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
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
      image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=800',
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
