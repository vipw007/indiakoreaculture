export interface Dish {
  name: string;
  image: string;
  description: string;
  tasteProfile: string;
  whenEaten: 'Daily' | 'Festival' | 'Street';
  isVeg: boolean;
  spiceLevel: 1 | 2 | 3 | 4 | 5; // 1 (Mild) to 5 (Very Spicy)
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
    },
    korea: {
      name: 'Bulgogi',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf6a2ab4a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Thinly sliced, marinated beef grilled to perfection.',
      tasteProfile: 'Sweet, savory, smoky',
      whenEaten: 'Daily',
      isVeg: false,
      spiceLevel: 1,
    },
  },
  {
    india: {
      name: 'Biryani',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f39791e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pfGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Aromatic rice dish with spices, meat, or vegetables.',
      tasteProfile: 'Aromatic, spicy, layered',
      whenEaten: 'Festival',
      isVeg: false, // Can be veg, but classic is non-veg
      spiceLevel: 3,
    },
    korea: {
      name: 'Bibimbap',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f39791e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pfGVufDB8fHx8MTY3NTc2MjY1MA&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Mixed rice bowl with assorted vegetables, meat, and gochujang.',
      tasteProfile: 'Savory, spicy, fresh',
      whenEaten: 'Daily',
      isVeg: false, // Can be veg
      spiceLevel: 2,
    },
  },
  {
    india: {
      name: 'Samosa',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2F8ZW58MHx8fHwxNjc1NzYyNjUw&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Fried pastry with a savory filling, such as spiced potatoes.',
      tasteProfile: 'Savory, crispy, spicy',
      whenEaten: 'Street',
      isVeg: true,
      spiceLevel: 2,
    },
    korea: {
      name: 'Tteokbokki',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2F8ZW58MHx8fHwxNjc1NzYyNjUw&ixlib=rb-4.0.3&q=80&w=1080',
      description: 'Spicy stir-fried rice cakes with fish cakes and gochujang sauce.',
      tasteProfile: 'Spicy, sweet, chewy',
      whenEaten: 'Street',
      isVeg: false, // Fish cakes
      spiceLevel: 4,
    },
  },
];
