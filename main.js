var userId = document.getElementById('userId');
var firstName = document.getElementbyId('firstName');
var lastName = document.getElementbyId('lastName');
var age = document.getElementById('age');
var email = document.getElementById('email');
var imageUrl = document.getElementById('imageUrl');
var fileUrl = document.getElementById('fileUrl');
var titleInput = document.getElementById('new-post-title');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('sign-out-button');
var addPost = document.getElementById('add-post');
var addButton = document.getElementById('add');
var recentPostsSection = document.getElementById('recent-posts-list');

function writeNewPost(uid, username, imageUrl, fileUrl, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    image: imageUrl,
    file: fileUrl
  };
  
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;
  
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
  return firebase.database().ref().update(updates);
}

function createPostElement(postId, title, text, author, image, file) {
  var uid = firebase.auth().currentUser.uid;
  
  var html = //insert post 
  
  // Create the DOM element from the HTML.
  div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;
  if (componentHandler) {
    componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);
  }
  
  // Set values.
  postElement.getElementsByClassName('text')[0].innerText = text;
  postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;
  postElement.getElementsByClassName('username')[0].innerText = author;
  postElement.getElementsByClassName('image')[0].innerText = image;
  postElement.getElementsByClassName('file')[0].innerText = file;
}

function startDatabaseQueries() {
  var myUserId = firebase.auth().currentUser.uid;
  // [START recent_posts_query]
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  // [END recent_posts_query]
  var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef, sectionElement) {
    postsRef.on('child_added', function(data) {
      var author = data.val().author || 'Anonymous';
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
        createPostElement(data.key, data.val().title, data.val().body, author, image, file),
        containerElement.firstChild);
    });
    postsRef.on('child_changed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
      postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = data.val().title;
      postElement.getElementsByClassName('username')[0].innerText = data.val().author;
      postElement.getElementsByClassName('image')[0].innerText = data.val().image;
      postElement.getElementsByClassName('file')[0].innerText = data.val().file;
    });
    postsRef.on('child_removed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var post = containerElement.getElementsByClassName('post-' + data.key)[0];
      post.parentElement.removeChild(post);
    });
  };

  // Fetching and displaying all posts of each sections.
  fetchPosts(recentPostsRef, recentPostsSection);
  fetchPosts(userPostsRef, userPostsSection);

  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(recentPostsRef);
  listeningFirebaseRefs.push(userPostsRef);
}

function writeUserData(userId, name, imageUrl, fileUrl, email, age) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    image: imageUrl,
    file: fileUrl,
    email: email,
    age: age
  });
}

function cleanupUi() {
  // Remove all previously displayed posts.
  recentPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
  
  // Stop all currently listening Firebase listeners.
  listeningFirebaseRefs.forEach(function(ref) {
    ref.off();
  });
  listeningFirebaseRefs = [];
}

var currentUID;

function onAuthStateChanged(user) {
  if (user && currentUID === user.uid) {
    return;
  }
  
  cleanupUi();
  if (user) {
    currentUID = user.uid;
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.file, user.image, user.email, user.age);
    startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
}

/**
* Creates a new post for the current user.
*/
function newPostForCurrentUser(title, text) {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    return writeNewPost(firebase.auth().currentUser.uid, username, imageUrl, fileUrl,
    title, text);
  });
}

window.addEventListener('load', function() {
  // Bind Sign in button.
  signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Bind Sign out button.
  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut();
  });

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);

  // Saves message on form submit.
  messageForm.onsubmit = function(e) {
    e.preventDefault();
    var text = messageInput.value;
    var title = titleInput.value;
    if (text && title) {
      newPostForCurrentUser(title, text).then(function() {
        myPostsMenuButton.click();
      });
      messageInput.value = '';
      titleInput.value = '';
    }
  };

  // Bind menu buttons.
  recentMenuButton.onclick = function() {
    showSection(recentPostsSection, recentMenuButton);
  };
  myPostsMenuButton.onclick = function() {
    showSection(userPostsSection, myPostsMenuButton);
  };
  addButton.onclick = function() {
    showSection(addPost);
    messageInput.value = '';
    titleInput.value = '';
  };
  recentMenuButton.onclick();
}, false);