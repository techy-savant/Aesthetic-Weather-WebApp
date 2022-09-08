let weather = {
    apiKey: "8ad1a78607b5ad7402e67da5049ef03d",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=metric&appid=" 
             + this.apiKey
        )
        .then((res) => res.json())
        .then((data) => this.displayWeather(data))
        .catch((err) => console.log(err))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { lon, lat } = data.coord;
        console.log(name,icon,description,temp,humidity,speed,lon,lat);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".latAndlong").innerText = "Lat: " + lat +" " + 
        "& " + "Long: " + lon;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading"); //removes loading classlist so the site doesn't give blank screen
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + name + "')"; //Makes the bg images be pictures of searched city
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", ()=> {
    weather.search();
}) 
document.querySelector(".search input").addEventListener("keyup", (event)=>{ //keyup makes searches occur when typed(but if used if event.key =enter , its for only enter key)
    if(event.key == "Enter"){
        weather.search();
    } return false
})

weather.fetchWeather("Nigeria");