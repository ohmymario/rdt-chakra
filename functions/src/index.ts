import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions
    .auth
    .user()
    .onCreate((user) => {
        const { uid } = user;
        const data = JSON.parse(JSON.stringify(user));
        return db.collection("users").doc(uid).set(data);
    });