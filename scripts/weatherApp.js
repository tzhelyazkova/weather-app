$(document).ready(function() {
	getWeather(function(weatherData) {
		$("#city").html(weatherData.name + ", " + weatherData.sys.country)
		$("#temp").html(toCelsius(weatherData.main.temp));
		$("#weather").html(weatherData.weather[0].main);
		$("#weatherIcon").html("<img src=" + getWeatherIcon(weatherData.weather[0].main) + ">");
		$('.bg-blur').css('background-image', 'url(' + getBackground(weatherData) + ')');
		$('.content').find('.block').css('background-image', 'url(' + getBackground(weatherData) + ')');
	});
    $('.parent').click(function() {
        $('.sub-nav').toggleClass('visible');
    });

	//$('.content').find('.block').css('background', '#ffd2e8');
});
var weatherIcons = {
	"Clouds": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-1-128.png",
	"Snow": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-6-128.png",
	"Sun": "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-128.png",
	"Rain": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-5-128.png",
	"Wind": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-3-128.png",
	"Thunder": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-8-128.png",
	"Night": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-7-128.png",
	"Fog": "https://cdn0.iconfinder.com/data/icons/good-weather-1/96/weather_icons-44-128.png",
	"Mist": "https://cdn0.iconfinder.com/data/icons/good-weather-1/96/weather_icons-44-128.png",
	"default": "https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-1-128.png"
};

var backgroundImgs = {
	"Clouds": "http://img11.deviantart.net/06c6/i/2006/217/5/0/cloudy_sky_v_by_surczak.jpg",
	"Rain": "http://4hdwallpapers.com/wp-content/uploads/2013/05/Great-Rain-Wallpapers.jpg",
	"Snow": "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.siwallpaperhd.com%2Fwp-content%2Fuploads%2F2015%2F06%2Fawesome_weather_wallpaper_hd_14.jpg&f=1",
	"Sun": "http://4.bp.blogspot.com/-0Syq7c-jrWs/UUH819_qfhI/AAAAAAAABzs/D1UIP_x1P2Q/s1600/sunny-day-wallpaper.jpg",
	"Wind": "http://wallpaperawesome.com/wallpapers-awesome/wallpapers-weather-clouds-tornado-rain-cyclone-flashlights-awesome/wallpaper-blow-wind-in-wheat-field-weather.jpg",
	"Fog": "https://images3.alphacoders.com/236/236779.jpg",
	"Mist": "https://images3.alphacoders.com/236/236779.jpg",
	"Thunder": "",
	"Night": "http://back2back.org/wp-content/uploads/374943-night-sky.jpg",
	"default": "http://www.texturex.com/albums/Sky-Textures/sky%20texture%20perfect%20day%20blue%20white%20fluffy%20clouds%20wallpaper%20background.jpg"
};

function getWeatherIcon(weather) {
	if (weatherIcons.hasOwnProperty(weather)) {
		return weatherIcons[weather];
	} else {
		return weatherIcons.default;
	}
};

function getBackground(weatherData) {
	if (isNight(weatherData.sys.sunrise, weatherData.sys.sunset))
		return backgroundImgs.Night;
	else if (backgroundImgs.hasOwnProperty(weatherData.weather[0].main))
		return backgroundImgs[weatherData.weather[0].main];
	else
		return backgroundImgs.default;
}

function getPosition(cb) {
	$.getJSON('http://ip-api.com/json', function(resp) {
		console.log(resp.city + ',' + resp.countryCode);
		return cb(null, resp.city + ',' + resp.countryCode);
	});
};

function isNight(sunrise, sunset) {
	var now = Math.floor((new Date()).getTime() / 1000);
	//console.log("now: " + now + '\n' + "sunrise: " + sunrise + ", sunset: " + sunset);
	return (now > sunset || now < sunrise);
}

function toFahrenheit(temp) {
	return ((temp - 273.15) * 1.8 + 32).toFixed(1) + ' F';
};

function toCelsius(temp) {
	return (temp - 273.15).toFixed(1) + ' C';
}

function getWeather(callback) {
	var appid = "appid=27ab959cfe402f3b8df042c21c1e23b8";
	getPosition(function(err, resp){
		console.log(appid + resp);
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?' + appid + '&q='+ resp, function(json) {
		console.log(JSON.stringify(json));
		return callback(json);
		});
	})
	//http://api.openweathermap.org/data/2.5/weather?appid=27ab959cfe402f3b8df042c21c1e23b8&q=London,UK
};