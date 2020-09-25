// main js page

// global workout variables
var workoutType;
var workoutInt;

// Workout Intensity Repetitions/Sets
var repsEasy = "15 Repetitions, 3 Sets Each"
var repsMed = "25 Repetitions, 4 sets Each"
var repsHard = "As many as you can!"

// array to store workout indexes
var workoutArray = [];

// define genre array
var genreArray = ["pop", "workout", "kpop", "hiphop", "rock"];

// spotify ajax calls
function checkSpot() {
    $.ajax({
        // call the token url
        url: "https://accounts.spotify.com/api/token",
        // set the authorization headers
        beforeSend: function (xhr) { xhr.setRequestHeader(`Authorization`, `Basic ZjU1ZmYzZTRhODZlNDVhM2I0ZWRmNmM0Yjc0YzNkMzI6YTY4M2NjMzZiZTZmNDNmODk0Njg0ZDcyN2RkMTkyOTc=`); },
        // set the data to client_credentials as per the spotify api instructions
        processData: false,
        data: "grant_type=client_credentials",
        json: true,
        type: "POST",
        success: function (data) {
            // parse the token from the first ajax call
            var token = `${data.token_type} ${data.access_token}`;
            // grab a stored or random genre from the array
            var randomGenre = getGenre();
            // get a random playlist in the selected genre
            $.ajax({
                url: `https://api.spotify.com/v1/browse/categories/${genreArray[randomGenre]}/playlists`,
                // set the authorization headers with the token
                beforeSend: function (xhr) { xhr.setRequestHeader(`Authorization`, `${token}`); },
                json: true,
                type: "GET",
                success: function (data) {
                    // set the returned data
                    playlistInfo = data.playlists;
                    // pick a random playlist
                    var randomPlaylist = Math.floor(Math.random() * playlistInfo.items.length);
                    // grab the uri for the selected playlist
                    var uri = playlistInfo.items[randomPlaylist].uri.substring(17);
                    // populate the music playlist on the page
                    musicPlaylist(uri);
                    return;
                },
                error: function () {
                    console.log("cannot get playlist");
                    return;
                }
            });

        },
        error: function () {
            console.log("Cannot get data");
            return;
        }
    });
}

// get a stored or random genre index
function getGenre(){
    //Math.floor(Math.random() * genreArray.length);
    // if the local storage has something in it
    var genreStr = "";
    if (JSON.parse(localStorage.getItem("genre"))) {
        // if the stored data isn't empty
        if ((JSON.parse(localStorage.getItem("genre")).length !== 0)) {
            // set the genre value to the page change type
            genreStr = (JSON.parse(localStorage.getItem("genre")));
        }
    }
    // if there wasn't a stored genre, get a random one
    if(genreStr === "")
    {
        // return a random index
        return (Math.floor(Math.random() * genreArray.length));
    }
    // return the index of the stored genre
    var genreNumber = genreArray.indexOf(genreStr);
    return (genreNumber);
}

// create music playlist
function musicPlaylist(link) {
    // empty the current music playlist
    $("#song-playlist").empty();
    var newFrame = $("<iframe>");
    // set the src to the embed code with the playlist id
    newFrame.attr("src", `https://open.spotify.com/embed/playlist/${link}`);
    // set the rest of the iframe attributes
    newFrame.attr("width", "98%");
    newFrame.attr("height", "380");
    newFrame.attr("frameborder", "0");
    newFrame.attr("allowtransparency", "true");
    newFrame.attr("allow", "encrypted-media");
    // put the embed on the page
    $("#song-playlist").append(newFrame);
    // end the function
    return;
}

// generate the workout playlist, taking in the url
function workoutPlaylist(queryUrl){

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        var workouts = response.results;
        // clear current workout playlist to avoid issues
        $(`tbody`).empty();
        // for each workout index, populate a new row in the playlist
        for(var i = 0; i < workoutArray.length; i++){
            // create the row and 3 data points
            var newRow = $(`<tr>`);
            var newData1 = $(`<td>`);
            var newData2 = $(`<td>`);
            var newData3 = $(`<td>`);
            // populate the name data point
            newData1.html(workouts[workoutArray[i]].name);
            // populate the description data point
            newData2.html(workouts[workoutArray[i]].description);
            // populate the intensity data point based on saved results
            if (workoutInt === 'easy') {
                newData3.html(repsEasy);
            } else if (workoutInt === 'medium') {
                newData3.html(repsMed);
            } else if (workoutInt === 'hard') {
                newData3.html(repsHard);
            }
            // add the data points to the row
            newRow.append(newData1);
            newRow.append(newData2);
            newRow.append(newData3);
            // add the row to the page in the tbody tag
            $(`tbody`).append(newRow);
        }
    });
}

