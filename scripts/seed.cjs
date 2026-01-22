const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// --- Improved File Check ---
const keyPath = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(keyPath)) {
  console.error("🔴 ERROR: 'serviceAccountKey.json' not found in the 'scripts' folder.");
  console.error("Please follow these steps:");
  console.error("1. Go to your Firebase project settings -> Service accounts.");
  console.error("2. Click 'Generate new private key' and download the file.");
  console.error("3. Rename the downloaded file to 'serviceAccountKey.json'.");
  console.error("4. Place it inside the 'scripts' folder next to this script.");
  process.exit(1);
}
// --- End of Improved File Check ---

const serviceAccount = require(keyPath);
// Updated to import all data sets from data.cjs
const { 
  indianStatesData, 
  koreanProvincesData, 
  communityRoomsData, 
  upcomingSessionsData 
} = require('./data.cjs');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    console.log('Firebase app already initialized. Skipping initialization.');
  } else {
    throw error;
  }
}


const db = getFirestore();

const seedCollection = async (collectionName, data) => {
  if (!data || data.length === 0) {
    console.warn(`⚠️ Skipping seeding for ${collectionName} as no data was provided.`);
    return;
  }
  const collectionRef = db.collection(collectionName);
  const batch = db.batch();

  data.forEach(item => {
    // Ensure item has an ID, otherwise Firestore auto-generates one which we don't want here.
    if (!item.id) {
      console.error(`🔴 Error: Item in ${collectionName} is missing an 'id' field.`, item);
      throw new Error(`Item in ${collectionName} is missing an 'id' field.`);
    }
    const docRef = collectionRef.doc(item.id);
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log(`✅ Successfully seeded ${collectionName} with ${data.length} documents.`);
};

const seedDatabase = async () => {
  try {
    await seedCollection('indianStates', indianStatesData);
    await seedCollection('koreanProvinces', koreanProvincesData);
    // Added seeding for community rooms and upcoming sessions
    await seedCollection('communityRooms', communityRoomsData);
    await seedCollection('upcomingSessions', upcomingSessionsData);
    
    console.log('\n🚀 Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
