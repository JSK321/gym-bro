
// main js page
console.log("script linked")

var workoutType;
var workoutInt;
var workoutLen;
var musicGenre;

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

function arms() {

    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8"

    // Clears previous data to prevent stacking of data
    $('.armsBody').remove()
    $('.axeRow').html('');
    $('.bcRow').html('');
    $('.hcRow').html('');
    $('.tpRow').html('');
    $('.sbcRow').html('');
    $('.triDKRow').html('');

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        //"https://wger.de/api/v2/exerciseinfo/?language=2&equipment=3&category=8"

        // Arm Exercises
        var axeHold = response.results[0].name // Axe Hold
        var axeHoldDESC = response.results[0].description

        var biCurl = response.results[3].name // Biceps Curl with Dumbbell
        var biCurlDESC = response.results[3].description

        var hamCurl = response.results[12].name // Hammercurls
        var hamCurlDESC = response.results[12].description

        var triPress = response.results[14].name //Seated Triceep Press
        var triPressDESC = response.results[14].description

        var standBiCurl = response.results[16].name // Standing Bicep Curl
        var standBiCurlDESC = response.results[16].description

        var triDumb = response.results[19].name // Tricep Dumbbell Kickback
        var triDumbDESC = response.results[19].description

        var armsBody = $('<tbody></tbody>')

        // Axe Hold
        $('table').append(armsBody)
        armsBody.addClass('armsBody')
        armsBody.append($('<tr class = "axeRow">'))
        $('.axeRow').append($("<td class = 'axe1'>"))
        $('.axeRow').append($("<td class = 'axe2'>"))
        $('.axeRow').append($("<td class = 'axe3'>"))
        $('.axe1').html(axeHold)
        $('.axe2').html(axeHoldDESC)
        $('.axe3').html(reps)

        // Bicep Curl with Dumbbell
        $('table').append(armsBody)
        armsBody.addClass('armsBody')
        armsBody.append($('<tr class = "bcRow">'))
        $('.bcRow').append($("<td class = 'bc1'>"))
        $('.bcRow').append($("<td class = 'bc2'>"))
        $('.bcRow').append($("<td class = 'bc3'>"))
        $('.bc1').html(biCurl)
        $('.bc2').html(biCurlDESC)
        $('.bc3').html(reps)

        // Hammercurls
        $('table').append(armsBody)
        armsBody.addClass('armsBody')
        armsBody.append($('<tr class = "hcRow">'))
        $('.hcRow').append($("<td class = 'hc1'>"))
        $('.hcRow').append($("<td class = 'hc2'>"))
        $('.hcRow').append($("<td class = 'hc3'>"))
        $('.hc1').html(hamCurl)
        $('.hc2').html(hamCurlDESC)
        $('.hc3').html(reps)

        // Seated Tricep Press
        $('table').append(armsBody)
        armsBody.addClass('armsBody')
        armsBody.append($('<tr class = "tpRow">'))
        $('.tpRow').append($("<td class = 'tp1'>"))
        $('.tpRow').append($("<td class = 'tp2'>"))
        $('.tpRow').append($("<td class = 'tp3'>"))
        $('.tp1').html(triPress)
        $('.tp2').html(triPressDESC)
        $('.tp3').html(reps)

        // Standing Bicep Curl
        $('table').append(armsBody)
        armsBody.addClass('armsBody')
        armsBody.append($('<tr class = "sbcRow">'))
        $('.sbcRow').append($("<td class = 'sbc1'>"))
        $('.sbcRow').append($("<td class = 'sbc2'>"))
        $('.sbcRow').append($("<td class = 'sbc3'>"))
        $('.sbc1').html(standBiCurl)
        $('.sbc2').html(standBiCurlDESC)
        $('.sbc3').html(reps)

        // Tricep Dumbbell Kickback
        $('table').append(armsBody)
        armsBody.addClass('armsBody')
        armsBody.append($('<tr class = "triDKRow">'))
        $('.triDKRow').append($("<td class = 'triDK1'>"))
        $('.triDKRow').append($("<td class = 'triDK2'>"))
        $('.triDKRow').append($("<td class = 'triDK3'>"))
        $('.triDK1').html(triDumb)
        $('.triDK3').html(reps)
    })
}

//------------------------------------------------------------------
// AJAX Call for Legs Exerciser
// ------------------------------------------------------------------

