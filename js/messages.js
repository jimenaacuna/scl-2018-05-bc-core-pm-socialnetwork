let currentUser = '';
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = firebase.auth().currentUser.uid
            showMessagesReceived()
            firebase.database().ref(`users/${currentUser.uid}`)
                .once('value')
                .then((user) => {
                    fullProfile = user.val()
                    $('.displayName').html(`${fullProfile.displayName}`)
                    $('.imagen').html(`<img class="profile" width="30" src="${fullProfile.photoUrl}">`)
                })
                .catch((error) => {
                    console.log("Database error > " + JSON.stringify(error));
                });
        }
    });
}
showMessagesReceived = () => {
    messagesSend.innerHTML = ''
    messagesReceived.innerHTML = ''
    firebase.database().ref(`users/${currentUser}/messages-received`)
        .limitToLast(10)
        .on('child_added', (user) => {
            firebase.database().ref(`users/${currentUser}/messages-received/${user.key}`)
                .limitToLast(10)
                .on('child_added', (message) => {
                    console.log(message.val())
                    messagesReceived.innerHTML += `
                         <div class="msn">
                    <h5>${message.val().remitente}</h5>
                    <p>${message.val().mensaje}</p>
                    </div>`
                })
        })
}
showMessagesSend = () => {
    messagesSend.innerHTML = ''
    messagesReceived.innerHTML = ''
    firebase.database().ref(`users/${currentUser}/messages-send`)
        .limitToLast(10)
        .on('child_added', (user) => {
            firebase.database().ref(`users/${currentUser}/messages-send/${user.key}`)
                .limitToLast(10)
                .on('child_added', (message) => {
                    console.log(message.val())
                    messagesSend.innerHTML += `
                    <div class="msn">
                    <h5>${message.val().destino}</h5>
                    <p>${message.val().mensaje}</p>
                    </div>`
                })
        })
}