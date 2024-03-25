// Initalizing all Elements Constants ! 
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form")

// Adding Event Listner to the Form 
form.addEventListener("submit", search)
// Default Location 
let target = "Karachi"

// Function to Fetch data from Weather API ! 
const fetchData = async (target) => {
    try {

        const url = `https://api.weatherapi.com/v1/current.json?key=b157e70e274843f488485313241202&q=${target}`


        const response = await fetch(url);
        const data = await response.json();

        // Destructure & Desturucting Data ! 
        console.log(data);

        const {
            current: {
                temp_c,
                condition: {
                    text,
                    icon
                }
            },
            location: {
                name,
                localtime
            }
        } = data;
        
        // Calling Update Function ! 
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not Found");
    }
};

// Function to Update DOM ! 
function updateDom(temeprature, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());
    temperatureField.innerText = temeprature;
    cityField.innerText = city;
    // console.log(exactTime);
    // console.log(exactDate);
    // console.log(exactDay);
    dateField.innerText = `${exactTime} - ${(exactDay)} - ${exactDate}`
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);





// Function to Search Location ! 
function search  (e) {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
    
}


// Function to get name of the Day ! 
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday";

        default:
            return "Don't Know";
    }
};