showUsers = () => {
    //Base de datos para consultar SÓLO UNA VEZ
    firebase.database().ref('users')
        .limitToLast(3) //Filtro de datos, donde limito sólo 2 gifs
        .once('value') //Para escuchar datos sólo una vez
        .then((user) => {
            console.log("users > " + JSON.stringify(user));
        })
        .catch((error) => {
            console.log("Database error > " + error);
        });

}
