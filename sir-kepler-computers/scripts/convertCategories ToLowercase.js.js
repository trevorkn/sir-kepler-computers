import { db } from "./firebaseAdmin.js";

async function convertCategories() {
  try {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      console.log("No products found in Firestore.");
      return;
    }

    console.log(`Found ${snapshot.size} products. Updating categories...`);

    const batch = db.batch();
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category) {
        const lowerCategory = data.category.toLowerCase();

        // Only update if it's not already lowercase
        if (data.category !== lowerCategory) {
          const docRef = productsRef.doc(doc.id);
          batch.update(docRef, { category: lowerCategory });
          console.log(`✅ Updated [${doc.id}] from "${data.category}" → "${lowerCategory}"`);
        }
      }
    });

    // Commit all updates
    await batch.commit();
    console.log("🎉 All categories converted to lowercase successfully!");
  } catch (error) {
    console.error("❌ Error converting categories:", error);
  }
}

// Run the function
convertCategories();
