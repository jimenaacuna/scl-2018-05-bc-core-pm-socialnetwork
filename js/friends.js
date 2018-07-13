showUsers = () => {
    console.log('showusers')
    firebase.database().ref('users')
        .limitToLast(5) 
        .on('child_added', (newUser) => { 
            friendList.innerHTML += `
                <div class="profile">
                <img class="profile-photo" src="${newUser.val().photoUrl}">
                </img><span>${newUser.val().displayName}</span>
                </div>
            `;
        });
}
showUsers()
