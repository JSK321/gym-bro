// main js page
console.log("script linked")

var workoutType;
var workoutInt;
var workoutLen;
var musicGenre;

// define genre array
var genreArray = ["pop", "workout", "kpop", "hiphop", "rock"];

// spotify ajax calls
function checkSpot() {
    $.ajax({
        // call the token url
        url: "https://accounts.spotify.com/api/token",
        // set the authorization headers
        beforeSend: function(xhr) { xhr.setRequestHeader(`Authorization`, `Basic ZjU1ZmYzZTRhODZlNDVhM2I0ZWRmNmM0Yjc0YzNkMzI6YTY4M2NjMzZiZTZmNDNmODk0Njg0ZDcyN2RkMTkyOTc=`); },
        // set the data to client_credentials as per the spotify api instructions
        processData: false,
        data: "grant_type=client_credentials",
        json: true,
        type: "POST",
        success: function(data) {
            // parse the token from the first ajax call
            var token = `${data.token_type} ${data.access_token}`;
            // grab a random genre from the array
            var randomGenre = Math.floor(Math.random() * genreArray.length);
            // get a random playlist in the selected genre
            $.ajax({
                url: `https://api.spotify.com/v1/browse/categories/${genreArray[randomGenre]}/playlists`,
                // set the authorization headers with the token
                beforeSend: function(xhr) { xhr.setRequestHeader(`Authorization`, `${token}`); },
                json: true,
                type: "GET",
                success: function(data) {
                    // set the returned data
                    playlistInfo = data.playlists;
                    // pick a random playlist
                    var randomPlaylist = Math.floor(Math.random() * playlistInfo.items.length);
                    // grab the uri for the selected playlist
                    var uri = playlistInfo.items[randomPlaylist].uri.substring(17);
                    // populate the music playlist on the page
                    musicPlaylist(uri);
                },
                error: function() {
                    console.log("cannot get playlist");
                }
            });

        },
        error: function() {
            console.log("Cannot get data");
        }
    });
}

// create music playlist
function musicPlaylist(link) {
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
    }).then(function(response) {
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
    }).then(function(response) {
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
    }).then(function(response) {
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

function chest() {
    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&category=11&equipment=3"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
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
        $(".bench3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each <br>");


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
        $(".flys3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each <br>");

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
        $(".oneArmPrs3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each <br>");


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
        $(".pull3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each <br><br>");

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
        $(".push3").append("Easy: 10-12 reps, 3 sets each <br> Medium: 10-14 reps, 4 sets each <br> Hard: 14-16 reps, 4 sets each <br>");
    });
}

$(".chestExercise").on("click", function() {
    chest()
})

