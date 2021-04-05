//onsubmit check if username password combo exists
document.getElementById('loginForm').addEventListener('submit', submitForm);
function submitForm(e) {
    var success = false;

    var query = firebase.database().ref("Login").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                usrname = childData.Username;
                password = childData.Password;
                if (usrname == getInputVal(usrName)) {
                    if (password == getInputVal(pssword)) {
                        console.log("Login Succesful");
                        success = true;
                        window.location.href = "https://ancestree454.web.app/updates";
                        return true;

                    }
                }


            });
        });
    if (success == false) {
        console.log("Login Failed");
        alert("Incorrect Username and Password Combination, Try Again");
    }
}