var rootref = firebase.database().ref().child("Images");

rootref.on("child_added", snap => {
  var image = snap.child("img").val();
  
  $("#gallery_div").append("<img src=" + image + "></img>");
});