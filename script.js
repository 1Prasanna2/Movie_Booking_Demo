/*
Step 1 : Get references to DOM elements
*/

//Get a reference  to the main container
const container = document.querySelector(".container");

//Reference to the all available seats
const seats = document.querySelectorAll(".row .seat:not(.sold)");

//Reference to the count and total elements
const count = document.getElementById("count");
const total = document.getElementById("total");

//Reference to the movie drop-down
const movieSelect = document.getElementById("movie");


/* 
Step 2: Add event listeners
*/

// Event Listener for movie selection change
movieSelect.addEventListener("change", e => {
    // Update price and store selected movie data
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

// Event Listener for seat clicks
container.addEventListener("click", e => {
    // check if a seat is clicked and not sold
    if(e.target.classList.contains("seat") && !e.target.classList.contains("sold")){
        //Toggle seat selection
        e.target.classList.toggle("selected");

        //Update displayed  count and total
        updateSelectedCount();
    }
});

function updateSelectedCount(){
    // Get all selected seats
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    //Get an array of selected seat's indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    // Store selected seats index into local storage
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))

    //Calculate selected seats and count
    const selectedSeatsCounts = selectedSeats.length;

    // Update Ui with selected seats count and total price
    count.innerText = selectedSeatsCounts;
    total.innerText = selectedSeatsCounts * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex",movieIndex);
    localStorage.setItem("selectedMoviePrice",moviePrice);
}

// Function to populate UI from local storage data
function populateUI(){
    // get selected seats from local storage
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    // If there are selected seats, mark them as selected in the UI
    if(selectedSeats != null && selectedSeats.length > 0)
    {
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    // Get selected movie data from local storage
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    //If there's a selected movie index then set in the dropdown
    if(selectedMovieIndex !== null)
    {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

populateUI();

//Initialize ticket price
let ticketPrice = +movieSelect.value;

updateSelectedCount();