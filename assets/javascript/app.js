$(document).ready(function(){
	// Firebase
    // var config = {
    //     apiKey: "AIzaSyC-0NjoVFKv13nd92ABX0yXk-WQulKudt0",
    //     authDomain: "train-time-f157b.firebaseapp.com",
    //     databaseURL: "https://train-time-f157b.firebaseio.com",
    //     projectId: "train-time-f157b",
    //     storageBucket: "",
    //     messagingSenderId: "135959151681"
    //   };
    //   firebase.initializeApp(config);

    //   var database = firebase.database();
    //   var initialized = false;
// So I know we were taught how to add the firebase to our js above but for some reason it will not work for me, so I found the way i did it below online and used that because it worked. Can you tell me why it did not work the other way.

    var database = new Firebase("https://train-time-f157b.firebaseio.com/")

	// Adding Trains
	$("#addTrainBtn").on("click", function(){

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		//consoles
		console.log(trainName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);


		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}
		database.push(newTrain);

		// clearing text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		// Prevents page from refreshing
		return false;
	});

	database.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// Snapshots
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});