function legs() {

    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=30&offset=50"

    // Clears previous data to prevent stacking of data
    $('.legsBody').remove()
    $('.dbLWRow').html('');
    $('.fhRow').html('');
    $('.gbRow').html('');
    $('.hkjRow').html('');
    $('.hkRow').html('');
    $('.jjRow').html('');

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        //"https://wger.de/api/v2/exerciseinfo/?language=2&category=9&limit=30&offset=50"

        // Leg Exercises
        var dbLW = response.results[2].name // Dumbbell Lunges Walking
        var dbLWD = response.results[2].description

        var fh = response.results[8].name // Fire Hydrant
        var fhD = response.results[8].description

        var gb = response.results[10].name // Glute Bridge
        var gbD = response.results[10].description

        var hkj = response.results[13].name // High Knee Jumps
        var hkjD = response.results[13].description

        var hk = response.results[14].name // High Knees
        var hkD = response.results[14].description

        var jj = response.results[21].name // Jumping Jacks
        var jjD = response.results[21].description

        var legsBody = $('<tbody></tbody>')

        // Dumbbell Lunges Walking
        $('table').append(legsBody)
        legsBody.addClass('legsBody')
        legsBody.append($('<tr class = "dbLWRow">'))
        $('.dbLWRow').append($("<td class = 'dbLW1'>"))
        $('.dbLWRow').append($("<td class = 'dbLW2'>"))
        $('.dbLWRow').append($("<td class = 'dbLW3'>"))
        $('.dbLW1').html(dbLW)
        $('.dbLW2').html(dbLWD)
        $('.dbLW3').html(reps)

        //Fire Hydrant
        $('table').append(legsBody)
        legsBody.addClass('legsBody')
        legsBody.append($('<tr class = "fhRow">'))
        $('.fhRow').append($("<td class = 'fh1'>"))
        $('.fhRow').append($("<td class = 'fh2'>"))
        $('.fhRow').append($("<td class = 'fh3'>"))
        $('.fh1').html(fh)
        $('.fh2').html(fhD)
        $('.fh3').html(reps)

        // Glute Bridge
        $('table').append(legsBody)
        legsBody.addClass('legsBody')
        legsBody.append($('<tr class = "gbRow">'))
        $('.gbRow').append($("<td class = 'gb1'>"))
        $('.gbRow').append($("<td class = 'gb2'>"))
        $('.gbRow').append($("<td class = 'gb3'>"))
        $('.gb1').html(gb)
        $('.gb2').html(gbD)
        $('.gb3').html(reps)

        // High Knee Jumps
        $('table').append(legsBody)
        legsBody.addClass('legsBody')
        legsBody.append($('<tr class = "hkjRow">'))
        $('.hkjRow').append($("<td class = 'hkj1'>"))
        $('.hkjRow').append($("<td class = 'hkj2'>"))
        $('.hkjRow').append($("<td class = 'hkj3'>"))
        $('.hkj1').html(hkj)
        $('.hkj2').html(hkjD)
        $('.hkj3').html(reps)

        //High Knee
        $('table').append(legsBody)
        legsBody.addClass('legsBody')
        legsBody.append($('<tr class = "hkRow">'))
        $('.hkRow').append($("<td class = 'hk1'>"))
        $('.hkRow').append($("<td class = 'hk2'>"))
        $('.hkRow').append($("<td class = 'hk3'>"))
        $('.hk1').html(hk)
        $('.hk2').html(hkD)
        $('.hk3').html(reps)

        // Jumping Jacks
        $('table').append(legsBody)
        legsBody.addClass('legsBody')
        legsBody.append($('<tr class = "jjRow">'))
        $('.jjRow').append($("<td class = 'jj1'>"))
        $('.jjRow').append($("<td class = 'jj2'>"))
        $('.jjRow').append($("<td class = 'jj3'>"))
        $('.jj1').html(jj)
        $('.jj2').html(jjD)
        $('.jj3').html(reps)
    })
}

// ------------------------------------------------------------------
// AJAX call for Abs Exercise
// ------------------------------------------------------------------

