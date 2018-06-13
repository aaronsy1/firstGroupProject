//create spell array
var url = "https://raw.githubusercontent.com/vorpalhex/srd_spells/master/spells.json";
var spellArray = []
$(document).ready(function () {
	axios
		.get(url)
		.then(function (response) {
			for (var i = 0; i < response.data.length; i++) {
				var $spellFilter = $('#spell-filter');
				$spellFilter
					.append(
						'<div class="col-12 col-sm-auto py-1 px-2 p-sm-2 text-center spell-shortcut" style="display: none"><button class="btn btn-light spell-button btn-block">' + response.data[i].name + '</button></div>'
					)
			}
		})

		.catch(function (error) {
			console.log(error);
		});
});



// dice click
$(document.body).on("click", ".dice-button", function () {
	//random number function
	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//jquery variables
	var $dice = $(this).text();
	var $diceDiv = $(this).parent();
	var $this = $(this);
	var diceCount = $(this)
		.siblings('.card')
		.children('.card-body')
		.children('.dice-count')
		.text();
	diceCount = parseInt(diceCount);
	diceCount++;
	$(this)
		.siblings('.card')
		.children('.card-body')
		.children('.dice-count')
		.text(diceCount);

	//set dice roll html and animation
	var $card = $('<div class="card mx-auto mt-2 roll animated bounceIn" style="z-index: -1"></div>');
	var $cardBody = $('<div class="card-body p-1 text-center"></div>');
	$this.after($card);
	$card.append($cardBody);
	var x = 0;
	var intervalID = setInterval(function () {
		$($cardBody).html(getRndInteger(1, $dice));
		if (++x === 16) {
			window.clearInterval(intervalID);
		}
	}, 30);

	//calculate totals and update on page
	setTimeout(function () {
		var total = $this
			.siblings('.card')
			.children('.card-body')
			.children('.total')
			.text();
		if (total === "-") {
			total = 0;
		}
		total = parseInt(total);
		var roll = parseInt($card.text());
		total = total + roll;
		$this
			.siblings('.card')
			.children('.card-body')
			.children('.total')
			.text(total);
	}, 505);
});



//reset dice click
$(document.body).on("click", "#reset-button", function () {
	$('.total').text('-');
	$('.dice-count').text('0');
	$('.roll').remove();
});



//dynamic filter
function myFunction() {
	$('.spell-shortcut').each(function () {
		var $input = $('#spell-input').val().toUpperCase();
		var $this = $(this);
		if ($input === '') {
			$this.css('display', 'none');
		} else {
			if ($this.text().toUpperCase().indexOf($input) > -1) {
				$this.css('display', 'initial');
			} else {
				$this.css('display', 'none');
			}
		}
	})
}



//spell button on click
$(document.body).on("click", ".spell-button", function () {
	var $this = $(this);
	var spellName = $this.text().toUpperCase();
	axios
		.get(url)
		.then(function (response) {
			console.log(spellName)
			$("#spell-info-col")
				.children()
				.remove();
			var spellIndex;
			for (i = 0; i < response.data.length; i++) {
				if (response.data[i].name.toUpperCase() === spellName) {
					spellIndex = i;
					break;
				}
			}

			var description = response.data[spellIndex].description;
			var duration = response.data[spellIndex].duration;
			var level = response.data[spellIndex].level;
			var range = response.data[spellIndex].range;
			var name = response.data[spellIndex].name;
			var higherLevels = response.data[spellIndex].higher_levels;
			$("#spell-info-col").append(
				'<div class="card mt-1 animated fadeIn"></h5><div class="card-body" id="spell-description"><h5 class="card-title">' +
				name +
				"</h5></div></div>"
			);
			$("#spell-description").append("<div>Level: " + level + "</div>");
			$("#spell-description").append("<div>Range: " + range + "</div>");
			$("#spell-description").append("<p>Duration: " + duration + "</p>");

			if (higherLevels != undefined) {
				$("#spell-description").append("<p>" + description + "</p>");
				$("#spell-description").append("<div>" + higherLevels + "</div>");
			} else {
				$("#spell-description").append("<div>" + description + "</div>");
			}
			$('.spell-shortcut').each(function () {
				$(this).css('display', 'none');
				$('#spell-input').val('');
			});
		})

		.catch(function (error) {
			console.log(error);
		});

})
