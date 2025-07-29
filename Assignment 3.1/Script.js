        // Create an empty array to store movie titles
        let arrMovies = [];

        // Function to add a new movie to the array and update the display
        function addMovie() {
            // Get the input element by ID
            let txtMovie = document.getElementById("txtMovie");

            // Get and trim the user input
            let movieTitle = txtMovie.value.trim();

            // Check if input is not empty
            if (movieTitle) {
                // Add movie to the array
                arrMovies.push(movieTitle);

                // Clear the input field
                txtMovie.value = "";

                // Display the updated movie list
                showMovies();
            }
        }

        // Function to display the movie list in sorted order
        function showMovies() {
            // Get the div where the list will be shown
            let divMovieList = document.getElementById("divMovieList");

            // Sort the array alphabetically
            arrMovies.sort();

            // Display each movie, separated by a line break
            divMovieList.innerHTML = arrMovies.join("<br>");
        }

        // Function to clear the movie list
        function resetMovieList() {
            // Empty the array
            arrMovies = [];

            // Clear the display area
            showMovies();
        }