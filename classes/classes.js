$(document).ready(function () {

    // First axios request to generate the class buttons
    var axiosReq = function () {

        var queryURL = "https://raw.githubusercontent.com/BTMorton/dnd-5e-srd/master/json/02%20classes.json";

        axios.get(queryURL)

            .then(function (response) {

                var resp = response.data;
                var classArr = Object.keys(resp);


                var btnDiv = $("#button-container");


                for (var i = 0; i < 12; i++) {

                    var className = classArr[i];

                    var newBtn = $("<button>");
                    var newCard = $("<div>").addClass("card");
                    var title = $("<h3>").addClass("card-header");

                    newCard.attr("id", className);
                    newBtn.attr("class-id", className);
                    newBtn.text("More Info");
                    newBtn.addClass("click-me");
                    newBtn.addClass("btn btn-primary")
                    newBtn.attr("status", "new");
                    newBtn.attr("url", "https://raw.githubusercontent.com/BTMorton/dnd-5e-srd/master/json/02%20classes.json")

                    title.text(className);

                    newCard.appendTo(btnDiv);
                    title.appendTo(newCard);
                    newBtn.appendTo(newCard);

                };
            }).catch(function (err) {
                console.error(err);
            });

    };

    //function to get and display aditional class data
    $(document).on("click", ".click-me", function extraInfo() {

        //holds the class and status of the clicked button
        activeClass = $(this).attr("class-id");
        status = $(this).attr("status");

        if (status === "clicked") {

            $(this).attr("status", "new");
            $(profDiv).remove();
            
        }
        else {
            $(this).attr("status", "clicked")

            // save the class url into a variable
            var URL = $(this).attr("url");

            axios.get(URL)
                .then(function (newRes) {

                    //variables holds response data and class names
                    var resp1 = newRes.data;

                    //holds the length of the active class data
                    prof1 = resp1[activeClass]["Class Features"]["Proficiencies"]["content"];

                    //Create a Div for extra information
                    classDiv = $("#" + activeClass);
                    profDiv = $("<div>");

                    //loops through 'proficiency' data for the class
                    for (var x = 0; x < prof1.length; x++) {

                        proftext = $("<h6>");

                        profDiv.addClass("Extra-info");
                        profDiv.attr("character", activeClass);
                        classDiv.append(profDiv);
                        profDiv.append(proftext);
                        proftext.text(prof1[x]);
                    }

                    return axios.get(URL);

                }).then(function(feat){
                    
                    var featData = feat.data;

                    //var and loop for features. var for features length
                    features = featData[activeClass]["Class Features"]["The " + activeClass]["table"]["Features"];
                    featuresLength =  featData[activeClass]["Class Features"]["The " + activeClass]["table"]["Features"].length;
                    
                    //get rid of "ability score improvements"
                    features.splice(11, 1);
                    ftDiv = $("<div>");

                    var queso = $("<h4>");
                    queso.text("Features");
                    $("<br>").appendTo(ftDiv);
                    queso.appendTo(ftDiv);

                    // for loop for class features
                    for (var y = 0; y < featuresLength; y++) {

                        // var to hold the features names
                        classFeatures = features[y];
                        // we use previous variable to access our axios response
                        singleFeature = featData[activeClass]["Class Features"][classFeatures];
                        // we create and append div to display data
                        ftP = $("<h6>");

                        ftP.text("** " + classFeatures + ": " +singleFeature);

                        ftP.appendTo(ftDiv);
                        ftDiv.appendTo(profDiv);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
        }

    });


    axiosReq();
});