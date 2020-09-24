// main js page

var SpotifyWebApi = require("spotify-web-api-js")

// main js page
console.log("script linked")
var spotifyApi = new SpotifyWebApi();
var client_id = 'e02d32c1b0bd4912ac276af9821e6f36';
var client_secret = '7325643c19d54ae281990a8f2eb64d86';
var encoded = btoa(client_id + ':' + client_secret);
var workoutType = "hello";
var workoutInt;
var workoutLen;
var musicGenre;
var workoutType;

console.log(workoutType);
console.log(workoutInt);
console.log(workoutLen);
console.log(musicGenre);

$.ajax({
  url: 'https://accounts.spotify.com/api/token',
  type: 'POST',
  data: {
       grant_type : "client_credentials"
  },
  headers: {
      Authorization: 'Basic ' + encoded
  },
  dataType: 'json'
  }).then(function(data) {
    console.log(data.access_token);
    spotifyApi.setAccessToken(data.access_token);
    spotifyApi.getPlaylist("1vFqDEkllm3fDKGfHO0FEm").then(function(response) {
    console.log(response.external_urls.spotify);
      

    })

});

$("#start").click(function() {
    workoutType = $("#type").val();
    workoutInt = $("#intensity").val();
    workoutLen = $("#length").val();
    musicGenre = $("#genre").val();
    location.href = "workout.html";
    localStorage.setItem("type", wworkoutType);
    localStorage.setItem("intensity")
})



