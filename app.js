const apiKey = '9ad00d36a16f64e467187813dae99250';
const imgLink = "img/";

const ENTERKEY = 13;

const userInput = document.getElementById('user-input');
const button = document.getElementById('button');
const locationOutput = document.getElementById('location');
const dayOutput = document.getElementsByClassName('day');
const icons = document.getElementsByClassName('icon');
const temperature = document.getElementsByClassName('temperature');
const appBackground = document.getElementsByClassName('container');

console.log(appBackground);

let newDay = new Date();
let today = newDay.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Displays the days of the week 
for (d=0; d < dayOutput.length ; d++ ,today++){
    if (today >= 7){
        today = 0;
    }
    dayOutput[d].innerHTML = days[today];
};

// When targeting inputfield 'ENTERKEY' is bound to click on the search button
userInput.addEventListener('keyup', (e) => {
    if (e.keyCode === ENTERKEY){
        e.preventDefault();
        button.click();
    }
});

// When the search button is clicked this function will run 
button.addEventListener('click', () => {
    
    //the input the user gives using the search field
    let city = userInput.value;

    //JQuery command to request the api-data in a json file
    $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=9ad00d36a16f64e467187813dae99250`, (data) => {

        //Showcases the given location at the top of app
        locationOutput.innerHTML = `${data.city.name},${data.city.country}`;

        //a loop to add the corresponding data to each card
        for (i=0 , d=0; i < icons.length; i++ , d+=8){
            temperature[i].innerHTML = `${Math.round(data.list[d].main.temp)}°C`;
        };

        //Change the background based on the weather today
        const weatherOutput = data.list[0].weather[0].icon;
        switch (weatherOutput){
            case '01d':
            case '02d':
                appBackground[0].style.background = 'url(img/hot.jpg)';
                break;
            case '03d':
            case '04d':
            case '13d':
                appBackground[0].style.background = 'url(img/snow.jpeg)';
                break;
            case '09d':
            case '10d':
                appBackground[0].style.background = 'url(img/rain.jpeg)';
                break;
            case '11d':
                appBackground[0].style.background = 'url(img/cloudy.jpeg)';

        };
    });
});