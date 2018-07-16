let currentUser = '';
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = firebase.auth().currentUser.uid
            showMessages()
        }
    });
} 
showMessages = () =>
{
    messagesSend.innerHTML = ''
    firebase.database().ref(`users/${currentUser}/messages-send`)
        .limitToLast(10)
        .on('child_added', (user) => {
            firebase.database().ref(`users/${currentUser}/messages-send/${user.key}`)
                .limitToLast(10)
                .on('child_added', (message) => {
                    console.log(message.val())
                    messagesSend.innerHTML += `
                    <span>${message.val().destino}</span>
                    <p>${message.val().mensaje}</p>`
                })
        })
    messagesReceived.innerHTML = ''
    firebase.database().ref(`users/${currentUser}/messages-received`)
        .limitToLast(10)
        .on('child_added', (user) => {
            firebase.database().ref(`users/${currentUser}/messages-received/${user.key}`)
                .limitToLast(10)
                .on('child_added', (message) => {
                    console.log(message.val())
                    messagesReceived.innerHTML += `
                    <span>${message.val().remitente}</span>
                    <p>${message.val().mensaje}</p>`
                })
        })

}