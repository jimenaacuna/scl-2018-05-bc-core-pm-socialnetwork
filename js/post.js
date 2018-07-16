//Para colocar imagenes y nombres 
let currentUser = '';
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = firebase.auth().currentUser.uid
            $('.displayName').html(`Bienvenid@: <b> ${user.displayName} </b>`)
            $('.imagen').html(`<img class="profile" width="30" src="${user.photoURL}">`)
            $('.commentName').html(`<img class="profile-comment" width="30" src="${user.photoURL}">`)
            console.log(currentUser.photoURL);
        }
    });
}

//Publicaciones
const button = document.getElementById('btn-publicar');

button.addEventListener('click', () => {
    let comments = document.getElementById('comment').value;
    document.getElementById('comment').value = '';
    const newComments = document.createElement('div'); //agregar nuevos comentarios creando div al html
    const contenedorElemento = document.createElement('span');
    let textNewComment = document.createTextNode(comments);
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(contenedorElemento);
    cont.appendChild(newComments);
});

function sendPhotoToStorage() {
    const photoFile = photoFileSelector.files[0];
    const fileName = photoFile.name;
    const metadata = {
        contentType: photoFile.type
    };

    const task = firebase.storage().ref('images')
        .child(fileName)
        .put(photoFile, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log('URL del archivo > ' + url);
        });
}