function login(){
  var userEmail = document.getElementById(""); // email field id
  var userPass = document.getElementById(""); // password field id

  if(userEmail != "" && userPass != ""){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
  }
  
  window.alert("User successfully signed in");
  window.location = "";
}

function signUp(){
  var userEmail = document.getElementById(""); // email field id
  var userPass = document.getElementById(""); // password field id

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);
  });

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);
  });

  window.alert("User successfully signed in");
  window.location = "";
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
    window.location = ""; // account page
  } else {
    // No user is signed in.
    uid = null;
    window.location = ""; // login page
  }
})

function resetPassword(){
  var email = document.getElementById(""); // email field id

  if(email != ""){
      firebase.auth().sendPasswordResetEmail(email).then(function(){
          window.alert("Email has been sent. Please check and verify.");
          window.location = ""; // sign in page
      }).catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert("Error: " + errorMessage);
      });
  }
}

function GoogleLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().getRedirectResult(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        }
        // The signed-in user info.
      var user = result.user;
      window.location = "";
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
}