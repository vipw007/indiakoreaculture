// Tourism data for Indian States and Korean Provinces

export interface Place {
  name: string;
  description: string;
  image?: string;
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
}

export const indianStatesData: StateData[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    description: 'Land of Kings with majestic forts, palaces, and desert landscapes',
    image: 'https://images.unsplash.com/photo-1534758607507-754e582adfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBhbWJlciUyMGZvcnQlMjBpbmRpYXxlbnwxfHx8fDE3NjgzMzQ4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    places: [
      {
        name: 'Hawa Mahal',
        description: 'Iconic Palace of Winds with 953 windows',
        image: 'https://images.unsplash.com/photo-1534407672671-e77ce1342dc8?w=400',
        ticketPrice: { indian: '₹50', foreigner: '₹200' },
        guideContact: '+91-9876543210'
      },
      {
        name: 'Amber Fort',
        description: 'Magnificent hilltop fort with elephant rides',
        image: 'https://images.unsplash.com/photo-1599661046827-dacff0960c9e?w=400',
        ticketPrice: { indian: '₹100', foreigner: '₹500' },
        guideContact: '+91-9876543211'
      },
      {
        name: 'City Palace Jaipur',
        description: 'Royal residence showcasing Rajput architecture',
        ticketPrice: { indian: '₹75', foreigner: '₹300' }
      },
      {
        name: 'Jaisalmer',
        description: 'Golden city in the Thar Desert with sand dunes and camel safaris',
        image: 'https://images.unsplash.com/photo-1690786648154-bc52fe4f642d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWphcmF0JTIwcmFubiUyMG9mJTIwa3V0Y2h8ZW58MXx8fHwxNzY4MzM0OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        ticketPrice: { indian: '₹75', foreigner: '₹300' },
        guideContact: '+91-9876543211'
      },
    ],
    food: [
      {
        name: 'Dal Baati Churma',
        description: 'Traditional Rajasthani dish with wheat balls, lentils, and sweet crumble',
        type: 'veg',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400'
      },
      {
        name: 'Laal Maas',
        description: 'Spicy mutton curry cooked with red chilies',
        type: 'non-veg',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'
      },
      {
        name: 'Ghewar',
        description: 'Traditional sweet disc-shaped dessert soaked in sugar syrup',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Respect for elders is paramount in Rajasthani culture',
      'Remove shoes before entering temples and homes',
      'Women often cover their heads with dupatta in traditional settings',
      'Hospitality is a core value - guests are treated with utmost respect'
    ],
    greetings: 'Khamma Ghani - traditional Rajasthani greeting meaning "plenty of greetings"',
    greetingImage: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400',
    clothing: 'Men wear Pagdi (turban), Angarkha and Dhoti. Women wear colorful Ghagra-Choli with Odhni',
    clothingImage: 'https://images.unsplash.com/photo-1766857454509-3ee243001fd0?w=400',
    dos: [
      'Try traditional Rajasthani folk dances like Ghoomar',
      'Visit during festivals like Pushkar Fair for authentic experience',
      'Bargain respectfully in local markets',
      'Carry water and sunscreen - desert climate is harsh'
    ],
    donts: [
      "Don't photograph people without permission",
      "Don't touch or point feet towards religious items",
      'Avoid wearing revealing clothes at religious sites',
      "Don't disrespect local customs and traditions"
    ]
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    description: 'Gateway to India with vibrant cities, historic caves, and coastal beauty',
    image: 'https://images.unsplash.com/photo-1667849521367-61c7f5662163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBnYXRld2F5JTIwaW5kaWF8ZW58MXx8fHwxNzY4MzM0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    places: [
      {
        name: 'Gateway of India',
        description: 'Iconic monument built during British Raj overlooking Arabian Sea',
        image: 'https://images.unsplash.com/photo-1667849521367-61c7f5662163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBnYXRld2F5JTIwaW5kaWF8ZW58MXx8fHwxNzY4MzM0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        ticketPrice: { indian: 'Free', foreigner: 'Free' },
        guideContact: '+91-9876543220'
      },
      {
        name: 'Ajanta Caves',
        description: 'UNESCO World Heritage Buddhist cave monuments with ancient paintings',
        image: 'https://images.unsplash.com/photo-1599124794347-a63359c43627',
        ticketPrice: { indian: '₹40', foreigner: '₹600' },
        guideContact: '+91-9876543221'
      },
      {
        name: 'Ellora Caves',
        description: 'Rock-cut monasteries and temples of three religions',
        ticketPrice: { indian: '₹40', foreigner: '₹600' }
      }
    ],
    food: [
      {
        name: 'Vada Pav',
        description: 'Mumbai street food - spiced potato fritter in bread bun',
        type: 'veg',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400'
      },
      {
        name: 'Misal Pav',
        description: 'Spicy curry made of sprouted moth beans',
        type: 'veg'
      },
      {
        name: 'Bombay Duck Fry',
        description: 'Crispy fried lizardfish - coastal delicacy',
        type: 'non-veg'
      }
    ],
    culturalNorms: [
      'Fast-paced cosmopolitan culture in Mumbai',
      'Marathi is the official language but English is widely spoken',
      'Ganesh Chaturthi is celebrated with great enthusiasm',
      'Mix of traditional and modern values'
    ],
    greetings: 'Namaskar or Namaste - traditional greeting with hands together',
    clothing: 'Men wear Kurta-Pajama or formal wear. Women wear Sarees (especially Paithani and Nauvari styles)',
    dos: [
      'Experience local trains in Mumbai (avoid rush hours)',
      'Visit during Ganesh Chaturthi festival',
      'Try street food from popular vendors',
      'Explore Bollywood culture'
    ],
    donts: [
      "Don't carry large bags in Mumbai locals during peak hours",
      'Avoid drinking tap water',
      "Don't litter - Mumbai takes cleanliness seriously",
      'Be cautious of your belongings in crowded areas'
    ]
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    description: 'Home to the Taj Mahal and ancient spiritual cities along the Ganges',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
    places: [
      {
        name: 'Taj Mahal',
        description: 'One of the Seven Wonders of the World - monument of eternal love',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
        ticketPrice: { indian: '₹50', foreigner: '₹1300' },
        guideContact: '+91-9876543230'
      },
      {
        name: 'Varanasi Ghats',
        description: 'Sacred riverside steps along the Ganges River',
        ticketPrice: { indian: 'Free', foreigner: 'Free' },
        guideContact: '+91-9876543231'
      },
      {
        name: 'Fatehpur Sikri',
        description: 'Abandoned Mughal city with stunning red sandstone architecture',
        ticketPrice: { indian: '₹50', foreigner: '₹610' }
      }
    ],
    food: [
      {
        name: 'Awadhi Biryani',
        description: 'Fragrant rice dish cooked with meat and aromatic spices',
        type: 'non-veg',
        image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=400'
      },
      {
        name: 'Petha',
        description: 'Sweet translucent candy made from ash gourd',
        type: 'veg'
      },
      {
        name: 'Kachori Sabzi',
        description: 'Spiced lentil-filled fried bread with potato curry',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Deeply spiritual culture centered around Hinduism',
      'Varanasi is one of the oldest living cities in the world',
      'Great respect for cows - considered sacred',
      'Hindi and Urdu are widely spoken'
    ],
    greetings: 'Namaste or Ram Ram - hands together in prayer position',
    clothing: 'Men wear Kurta-Pajama, women wear Salwar Kameez or Saree',
    dos: [
      'Witness the evening Ganga Aarti in Varanasi',
      'Visit Taj Mahal at sunrise for best experience',
      'Explore the narrow lanes of old Lucknow',
      'Try authentic street food'
    ],
    donts: [
      "Don't touch or harm cows",
      'Avoid leather items near religious sites',
      "Don't take photographs during religious ceremonies without permission",
      'Avoid visiting Taj Mahal on Fridays (closed)'
    ]
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    description: 'Silicon Valley of India with ancient temples, palaces, and lush landscapes',
    image: 'https://images.unsplash.com/photo-1637075735042-727375ffcb6a',
    places: [
      {
        name: 'Mysore Palace',
        description: 'Opulent royal palace lit by 100,000 bulbs during festivals',
        image: 'https://images.unsplash.com/photo-1637075735042-727375ffcb6a?w=400',
        ticketPrice: { indian: '₹70', foreigner: '₹200' },
        guideContact: '+91-9876543240'
      },
      {
        name: 'Hampi',
        description: 'UNESCO site with ancient ruins of Vijayanagara Empire',
        ticketPrice: { indian: '₹40', foreigner: '₹600' },
        guideContact: '+91-9876543241'
      },
      {
        name: 'Gokarna Beaches',
        description: 'Serene beaches perfect for relaxation and spirituality',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Bisi Bele Bath',
        description: 'One-pot rice, lentil, and vegetable dish with aromatic spices',
        type: 'veg'
      },
      {
        name: 'Mysore Pak',
        description: 'Rich, sweet ghee-based dessert',
        type: 'veg'
      },
      {
        name: 'Coorg Pork Curry',
        description: 'Traditional Kodava pork preparation with special spices',
        type: 'non-veg'
      }
    ],
    culturalNorms: [
      'Blend of traditional South Indian and modern tech culture',
      'Kannada is the official language',
      'Strong classical music and dance traditions',
      'Coffee culture is deeply rooted'
    ],
    greetings: 'Namaskara - traditional Kannada greeting',
    clothing: 'Men wear Lungi with shirt or traditional dhoti. Women wear Sarees (especially Mysore Silk)',
    dos: [
      'Experience Dasara festival in Mysore',
      'Try filter coffee from local coffee shops',
      'Explore the tech culture in Bangalore',
      'Visit Coorg for coffee plantations'
    ],
    donts: [
      "Don't climb on ancient structures in Hampi",
      'Avoid loud behavior in temples',
      "Don't disrespect local Kannada culture",
      'Be mindful of traffic in Bangalore'
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    description: "God's Own Country with backwaters, beaches, and spice plantations",
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2',
    places: [
      {
        name: 'Alleppey Backwaters',
        description: 'Network of lagoons perfect for houseboat cruises',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400',
        ticketPrice: { indian: '₹8000-15000 per houseboat', foreigner: '₹8000-15000 per houseboat' },
        guideContact: '+91-9876543250'
      },
      {
        name: 'Munnar Tea Gardens',
        description: 'Sprawling tea plantations in misty mountains',
        ticketPrice: { indian: 'Free (estate visits vary)', foreigner: 'Free (estate visits vary)' }
      },
      {
        name: 'Periyar Wildlife Sanctuary',
        description: 'Protected area home to elephants and tigers',
        ticketPrice: { indian: '₹125', foreigner: '₹300' }
      }
    ],
    food: [
      {
        name: 'Kerala Sadya',
        description: 'Elaborate vegetarian feast served on banana leaf',
        type: 'veg'
      },
      {
        name: 'Karimeen Pollichathu',
        description: 'Pearl spot fish marinated and grilled in banana leaf',
        type: 'non-veg'
      },
      {
        name: 'Appam with Stew',
        description: 'Rice pancakes with coconut milk-based curry',
        type: 'both'
      }
    ],
    culturalNorms: [
      '100% literacy rate with strong education focus',
      'Malayalam is the official language',
      'High regard for festivals like Onam and Vishu',
      'Matrilineal traditions in some communities'
    ],
    greetings: 'Namaskaram - hands together in prayer position',
    clothing: 'Men wear Mundu (white dhoti), women wear Kasavu Saree or Set Mundu',
    dos: [
      'Experience a traditional houseboat stay',
      'Watch Kathakali dance performance',
      'Try authentic Ayurvedic treatments',
      'Visit during Onam festival'
    ],
    donts: [
      "Don't eat beef in public (many communities abstain)",
      'Avoid littering in pristine backwaters',
      "Don't enter temple inner sanctums without permission",
      'Be respectful during religious ceremonies'
    ]
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    description: 'Cultural capital with colonial architecture, tea gardens, and literary heritage',
    image: 'https://images.unsplash.com/photo-1721818218431-0968074eabd4',
    places: [
      {
        name: 'Victoria Memorial',
        description: 'Grand marble building dedicated to Queen Victoria',
        image: 'https://images.unsplash.com/photo-1721818218431-0968074eabd4?w=400',
        ticketPrice: { indian: '₹30', foreigner: '₹500' },
        guideContact: '+91-9876543260'
      },
      {
        name: 'Darjeeling Himalayan Railway',
        description: 'UNESCO World Heritage toy train through tea estates',
        ticketPrice: { indian: '₹1210', foreigner: '₹4860' }
      },
      {
        name: 'Sundarbans National Park',
        description: 'Mangrove forest home to Royal Bengal Tigers',
        ticketPrice: { indian: '₹100', foreigner: '₹300' }
      }
    ],
    food: [
      {
        name: 'Machher Jhol',
        description: 'Traditional Bengali fish curry with mustard',
        type: 'non-veg'
      },
      {
        name: 'Rasgulla',
        description: 'Spongy cheese balls soaked in sugar syrup',
        type: 'veg'
      },
      {
        name: 'Kosha Mangsho',
        description: 'Slow-cooked spicy mutton curry',
        type: 'non-veg'
      }
    ],
    culturalNorms: [
      'Rich literary and artistic traditions',
      'Bengali is the official language',
      'Durga Puja is the biggest festival',
      'Strong intellectual and cultural debates'
    ],
    greetings: 'Nomoshkar - with hands together',
    clothing: 'Men wear Punjabi-Pajama, women wear Bengali Saree with red border',
    dos: [
      'Experience Durga Puja celebrations',
      'Visit intellectual cafes in College Street',
      'Try sweets from famous sweet shops',
      'Explore colonial architecture'
    ],
    donts: [
      "Don't criticize Rabindranath Tagore or football",
      'Avoid rushing - Kolkata has its own pace',
      "Don't skip trying local street food",
      'Be careful during monsoons'
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    description: 'Beach paradise with Portuguese heritage and vibrant nightlife',
    image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb',
    places: [
      {
        name: 'Baga Beach',
        description: 'Popular beach known for water sports and nightlife',
        image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?w=400',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      },
      {
        name: 'Basilica of Bom Jesus',
        description: 'UNESCO World Heritage church housing St. Francis Xavier',
        ticketPrice: { indian: 'Free', foreigner: 'Free' },
        guideContact: '+91-9876543270'
      },
      {
        name: 'Fort Aguada',
        description: '17th-century Portuguese fort overlooking the sea',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Fish Curry Rice',
        description: 'Goan-style fish curry with coconut and kokum',
        type: 'non-veg'
      },
      {
        name: 'Bebinca',
        description: 'Traditional layered pudding dessert',
        type: 'veg'
      },
      {
        name: 'Pork Vindaloo',
        description: 'Spicy pork curry with vinegar and garlic',
        type: 'non-veg'
      }
    ],
    culturalNorms: [
      'Unique blend of Indian and Portuguese cultures',
      'Konkani is official language; Portuguese influence remains',
      'Liberal and relaxed social atmosphere',
      'Catholic festivals celebrated alongside Hindu ones'
    ],
    greetings: 'Hello or Namaste - casual and friendly approach',
    clothing: 'Casual beachwear acceptable. Traditional occasions see Western-style dresses or Indian wear',
    dos: [
      'Try water sports and beach activities',
      'Explore spice plantations',
      'Enjoy the nightlife responsibly',
      'Visit during Carnival season'
    ],
    donts: [
      "Don't swim in prohibited areas or during monsoons",
      'Avoid littering on beaches',
      "Don't drink and drive",
      'Be respectful in churches and religious sites'
    ]
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    description: 'Land of Gandhi with vibrant culture, white desert, and Asiatic lions',
    image: 'https://images.unsplash.com/photo-1690786648154-bc52fe4f642d',
    places: [
      {
        name: 'Rann of Kutch',
        description: 'Vast white salt desert, stunning during full moon',
        image: 'https://images.unsplash.com/photo-1706013729724-caada9be0f97?w=400',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      },
      {
        name: 'Gir National Park',
        description: 'Only home of Asiatic lions in the wild',
        ticketPrice: { indian: '₹450', foreigner: '₹1800' },
        guideContact: '+91-9876543280'
      },
      {
        name: 'Sabarmati Ashram',
        description: 'Mahatma Gandhi\'s home during independence movement',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Dhokla',
        description: 'Steamed fermented rice and chickpea flour cake',
        type: 'veg'
      },
      {
        name: 'Gujarati Thali',
        description: 'Complete vegetarian meal with variety of dishes',
        type: 'veg'
      },
      {
        name: 'Fafda Jalebi',
        description: 'Crispy savory strips with sweet syrup spirals',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Predominantly vegetarian state',
      'Gujarati is the official language',
      'Strong business and entrepreneurial culture',
      'Navratri festival celebrated with fervor'
    ],
    greetings: 'Kem Cho? (How are you?) - cheerful and warm',
    clothing: 'Men wear Kediyu-Kafni, women wear Chaniya Choli (especially during Navratri)',
    dos: [
      'Experience Navratri Garba dance',
      'Try authentic Gujarati vegetarian food',
      'Visit during Rann Utsav',
      'Explore textile markets'
    ],
    donts: [
      "Don't expect alcohol - Gujarat is a dry state",
      'Avoid non-vegetarian food in many areas',
      "Don't miss sunset at Rann of Kutch",
      'Be respectful of Gandhi\'s legacy'
    ]
  },
  {
    id: 'punjab',
    name: 'Punjab',
    description: 'Land of five rivers with golden temple, vibrant culture, and warmth',
    image: 'https://images.unsplash.com/photo-1689141082367-df7bd06c4eab',
    places: [
      {
        name: 'Golden Temple',
        description: 'Holiest Sikh shrine with free community kitchen',
        image: 'https://images.unsplash.com/photo-1689141082367-df7bd06c4eab?w=400',
        ticketPrice: { indian: 'Free', foreigner: 'Free' },
        guideContact: '+91-9876543290'
      },
      {
        name: 'Wagah Border',
        description: 'India-Pakistan border with evening flag ceremony',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      },
      {
        name: 'Jallianwala Bagh',
        description: 'Historical memorial of 1919 massacre',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Makki di Roti & Sarson da Saag',
        description: 'Cornmeal flatbread with mustard greens curry',
        type: 'veg'
      },
      {
        name: 'Butter Chicken',
        description: 'Creamy tomato-based chicken curry',
        type: 'non-veg'
      },
      {
        name: 'Lassi',
        description: 'Traditional yogurt-based drink',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Warm and hospitable people',
      'Punjabi and Hindi widely spoken',
      'Sikhism plays central cultural role',
      'Strong agricultural traditions'
    ],
    greetings: 'Sat Sri Akal - Sikh greeting meaning "God is Truth"',
    clothing: 'Men wear Kurta-Pajama with turban. Women wear Salwar Kameez with dupatta',
    dos: [
      'Cover your head before entering Gurdwaras',
      'Participate in community kitchen (langar)',
      'Experience Baisakhi festival',
      'Try authentic Punjabi dhaba food'
    ],
    donts: [
      "Don't enter Gurdwara with shoes",
      'Avoid tobacco near religious sites',
      "Don't disrespect the Sikh faith",
      'Never refuse food offered in langar'
    ]
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    description: 'Ancient temples, classical arts, and rich Dravidian heritage',
    image: 'https://images.unsplash.com/photo-1660122405026-02206229acc5',
    places: [
      {
        name: 'Meenakshi Temple',
        description: 'Magnificent temple with towering gopurams',
        image: 'https://images.unsplash.com/photo-1695704886720-8e188f5e83fb?w=400',
        ticketPrice: { indian: 'Free', foreigner: '₹50' },
        guideContact: '+91-9876543300'
      },
      {
        name: 'Mahabalipuram',
        description: 'UNESCO site with rock-cut temples by the sea',
        ticketPrice: { indian: '₹40', foreigner: '₹600' }
      },
      {
        name: 'Ooty Hill Station',
        description: 'Scenic hill station with tea gardens',
        ticketPrice: { indian: 'Free (attractions vary)', foreigner: 'Free (attractions vary)' }
      }
    ],
    food: [
      {
        name: 'Idli Sambhar',
        description: 'Steamed rice cakes with lentil soup',
        type: 'veg'
      },
      {
        name: 'Chettinad Chicken',
        description: 'Spicy chicken curry with unique blend of spices',
        type: 'non-veg'
      },
      {
        name: 'Filter Coffee',
        description: 'Traditional South Indian coffee with milk',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Deep-rooted temple culture',
      'Tamil language with ancient literary tradition',
      'Classical Bharatanatyam dance originated here',
      'Strong emphasis on education and arts'
    ],
    greetings: 'Vanakkam - with hands together in prayer position',
    clothing: 'Men wear Veshti (dhoti), women wear traditional Sarees',
    dos: [
      'Visit temples in traditional attire',
      'Experience classical dance performances',
      'Try authentic filter coffee',
      'Explore Tanjore paintings and handicrafts'
    ],
    donts: [
      "Don't enter temple sanctums without permission",
      'Avoid leather items in temples',
      "Don't point feet towards deities or elders",
      'Be respectful during temple rituals'
    ]
  },
  {
    id: 'telangana',
    name: 'Telangana',
    description: 'Tech hub with historic monuments, pearl markets, and biryani culture',
    image: 'https://images.unsplash.com/photo-1657981630164-769503f3a9a8',
    places: [
      {
        name: 'Charminar',
        description: 'Iconic 400-year-old mosque and monument',
        image: 'https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=400',
        ticketPrice: { indian: '₹25', foreigner: '₹300' },
        guideContact: '+91-9876543310'
      },
      {
        name: 'Golconda Fort',
        description: 'Historic fortress with amazing acoustics',
        ticketPrice: { indian: '₹25', foreigner: '₹300' }
      },
      {
        name: 'Ramoji Film City',
        description: 'Largest integrated film city in the world',
        ticketPrice: { indian: '₹1150', foreigner: '₹1150' }
      }
    ],
    food: [
      {
        name: 'Hyderabadi Biryani',
        description: 'Famous aromatic rice dish with meat',
        type: 'non-veg',
        image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=400'
      },
      {
        name: 'Haleem',
        description: 'Slow-cooked meat and lentil stew',
        type: 'non-veg'
      },
      {
        name: 'Qubani ka Meetha',
        description: 'Apricot dessert with cream',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Blend of Telugu and Hyderabadi cultures',
      'Telugu and Urdu widely spoken',
      'Strong IT and startup culture',
      'Rich Nizami heritage'
    ],
    greetings: 'Namaste or Salaam - depending on community',
    clothing: 'Men wear Kurta-Sherwani, women wear Salwar Kameez or Saree',
    dos: [
      'Try authentic Hyderabadi biryani',
      'Explore pearl and bangle markets',
      'Visit during Bonalu festival',
      'Experience the sound and light show at Golconda'
    ],
    donts: [
      "Don't miss the Charminar area at night",
      'Avoid spicy food if sensitive',
      "Don't haggle too aggressively in markets",
      'Be careful of traffic in old city'
    ]
  }
];

export const koreanProvincesData: StateData[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    description: 'Dynamic capital blending ancient palaces with modern skyscrapers',
    image: 'https://images.unsplash.com/photo-1538681105587-85640961bf8f',
    places: [
      {
        name: 'Gyeongbokgung Palace',
        description: 'Main royal palace of Joseon dynasty with changing of guards',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
        ticketPrice: { indian: '₹300 (₩3,000)', foreigner: '₩3,000' },
        guideContact: '+82-10-1234-5678'
      },
      {
        name: 'N Seoul Tower',
        description: 'Iconic tower offering panoramic city views',
        image: 'https://images.unsplash.com/photo-1538438213639-28665993c6d5',
        ticketPrice: { indian: '₹1100 (₩11,000)', foreigner: '₩11,000' }
      },
      {
        name: 'Bukchon Hanok Village',
        description: 'Traditional Korean houses in historic neighborhood',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Kimchi',
        description: 'Fermented vegetables, usually cabbage, with chili peppers',
        type: 'veg',
        image: 'https://images.unsplash.com/photo-1583224964987-78a184f74a82'
      },
      {
        name: 'Bibimbap',
        description: 'Mixed rice with vegetables, egg, and gochujang',
        type: 'both'
      },
      {
        name: 'Korean BBQ (Samgyeopsal)',
        description: 'Grilled pork belly cooked at the table',
        type: 'non-veg'
      }
    ],
    culturalNorms: [
      'Remove shoes before entering homes and some restaurants',
      'Respect for elders is crucial - use both hands when giving/receiving',
      'Bow when greeting - depth shows respect level',
      'Avoid blowing nose in public'
    ],
    greetings: 'Annyeonghaseyo (안녕하세요) - formal hello with a bow',
    greetingImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    clothing: 'Modern fashion in daily life. Hanbok worn during festivals and celebrations',
    clothingImage: 'https://images.unsplash.com/photo-1593234282834-1e5b2a901351',
    dos: [
      'Use both hands when receiving or giving items to elders',
      'Try visiting a jjimjilbang (Korean spa)',
      'Experience K-pop culture in Gangnam',
      'Visit during cherry blossom season (April)'
    ],
    donts: [
      "Don't write names in red ink (symbolizes death)",
      "Don't stick chopsticks upright in rice",
      "Don't tip - it's not customary",
      'Avoid loud behavior on public transport'
    ]
  },
  {
    id: 'busan',
    name: 'Busan',
    description: 'Coastal city with beaches, mountains, and vibrant seafood markets',
    image: 'https://images.unsplash.com/photo-1579878113289-28c4a4f6871e',
    places: [
      {
        name: 'Haedong Yonggungsa Temple',
        description: 'Stunning seaside Buddhist temple',
        image: 'https://images.unsplash.com/photo-1740785978879-506357754d72?w=400',
        ticketPrice: { indian: 'Free', foreigner: 'Free' },
        guideContact: '+82-10-2345-6789'
      },
      {
        name: 'Haeundae Beach',
        description: 'Famous beach with white sand and beach festivals',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      },
      {
        name: 'Gamcheon Culture Village',
        description: 'Colorful hillside village with art installations',
        ticketPrice: { indian: 'Free', foreigner: 'Free' }
      }
    ],
    food: [
      {
        name: 'Dwaeji Gukbap',
        description: 'Pork and rice soup - Busan specialty',
        type: 'non-veg'
      },
      {
        name: 'Raw Fish (Hoe)',
        description: 'Fresh sashimi from Jagalchi Fish Market',
        type: 'non-veg'
      },
      {
        name: 'Ssiat Hotteok',
        description: 'Sweet pancakes filled with seeds and sugar syrup',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Slightly more relaxed than Seoul',
      'Strong maritime culture',
      'Busan dialect is distinctive',
      'Beach culture during summer'
    ],
    greetings: 'Annyeonghaseyo - same as Seoul but with local dialect variations',
    clothing: 'Casual and beach-appropriate in summer. Conservative in temples',
    dos: [
      'Visit Jagalchi Fish Market early morning',
      'Experience Busan International Film Festival (October)',
      'Try fresh seafood',
      'Watch sunrise at Haedong Yonggungsa'
    ],
    donts: [
      "Don't swim outside designated areas",
      'Avoid peak summer crowds if possible',
      "Don't disrespect temple etiquette",
      'Be careful of seafood allergies'
    ]
  },
  {
    id: 'jeju',
    name: 'Jeju Island',
    description: 'Volcanic island paradise with unique culture and natural beauty',
    image: 'https://images.unsplash.com/photo-1583251046894-6e99aaa3902d',
    places: [
      {
        name: 'Hallasan Mountain',
        description: 'Highest mountain in South Korea, volcanic crater',
        image: 'https://images.unsplash.com/photo-1654583065857-be16e3a06ddb?w=400',
        ticketPrice: { indian: 'Free', foreigner: 'Free' },
        guideContact: '+82-10-3456-7890'
      },
      {
        name: 'Seongsan Ilchulbong',
        description: 'Sunrise Peak - volcanic tuff cone',
        ticketPrice: { indian: '₹200 (₩2,000)', foreigner: '₩2,000' }
      },
      {
        name: 'Manjanggul Cave',
        description: 'UNESCO lava tube cave system',
        ticketPrice: { indian: '₹400 (₩4,000)', foreigner: '₩4,000' }
      }
    ],
    food: [
      {
        name: 'Black Pork BBQ',
        description: 'Jeju specialty pork from local black pigs',
        type: 'non-veg'
      },
      {
        name: 'Abalone Porridge',
        description: 'Creamy rice porridge with fresh abalone',
        type: 'non-veg'
      },
      {
        name: 'Hallabong',
        description: 'Sweet citrus fruit unique to Jeju',
        type: 'veg'
      }
    ],
    culturalNorms: [
      'Unique Jeju dialect and culture',
      'Haenyeo (female divers) are cultural icons',
      'Matriarchal society traditions',
      'Three abundances: rocks, wind, women'
    ],
    greetings: 'Annyeonghaseyo with Jeju dialect variations',
    clothing: 'Casual resort wear. Hiking gear for mountain trails',
    dos: [
      'Rent a car to explore the island',
      'Try tangerine picking in season',
      'Visit the beautiful beaches',
      'Respect the haenyeo culture'
    ],
    donts: [
      "Don't collect volcanic rocks",
      'Avoid hiking Hallasan unprepared',
      "Don't litter on beaches",
      'Be careful of strong winds'
    ]
  }
];
