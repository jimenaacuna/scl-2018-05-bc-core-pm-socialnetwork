let currentUser = '';
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = firebase.auth().currentUser
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
                <div class="row">
                <div class="col-10 profile mx-auto">
                <img class="profile-photo-list" src="${newUser.val().photoUrl}">
                </img>
                <div class="row">
                <span>${newUser.val().displayName}</span>
                </div>
                <div class="row">
                <span>${newUser.val().rol}</span>
                </div>
                <div class="row">
                <a href="profile.html?user=${newUser.key}">Ver perfil</a>
                </div>
                <button class="btn-primary inline  green-one" onclick="addFriends('${newUser.key}', '${newUser.val().email}')">Agregar a mis amigos</button>
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
                <div class="row">
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