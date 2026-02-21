// Tourism data for Indian States and Korean Provinces

export interface Place {
  name: string;
  description: string;
  image?: string;
  category?: 'Religious' | 'Beach' | 'Fort' | 'Historical' | 'Nature' | 'Other';
  isUNESCO?: boolean;
  distanceFromHub?: number;
  ticketPrice?: {
    indian: string;
    foreigner: string;
  };
  guideContact?: string;
}

export interface Food {
  name: string;
  description: string;
  type: 'veg' | 'non-veg' | 'both';
  image?: string;
}

export interface StateData {
  id: string;
  name: string;
  description: string;
  image: string;
  places: Place[];
  food: Food[];
  culturalNorms: string[];
  greetings: string;
  greetingImage?: string;
  clothing: string;
  clothingImage?: string;
  dos: string[];
  donts: string[];
  weather?: string;
  mood?: string[];
  bestSeason?: string;
  category?: string;
  blogContent?: string;
}

export const indianStatesData: StateData[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    description: 'Land of Kings with majestic forts, palaces, and desert landscapes',
    image: 'https://images.unsplash.com/photo-1534758607507-754e582adfa4?w=1080',
    places: [
      {
        name: 'Hawa Mahal',
        description: 'Iconic Palace of Winds with 953 windows',
        image: 'https://images.unsplash.com/photo-1534407672671-e77ce1342dc8?w=400',
        category: 'Historical',
        distanceFromHub: 12,
        ticketPrice: { indian: '₹50', foreigner: '₹200' },
        guideContact: '+91-9876543210'
      },
      {
        name: 'Amber Fort',
        description: 'Magnificent hilltop fort with elephant rides',
        image: 'https://images.unsplash.com/photo-1599661046827-dacff0960c9e?w=400',
        category: 'Fort',
        isUNESCO: true,
        distanceFromHub: 22,
        ticketPrice: { indian: '₹100', foreigner: '₹500' },
        guideContact: '+91-9876543211'
      },
      {
        name: 'City Palace Jaipur',
        description: 'Royal residence showcasing Rajput architecture',
        category: 'Historical',
        distanceFromHub: 10,
        ticketPrice: { indian: '₹75', foreigner: '₹300' }
      },
    ],
    food: [
      {
        name: 'Dal Baati Churma',
        description: 'Traditional Rajasthani dish with wheat balls, lentils, and sweet crumble',
        type: 'veg',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400'
      }
    ],
    culturalNorms: ['Respect for elders', 'Remove shoes in temples'],
    greetings: 'Khamma Ghani',
    clothing: 'Pagdi and Ghagra-Choli',
    dos: ['Try folk dance'],
    donts: ["Don't photograph without permission"]
  },
  {
    id: 'goa',
    name: 'Goa',
    description: 'Beach paradise with Portuguese heritage and vibrant nightlife',
    image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?w=1080',
    places: [
      {
        name: 'Baga Beach',
        description: 'Popular beach known for water sports and nightlife',
        image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?w=400',
        category: 'Beach',
        distanceFromHub: 40,
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      },
      {
        name: 'Basilica of Bom Jesus',
        description: 'UNESCO World Heritage church housing St. Francis Xavier',
        category: 'Religious',
        isUNESCO: true,
        distanceFromHub: 25,
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      },
      {
        name: 'Fort Aguada',
        description: '17th-century Portuguese fort overlooking the sea',
        category: 'Fort',
        distanceFromHub: 35,
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Fish Curry Rice',
        description: 'Goan-style fish curry with coconut and kokum',
        type: 'non-veg'
      }
    ],
    culturalNorms: ['Blend of Indian and Portuguese cultures'],
    greetings: 'Hello or Namaste',
    clothing: 'Casual beachwear',
    dos: ['Try water sports'],
    donts: ["Don't swim in prohibited areas"]
  }
];

export const koreanProvincesData: StateData[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    description: 'Dynamic capital blending ancient palaces with modern skyscrapers',
    image: 'https://images.unsplash.com/photo-1538681105587-85640961bf8f?w=1080',
    places: [
      {
        name: 'Gyeongbokgung Palace',
        description: 'Main royal palace of Joseon dynasty',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400',
        category: 'Historical',
        distanceFromHub: 15,
        ticketPrice: { indian: '₩3,000', foreigner: '₩3,000' }
      }
    ],
    food: [
      {
        name: 'Kimchi',
        description: 'Fermented vegetables',
        type: 'veg'
      }
    ],
    culturalNorms: ['Remove shoes indoors'],
    greetings: 'Annyeonghaseyo',
    clothing: 'Modern and Hanbok',
    dos: ['Use both hands'],
    donts: ["Don't tip"]
  }
];
