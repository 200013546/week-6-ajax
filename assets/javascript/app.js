var gifs = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pigmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

function displayGifInfo() {
    $('#gifs-view').empty();
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&rating=r&api_key=dc6zaTOxFJmzC&limit=24";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            console.log(response);
            var gifDiv = $("<div class='gif'>");
            var rating = results[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            var image = $("<img>");
            image.attr('src', results[i].images.fixed_height_still.url);
            image.attr('data-still', results[i].images.fixed_height_still.url);
            image.attr('data-animate', results[i].images.fixed_height.url);
            image.attr('data-state', 'still');
            image.addClass('image')
            gifDiv.append(pOne);
            gifDiv.append(image);
            $("#gifs-view").append(gifDiv);
        }

        $('.image').on('click', function () {
            var state = $(this).attr('data-state');
            console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });
    });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++) {

        var a = $("<button>");
        a.addClass("gif-btn");
        a.addClass("btn btn-info btn-primary btn-lg");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    if (gif !== '') {
        gifs.push(gif);
    }
    renderButtons();

    return false;
});

$(document).on("click", ".gif-btn", displayGifInfo);
renderButtons();
