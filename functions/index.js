const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

/**
 * Fetches a lightweight list of states/provinces for the main tourism page.
 * Returns only essential fields to keep the payload small and fast.
 */
exports.getStatesList = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const region = req.query.region;

    if (!region || (region !== 'india' && region !== 'korea')) {
      return res.status(400).send('Please provide a valid region (india or korea).');
    }

    const collectionName = region === 'india' ? 'indianStates' : 'koreanProvinces';

    try {
      // Key Optimization: .select() fetches only the specified fields
      // UPDATED: Include mood, weather, bestSeason, and category fields
      const snapshot = await db.collection(collectionName)
          .select('name', 'description', 'image', 'mood', 'weather', 'bestSeason', 'category')
          .get();

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        image: doc.data().image,
        mood: doc.data().mood, // Include mood
        weather: doc.data().weather, // Include weather
        bestSeason: doc.data().bestSeason, // Include bestSeason
        category: doc.data().category // Include category
      }));

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching states list: ", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

/**
 * Fetches the full details for a single state/province by its ID.
 */
exports.getStateDetails = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { region, id } = req.query;

    if (!region || (region !== 'india' && region !== 'korea')) {
      return res.status(400).send('Please provide a valid region (india or korea).');
    }
    if (!id) {
      return res.status(400).send('Please provide a state/province ID.');
    }

    const collectionName = region === 'india' ? 'indianStates' : 'koreanProvinces';

    try {
      const docRef = db.collection(collectionName).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).send('State/province not found.');
      }

      const data = { id: doc.id, ...doc.data() };
      return res.status(200).json(data);

    } catch (error) {
      console.error("Error fetching state details: ", error);
      return res.status(500).send("Internal Server Error");
    }
  });
});

// The old getTourismData function is no longer needed and can be removed.