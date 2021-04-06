//Get data after submit button is clicked

document.getElementById("newPost").addEventListener("submit", submitForm);

//initalize empty arrays to store info from reading database

var captionArray = [];

var textArray = [];

//add image functionality if time

var imgArray = [];

var placeInArray = 0;

//Display and cycle through posts when next is clicked

next.addEventListener("click", function() {
  //returns to newest post if oldest post is reached

  if (captionArray.length <= placeInArray) {
    placeInArray = 0;
  }

  document.getElementById("next").innerHTML = "Next Post";

  document.getElementById("like").innerHTML = "Like";

  document.getElementById("displayCaption").innerHTML =
    captionArray[placeInArray];

  document.getElementById("displayText").innerHTML = textArray[placeInArray];

  placeInArray = placeInArray + 1;
});

//Click next manually so initial post is displayed

//When submit is clicked

function submitForm(e) {
  e.preventDefault();

  // Get values

  var name = getInputVal("caption");

  var email = getInputVal("post");

  var photo = getInputVal("postPhoto");

  //gets inputs and sends to database

  saveMessage(name, email, photo);

  //clears form

  document.getElementById("newPost").reset();
}

// Function to get get form values

function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase

function saveMessage(title, text, photo) {
  var formMessage = firebase.database().ref("Updates");

  formMessage.push({
    Title: title,

    Text: text,

    Image: photo
  });
}

//Gets already uploaded posts from database

var query = firebase
  .database()
  .ref("Updates")
  .orderByKey();

query
  .once("value")

  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;

      var childData = childSnapshot.val();

      captionArray.push(childData.Title);

      textArray.push(childData.Text);

      imgArray.push(childData.Image);
    });
  });
