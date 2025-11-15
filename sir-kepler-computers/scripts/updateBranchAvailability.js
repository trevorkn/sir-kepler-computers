import { db } from "./firebaseAdmin.js";

async function updateBranchAvailability() {
    const snapshot = await db.collection("products").get();

    for (const doc of snapshot.docs) {
        const data = doc.data();

        //skip if branches already exists
        if (!data.branches) {
            const branches = {
                Nairobi: { quantity: 0 },
                Mombasa: { quantity: 0 },
                Kilifi: {quantity: 0 },
                Kakamega: { quantity: 0 },
            };

            // Add a totalstock field at 0, i will edit it later manually
            const totalStock = Object.values(branches).reduce(
                (sum, b) => sum + (b.quantity || 0),
                0
            );

            await doc.ref.update({
                branches,
                totalStock,
            });
            console.log(`✅ Added branches + totalStock to ${data.name}`);
        } else {
            console.log(`ℹ️ skipped ${data.name} (already has branches)`);
        }
    }
    console.log("✅ All proudcts updated successfully");
}

updateBranchAvailability().catch(console.error);