// Initialize Firebase

<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase.js"></script>

  
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
  var role = "";
  var startFormat = "MM/DD/YYYY";
  var rate = 0;
  var convertedDate = moment("01/01/2001", startFormat);

  $('button').on('click', function(event){

    event.preventDefault();

    name = $('#name-input').val().trim();
    role = $('#role-input').val().trim();
    startFormat = $('#start-input').val().trim();
    rate = $('#rate-input').val().trim();
    

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frrequency,
        nextArrival: nextArrival,
    })
  })

  database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startFormat);
    console.log(childSnapshot.val().rate);


    $('.table tbody').append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().role + "</td><td>"  + childSnapshot.val().startFormat + "</td><td>"+"</td><td>" + childSnapshot.val().rate + "</td><td>"+"</td></tr>");
    
  })

