//onsubmit check if username password combo exists
document.getElementById('loginForm').addEventListener('submit', submitForm);
function submitForm(e) {
    var success = false;
    if (getInputVal('usrName') == "compSciSquad") {
        if (getInputVal('pssword') == "cis454") {
            alert("Login Succesful");
            window.location.href = "https://ancestree454.web.app/updates.html";
            $("#loginForm").append("action=/updates.html");
        }
    }
    else {
        alert("Login Failed");
        window.location.href = "https://ancestree454.web.app/loginPage.html"
        $("#loginForm").append("action=/login.html");
    }

}
function getInputVal(id) {
    return document.getElementById(id).value;
}