function back() {
    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&category=12&equipment=3"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.results)

        var bentOverRows = response.results[0].name
        var bentOverRowsDec = response.results[0].description

        var dumbbellRow = response.results[3].name
        var dumbbellRowDesc = response.results[3].description

        var manBreakers = response.results[5].name
        var manBreakersDesc = response.results[5].description

        var renegadeRow = response.results[6].name
        var renegadeRowDesc = response.results[6].description

        var sideDumbbell = response.results[8].name
        var sideDumbbellDesc = response.results[8].description



        // Bentover Dumbbell Rows exercise
        var backBody = $("<tbody></tbody>")
        $("table").append(backBody)
        backBody.addClass("backBody")
        backBody.append($("<tr class = 'bentOvrRow' >"))
        $(".bentOvrRow").append($("<td class = 'bent1'>"))
        $(".bentOvrRow").append($("<td class = 'bent2'>"))
        $(".bentOvrRow").append($("<td class = 'bent3'>"))
        $(".bent1").html(bentOverRows)
        $(".bent2").html(bentOverRowsDec)
        $(".bent3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");


        // Dumbbell Row exercise
        var backBody = $("<tbody></tbody>")
        $("table").append(backBody)
        backBody.addClass("backBody")
        backBody.append($("<tr class = 'dumbbellRowRow' >"))
        $(".dumbbellRowRow").append($("<td class = 'dumbbell1'>"))
        $(".dumbbellRowRow").append($("<td class = 'dumbbell2'>"))
        $(".dumbbellRowRow").append($("<td class = 'dumbbell3'>"))
        $(".dumbbell1").html(dumbbellRow)
        $(".dumbbell2").html(dumbbellRowDesc)
        $(".dumbbell3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");

        // Man Breakers
        var backBody = $("<tbody></tbody>")
        $("table").append(backBody)
        backBody.addClass("backBody")
        backBody.append($("<tr class = 'manBreakerRow' >"))
        $(".manBreakerRow").append($("<td class = 'breaker1'>"))
        $(".manBreakerRow").append($("<td class = 'breaker2'>"))
        $(".manBreakerRow").append($("<td class = 'breaker3'>"))
        $(".breaker1").html(manBreakers)
        $(".breaker2").html(manBreakersDesc)
        $(".breaker3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");


        // Renegade Row
        var backBody = $("<tbody></tbody>")
        $("table").append(backBody)
        backBody.addClass("backBody")
        backBody.append($("<tr class = 'renegadeRow' >"))
        $(".renegadeRow").append($("<td class = 'renegade1'>"))
        $(".renegadeRow").append($("<td class = 'renegade2'>"))
        $(".renegadeRow").append($("<td class = 'renegade3'>"))
        $(".renegade1").html(renegadeRow)
        $(".renegade2").html(renegadeRowDesc)
        $(".renegade3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");

        // Side Dumbbell Trunnk Flexion
        var backBody = $("<tbody></tbody>")
        $("table").append(backBody)
        backBody.addClass("backBody")
        backBody.append($("<tr class = 'sideDmblRow' >"))
        $(".sideDmblRow").append($("<td class = 'side1'>"))
        $(".sideDmblRow").append($("<td class = 'side2'>"))
        $(".sideDmblRow").append($("<td class = 'side3'>"))
        $(".side1").html(sideDumbbell)
        $(".side2").html(sideDumbbellDesc)
        $(".side3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");
    });
}

$(".backExercise").on("click", function() {
    back()
})

