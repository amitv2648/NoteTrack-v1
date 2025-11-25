import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// For older Node versions (without assert), you could do: import * as serviceAccount from ...
// but Node v25 supports JSON modules if your package.json has "type": "module"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notetrack-2025-default-rtdb.firebaseio.com/"
});

const db = admin.database();
export default db;
