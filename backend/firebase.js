import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Read your service account
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve("./serviceAccountKey.json"), "utf8")
);

// Initialize Firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Use the databaseURL exactly from your Firebase project -> Realtime Database -> Data -> Web Setup
  databaseURL: "https://notetrack-2025-default-rtdb.firebaseio.com/"
});

const db = admin.database();
export default db;
