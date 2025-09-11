// scripts/setupUserData.js
// Adds favorites, cart, recentlyViewed fields to each user document (if missing)

import { db } from "./firebaseAdmin.js";

async function initUserFields() {
  try {
    const usersSnapshot = await db.collection("users").get();

    if (usersSnapshot.empty) {
      console.log("No users found in 'users' collection.");
      return;
    }

    let updatedCount = 0;

    for (const userDoc of usersSnapshot.docs) {
      const data = userDoc.data();

      // Prepare only missing fields
      const updates = {};
      if (!Object.prototype.hasOwnProperty.call(data, "favorites")) updates.favorites = []; 
      if (!Object.prototype.hasOwnProperty.call(data, "cart")) updates.cart = [];
      if (!Object.prototype.hasOwnProperty.call(data, "recentlyViewed")) updates.recentlyViewed = [];

      // If nothing to add, skip
      if (Object.keys(updates).length === 0) continue;

      // Merge to avoid overwriting any existing fields
      await userDoc.ref.set(updates, { merge: true });
      updatedCount++;
    }

    console.log(`✅ Done. Updated ${updatedCount} user(s).`);
  } catch (err) {
    console.error("❌ Failed to update users:", err);
    process.exit(1);
  }
}

initUserFields();
