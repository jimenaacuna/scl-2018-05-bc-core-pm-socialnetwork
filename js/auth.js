var config = {
  apiKey: "AIzaSyDPFSqdmCoZbkJKY98XH2wz5D6VBJK-gBc",
  authDomain: "autenticacion-red-social-7c11b.firebaseapp.com",
  databaseURL: "https://autenticacion-red-social-7c11b.firebaseio.com",
  projectId: "autenticacion-red-social-7c11b",
  storageBucket: "autenticacion-red-social-7c11b.appspot.com",
  messagingSenderId: "953460336958"
};
firebase.initializeApp(config);
//verificar si el usuario esta conectado
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loggedIn.style.display = "block"
      username.innerText = user.email
      console.log(user)
      /* const newUser = firebase.database().ref().child("users").push().key; //key permite que se generen llaves nuevas para guardar los gifs 
      firebase.database().ref(`users/${newUser}`).set({
        userURL: user.photoURL,
        userName: user.displayName || //Si esto está null o undefined, sigue con la opción que le sigue "||"
          user.providerData[0].email,
      }); */
    } else {
     loggedIn.style.display = "none"
    }
  //  console.log("user is" + JSON.stringify(user))
  });
}
// Registro
function registerWithFirebase() {

  const emailValue = txtEmail.value
  const passwordValue = txtPassword.value

  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('usuario creado con exito')
    })
    .catch((error) => {
      console.log('error de firebase > codigo ' + error.message)
      document.getElementById('message').innerHTML = error.message
    })
}
// Login
function loginWithFirebase() {

  const emailValue = txtEmail.value
  const passwordValue = txtPassword.value

firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
  .then((e) => {
    console.log('usuario inicio sesion con exito')
    document.getElementById('message').innerHTML = e.message
  })
  .catch((error) => {
    console.log('error de firebase > codigo ' + error.message)
    document.getElementById('message').innerHTML = error.message
  })
}
// logout
function logoutWithFireBase() {
  firebase.auth().signOut()
    .then(() => {

      console.log('usuario finalizo su sesion')
    })
    .catch();
}
// login with facebook
function facebookLoginwithFireBase() {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  })
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log('login con facebook exitoso')
    })
    .catch((error) => {
      console.log('error de firebase > codigo ' + error.code)
      console.log('error de firebase > codigo ' + error.message)
      document.getElementById('message').innerHTML = error.message
    })
}
// login with google
function googleLoginwithFireBase() {

  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    let token = result.credential.accessToken;
    let user = result.user;
  }).catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;
    let credential = error.credential;
  });
}

/*
 var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://autenticacion-red-social-7c11b.firebaseio.com"
}); 

 function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}
// Start listing users from the beginning, 1000 at a time.
//listAllUsers(); */