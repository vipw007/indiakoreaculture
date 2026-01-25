const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const twilio = require("twilio");
const { defineString } = require('firebase-functions/params');

// Define secrets as parameters
const twilioSid = defineString('TWILIO_SID');
const twilioToken = defineString('TWILIO_TOKEN');

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
      const snapshot = await db.collection(collectionName)
          .select('name', 'description', 'image', 'mood', 'weather', 'bestSeason', 'category')
          .get();

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        image: doc.data().image,
        mood: doc.data().mood,
        weather: doc.data().weather,
        bestSeason: doc.data().bestSeason,
        category: doc.data().category
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

exports.getTurnCredentials = functions.https.onRequest(
    (req, res) => {
      cors(req, res, async () => {
        try {
          const sid = twilioSid.value();
          const token = twilioToken.value();
    
          const client = twilio(sid, token);
    
          const turnToken = await client.tokens.create();
    
          res.json({
            iceServers: turnToken.iceServers,
          });
        } catch (error) {
          console.error("TURN credential error:", error);
          res.status(500).send("Failed to generate TURN credentials");
        }
      });
    }
  );
