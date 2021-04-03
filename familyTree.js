//Image pull from the database code adapted from: https://himanshufi.medium.com/get-images-from-your-firebase-database-to-your-gallery-in-a-website-9f02efb41d33
var rootref = firebase.database().ref('Images');

rootref.on("child_added", snap => {
  var image = snap.child("img").val();

  $("#gallery_div").append("<img src=" + image + ">");
});