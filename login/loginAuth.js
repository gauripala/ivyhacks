
const signinform = document.querySelector('#login-form');
signinform.addEventListener('submit', (e) => {
  e.preventDefault();

  const userEmail = signinform['your_email'].value;
  const userPass = signinform['your_pass'].value;
    // var userEmail = document.getElementById('your_email').value;
    // var userPass = document.getElementById('your_pass').value;

    if(userEmail != "" && userPass != ""){
      if (userEmail.length < 4) {
        alert('Please enter an email address.');
        return;
      }
    if (userPass.length < 4) {
        alert('Please enter a password.');
        return;
      }
    auth.signInWithEmailAndPassword(userEmail, userPass).then(function(){
        window.alert("User successfully signed in");
        window.location.herf = "../index.html"; 
        // signinform.reset();
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }

        console.log(errorCode + errorMessage);
    });
    }else{
      alert('Please enter all fields.');
        return;
    }
});