function abs() {

    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=20&offset=30"

    // Clears previous data to prevent stacking of data
    $('.absBody').remove()
    $('.dsbRow').html('');
    $('.fkRow').html('');
    $('.fsoRow').html('');
    $('.lrlRow').html('');
    $('.lwwRow').html('');
    $('.plkRow').html('');

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        // "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=20&offset=30"

        // Abs Exercise
        var dsb = response.results[0].name // Dumbbell Side Bends
        var dsbD = response.results[0].description

        var fk = response.results[1].name // Flutter Kicks
        var fkD = response.results[1].description

        var fso = response.results[2].name // Full Sit Outs
        var fsoD = response.results[2].description

        var lrl = response.results[7].name // Leg Raies, Lying 
        var lrlD = response.results[7].description

        var lww = response.results[13].name // Lying Widescreen Wipers
        var lwwD = response.results[13].description

        var plk = response.results[19].name // Plank
        var plkD = response.results[19].description

        var absBody = $('<tbody></tbody>')

        // Dumbbell Side Bends
        $('table').append(absBody)
        absBody.addClass('absBody')
        absBody.append($('<tr class = "dsbRow">'))
        $('.dsbRow').append($("<td class = 'dsb1'>"))
        $('.dsbRow').append($("<td class = 'dsb2'>"))
        $('.dsbRow').append($("<td class = 'dsb3'>"))
        $('.dsb1').html(dsb)
        $('.dsb2').html(dsbD)
        $('.dsb3').html(reps)

        // Flutter Kicks
        $('table').append(absBody)
        absBody.addClass('absBody')
        absBody.append($('<tr class = "fkRow">'))
        $('.fkRow').append($("<td class = 'fk1'>"))
        $('.fkRow').append($("<td class = 'fk2'>"))
        $('.fkRow').append($("<td class = 'fk3'>"))
        $('.fk1').html(fk)
        $('.fk2').html(fkD)
        $('.fk3').html(reps)

        // Full Sit Outs
        $('table').append(absBody)
        absBody.addClass('absBody')
        absBody.append($('<tr class = "fsoRow">'))
        $('.fsoRow').append($("<td class = 'fso1'>"))
        $('.fsoRow').append($("<td class = 'fso2'>"))
        $('.fsoRow').append($("<td class = 'fso3'>"))
        $('.fso1').html(fk)
        $('.fso2').html(fkD)
        $('.fso3').html(reps)

        // Leg Raises, Lying 
        $('table').append(absBody)
        absBody.addClass('absBody')
        absBody.append($('<tr class = "lrlRow">'))
        $('.lrlRow').append($("<td class = 'lrl1'>"))
        $('.lrlRow').append($("<td class = 'lrl2'>"))
        $('.lrlRow').append($("<td class = 'lrl3'>"))
        $('.lrl1').html(lrl)
        $('.lrl2').html(lrlD)
        $('.lrl3').html(reps)

        // Lying Widescreen Wipers
        $('table').append(absBody)
        absBody.addClass('absBody')
        absBody.append($('<tr class = "lwwRow">'))
        $('.lwwRow').append($("<td class = 'lww1'>"))
        $('.lwwRow').append($("<td class = 'lww2'>"))
        $('.lwwRow').append($("<td class = 'lww3'>"))
        $('.lww1').html(lww)
        $('.lww2').html(lwwD)
        $('.lww3').html(reps)

        // Plank
        $('table').append(absBody)
        absBody.addClass('absBody')
        absBody.append($('<tr class = "plkRow">'))
        $('.plkRow').append($("<td class = 'plk1'>"))
        $('.plkRow').append($("<td class = 'plk2'>"))
        $('.plkRow').append($("<td class = 'plk3'>"))
        $('.plk1').html(plk)
        $('.plk2').html(plkD)
        $('.plk3').html(reps)
    })
}

// on page load, check the page
function checkPage(){
    // grab the current url
    var str = $(location).attr("href");
    // parse the url down to the last section
    str = str.substring(str.lastIndexOf('/') +1);
    // if the last section is the workout.html
    if(str === "workout.html"){
        // create a new variable to get the page change button
        var pageVal = "";
        // if the local storage has something in it
        if(JSON.parse(localStorage.getItem("pageChange"))){
            // if the stored data isn't empty
            if((JSON.parse(localStorage.getItem("pageChange")).length !== 0)){
                // set the page value to the page change type
                pageVal = (JSON.parse(localStorage.getItem("pageChange")));
                // if the user pressed the workout button
                if(pageVal === "select"){
                    console.log("select stored, fill this in later");
                    return;
                }
                // if the user pressed the random button
                if(pageVal === "random"){
                    arms();
                    checkSpot();
                    return;
                }

            }
        }
        // if the user navigated to the workout page or cleared their local storage
        console.log("navigated randomly");
        checkSpot();
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

if (localStorage.getItem("type")) {
    workoutType = localStorage.getItem("type");
    workoutInt = localStorage.getItem("intensity");
    workoutLen = localStorage.getItem("length");
    musicGenre = localStorage.getItem("genre");
}

// if (location.href.includes("workout")) {
//     checkSpot();
//     arms();
// }

$("#start").click(function() {
    localStorage.setItem("type", $("#type").val());
    localStorage.setItem("intensity", $("#intensity").val()); 
    localStorage.setItem("length", $("#length").val());
    localStorage.setItem("genre", $("#genre").val());
    // if the workout button was clicked, store that info and load the next page
    var buttonInput = JSON.stringify("select");
    localStorage.setItem("pageChange", buttonInput);
    $(location).attr("href", "workout.html");
})

$("#random").click(function() {
    // if the random button was clicked, store that info and load the next page
    var buttonInput = JSON.stringify("random");
    localStorage.setItem("pageChange", buttonInput);
    $(location).attr("href", "workout.html");
})

// when the document is loaded check the page
$(document).ready( function() { checkPage(); });