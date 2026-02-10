const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const twilio = require("twilio");
const axios = require("axios");
const { defineString } = require('firebase-functions/params');

// Define secrets as parameters
const twilioSid = defineString('TWILIO_SID');
const twilioToken = defineString('TWILIO_TOKEN');

admin.initializeApp();
const db = admin.firestore();

const GOOGLE_PLACES_API_KEY = "AIzaSyDLHiQrphl5_maE1ovvNWHLjA6gXBPb7mM";

/**
 * Helper to get comprehensive place details from Google Places API.
 */
async function getGooglePlaceDetails(query) {
  if (!query) return null;
  
  try {
    console.log(`Searching Google Places for details: ${query}`);
    // 1. Find the place to get the place_id
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;
    const searchResponse = await axios.get(searchUrl);
    
    const results = searchResponse.data.results;
    if (!results || results.length === 0) {
      console.log(`No results found for: ${query}`);
      return null;
    }

    const placeId = results[0].place_id;
    
    // 2. Get full details using place_id
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,rating,user_ratings_total,opening_hours,formatted_phone_number,website,photos,reviews&key=${GOOGLE_PLACES_API_KEY}`;
    const detailsResponse = await axios.get(detailsUrl);
    const details = detailsResponse.data.result;

    if (!details) return null;

    // 3. Construct the photo URL if photos exist
    let imageUrl = null;
    if (details.photos && details.photos.length > 0) {
      const photoReference = details.photos[0].photo_reference;
      imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
    }

    return {
      name: details.name,
      address: details.formatted_address,
      location: details.geometry ? details.geometry.location : null,
      rating: details.rating,
      userRatingsTotal: details.user_ratings_total,
      openingHours: details.opening_hours ? details.opening_hours.weekday_text : null,
      isOpenNow: details.opening_hours ? details.opening_hours.open_now : null,
      phoneNumber: details.formatted_phone_number,
      website: details.website,
      image: imageUrl,
      reviews: details.reviews ? details.reviews.slice(0, 3).map(r => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.relative_time_description
      })) : []
    };
  } catch (error) {
    console.error(`Error fetching details for ${query}:`, error.message);
    return null;
  }
}

/**
 * Helper to get just a photo URL (used for states and food where we don't need full details).
 */
async function getGooglePlaceImage(query) {
  if (!query) return null;
  try {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;
    const searchResponse = await axios.get(searchUrl);
    const results = searchResponse.data.results;
    if (results && results.length > 0 && results[0].photos && results[0].photos.length > 0) {
      const photoReference = results[0].photos[0].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Fetches a lightweight list of states/provinces for the main tourism page.
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

      const data = await Promise.all(snapshot.docs.map(async doc => {
        const docData = doc.data();
        let imageUrl = docData.image;

        if (!imageUrl || imageUrl.includes('unsplash.com')) {
          const googleImage = await getGooglePlaceImage(`${docData.name}, ${region}`);
          if (googleImage) imageUrl = googleImage;
        }

        return {
          id: doc.id,
          name: docData.name,
          description: docData.description,
          image: imageUrl,
          mood: docData.mood,
          weather: docData.weather,
          bestSeason: docData.bestSeason,
          category: docData.category
        };
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

      const docData = doc.data();
      
      // 1. Handle main state image
      let mainImage = docData.image;
      if (!mainImage || mainImage.includes('unsplash.com')) {
        const googleImage = await getGooglePlaceImage(`${docData.name}, ${region}`);
        if (googleImage) mainImage = googleImage;
      }

      // 2. Handle RICH details for "Places to Visit"
      if (docData.places && Array.isArray(docData.places)) {
        docData.places = await Promise.all(docData.places.map(async (place) => {
          const googleDetails = await getGooglePlaceDetails(`${place.name}, ${docData.name}, ${region}`);
          
          if (googleDetails) {
            return {
              ...place,
              image: googleDetails.image || place.image,
              address: googleDetails.address,
              location: googleDetails.location,
              rating: googleDetails.rating,
              userRatingsTotal: googleDetails.userRatingsTotal,
              openingHours: googleDetails.openingHours,
              isOpenNow: googleDetails.isOpenNow,
              phoneNumber: googleDetails.phoneNumber,
              website: googleDetails.website,
              reviews: googleDetails.reviews
            };
          }
          return place;
        }));
      }

      // 3. Handle images for "Food"
      if (docData.food && Array.isArray(docData.food)) {
        docData.food = await Promise.all(docData.food.map(async (item) => {
          let foodImage = item.image;
          if (!foodImage || foodImage.includes('unsplash.com')) {
            const googleFoodImage = await getGooglePlaceImage(`${item.name} food, ${docData.name}`);
            if (googleFoodImage) foodImage = googleFoodImage;
          }
          return { ...item, image: foodImage };
        }));
      }

      const data = { ...docData, id: doc.id, image: mainImage };
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
