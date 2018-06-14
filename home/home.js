// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCc7qSKbxaCF4_mHI5NwtBtBoXSa_gJiF4",
    authDomain: "signinpractice-e608b.firebaseapp.com",
    databaseURL: "https://signinpractice-e608b.firebaseio.com",
    projectId: "signinpractice-e608b",
    storageBucket: "",
    messagingSenderId: "719737663598"


  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();

$('#sign-in').on('click',function(){

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    //set access token to localstorage
    localStorage.setItem('token',token);
    // The signed-in user info.
    var user = result.user;
    console.log("user sign in info" + user);
    // ...
  }).catch(function(error) {
      console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

});

$('#meetup-button').on('click',function(e){
    e.preventDefault();
    console.log(localStorage.getItem('token'))
    if (!localStorage.getItem('token')){
        console.log('not signed in redirecting to sign in page')
        window.location.assign("/signInPage.html");
    }
    else {
        console.log('signed in!')
        window.location.assign("/meetup.html");
    }
})

$('#sign-out').on('click',function(){

firebase.auth().signOut().then(function() {
    console.log("signed out");
    localStorage.clear();
    // Sign-out successful.
  }).catch(function(error) {
      console.log(error);
    // An error happened.
  });

      
})

var db = firebase.database();

  