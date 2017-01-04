
	   //seachButton holds the query comming from button
		var searchButton = document.querySelector('button');

		var loadingText  = document.querySelector('#load');
		var weatherBox = document.querySelector('#weather');
		console.log(weatherBox);

		var weatherCity = document.querySelector('#weatherCity');
		var weatherDescription = document.querySelector('#weatherDescription');
		var weatherTemperature = document.querySelector('#weatherTemperature');


		searchButton.addEventListener('click',searchWeather);

		function searchWeather()
		{
			var cityName = city.value.toUpperCase();
			

			loadingText.style.display= 'block';
			weatherBox.style.display= 'none';

			if(cityName.length == 0){
				return alert("please enter city name ");
			}

			var http = new XMLHttpRequest();

			var apikey="57bded1ce073240af86247ed285ffc79";

			var url ='http://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&units=metric&appid='+ apikey;

			var method= "GET";

			var myWeatherData;

			http.open(method,url);
			http.onreadystatechange = function()
			{
				if(http.readyState==XMLHttpRequest.DONE && http.status===200){
					var data = JSON.parse(http.responseText);
				 	var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
					weatherData.temperature	= data.main.temp;
					//console.log(weatherData);

					updateWeather(weatherData);
				}
 
				else if(http.readyState==XMLHttpRequest.DONE ){
					alert('something went to wrong');
				}

				console.log(weatherData.description);

				if (weatherData.description.includes("SMOKE")) {
					document.querySelector('body').style.backgroundImage = "url(images/smog.jpg)";
					document.querySelector('body').style.backgroundColor = "black";
					console.log("wallparer set");
				}
				else if (weatherData.description.includes("RAIN")){} 
			}

			http.send();


		}

		function updateWeather(weatherData){

			weatherCity.textContent = weatherData.cityName;
			weatherDescription.textContent = weatherData.description;
			weatherTemperature.textContent = weatherData.temperature;

			weatherBox.style.display = 'block';
		}


	

	
	function Weather(cityName, description){
		this.cityName = cityName;
        this.description = description;
		this._temperature ='';
	}

	Object.defineProperty(Weather.prototype,'temperature', {
	
		set : function(value){
			this._temperature =(value).toFixed(2) + ' \u00B0C.';
		},

		get : function(){
			return this._temperature;
		}
	
    });


	

