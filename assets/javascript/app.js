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
  var eFirst = $("#first-train-input").val().trim();
  console.log('eFirst'+ eFirst);
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
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<childSnapshot>>'+childSnapshot.val());


  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var first = childSnapshot.val().first;
  console.log('first  ' + first);
  var frequency =  parseInt(childSnapshot.val().frequency);
  console.log("frequency: " + frequency);



  //check if correct 
  //minutes vs seconds
  //take the first train and frequency ... calculate when the next bus will arrive based on the current time
  var firstTrain = moment(first, "HH:mm").subtract(1, "years");
  console.log(firstTrain);

  //take the current time and convert it like efirstformat 
  var currentTime = moment();
  console.log("current: " + moment(currentTime).format("HH:mm"));

  //for minutes remaining, we want to take the difference between the first train and the current time
	var difference = moment().diff(moment(firstTrain), "minutes");

  console.log("time diff: " + difference);
    //need the remainder 
    //subtract the remainder with the frequency value 
  var remainder = difference%frequency;

  var minutesRemain = frequency - remainder;
  console.log("how long: " + minutesRemain)
    //add the total to the current time to get the time for the next train

  var nextTrain = moment().add(minutesRemain, "minutes").format("HH:mm");
  
  console.log ("arrive: " + moment(nextTrain).format("HH:mm"));

  var newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesRemain)
  )

  $("#train-table > tbody").append(newRow);
});