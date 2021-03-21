// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA_-GXaiuJPnWOwrfIxuTtzrPJxh40Wi4c",
    authDomain: "ancestree454.firebaseapp.com",
    projectId: "ancestree454",
    storageBucket: "ancestree454.appspot.com",
    messagingSenderId: "996972698984",
    appId: "1:996972698984:web:caafb3ddc770e314b14add",
    measurementId: "G-YGH2EW22P2"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  
  // Refernece contact infor collections
let formmessage = firebase.database().ref('contactInfo');


//listen for submit
document.getElementById('.contactInfo').addEventListener('submit' , formSubmit);

sendToFirebase(fname, lname, email, pass, dobday, dobmonth, dobyear);

function sendToFirebase(fname, lname, email, pass, dobday, dobmonth, dobyear) {
  let newFormMessage = formMessage.push();
  newFormMessage.set({
      First: fname,
      Last: lname,
      Email: email,
      Password: pass,
      Day: dobday,
      Month: dobmonth,
      Year: dobyear,

  });

  function formSubmit(e) {
    e.preventDefault();
    //get values
    let fname = document.querySelector(".fname").value;
    let lname = document.querySelector(".lname").value;
    let email = document.querySelector(".email").value;
    let pass = document.querySelector(".pass").value;
    let dobday = document.querySelector(".dobday").value;
    let dobmonth = document.querySelector(".dobmonth").value;
    let dobyear = document.querySelector(".dobyear").value;

    document.getElementById('newaccount').reset();

    
  }
//Save infos to firebase
var query = firebase.database().ref("contactInfo").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                //trying to post it all in one container, but not sure if this is correct yet. Testing needed
                document.getElementById("postContainer").appendChild(childData.First + "\n" + childData.Last + "\n" + childData.Email + "\n"+ childData.Password + "\n"+ childData.Day + "\n"+ childData.Month + "\n"+ childData.Year + "\n");
                
            });
        });
}