function shoulder() {
    var queryURL = "https://wger.de/api/v2/exerciseinfo/?language=2&category=13&equipment=3"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.results)

        var arnoldPress = response.results[0].name
            // var arnoldPress = response.results[0].description

        var bentHighPulls = response.results[1].name
        var bentHighPullsDesc = response.results[1].description

        var lateralRaises = response.results[5].name
            // var lateralRaisesDesc = response.results[5].description

        var rearDeltRaises = response.results[8].name
        var rearDeltRaisesDesc = response.results[8].description

        var shoulderFly = response.results[10].name
        var shoulderFlyDesc = response.results[10].description

        var shrugs = response.results[14].name
        var shrugsDesc = response.results[14].description




        // Arnold Shoulder Press
        var shoulderBody = $("<tbody></tbody>")
        $("table").append(shoulderBody)
        shoulderBody.addClass("shoulderBody")
        shoulderBody.append($("<tr class = 'shoulderPressRow' >"))
        $(".shoulderPressRow").append($("<td class = 'arnold1'>"))
        $(".shoulderPressRow").append($("<td class = 'arnold2'>"))
        $(".shoulderPressRow").append($("<td class = 'arnold3'>"))
        $(".arnold1").html(arnoldPress)
        $(".arnold2").html("Stand with two dumbbells position in front of shoulders, palms facing body and elbows under wrists.<br> Execution. Initiate movement by bringing elbows out to sides. Continue to raise elbows outward while pressing dumbbells overhead until arms are straight. Lower to front of shoulders in opposite pattern and repeat.")
        $(".arnold3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");


        // Bent High Pulls
        var shoulderBody = $("<tbody></tbody>")
        $("table").append(shoulderBody)
        shoulderBody.addClass("shoulderBody")
        shoulderBody.append($("<tr class = 'bentHighRow' >"))
        $(".bentHighRow").append($("<td class = 'bentHighPls1'>"))
        $(".bentHighRow").append($("<td class = 'bentHighPls2'>"))
        $(".bentHighRow").append($("<td class = 'bentHighPls3'>"))
        $(".bentHighPls1").html(bentHighPulls)
        $(".bentHighPls2").html(bentHighPullsDesc)
        $(".bentHighPls3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");

        // Lateral Raises
        var shoulderBody = $("<tbody></tbody>")
        $("table").append(shoulderBody)
        shoulderBody.addClass("shoulderBody")
        shoulderBody.append($("<tr class = 'lateralRaisesRow' >"))
        $(".lateralRaisesRow").append($("<td class = 'lateral1'>"))
        $(".lateralRaisesRow").append($("<td class = 'lateral2'>"))
        $(".lateralRaisesRow").append($("<td class = 'lateral3'>"))
        $(".lateral1").html(lateralRaises)
        $(".lateral2").html("Stand with dumbbells by your sides. Hinge at the hips and bend over until your torso is parallel to the floor, or close to that point, keeping your back straight.<br> Raise the weights out to the sides until your arms are parallel with the ground, then slowly take them back down.")
        $(".lateral3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");


        // Rear Delt Raises
        var shoulderBody = $("<tbody></tbody>")
        $("table").append(shoulderBody)
        shoulderBody.addClass("shoulderBody")
        shoulderBody.append($("<tr class = 'rearDeltRow' >"))
        $(".rearDeltRow").append($("<td class = 'raises1'>"))
        $(".rearDeltRow").append($("<td class = 'raises2'>"))
        $(".rearDeltRow").append($("<td class = 'raises3'>"))
        $(".raises1").html(rearDeltRaises)
        $(".raises2").html(rearDeltRaisesDesc)
        $(".raises3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");

        // Shoulder Fly
        var shoulderBody = $("<tbody></tbody>")
        $("table").append(shoulderBody)
        shoulderBody.addClass("shoulderBody")
        shoulderBody.append($("<tr class = 'shoulderFlyRow' >"))
        $(".shoulderFlyRow").append($("<td class = 'shoulderFlys1'>"))
        $(".shoulderFlyRow").append($("<td class = 'shoulderFlys2'>"))
        $(".shoulderFlyRow").append($("<td class = 'shoulderFlys3'>"))
        $(".shoulderFlys1").html(shoulderFly)
        $(".shoulderFlys2").html(shoulderFlyDesc)
        $(".shoulderFlys3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");

        // Shrugs with Dumbbells
        var shoulderBody = $("<tbody></tbody>")
        $("table").append(shoulderBody)
        shoulderBody.addClass("shoulderBody")
        shoulderBody.append($("<tr class = 'shrugDumbbellRow' >"))
        $(".shrugDumbbellRow").append($("<td class = 'shrug1'>"))
        $(".shrugDumbbellRow").append($("<td class = 'shrug2'>"))
        $(".shrugDumbbellRow").append($("<td class = 'shrug3'>"))
        $(".shrug1").html(shrugs)
        $(".shrug2").html(shrugsDesc)
        $(".shrug3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each");
    });
}

$(".shoulderExercise").on("click", function() {
    shoulder()
})

function randomWorkout() {
    let workout = [
        arms,
        legs,
        abs,
        chest,
        back,
        shoulder
    ]
    workout[Math.floor(Math.random() * workout.length)]();

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
                    if (workoutType === "8") {
                        arms();
                    } else if (workoutType === "9") {
                        legs();
                    } else if (workoutType === "10") {
                        abs();
                    } else if (workoutType === "11") {
                        chest();
                    } else if (workoutType === "12") {
                        back();
                    } else if (workoutType === "13") {
                        shoulder();
                    }
                    return;
                }
                // if the user pressed the random button
                if (pageVal === "random") {
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
$('.armsExercise').on('click', function() {
    arms()
})

$('.legsExercise').on('click', function() {
    legs()
})

$('.absExercise').on('click', function() {
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

$("#return").click(function() {
    localStorage.clear();
    $(location).attr("href", "index.html");
})

// when the document is loaded check the page
$(document).ready(function() { checkPage(); });