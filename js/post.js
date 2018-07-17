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
    // forma personal
    let comments = document.getElementById('comment').value;
    if (comments == '') {
        alert('Ingrese un texto')
    } else {
        let time = new Date().toLocaleString()
            /*  const newPostKey = firebase.database().ref().child(`posts/${currentUser.uid}`).push().key;
             firebase.database().ref(`posts/${currentUser.uid}/${newPostKey}`).update({ contenido: comments, likes: '0', user: currentUser.displayName, time: time }); */
            // forma todos
        const newPost2Key = firebase.database().ref().child(`posts`).push().key;
        firebase.database().ref(`posts/${newPost2Key}`).update({ contenido: comments, likes: '0', user: currentUser.displayName, userUid: currentUser.uid, time: time });
        // mostrarPublicaciones()
        document.getElementById('comment').value = '';
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



/*  document.getElementById('comment').value = '';
 const newComments = document.createElement('div'); //agregar nuevos comentarios creando div al html
 const contenedorElemento = document.createElement('span');
 let textNewComment = document.createTextNode(comments);
 contenedorElemento.appendChild(textNewComment);
 newComments.appendChild(contenedorElemento);
 cont.appendChild(newComments); */


// function sendPhotoToStorage() {
//     const photoFile = photoFileSelector.files[0];
//     const fileName = photoFile.name;
//     const metadata = {
//         contentType: photoFile.type
//     };

//     const task = firebase.storage().ref('images')
//         .child(fileName)
//         .put(photoFile, metadata);

//     task.then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => {
//             console.log('URL del archivo > ' + url);
//         });
// }>