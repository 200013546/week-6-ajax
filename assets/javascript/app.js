// Initial array of gifs
var gifs = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pigmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

// displayGivInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    $('#gifs-view').empty();

    var gif = $(this).attr("data-name");
    // var queryURL = "https://www.omdbapi.com/?t=" + gif + "&y=&plot=short&apikey=trilogy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&rating=r&api_key=dc6zaTOxFJmzC&limit=24";

    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            console.log(response);

            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Creating an element to hold the image
            var image = $("<img>");
            image.attr('src', results[i].images.fixed_height_still.url);
            image.attr('data-still', results[i].images.fixed_height_still.url);
            image.attr('data-animate', results[i].images.fixed_height.url);
            image.attr('data-state', 'still');
            image.addClass('image')

            gifDiv.append(pOne);
            // Appending the image
            gifDiv.append(image);

            // Putting the entire gif below the previous gifs
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

// Function for displaying gif data
function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of gif-btn to our button
        a.addClass("gif-btn");
        a.addClass("btn btn-info btn-primary btn-lg");
        // a.addClass("btn btn-primary btn-lg");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding gif from the textbox to our array
    if (gif !== '') {
        gifs.push(gif);
    }

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();

    return false;
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
