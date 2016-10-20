

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
	root: "https://api.themoviedb.org/3",
	token: "65bdcc0f443f3a601683b45a0dc91a84" // TODO put your api key here
}

/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            model.browseItems = response.results;
            console.log(model)
        //     $("#gif").attr("src", response.data.image_url);
        //     console.log(response.data.image_url);
        //     // 2. hide the feedback message and display the image
        //     $("#gif").attr("hidden", false);
        //     $("#captchaFeedback").attr("hidden", true);
        //     $("#captcha").removeClass("invalid-field");
        //     setGifLoadedStatus(true);
        // },
        // error: function() {
        //     // if something went wrong, the code in here will execute instead of the success function
        //
        //     // give the user an error message
        //     $("#feedback").text("Sorry, could not load GIF. Try again!");
        //     setGifLoadedStatus(false);
        // }

			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  $("#section-browse ul").empty();
  $("#section-watchlist ul").empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  // for each movie on the current browse list,
  model.watchlistItems.forEach(function(movie) {
        movieElem = $("<li>").html(movie.original_title);
        $("#section-watchlist ul").append(movieElem);   //("#header ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');
  });


  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
        movieElem = $("<li>").html(movie.original_title);
        //movieElem = $("<li></li>").text(movie.original_title)
        $("#section-browse ul").append(movieElem);   //("#header ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');

		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
        var myButton = $("<button></button>").text("Add to WatchList");
        $("#section-browse li:last-child").append(myButton);

		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
        myButton.click(function() {
            console.log("You clicked my button!");
            model.watchlistItems.push(movie)
            console.log("I love you!");
            render();
        });
  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
