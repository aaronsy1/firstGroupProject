// dice click
$(document.body).on('click', '.btn-secondary', function () {
    //get dice value
    var $dice = $(this).text();
    var $diceDiv = $(this).parent();

    //random number function
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //set dice roll and create on page
    var roll = getRndInteger(1, $dice);
    var $card = $('<div class="card mx-auto mt-2 roll"><div class="card-body p-1 text-center">' + roll + '</div></div>');
    $(this).after($card);

    //calculate totals and update on page
    var total = $(this).siblings(':first').children().children().text();
    if (total === '-') {
        total = 0;
    } else {

    }
    total = parseInt(total);
    total = total + roll;
    $(this).siblings(':first').children().children().text(total);
})



//reset dice click
$(document.body).on('click', '#reset-button', function () {
    $('.total').text('-');
    $('.roll').remove();
})



//search spell click
$(document.body).on('click', '#spell-search', function () {
    //get user input
    var input = $('#spell-input').val();
    input.replace('/ /g', '+');

    //get request for spell number
    axios.get('http://www.dnd5eapi.co/api/spells/?name=' + input)
        .then(function (response) {
            var url = response.data.results[0].url;
            return axios.get(url);
        })

        //second request to get data
        .then(function (response) {            
            var description = response.data.desc[0];

            //cleanup weird sybols
            var regExpr = /[^a-zA-Z0-9-. ,;:"'()?]/g;
            description = description.replace(regExpr, '\'');
            description = description.replace(/'''/g, '\'');

            //add to hmtml
            $('#spell-info-col').children().remove();
            $('#spell-info-col').append('<div class="card mb-3"></h5><div class="card-body" id="spell-description"><h5 class="card-title">' + input + '</h5><p>' + description + '</p></div></div>');

            //add extra description info
            if (response.data.desc.length > 1) {
                for (i = 1; i < response.data.desc.length; i++) {
                    description = response.data.desc[i];
                    description = description.replace(regExpr, '\'');
                    description = description.replace(/'''/g, '\'');
                    $('#spell-description').append('<p>' + description + '</p>');
                }
            }

            //add extra levels spell damage
            if (response.data.higher_level) {
                description = response.data.higher_level[0];
                description = description.replace(regExpr, '\'');
                description = description.replace(/'''/g, '\'');
                $('#spell-description').append('<p>' + description + '</p>');
            }
        })

        //error
        .catch(function (error) {
            console.log(error);
        });
})
