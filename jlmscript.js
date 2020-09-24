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
        $(".push3").append("Easy: 6-8 reps, 3 sets each <br> Medium: 8-10 reps, 4 sets each <br> Hard: 10-12 reps, 4 sets each <br>");
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