


//listen for submit
document.getElementById('contactInfo').addEventListener('submit' , submitForm);

function submitForm(e) {

  //get values

  var fname= getInputVal('fname');
  var lname= getInputVal('lname');
  var email= getInputVal('email');
  var dobday= getInputVal('dobday');
  var dobmonth= getInputVal('dobmonth');
  var dobyear= getInputVal('dobyear');
  var pass= getInputVal('pass');
  saveMessage(fname, lname, email, dobday, dobmonth, dobyear, pass);
  document.getElementById('contactInfo').reset();


}
//get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

//save info in database
function saveMessage(fname, lname, email, dobday, dobmonth, dobyear, pass){
  var formMessage = firebase.databse().ref('Register');
  formMessage.push({
    Firstname: fname,
    Lastname: lname,
    Email: email,
    Day: dobday,
    Month: dobmonth,
    Year: dobyear,
    Password: pass,
  })
}

