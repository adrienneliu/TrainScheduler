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
  var eFirst = $("#first-train-input").val().trim();
  var eFrequency = $("#frequency-input").val().trim();

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
  console.log('childSnapshot>>'+childSnapshot.val());


  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var first = childSnapshot.val().first;
  
  var frequency =  parseInt(childSnapshot.val().frequency);

console.log("frequency: " + frequency);

  console.log('first  ' + first);

  //check if correct 
  //minutes vs seconds
  //take the first train and frequency ... calculate when the next bus will arrive based on the current time
  var firstFormat = moment(first, "HH:mm").subtract(1, "years");
  console.log("firstFormat: " + firstFormat);

  var firstTrain = moment(firstFormat).format("HH:mm");
  console.log("first train: " + firstTrain);

  //take the current time and convert it like efirstformat 
  var currentTime = moment();
  console.log("current: " + moment(currentTime).format("HH:mm"));

  //for minutes remaining, we want to take the difference between the first train and the current time
var timeDiff = moment().diff(moment(firstFormat), "LTS");
console.log("time diff: " + timeDiff);
  //need the remainder 
  //subtract the remainder with the frequency value 

  //add the total to the current time to get the time for the next train


  var newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(destination),
    $("<td>").text(frequency)
  )

  $("#train-table > tbody").append(newRow);
});