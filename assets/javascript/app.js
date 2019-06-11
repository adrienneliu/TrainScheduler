// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC_U-X3jYGjPjhkec7B-wqucCKbxEcYkZQ",
  authDomain: "timescheduler0608.firebaseapp.com",
  databaseURL: "https://timescheduler0608.firebaseio.com",
  projectId: "timescheduler0608",
  storageBucket: "timescheduler0608.appspot.com",
  messagingSenderId: "399690133915",
  appId: "1:399690133915:web:e475ab83b2902d27"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


//for adding new train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();


  //global variables 
  var eTrain = $("#train-name-input").val().trim();
  var eDestination = $("#destination-input").val().trim();
  //var eFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var eFirst = moment($("#first-train-input").val().trim()).format("X");
  var eFrequency = $("#frequency-input").val().trim();

  console.log('eFirst  '+$("#first-train-input").val().trim());

  var newTrain = {
    train: eTrain,
    destination: eDestination,
    first: eFirst,
    frequency: eFrequency
  };

  //to update the firebase database 
  database.ref().push(newTrain);

  $("train-name-input").val("");
  $("destination-input").val("");
  $("first-train-input").val("");
  $("frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var eTrain = childSnapshot.val().train;
  var eDestination = childSnapshot.val().destination;
  var eFirst = childSnapshot.val().first;
  var eFrequency = childSnapshot.val().frequency;

  console.log('etrain  '+eTrain);
  console.log('moment().subtract(1, "years")  '+moment().subtract(1, "years"));

  //take the first train and frequency ... calculate when the next bus will arrive based on the current time
  var eFirstFormat = moment(eFirst).format("HH:mm");
  console.log(eFirstFormat);
  //console.log(eTrain);

  var current = moment();


  var newRow = $("<tr>").append(
    $("<td>").text(eTrain),
    $("<td>").text(eDestination),
    $("<td>").text(eFrequency)
  )

  $("#train-table > tbody").append(newRow);
});