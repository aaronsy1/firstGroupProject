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
    console.log();
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
    console.log(input);

    //get request for spell number
    axios.get('http://www.dnd5eapi.co/api/spells/?name=' + input)
        .then(function (response) {
            console.log(response);
            var url = response.data.results[0].url;
            return axios.get(url);
        })

        //second request to get data
        .then(function (response) {
            console.log(response);
            var description = response.data.desc[0];
            console.log(description);
            var regExpr = /[^a-zA-Z0-9-. ]/g;
            description = description.replace(regExpr, '\'');
            console.log(description);
            $('#spell-info-col').children().remove();
            $('#spell-info-col').append('<div class="card mb-3"></h5><div class="card-body"><h5 class="card-title">' + input + '</h5><p>' + description + '</p></div></div>');
            //text cleanup

        })

        //error
        .catch(function (error) {
            console.log(error);
        });
})
