document.getElementById("contactInfo").addEventListener("submit", submitForm);

//listen for submit

function submitForm(e) {
  console.log("test 2");

  var x = document.forms["contactInfo"]["fname"].value;

  var y = document.forms["contactInfo"]["lname"].value;

  var e = document.forms["contactInfo"]["email"].value;

  var p1 = document.forms["contactInfo"]["pass"].value;

  var p2 = document.forms["contactInfo"]["pass2"].value;

  if (x == "" || y == "") {
    alert("Name must be filled out, correctly");

    return false;
  }

  if (e == "") {
    alert("Email must be filled out");

    return false;
  }

  if (p1 != p2) {
    alert("Passwords do not match");

    return false;
  }

  //get values

  console.log("test 3");

  var fname = getInputVal("fname");

  var lname = getInputVal("lname");

  var email = getInputVal("email");

  console.log("test 4");

  var dobday = getInputVal("dobday");

  var dobmonth = getInputVal("dobmonth");

  var dobyear = getInputVal("dobyear");

  var pass = getInputVal("pass");

  saveMessage(fname, lname, email, dobday, dobmonth, dobyear, pass);

  console.log("test 5");

  document.getElementById("contactInfo").reset();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)

    .then(userCredential => {
      // Signed in

      var user = userCredential.user;

      // ...
    })

    .catch(error => {
      var errorCode = error.code;

      var errorMessage = error.message;

      // ..
    });
}

//get form values

function getInputVal(id) {
  return document.getElementById(id).value;
}

//save info in database

function saveMessage(fname, lname, email, dobday, dobmonth, dobyear, pass) {
  var formMessage = firebase.database().ref("Register");

  formMessage.push({
    Firstname: fname,

    Lastname: lname,

    Email: email,

    Day: dobday,

    Month: dobmonth,

    Year: dobyear,

    Password: pass
  });
}
