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
$("#add-train-btn").on("click", function(event){
event.preventDefault();


//global variables 
var eTrain = $("#train-name-input").val().trim();
var eDestination = $("#destination-input").val().trim();
var eFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
var eFrequency = $("#frequency-input").val().trim();

var newTrain = {
  train: eTrain,
  destination: eDestination,
  first: eFirst,
  frequency: eFrequency
};

//to update the firebase database 
database.ref().push(newTrain);



})