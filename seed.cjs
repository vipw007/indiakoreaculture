// This script seeds the local Firestore emulator with data from your project.
const admin = require('firebase-admin');
// Correctly import from a CommonJS-compatible file if it exists, otherwise fallback
let indianStatesData, koreanProvincesData;
try {
    const data = require('./src/app/data/data.cjs');
    indianStatesData = data.indianStatesData;
    koreanProvincesData = data.koreanProvincesData;
} catch (e) {
    console.error("Could not find data.cjs. Falling back to statesData.ts. This may result in incomplete data.");
    const data = require('./src/app/data/statesData.ts');
    indianStatesData = data.indianStatesData;
    koreanProvincesData = data.koreanProvincesData;
}

const communityRoomsData = [
  {
    id: '1',
    title: 'Office Life India ↔ Korea',
    category: 'office',
    description: 'Share experiences, ask questions about workplace culture, hierarchy, and daily office interactions.',
    members: 1247,
    activeNow: 23,
    icon: '💼',
  },
  {
    id: '2',
    title: 'Travel Help & Tips',
    category: 'travel',
    description: 'Get and give travel advice, share hidden gems, ask about transportation and accommodation.',
    members: 892,
    activeNow: 15,
    icon: '✈️',
  },
  {
    id: '3',
    title: 'Food & Dietary Questions',
    category: 'culture',
    description: 'Discuss food preferences, dietary restrictions, restaurant recommendations, and cooking tips.',
    members: 1456,
    activeNow: 31,
    icon: '🍜',
  },
  {
    id: '4',
    title: 'Language Exchange',
    category: 'culture',
    description: 'Practice Hindi, Tamil, Korean, or English. Help each other learn basic phrases and professional terms.',
    members: 2103,
    activeNow: 47,
    icon: '🗣️',
  },
  {
    id: '5',
    title: 'Business Etiquette Q&A',
    category: 'office',
    description: 'Questions about meetings, emails, negotiations, and professional relationships in India and Korea.',
    members: 654,
    activeNow: 12,
    icon: '🤝',
  },
  {
    id: '6',
    title: 'Festival & Celebrations',
    category: 'culture',
    description: 'Learn about Diwali, Holi, Chuseok, Seollal and other festivals. Share celebration experiences.',
    members: 987,
    activeNow: 19,
    icon: '🎉',
  },
];

const upcomingSessionsData = [
  {
    id: '1',
    title: 'Korean Office Culture 101',
    date: '2026-01-15',
    time: '18:00 IST',
    type: 'audio',
    host: 'Mr. Kim (Seoul)',
    participants: 24,
    maxParticipants: 50,
  },
  {
    id: '2',
    title: 'Navigating Indian Festivals in Office',
    date: '2026-01-16',
    time: '14:00 KST',
    type: 'text',
    host: 'Priya (Mumbai)',
    participants: 31,
    maxParticipants: 100,
  },
  {
    id: '3',
    title: 'Tech Industry: India vs Korea',
    date: '2026-01-17',
    time: '20:00 IST',
    type: 'audio',
    host: 'Rahul & Ji-hoon',
    participants: 15,
    maxParticipants: 30,
  },
];


// --- Configuration ---
// This tells the script to connect to your local emulator, not the live database.
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
const projectId = 'indokorean'; // Use your actual Firebase project ID
// --- End Configuration ---

// Initialize the Firebase Admin SDK
admin.initializeApp({ projectId });
const db = admin.firestore();

// Function to upload data to a specific collection
async function seedCollection(collectionName, data) {
    if (!data || data.length === 0) {
        console.log(`Skipping seeding for ${collectionName} due to empty or invalid data.`);
        return;
    }
    console.log(`Seeding collection: ${collectionName}...`);
    const collectionRef = db.collection(collectionName);

    for (const item of data) {
        const docId = item.id;
        const docData = { ...item };
        delete docData.id; // Remove the id from the document data itself

        await collectionRef.doc(docId).set(docData);
        console.log(`  -> Uploaded ${docId}`);
    }
    console.log(`Seeding for ${collectionName} complete!`);
}

// Main function to run the seeding process
async function main() {
    try {
        await seedCollection('indianStates', indianStatesData);
        await seedCollection('koreanProvinces', koreanProvincesData);
        await seedCollection('communityRooms', communityRoomsData);
        await seedCollection('upcomingSessions', upcomingSessionsData);
        console.log('\n✅ All data successfully seeded to the local Firestore emulator.');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    }
}

main();
