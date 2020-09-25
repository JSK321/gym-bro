// main js page
console.log("script linked")

var workoutType;
var workoutInt;
var workoutLen;
var musicGenre;

// array to store workout indexes
var workoutArray = [];

// define genre array
var genreArray = ["pop", "workout", "kpop", "hiphop", "rock"];

// Workout Intensity Repetitions/Sets
var repsEasy = "15 Repetitions, 3 Sets Each"
var repsMed = "25 Repetitions, 4 sets Each"
var repsHard = "As many as you can!"

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

function workoutPlaylist(queryUrl){

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        var workouts = response.results;
        $(`tbody`).empty();
        for(var i = 0; i < workoutArray.length; i++){
            var newRow = $(`<tr>`);
            var newData1 = $(`<td>`);
            var newData2 = $(`<td>`);
            var newData3 = $(`<td>`);
            newData1.html(workouts[workoutArray[i]].name);
            newData2.html(workouts[workoutArray[i]].description);
            if (workoutInt === 'easy') {
                newData3.html(repsEasy)
            } else if (workoutInt === 'medium') {
                newData3.html(repsMed)
            } else if (workoutInt === 'hard') {
                newData3.html(repsHard)
            }
            newRow.append(newData1);
            newRow.append(newData2);
            newRow.append(newData3);
            $(`tbody`).append(newRow);
        }
    });
}

function getWorkout(index){
    if (index === "8") {
        // arms
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8";
        workoutArray = [0, 3, 12, 14, 16, 19];
        workoutPlaylist(workoutUrl);

    } else if (index === "9") {
        // legs
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=30&offset=50";
        workoutArray = [2, 8, 10, 13, 14, 21];
        workoutPlaylist(workoutUrl);
    } else if (index === "10") {
        // abs
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=20&offset=30";
        workoutArray = [0, 1, 2, 7, 13, 19];
        workoutPlaylist(workoutUrl);
    } else if (index === "11") {
        // chest
        workoutUrl = "";
        workoutArray = [];
        workoutPlaylist(workoutUrl);
    } else if (index === "12") {
        // back
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=12&equipment=3";
        workoutArray = [0, 3, 5, 6, 8];
        workoutPlaylist(workoutUrl);
    } else if (index === "13") {
        // shoulder
        workoutUrl = "https://wger.de/api/v2/exerciseinfo/?language=2&category=13&equipment=3";
        workoutArray = [1, 8, 10, 14];
        workoutPlaylist(workoutUrl);
    }
}

