var loginAuth = {};

// $("#btn").click(function(){
    // var userEmail = document.getElementById("your_email");
    // var userPass = document.getElementById("your_pass");
function login(){
    var auth = firebase.auth();
    var userEmail = document.getElementById("your_email");
    var userPass = document.getElementById("your_pass");
    // var userEmail = ("#your_email").val();
    // var userPass = ("#your_pass").val();

    if(userEmail != "" && userPass != ""){
      auth.signInWithEmailAndPassword(userEmail, userPass).then(function(){
        window.alert("User successfully signed in");
        window.location.replace("../index.html"); 
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode + errorMessage);

        window.alert("Error: " + errorMessage);
      });
    }else{
      window.alert("Please enter all fields.");
    }
  }

  function signUp(){
    var userName = document.getElementById("name");
    var userEmail = document.getElementById("email");
    var userPass = document.getElementById("pass");
    var userPass2 = document.getElementById("re_pass");
  
    if (userEmail.length < 4) {
      alert('Please enter an email address.');
      return;
    }

    if (userPass.length < 4) {
      alert('Please enter a password.');
      return;
    }

    if(userPass != userPass2){
      alert("Passwords not match.");
      return;
    }

    if(userEmail != "" && userName != ""){
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        }
        alert("Error: " + errorMessage);
      });
      window.alert("User successfully registered.");
      window.location.replace("../login/loginpage.html");
    }else{
      window.alert("Please enter all fields.");
    }
  }
  
  function logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("User successfully signed out.")
    }).catch(function(error) {
      // An error happened.
    });
  }
  
  // Author state change
  firebase.auth().onAuthStateChanged(function(user) {
    var uid = null;
    if (user) {
      // User is signed in.
      uid = user.uid;
      window.location.replace("../index.html"); 
    } else {
      // No user is signed in.
      uid = null;
      window.location.replace("../login/loginpage.html"); 
    }
  });
  
  function resetPassword(){
    var email = document.getElementById(""); // email field id
  
    if(email != ""){
        firebase.auth().sendPasswordResetEmail(email).then(function(){
            window.alert("Email has been sent. Please check and verify.");
            window.location.replace("../login/loginpage.html"); 
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        });
    }
  }
