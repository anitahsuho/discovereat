var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function loginpost(){
  if(!firebase.auth().currentUser){ //not logged in
    document.getElementById('id01').style.display='block'
  } else {
    console.log("already logged in");
    window.location.href = "post.html";
  }
  
}
function loginfind(){
  if(!firebase.auth().currentUser){ //not logged in
    document.getElementById('id01').style.display='block'
  } else {
    console.log("already logged in");
    window.location.href = "find.html";
  }
  
}
function newUser(){
  window.location.href = "newUser.html"
}
// document.getElementById("buttonContainer").innerHTML="this is working";


