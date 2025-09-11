import admin from "firebase-admin";
import { readFileSync } from "fs";

//Load your service account key
const serviceAccount = JSON.parse(
    readFileSync(process.cwd() + "/serviceAccountKey.json", "utf8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();