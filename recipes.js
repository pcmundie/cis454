document.getElementById("newRecipe").addEventListener("submit", submitForm);

// initializes empty arrays to store info from database

var titleArray = [];

var ingredientArray = [];

var stepsArray = [];

// keeps track of where you are in the recipe backlog

var placeInArray = 0;

//Display and cycle through posts when next is clicked

next.addEventListener("click", function() {
  //returns to newest post if oldest post is reached

  if (titleArray.length <= placeInArray) {
    placeInArray = 0;
  }

  document.getElementById("next").innerHTML = "Next Recipe";

  document.getElementById("displayTitle").innerHTML = titleArray[placeInArray];

  document.getElementById("displayIngredients").innerHTML =
    ingredientArray[placeInArray];

  document.getElementById("displaySteps").innerHTML = stepsArray[placeInArray];

  placeInArray = placeInArray + 1;
});

//Click next manually so initial post is displayed

function submitForm(e) {
  e.preventDefault();

  // Get values

  var title = getInputVal("title");

  var ingredients = getInputVal("ingredients");

  var steps = getInputVal("steps");

  // gets input from form and sends to database

  saveMessage(title, ingredients, steps);

  document.getElementById("newRecipe").reset();
}

// Function to get get form values

function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase

function saveMessage(title, ingredients, steps) {
  //var newMessageRef = formMessage.push();

  var formMessage = firebase.database().ref("Recipes");

  formMessage.push({
    Title: title,

    Ingredients: ingredients,

    Steps: steps
  });
}

//Gets already uploaded posts from database

var query = firebase
  .database()
  .ref("Recipes")
  .orderByKey();

query
  .once("value")

  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;

      var childData = childSnapshot.val();

      //trying to post it all in one container, but not sure if this is correct yet. Testing needed

      titleArray.push(childData.Title);

      ingredientArray.push(childData.Ingredients);

      stepsArray.push(childData.Steps);
    });
  });
