function formCheck() {
	var valid = true;
	var input = document.getElementById("cityInputText");

	if (input.value === "") {
		valid = false;
		input.classList.add("is-invalid");
	}
	return valid;
}


function weatherRequest() { // requests for data and load them

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const input = urlParams.get('city');

	const city = input.split(",")[0];
	const country = input.split(",")[1];


	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&APPID="+properties.APIKey+"&units=metric";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onload = function (data, status) {
		if (xhr.status === 200) {
			const response = JSON.parse(xhr.response);
			console.log(response);


			var mainIconPath = "./assets/images/main_icons/";
			if(response.weather[0].main === "Clear"){
				document.getElementById("home").style.backgroundImage = "url('./assets/images/sunny.jpg')";
				document.getElementById("weatherIcon").src = mainIconPath + "sunny.svg";
			}
			else{
				document.getElementById("home").style.backgroundImage = "url('./assets/images/clouds.jpg')";
				document.getElementById("weatherIcon").src = mainIconPath + "cloud.svg";
			}

			document.getElementById("cityTitle").innerText = response.name + ", " + response.sys.country;
			document.getElementById("weathDescription").innerText = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.substring(1);

			document.getElementById("temperature").innerHTML = "<b>" + response.main.temp + " C° </b><br>(Feels like " + response.main.feels_like + " C°)";
			document.getElementById("tempRange").innerHTML = "<b>" + response.main.temp_min + " C°</b> to <b>" + response.main.temp_max + " C°</b>";


			document.getElementById("humidity").innerHTML = "<b>" + response.main.humidity + " %</b>";
			document.getElementById("pressure").innerHTML = "<b>" + response.main.pressure + " hPa</b>";

		} else {
			const home = document.getElementById("home");
			home.removeChild(document.getElementById("mainData"));
			const errorText = document.createElement("h1");
			errorText.innerHTML = "City not found!";
			errorText.classList.add("mt-5");
			errorText.classList.add("ps-3");
			home.appendChild(errorText);
		}
	};
	xhr.onerror = function (err) {
		console.log(`Network Error`, err);
	};
	xhr.send();
}