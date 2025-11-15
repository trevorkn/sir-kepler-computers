import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current file path (Since i am using ES modules)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname( __filename);

   //Possible locations of the service account key
   const possiblePaths = [
    path.join(__dirname, "serviceAccountKey.json"),
    path.join(__dirname, "../serviceAccountKey.json"),
    path.join(__dirname, "../../serviceAccountKey.json")
   ];

   let serviceAccountPath = null;
   for (const p of possiblePaths) {
    try {
        readFileSync(p, "utf-8");
        serviceAccountPath = p;
        break;
    } catch (err) {
        //file not found, try next
    }
   }

   if (!serviceAccountPath) {
    throw new Error (
        "❌ Could not find serviceAccountKey.json in any expected location!"
    );
   }

//Load your service account key
const serviceAccount = JSON.parse(
    readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

console.log(`✅ Firebase Admin initialized using key at: ${serviceAccountPath}`);