
//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city


var weatherIcon = ''
var searchBtn = document.querySelector(".search-btn")
var forecastTemp = document.querySelector(".forecast-temp")
var temperature = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector(".forecast-humidity")
var uvindex = document.querySelector("#uvindex")
var weatherIcon = document.querySelector("#weather-icon")
var fiveDayForecast = document.querySelector("#five-day-forecast")
var searchInput = document.querySelector("#search-input")
var citySearch = searchInput.value
var key = '11a69b2b8d9505e35af4031a2fe1c8ca'



//var today = dayjs();
//$('#date').text(today.format('MMM D, YYYY'));


//var today = dayjs().format('MMM D, YYYY');
//$('#date').text(today);



searchBtn.addEventListener("click", function () {
  getGeoLocation(citySearch);
})


var getGeoLocation = function () {
  var geoCoding = 'http://api.openweathermap.org/geo/1.0/direct?q=Denver&appid=' + key
  fetch(geoCoding)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0].lat, data[0].lon);
      getCurrentWeather(data[0].lat, data[0].lon);
    })
};

var getCurrentWeather = function (lat, lon) {
  var fiveDayForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key;
  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.list[0].wind) 
      console.log(data)
      var temp = data.list[0].main.temp
      var humid = data.list[0].main.humidity
      console.log(temp)

      for (let index = 0; index < data.list.length; index = index + 8) {
          humidity = (data.list[index].main.humidity)
          temp = (data.list[index].main.temp)
          temp = ((temp-273.15)*1.+32).toFixed()

          forecastTemp.textContent = "temperaure: " + temp + "°"
          humidity.textContent = "humidity: " + humid
          console.log(humid)

      }})}
         










 