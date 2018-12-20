$(document).ready(function(){


// Initialize Firebase

var config = {
  apiKey: "AIzaSyDrj1GkmJvf6J4svg760IISwlxM4W31ePE",
  authDomain: "train-387e9.firebaseapp.com",
  databaseURL: "https://train-387e9.firebaseio.com",
  projectId: "train-387e9",
  storageBucket: "train-387e9.appspot.com",
  messagingSenderId: "678757557895"
};
firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";

$("#add-train").on('click', function(event) {
  event.preventDefault();
  console.log("button clicked");

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  console.log(firstTrain);
  frequency = $("#frequency-input").val().trim();

  console.log(name);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  name = $("#name-input").val("");
  destination = $("#destination-input").val("");
  firstTrain = $("firstTrain-input").val("");
  frequency = $("#frequency-input").val("");
});

// Create Firebase event for adding moment.js info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
  // Store everything into a variable.
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var frequency = snapshot.val().frequency;
  
  //Using moment.js to log times
  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");
  
  // Console.log new values
  console.log(remainder);
  console.log("minutes remaining: " + minutes);
  console.log("next arrival " + arrival);

  //Ethan (maybe dumb) idea
  var userTrains = $("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

  // Append new train info to HTML
  $("#tableBody").append(userTrains);
});
})