function chest() {
    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&category=11&equipment=3"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.results)

        var flatBench = response.results[3].name
        var flatBenchDec = response.results[3].description

        var flys = response.results[4].name
        // var flysDesc = response.results[4].description

        var oneArmPress = response.results[10].name
        var oneArmPressDesc = response.results[10].description

        var pullOver = response.results[11].name
        // var pullOverDesc = response.results[11].description

        var pushUp = ("Push Up")
        var pushUpDesc = ("Get down on all fours, placing your hands slightly wider than your shoulders.Straighten your arms and legs. Lower your body until your chest nearly touches the floor. Pause, then push yourself back up. Repeat.")



        // Flat Row exercise
        var chestBody = $("<tbody></tbody>")
        $("table").append(chestBody)
        chestBody.addClass("chestBody")
        chestBody.append($("<tr class = 'flatRow' >"))
        $(".flatRow").append($("<td class = 'bench1'>"))
        $(".flatRow").append($("<td class = 'bench2'>"))
        $(".flatRow").append($("<td class = 'bench3'>"))
        $(".bench1").html(flatBench)
        $(".bench2").html(flatBenchDec)
        if (workoutInt === 'easy') {
            $('.bench3').html(repsEasy)
        } else if (workoutInt === 'medium') {
            $('.bench3').html(repsMed)
        } else if (workoutInt === 'hard') {
            $('.bench3').html(repsHard)
        }


        // Flys exercise
        var chestBody = $("<tbody></tbody>")
        $("table").append(chestBody)
        chestBody.addClass("chestBody")
        chestBody.append($("<tr class = 'flyRow' >"))
        $(".flyRow").append($("<td class = 'flys1'>"))
        $(".flyRow").append($("<td class = 'flys2'>"))
        $(".flyRow").append($("<td class = 'flys3'>"))
        $(".flys1").html(flys)
        $(".flys2").html("A fly or flye is a strength training exercise in which the hand and arm move through an arc while the elbow is kept at a constant angle. Flies are used to work the muscles of the upper body. <br> Because these exercises use the arms as levers at their longest possible length, the amount of weight that can be moved is significantly less than equivalent press exercises for the same muscles")
        if (workoutInt === 'easy') {
            $('.flys3').html(repsEasy)
        } else if (workoutInt === 'medium') {
            $('.flys3').html(repsMed)
        } else if (workoutInt === 'hard') {
            $('.flys3').html(repsHard)
        };

        // One Arm dumbbell press
        var chestBody = $("<tbody></tbody>")
        $("table").append(chestBody)
        chestBody.addClass("chestBody")
        chestBody.append($("<tr class = 'oneArmRow' >"))
        $(".oneArmRow").append($("<td class = 'oneArmPrs1'>"))
        $(".oneArmRow").append($("<td class = 'oneArmPrs2'>"))
        $(".oneArmRow").append($("<td class = 'oneArmPrs3'>"))
        $(".oneArmPrs1").html(oneArmPress)
        $(".oneArmPrs2").html(oneArmPressDesc)
        if (workoutInt === 'easy') {
            $('.oneArmPrs3').html(repsEasy)
        } else if (workoutInt === 'medium') {
            $('.oneArmPrs3').html(repsMed)
        } else if (workoutInt === 'hard') {
            $('.oneArmPrs3').html(repsHard)
        }


        // Pull over with Dumbbell
        var chestBody = $("<tbody></tbody>")
        $("table").append(chestBody)
        chestBody.addClass("chestBody")
        chestBody.append($("<tr class = 'pullOverDmblRow' >"))
        $(".pullOverDmblRow").append($("<td class = 'pull1'>"))
        $(".pullOverDmblRow").append($("<td class = 'pull2'>"))
        $(".pullOverDmblRow").append($("<td class = 'pull3'>"))
        $(".pull1").html(pullOver)
        $(".pull2").html("Lower the dumbbell behind the head <br><br>return to the starting position<br>")
        if (workoutInt === 'easy') {
            $('.pull3').html(repsEasy)
        } else if (workoutInt === 'medium') {
            $('.pull3').html(repsMed)
        } else if (workoutInt === 'hard') {
            $('.pull3').html(repsHard)
        }

        // Push Up
        var chestBody = $("<tbody></tbody>")
        $("table").append(chestBody)
        chestBody.addClass("chestBody")
        chestBody.append($("<tr class = 'pushUpRow' >"))
        $(".pushUpRow").append($("<td class = 'push1'>"))
        $(".pushUpRow").append($("<td class = 'push2'>"))
        $(".pushUpRow").append($("<td class = 'push3'>"))
        $(".push1").html(pushUp)
        $(".push2").html(pushUpDesc)
        if (workoutInt === 'easy') {
            $('.push3').html(repsEasy)
        } else if (workoutInt === 'medium') {
            $('.push3').html(repsMed)
        } else if (workoutInt === 'hard') {
            $('.push3').html(repsHard)
        }
    });
}

//selects a random workout intensity level and a random workout type
function randomWorkout() {
    var intensity = ["easy", "medium","hard"];
    var workout = ["8", "9", "10", "11", "12", "13"];
    workoutInt = intensity[Math.floor(Math.random() * intensity.length)];
    getWorkout(workout[Math.floor(Math.random() * workout.length)]());

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
                if (pageVal === "select") {
                    getWorkout(workoutType);
                    // populate the music playlist
                    checkSpot();
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
        workoutLen = localStorage.getItem("length");
        musicGenre = localStorage.getItem("genre");
    }
}

// ------------------------------------------------------------------
// Click Event Listeners
// ------------------------------------------------------------------
$('.armsExercise').on('click', function () {
    arms()
})

$('.legsExercise').on('click', function () {
    legs()
})

$('.absExercise').on('click', function () {
    abs()
})

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
    // if "Go Back" on workout page is clicked, clear local storage, and return to home page
    localStorage.clear();
    $(location).attr("href", "index.html");
})

// when the document is loaded check the page
$(document).ready(function () { checkPage(); });