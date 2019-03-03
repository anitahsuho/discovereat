/*var admin = require('firebase-admin');

var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gonext-2b4b7.firebaseio.com'
});*/

//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");
// Initialize Firebase
var config = {
	apiKey: "AIzaSyBu-5BvJIi5xvgJdU0eLWbeKoOWrS84Qe0",
	authDomain: "gonext-2b4b7.firebaseapp.com",
	databaseURL: "https://gonext-2b4b7.firebaseio.com",
	projectId: "gonext-2b4b7",
	storageBucket: "gonext-2b4b7.appspot.com",
	messagingSenderId: "789734466195"
};
firebase.initializeApp(config);


/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
	// [START signout]
	firebase.auth().signOut();
	// [END signout]
  } else {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	if (email.length < 4) {
	  alert('Please enter an email address.');
	  return;
	}
	if (password.length < 4) {
	  alert('Please enter a password.');
	  return;
	}
	// Sign in with email and pass.
	// [START authwithemail]
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // [START_EXCLUDE]
	  if (errorCode === 'auth/wrong-password') {
		alert('Wrong password.');
	  } else {
		alert(errorMessage);
	  }
	  console.log(error);
	  document.getElementById('quickstart-sign-in').disabled = false;
	  // [END_EXCLUDE]
	});
	// [END authwithemail]
  }
  var a = document.getElementById('quickstart-sign-in');
  if(a){
	a.disabled = true;
  } else {
	var modal = document.getElementById('id01');
	modal.style.display = "none";
  }
  
  return false;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
	alert('Please enter an email address.');
	return;
  }
  if (password.length < 4) {
	alert('Please enter a password.');
	return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).then(
  (user)=>{
	if(user){
	  console.log("account");
	  firebase.firestore().collection("accounts").add({
		email: email,
		password: password,
		age: String(age.value),
		school: String(school.value),
		phone: String(phone.value),
		race: getChecked(),
		karma: 0
	})
	  // user.updateProfile({
	  //   age: String(loc.value),
	  //   school: String(school.value),
	  //   phone: String(phone.value),
	  //   race: String(race.value)
	  // })
	}
}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	console.log("here bucko error");
	// [START_EXCLUDE]
	if (errorCode == 'auth/weak-password') {
	  alert('The password is too weak.');
	} else {
	  alert(errorMessage);
	}
	console.log(error);
	// [END_EXCLUDE]
  });
  console.log("here bucko");
  return "success" ;
  // [END createwithemail]
}

function writeUserData(titlef, timef,times, locationf, detailsf) {
  console.log("TEST");
  //var db = firebase.firestore();
  //Object.assign({}, obj);
  firebase.firestore().collection("posts").add({
	title:String(titlef.value),
	timeS: String(timef.value),
	timeF: String(times.value),
	location: String(locationf.value),
	details: String(detailsf.value)
  })
  .then(function(docRef) {
	  console.log("Document written with ID: ", docRef.id);
	  
	
  })
  .catch(function(error) {
	  console.error("Error adding document: ", error);
  });
  
  var docRef1 = firebase.firestore().collection("accounts").doc("edward");
  var karmaf = 3+3;
  docRef1.get().then(function(doc) {
	  if (doc.exists) {
		  console.log("Document data:", doc.data().karma);
		  karmaf = parseInt(doc.data().karma)+ 3;
	  } else {
		  // doc.data() will be undefined in this case
		  console.log("No such document!");
	  }
	  firebase.firestore().collection("accounts").doc("edward").set({karma: karmaf});
  }).catch(function(error) {
	  console.log("Error getting document:", error);
  });
  

}

function read(){
  var data;
  firebase.firestore().collection("posts").get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		// doc.data() is never undefined for query doc snapshots
		var rowdiv = document.createElement("div");
		rowdiv.className += "row itemHead"
		
		data=doc.data();
		var para1 = document.createElement("div");
		var node1 = document.createTextNode(""+data.title);
		para1.appendChild(node1);
		para1.className += "title col-sm-7"
		
		var para2 = document.createElement("h2");
		var node2 = document.createTextNode(data.timeS +"-"+data.timeF+", "+data.location);
		para2.appendChild(node2);
		para2.className += "location col-sm-5"
		
		var para = document.createElement("p");
		var node = document.createTextNode(""+data.details);
		para.appendChild(node);
		
		var element = document.getElementById("foodlist");
		rowdiv.appendChild(para1);
		rowdiv.appendChild(para2);
		element.appendChild(rowdiv)
		element.appendChild(para);
		
		console.log(doc.id, " => ", data);
	});
});
}