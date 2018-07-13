const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.auth.user().onCreate(user => {
  var userObject = {
    displayName: user.displayName || user.email || user.providerData[0].email,
    email: user.email || user.providerData[0].email,
    photoUrl: user.photoURL,
  };
  admin.database().ref('users/' + user.uid).set(userObject);
}); 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
