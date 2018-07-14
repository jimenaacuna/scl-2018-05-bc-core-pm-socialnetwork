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
                </img><span>${newUser.val().displayName}</span>
                <span>${newUser.val().rol}</span>
                <button class="btn-primary inline  green-one" onclick="addFriends('${newUser.key}', '${newUser.val().email}')">Agregar a mis amigos</button>
                </div>
                </div>
            `;
        });
}
addFriends = (keyNewFriend, email) => {
    let currentUser = firebase.auth().currentUser.uid
    firebase.database().ref(`users/${currentUser}/amigos/${keyNewFriend}`).update({ email: email, uid: keyNewFriend });
}
showFriends = () => {
    console.log('showfriends')
    usersContainer.innerHTML = ''
    let currentUser = firebase.auth().currentUser.uid
    firebase.database().ref(`users/${currentUser}/amigos/`)
        .limitToLast(10)
        .on('child_added', (friend) => {
            firebase.database().ref(`users/${friend.key}`)
                .once('value')
                .then((user) => {
                    usersContainer.innerHTML += `
                <div class="row">
                <div class="col-10 profile mx-auto">
                <img class="profile-photo-list" src="${user.val().photoUrl}">
                </img><span>${user.val().displayName}</span>
                <span>Nutricionista</span>
                <button class="btn-primary inline green-one" onclick="deleteFriend('${user.key}')">Eliminar</button>
                </div>
                </div>
            `;
                })
        });
}
deleteFriend = (userKey)=>{
console.log('delete' + userKey)
let currentUser = firebase.auth().currentUser.uid
firebase.database().ref(`users/${currentUser}/amigos/${userKey}`).remove()
showFriends()
}