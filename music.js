// define genre array
var genreArray = ["pop", "workout", "kpop", "hiphop", "rock"];

// spotify ajax calls
function checkSpot(){
    $.ajax({
        // call the token url
        url: "https://accounts.spotify.com/api/token",
        // set the authorization headers
        beforeSend: function(xhr){xhr.setRequestHeader(`Authorization`, `Basic ZjU1ZmYzZTRhODZlNDVhM2I0ZWRmNmM0Yjc0YzNkMzI6YTY4M2NjMzZiZTZmNDNmODk0Njg0ZDcyN2RkMTkyOTc=`);},
        // set the data to client_credentials as per the spotify api instructions
        processData: false,
        data: "grant_type=client_credentials",
        json: true,
        type: "POST",
        success: function(data) {
            // parse the token from the first ajax call
            var token = `${data.token_type} ${data.access_token}`;
            // grab a random genre from the array
            var randomGenre = Math.floor(Math.random()*genreArray.length);
            // get a random playlist in the selected genre
            $.ajax({
                url: `https://api.spotify.com/v1/browse/categories/${genreArray[randomGenre]}/playlists`,
                // set the authorization headers with the token
                beforeSend: function(xhr){xhr.setRequestHeader(`Authorization`, `${token}`);},
                json: true,
                type: "GET",
                success: function(data) {
                    // set the returned data
                    playlistInfo = data.playlists;
                    // pick a random playlist
                    var randomPlaylist = Math.floor(Math.random()*playlistInfo.items.length);
                    // grab the uri for the selected playlist
                    var uri = playlistInfo.items[randomPlaylist].uri.substring(17);
                    // populate the music playlist on the page
                    musicPlaylist(uri);
                },
                error: function(){
                    console.log("cannot get playlist");
                }
            });

        },
        error: function(){
          console.log("Cannot get data");
        }
    });
}

// create music playlist
function musicPlaylist(link){
    // empty the current music playlist
    $("#song-playlist").empty();
    var newFrame = $("<iframe>");
    // set the src to the embed code with the playlist id
    newFrame.attr("src", `https://open.spotify.com/embed/playlist/${link}`);
    newFrame.attr("width", "98%");
    newFrame.attr("height", "380");
    newFrame.attr("frameborder", "0");
    newFrame.attr("allowtransparency", "true");
    newFrame.attr("allow", "encrypted-media");
    // put the embed on the page
    $("#song-playlist").append(newFrame);
}