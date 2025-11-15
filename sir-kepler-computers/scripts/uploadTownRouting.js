import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./firebaseAdmin.js";

//required for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON file
const seedPath = path.join(__dirname, "townRoutingSeed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf8"));

async function uploadSeed() {
    console.log("🚀 Uploading TownRouting data to Firestore...");

    for (const [town, data] of Object.entries(seed)) {
        try {
            await db.collection("TownRouting").doc(town).set(data);
            console.log(`✔️ Uploaded: ${town}`);
        } catch (err) {
            console.error(`❌ Failed for ${town}:`, err);
        }
    }

    console.log("🎉 DONE! All towns uploaded.");
}

uploadSeed().catch(console.error);