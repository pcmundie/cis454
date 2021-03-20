var firebaseConfig = {
    apiKey: "AIzaSyA_-GXaiuJPnWOwrfIxuTtzrPJxh40Wi4c",
    authDomain: "ancestree454.firebaseapp.com",
    projectId: "ancestree454",
    storageBucket: "ancestree454.appspot.com",
    messagingSenderId: "996972698984",
    appId: "1:996972698984:web:caafb3ddc770e314b14add",
    measurementId: "G-YGH2EW22P2"
};
firebase.initializeApp(config);

let formMessage = firebase.database().ref('Updates');

document.getElementById('newPost').addEventListener('submit', formSubmit);

//send message values
sendToFirebase(postTitle, postText, addPostPic);

function sendToFirebase(postTitle, postText, addPostPic) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
        Title: postTitle,
        Text: postText,
        Image: addPostPic,

    });

    //Submit form
    function formSubmit(e) {
        e.preventDefault();
        // Get Values from the DOM
        let postTitle = document.querySelector('#postTitle').value;
        let postText = document.querySelector('#postText').value;
        let addPostPic = document.querySelector('#addPostPic').value;


        document.getElementById('newPost').reset();
    }
    var query = firebase.database().ref("Updates").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                //trying to post it all in one container, but not sure if this is correct yet. Testing needed
                document.getElementById("postContainer").appendChild(childData.Title + "\n" + childData.text + "\n" + childData.Image + "\n");
                
            });
        });

   
}