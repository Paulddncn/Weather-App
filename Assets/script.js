var searchBtn = document.querySelector(".search-btn")
var searchInput = document.querySelector("#search-input")
var key = '11a69b2b8d9505e35af4031a2fe1c8ca'

var currentCity = document.querySelector("#current-city")
var date = document.querySelector("#date")
var weatherIcon = document.querySelector("#weather-icon")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humid = document.querySelector("#humidity")

var forecastDate = document.querySelectorAll(".forecast-date")
var forecastIcon = document.querySelectorAll(".icon")
var forecastTemp = document.querySelectorAll(".forecast-temp")
var forecastWind = document.querySelectorAll(".forecast-wind")
var forecastHumidity = document.querySelectorAll(".forecast-humidity")
//  {Date} dateObject
// function formatDate(dateObject) {
//   const parts = {
//     date: dateObject.getDate(),
//     month: dateObject.getMonth() + 1,
//     year: dateObject.getFullYear()
//   



// var today = dayjs().format('MMM D, YYYY');
// $('#date').text(today);

searchBtn.addEventListener("click", function () {

  getGeoLocation();
})


var getGeoLocation = function () {
  var citySearch = searchInput.value
  var geoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&appid=` + key
  fetch(geoCoding)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0].lat, data[0].lon);
      getCurrentWeather(data[0].lat, data[0].lon);
      getWeatherForecast(data[0].lat, data[0].lon);
    })
};

var getCurrentWeather = function (lat, lon) {
  var currentWeather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key + "&units=imperial";
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     
      console.log(data)
      

      temperature = (data.main.temp)
      windSpeed = (data.wind.speed)
      humid = (data.main.humidity)
      icon = (data.weather[0].icon)
      console.log(icon)
      var today = dayjs();

      date.textContent = today.format('MMM D, YYYY');
      currentCity.textContent = "City: " + searchInput.value
      weatherIcon.textContent = "http:openweathermap.org/img/wn/" + icon + ".png";
      temp.textContent = "Temp: " + temperature + "°"
      wind.textContent = "windspeed: " + windSpeed + "mph"
      humidity.textContent = "Humidity: " + humid + "%"
      
    })
}

var getWeatherForecast = function (lat, lon) {
  var fiveDayForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + "&units=imperial";
  
  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var today = dayjs();
      console.log(data)
    
      for (let index = 0; index < data.list.length; index = index + 8) {
        var humid = (data.list[index].main.humidity)
        var windSpeed = (data.list[index].wind.speed)
        var temperature = (data.list[index].main.temp)
        var day = today.add(index/8 + 1, 'day')
        console.log(index)

      
        //currentCity.textContent = "City: " + searchInput.value

        //forecastIcon[index/8].textContent = "http:openweathermap.org/img/wn/" + icons + ".png"
        forecastDate[index / 8].textContent = day.format('MMM D, YYYY');
        forecastTemp[index / 8].textContent = "Temp: " + temperature + "°"
        forecastWind[index / 8].innerHTML = "Windspeed: " + windSpeed + "mph";
        forecastHumidity[index / 8].textContent = "Humidity: " + humid + "%";




      }
    })
}














