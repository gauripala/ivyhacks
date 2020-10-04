const regForm = document.querySelector('#register-form');
regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userName = regForm['name'].value;
  const userEmail = regForm['email'].value;
  const userPass = regForm['pass'].value;
  const userPass2 = regForm['re_pass'].value;
  
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
       firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
       .then(function(user) {
        window.alert("User successfully registered.");
        window.location.href = "loginpage.html";
        regForm.reset();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        }
        alert("Error: " + errorMessage);
      });
    }else{
      window.alert("Please enter all fields.");
    }
  });