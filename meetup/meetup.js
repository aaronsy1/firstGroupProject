 // google maps function to display map
 function initMap(myLatLng) {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}

$(document).ready(function () {

  $('#hostParam').hide();
  $('#map').hide();
  $('#gameNearYou').hide();



  //pulls up hosting parameters that need to be filled out 
  $('#hosting').on('click', function () {
    console.log("hosting was clicked");
    $('#hostOrSearch').hide();
    $('#hostParam').show();
  });

  //push hosting parameters onto firebase
  $('#submitBtn').on('click', function () {
    console.log("submit button was clicked");
    var userEmail = $('#userEmail').val().trim();
    var userZipcode = $('#userZip').val().trim();
    var gameDescription = $('#gameDesc').val().trim();

    db.ref().push({
      email: userEmail,
      zipcode: Number(userZipcode),
      gameDescription: gameDescription
    });

alert("someone will contact your email if interested!");
  });

  $('#goBack').on('click',function(){
    $('#hostOrSearch').show();
    $('#hostParam').hide();
  })


  $('#searching').on('click', function () {
    console.log("searching was clicked");

    $('#hostOrSearch').hide();
    $('#gameNearYou').show();


  });

  $('#searchZipBtn').on('click', function () {

    var userSearch = $('#zipSearch').val().trim();
    var userZip = Number(userSearch);
    console.log("userZip is " + userZip);

  

    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userZip + '&key=AIzaSyA0-hwLFqBPHf5yphF-d0fymZKTv2vWNkU';

    axios.get(url)

    .then(function(resp){
      console.log(resp);
      console.log("lattitude is:" + resp.data.results[0].geometry.location.lat);
      console.log("longitude is:" + resp.data.results[0].geometry.location.lng);

      var lat = parseFloat(resp.data.results[0].geometry.location.lat);
      var long = parseFloat(resp.data.results[0].geometry.location.lng);

      var myLatLng = {lat: lat,lng: long}

      initMap(myLatLng);
      


    })
    .catch(function(error){
      console.log(error);
    })

    $('#map').show();
      

    if (userSearch >= 100000 || userSearch < 10000) {
      console.log("enter a correct zip");

    }
    else {

      db.ref().orderByChild("zipcode").equalTo(Number(userZip)).on('child_added',function(snapshot){
console.log("snapshot is" , snapshot.val());
var searchedEmail = snapshot.val().email;
var searchedGameDesc = snapshot.val().gameDescription;
console.log("searched email is " , searchedEmail);

      var searchResult = $('<div class = "row">');
      var emailCol = $('<div class = "col-md-3">');
      var descCol = $('<div class = "col-md-9">');

      $(emailCol).append(searchedEmail);
      $(descCol).append(searchedGameDesc);
      $(searchResult).append(descCol);
      $(searchResult).prepend(emailCol);

      $('#gameNearYou').append(searchResult);
    


      })
      
    }
  })

  $('#goBack2').on('click',function(){
    $('#hostOrSearch').show();
    $('#gameNearYou').hide();
    $('#map').hide();
  })

});