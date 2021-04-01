
document.getElementById('newPost').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('caption');
    var email = getInputVal('post');
    var photo = getInputVal('postPhoto');
    saveMessage(name, email, photo);
    document.getElementById('newPost').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(title, text, photo) {
    //var newMessageRef = formMessage.push();
    var formMessage = firebase.database().ref('Updates');
    formMessage.push({
        Title: title,
        Text: text,
        Image: photo,
    });
}
/*
var query = firebase.database().ref("Updates").orderByKey();
query.once("value")
    .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            //trying to post it all in one container, but not sure if this is correct yet. Testing needed
            document.getElementById("postContainer").appendChild(childData.Title + "\n" + childData.text + "\n" + childData.Image + "\n");

        });
    }); */
