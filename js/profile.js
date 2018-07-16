showProfile = () => {
    let currentUser = firebase.auth().currentUser.uid
    firebase.database().ref(`users/${currentUser}`) //ref es la ruta para llegar a los datos
        .once('value')
        .then((user) => {
            userName.innerText = user.val().displayName
            userEmail.innerText = user.val().email
            rol.value = user.val().rol
            country.value = user.val().pais
            photo.innerHTML += ` 
            <img class="profile-photo" width="150" src="${user.val().photoUrl}">`
            console.log(user.val().displayName);
        })
        .catch((error) => {
            console.log("Database error > " + JSON.stringify(error));
        });
}
rol.addEventListener("change", function() {
    console.log('cambio')
    let currentUser = firebase.auth().currentUser.uid
    firebase.database().ref(`users/${currentUser}`).update({ rol: rol.value });
});
country.addEventListener("change", function() {
    console.log('cambio')
    let currentUser = firebase.auth().currentUser.uid
    firebase.database().ref(`users/${currentUser}`).update({ pais: country.value });
});