// based on workout, set url, set the workout indexes, call the playlist generator
function getWorkout(index){
    // arms
    if (index === "8") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8";
        workoutArray = [0, 3, 12, 14, 16, 19];
        workoutPlaylist(workoutUrl);

    } 
    // legs
    else if (index === "9") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=30&offset=50";
        workoutArray = [2, 8, 10, 13, 14, 21];
        workoutPlaylist(workoutUrl);
    } 
    // abs
    else if (index === "10") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=20&offset=30";
        workoutArray = [0, 1, 2, 7, 13, 19];
        workoutPlaylist(workoutUrl);
    } 
    // chest
    else if (index === "11") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=11&limit=30";
        workoutArray = [0, 5 , 7, 12, 23];
        workoutPlaylist(workoutUrl);
    } 
    // back
    else if (index === "12") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=12&equipment=3";
        workoutArray = [0, 3, 5, 6, 8];
        workoutPlaylist(workoutUrl);
    } 
    // shoulder
    else if (index === "13") {
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=13&limit=35";
        workoutArray = [2, 3, 10, 31, 34];
        workoutPlaylist(workoutUrl);
    }
}

//selects a random workout intensity level and a random workout type
function randomWorkout() {
    var intensity = ["easy", "medium","hard"];
    var workout = ["8", "9", "10", "11", "12", "13"];
    // set a random intensity
    workoutInt = intensity[Math.floor(Math.random() * intensity.length)];
    // call a random workout
    workoutType = workout[Math.floor(Math.random() * workout.length)]
    getWorkout(workoutType);

}
// on page load, check the page
function checkPage() {
    // grab the current url
    getLocalStorage();
    var str = $(location).attr("href");
    // parse the url down to the last section
    str = str.substring(str.lastIndexOf('/') + 1);
    // if the last section is the workout.html
    if (str === "workout.html") {
        // create a new variable to get the page change button
        var pageVal = "";
        // if the local storage has something in it
        if (JSON.parse(localStorage.getItem("pageChange"))) {
            // if the stored data isn't empty
            if ((JSON.parse(localStorage.getItem("pageChange")).length !== 0)) {
                // set the page value to the page change type
                pageVal = (JSON.parse(localStorage.getItem("pageChange")));
                // if the user pressed the workout button
                if (pageVal === "select" || pageVal === "load") {
                    // call the workout based on the user input
                    getWorkout(workoutType);
                    // populate the music playlist
                    if (pageVal === "select") {
                        checkSpot();
                    } else {
                        musicPlaylist(localStorage.getItem("playlist"));
                    }
                    
                    // end the function
                    return;
                }
                // if the user pressed the random button
                if (pageVal === "random") {
                    randomWorkout();
                    // populate the music playlist
                    checkSpot();
                    // end the function
                    return;
                }
            }

        }
    }
    // if the user navigated to the workout page or cleared their local storage
    console.log("navigated randomly");
    randomWorkout();
    checkSpot();
}

// if workout settings and music genre are available in local storage, sets the corresponding
// global variables to values in local storage
function getLocalStorage() {
    if (localStorage.getItem("type")) {
        workoutType = localStorage.getItem("type");
        workoutInt = localStorage.getItem("intensity");
    }
}

// if the workout button was clicked, store that info and load the next page
$("#start").click(function () {
    localStorage.setItem("type", $("#type").val());
    localStorage.setItem("intensity", $("#intensity").val());
    localStorage.setItem("length", $("#length").val());
    localStorage.setItem("genre", $("#genre").val());
    // store the pageChange variable to local storage as a string
    var buttonInput = JSON.stringify("select");
    localStorage.setItem("pageChange", buttonInput);
    // store the selected genre to local storage as a string
    var genreSelected = JSON.stringify($("#genre").val());
    localStorage.setItem("genre", genreSelected);
    // change to the workout page
    $(location).attr("href", "workout.html");
})

    // if the random button was clicked, store that info and load the next page
$("#random").click(function () {
    // store the pageChange variable to local storage as a string
    var buttonInput = JSON.stringify("random");
    localStorage.setItem("pageChange", buttonInput);
    $(location).attr("href", "workout.html");
})

$("#return").click(function () {
    // if "Go Back" on workout page is clicked, clear local storage except for saved settings, 
    // and return to home page
    var settings = localStorage.getItem("saved-settings");
    localStorage.clear();
    localStorage.setItem("saved-settings", settings);
    $(location).attr("href", "index.html");
})

$("#save").click(function () {
    // if "Save" is clicked, save current playlist and workout settings 
    currentPlaylist = $("iframe").attr("src").substring($("iframe").attr("src").indexOf("playlist/") + 9);
    var settings = [workoutType, workoutInt, currentPlaylist];
    localStorage.setItem("saved-settings", JSON.stringify(settings));
});

$("#load").click(function () {
    // if "Load" is clicked, loads previous settings if detected and then redirects to workout.html. 
    // does nothing if no settings are detected
    if (localStorage.getItem("saved-settings")) {
        if (JSON.parse(localStorage.getItem("saved-settings")).length !== 0 ) {
            var settings = JSON.parse(localStorage.getItem("saved-settings"));
            localStorage.setItem("type", settings[0]);
            localStorage.setItem("intensity", settings[1]);
            localStorage.setItem("playlist", settings[2]);
            var buttonInput = JSON.stringify("load");
            localStorage.setItem("pageChange", buttonInput);
            $(location).attr("href", "workout.html");
        }
    } 
});

// when the document is loaded check the page
$(document).ready(function () { checkPage(); });