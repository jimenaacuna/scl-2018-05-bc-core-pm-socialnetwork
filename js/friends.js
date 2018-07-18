let currentUser = '';
let fullProfile = '';

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = firebase.auth().currentUser
            showUsers()
            firebase.database().ref(`users/${currentUser.uid}`)
                .once('value')
                .then((user) => {
                    fullProfile = user.val()
                    $('.displayName').html(`${fullProfile.displayName} </b>`)
                    $('.imagen').html(`<img class="profile" width="30" src="${fullProfile.photoUrl}">`)
                    mostrarPublicaciones()
                })
                .catch((error) => {
                    console.log("Database error > " + JSON.stringify(error));
                });
        }
    });
}
showUsers = () => {
    console.log('showusers')
    usersContainer.innerHTML = ''
    firebase.database().ref('users')
        .limitToLast(10)
        .on('child_added', (newUser) => {
            usersContainer.innerHTML += `
                <div class="row" id='users'>
                <div class="col-12 col-md-10 profile">
                <img class="profile-photo-list" src="${newUser.val().photoUrl}">
                </img>
                <div class="row">
                <span>${newUser.val().displayName}</span>
                </div>
                <div class="row">
                <span>${newUser.val().rol}</span>
                </div>
                </div>
                <div class="row">
                <div class="col" id="btn-add">
                <a href="profile.html?user=${newUser.key}" id='btn-perfil'><i class="fas fa-user"></i> Ver perfil</a>
                <button class="btn-primary inline" onclick="addFriends('${newUser.key}', '${newUser.val().email}')"><i class="fas fa-user-plus"></i> Agregar</button>
                </div>
                </div>
            `;
        });
}
addFriends = (keyNewFriend, email) => {
    firebase.database().ref(`users/${currentUser.uid}/amigos/${keyNewFriend}`).update({ email: email, uid: keyNewFriend });
    firebase.database().ref(`users/${keyNewFriend}/amigos/${currentUser.uid}`).update({ email: currentUser.email, uid: currentUser.uid });
}
showFriends = () => {
    console.log('showfriends')
    usersContainer.innerHTML = ''
    firebase.database().ref(`users/${currentUser.uid}/amigos/`)
        .limitToLast(10)
        .on('child_added', (friend) => {
            firebase.database().ref(`users/${friend.key}`)
                .once('value')
                .then((user) => {
                    usersContainer.innerHTML += `
                <div class="row ">
                <div class="col-10 profile mx-auto">
                <img class="profile-photo-list" src="${user.val().photoUrl}">
                </img>
                <div class="row">
                <span>${user.val().displayName}</span>
                </div>
                <div class="row">
                <span>${user.val().rol}</span>
                </div>
                <div class="row">
                <a href="profile.html?user=${user.key}">Ver perfil</a>
                </div>
                <button class="btn-primary inline green-one" onclick="deleteFriend('${user.key}')">Eliminar</button>
                </div>
                </div>
            `;
                })
        });
}
deleteFriend = (userKey) => {
    console.log('delete' + userKey)
    firebase.database().ref(`users/${currentUser.uid}/amigos/${userKey}`).remove()
    firebase.database().ref(`users/${userKey}/amigos/${currentUser.uid}`).remove()

    showFriends()
}