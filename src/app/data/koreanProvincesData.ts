export interface ProvinceData {
  id: string;
  name: string;
  description: string;
  places: { name: string; description: string; image?: string }[];
  food: { name: string; type: 'veg' | 'non-veg' | 'both'; description: string; image?: string }[];
  culturalNorms: string[];
  dos: string[];
  donts: string[];
  greetings: string;
  greetingImage: string;
  clothing: string;
  clothingImage: string;
  image: string;
}

export const koreanProvincesData: ProvinceData[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    description: 'The vibrant capital of South Korea, blending modern technology with ancient history.',
    image: 'https://images.unsplash.com/photo-1538681105587-85640961bf8f',
    places: [
      { name: 'Gyeongbokgung Palace', description: 'The largest of the Five Grand Palaces built during the Joseon dynasty.', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9' },
      { name: 'Myeongdong', description: 'A bustling shopping district with countless shops and street food stalls.', image: 'https://images.unsplash.com/photo-1579038332848-5b6a374b6a71' },
      { name: 'N Seoul Tower', description: 'Offers panoramic views of the city from Namsan Mountain.', image: 'https://images.unsplash.com/photo-1538438213639-28665993c6d5' },
    ],
    food: [
      { name: 'Kimchi Jjigae', type: 'both', description: 'A spicy stew made with kimchi, tofu, and meat or seafood.', image: 'https://images.unsplash.com/photo-1583224964987-78a184f74a82' },
      { name: 'Bibimbap', type: 'both', description: 'A mixed rice dish with vegetables, meat, and a gochujang (chili pepper paste).', image: 'https://images.unsplash.com/photo-1596199446990-a6d14bdf52b6' },
      { name: 'Tteokbokki', type: 'veg', description: 'Spicy stir-fried rice cakes, a popular street food.', image: 'https://images.unsplash.com/photo-1620048298055-63c6c247985a' },
    ],
    culturalNorms: ['Bowing is a common greeting.', 'Respect for elders is highly valued.', 'Tipping is not customary.'],
    dos: ['Use two hands when giving or receiving items.', 'Accept drinks when offered.', 'Try to learn some basic Korean phrases.'],
    donts: ['Don\'t stick your chopsticks upright in your rice.', 'Don\'t write a person\'s name in red ink.', 'Don\'t blow your nose at the dinner table.'],
    greetings: 'Annyeonghaseyo (안녕하세요)',
    greetingImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    clothing: 'Modern and trendy fashion is common, with traditional Hanbok worn on special occasions.',
    clothingImage: 'https://images.unsplash.com/photo-1593234282834-1e5b2a901351',
  },
  // Add other provinces here
];
