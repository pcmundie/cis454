var rootref = firebase.database().ref("Images");

rootref.on("child_added", snap => {
  var image = snap.child("img").val();
  console.log("image address: " + image);

  $("#gallery_div").append("<img src=" + image + ">");
});
