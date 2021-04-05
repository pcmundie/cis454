// code from https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
 
let events = document.getElementById("events");
let displayTitle = document.getElementById("displayTitle");
let displayText = document.getElementById("displayText");
let displayTime = document.getElementById("displayTime");
let title = [];
let text = [];
let time = [];
let date = [];
placeInArray = 0;
// set to today, changes on click
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
 
let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
 
nextA.addEventListener("click", function() {
  //returns to newest post if oldest post is reached
  if (title.length <= placeInArray) {
    placeInArray = 0;
  }
  document.getElementById("nextA").innerHTML = "Next Event";
  displayTitle.innerHTML = title[placeInArray];
  displayText.innerHTML = text[placeInArray];
  displayTime.innerHTML = time[placeInArray];
  displayDate.innerHTML = date[placeInArray];
  placeInArray = placeInArray + 1;
});
 
var query = firebase
  .database()
  .ref("Events")
  .orderByKey(); // can change this to put them in the right order
query.once("value").then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    //trying to post it all in one container, but not sure if this is correct yet. Testing needed
    title.push(childData.Title);
    text.push(childData.Text);
    time.push(childData.Time);
    date.push(childData.Date);
  });
});
 
function handleDayClick(date) {
  // this function is for future work
  // where you can filter to display by actual day instead of just displaying them all 
}
 
function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}
 
function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}
 
function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}
 
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
 
  return [year, month, day].join("-");
}
 
function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
 
  let tbl = document.getElementById("calendar-body"); // body of the calendar
 
  // clearing all previous cells
  tbl.innerHTML = "";
 
  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
 
  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");
 
    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let cellButton = document.createElement("BUTTON");
        cellButton.innerHTML = date;
        // use the following for pulling from the database
        let theDate = new Date(year, month, date);
        // cellButton.onClick = displayEvent;
        // cellButton.addEventListener("click", handleDayClick);
        cellButton.addEventListener(
          "click",
          function() {
            handleDayClick(formatDate(theDate));
          },
          cellButton.innerHTML
        );
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
        } // color today's date
        cell.appendChild(cellButton);
        row.appendChild(cell);
        date++;
      }
    }
 
    tbl.appendChild(row); // appending each row into calendar body.
  }
}