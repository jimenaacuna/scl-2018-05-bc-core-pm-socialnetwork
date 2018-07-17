//Para colocar imagenes y nombres 
let currentUser = '';
let fullProfile = '';
window.onload = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                currentUser = firebase.auth().currentUser
                firebase.database().ref(`users/${currentUser.uid}`)
                    .once('value')
                    .then((user) => {
                        fullProfile = user.val()
                        $('.displayName').html(`Bienvenid@: <b> ${fullProfile.displayName} </b>`)
                        $('.imagen').html(`<img class="profile" width="30" src="${fullProfile.photoUrl}">`)
                        mostrarPublicaciones()
                    })
                    .catch((error) => {
                        console.log("Database error > " + JSON.stringify(error));
                    });
            }
        });
    }
    //Publicaciones
publicar = () => {
    let comments = document.getElementById('comment').value;
    if (comments == '') {
        alert('Ingrese un texto')
    } else {
        let time = new Date().toLocaleString()
        const photoFile = file.files[0];
        if (photoFile != undefined) {

            const photoFileName = photoFile.name
            const task = firebase.storage().ref('images')
                .child(photoFileName)
                .put(photoFile);
            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    urlPhoto = url
                    console.log('URL del archivo > ' + url);
                    const newPost2Key = firebase.database().ref().child(`posts`).push().key;
                    firebase.database().ref(`posts/${newPost2Key}`).update({ contenido: comments, likes: '0', user: currentUser.displayName, userUid: currentUser.uid, time: time, imageUrl: url });
                });
            document.getElementById('comment').value = '';
        } else {
            const newPost2Key = firebase.database().ref().child(`posts`).push().key;
            firebase.database().ref(`posts/${newPost2Key}`).update({ contenido: comments, likes: '0', user: currentUser.displayName, userUid: currentUser.uid, time: time });
            document.getElementById('comment').value = '';
        }
    }
}
editPost = (keyPost) => {
    inputContentPost.disabled = false;
    inputContentPost.style.backgroundColor = '#e0e0e6';
    inputContentPost.addEventListener("change", function() {
        firebase.database().ref(`posts/${keyPost}`).update({ contenido: inputContentPost.value });
    });
}
deletePost = (keyPost) => {
    firebase.database().ref(`posts/${keyPost}`).remove()
    mostrarPublicaciones()
}
let likes = 0;
like = (keyPost) => {
    console.log('me gust')
    likes++;
    firebase.database().ref(`posts/${keyPost}`).update({ likes: likes });
    mostrarPublicaciones()
}
mostrarPublicaciones = () => {
    console.log(fullProfile)
    contentPublicaciones.innerHTML = ''
    let profileUserPost = ''
    firebase.database().ref(`posts`).limitToLast(5).orderByChild("time").on('child_added', (post) => {
        let userKeyPost = post.val().userUid
        firebase.database().ref(`users/${userKeyPost}`)
            .once('value')
            .then((user) => {

                profileUserPost = user.val()

                console.log('este es despues' + profileUserPost)
                contentPublicaciones.innerHTML += `
  <div class="contentPost">
     <div class="row">
         <div class="col-auto foto">
           <a href="" class="commentName mr-0"><img class="profile-comment" width="30" src="${profileUserPost.photoUrl}"></a>
         </div>
         <div class="col-9">
           <h4 style="display: inline">${profileUserPost.displayName}</h4>
           <h6 style="display: inline">${profileUserPost.rol}</h6>
         </div>
    </div>
    <div class="row">
    <div class="col">
      <div class="post">
      <img class="img-post" src="${post.val().imageUrl}">
          <div class="col" id="cont">
              <input id="inputContentPost" value="${post.val().contenido}" disabled>
          </div>
          <div class="caja-botones d-flex justify-content-between align-items-center">
          <span>${post.val().time}</span>
          <i class="fas fa-thumbs-up" onclick="like('${post.key}')"></i><span>${post.val().likes}</span>
          <i class="far fa-edit" id="editPost" onclick="editPost('${post.key}')"></i>
          <i class="far fa-trash-alt" onclick="deletePost('${post.key}')"></i>
          </div>
      </div>
      </div>
</div>
</div>
  `;
            })
            .catch((error) => {
                console.log("Database error > " + JSON.stringify(error));
            });
    })

}

//Enviar foto
function sendPhoto() {
    const photoValue = photoArea.value;

    const newPhotoKey = firebase.database().ref().child(`photoComment`).push().key;
    firebase.database().ref(`posts/${newPhotoKey}`).update({ contenido: photoValue })

    const newGifKey = firebase.database().ref().child('gifs').push().key;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref(`gifs/${newGifKey}`).set({
        gifURL: gifValue,
        creatorName: fullProfile.displayName,
    });
}