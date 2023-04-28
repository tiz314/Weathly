let langChoice = "en";

if(document.cookie.split("=")[1] === "it"){
	langChoice = "it";
	document.getElementById("langSwitch").checked = true;
}
else if(document.cookie === ""){
	document.cookie = `lang=${langChoice}`;
}

loadLanguage(langChoice);


function formCheck() {
	let valid = true;
	let input = document.getElementById("cityInputText");

	if (input.value === "") {
		valid = false;
		input.classList.add("is-invalid");
	}
	return valid;
}

// TODO: move to backend
function weatherRequest() { // requests for data and load them

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const input = urlParams.get('city');

	const city = input.split(",")[0];
	const country = input.split(",")[1];

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=xxx&units=metric&lang=${langChoice}`)
		.then(result => {
			if (result.ok) {
				result.json().then(response => {
					let mainIconPath = "./assets/images/main_icons/";
					if (response.weather[0].main === "Clear") {
						document.getElementById("home").style.backgroundImage = "url('./assets/images/sunny.jpg')";
						document.getElementById("weatherIcon").src = mainIconPath + "sunny.svg";
					}
					else {
						document.getElementById("home").style.backgroundImage = "url('./assets/images/clouds.jpg')";
						document.getElementById("weatherIcon").src = mainIconPath + "cloud.svg";
					}

					document.getElementById("cityTitle").innerText = response.name + ", " + response.sys.country;
					document.getElementById("weathDescription").innerText = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.substring(1);

					document.getElementById("temperature").innerHTML = "<b>" + response.main.temp + " C° </b><br>(<span id='feels'></span> " + response.main.feels_like + " C°)";
					document.getElementById("tempRange").innerHTML = "<b>" + response.main.temp_min + " C°</b> to <b>" + response.main.temp_max + " C°</b>";


					document.getElementById("humidity").innerHTML = "<b>" + response.main.humidity + " %</b>";
					document.getElementById("pressure").innerHTML = "<b>" + response.main.pressure + " hPa</b>";
				})
			}
			else if (result.status == 404) {
				const home = document.getElementById("home");
				const footer = document.getElementById("footerContainer");
				home.removeChild(footer);
				home.removeChild(document.getElementById("mainData"));
				const errorText = document.createElement("h1");
				errorText.innerHTML = "City not found!";
				errorText.classList.add("mt-5");
				errorText.classList.add("ps-3");
				home.appendChild(errorText);
				footer.style.marginTop = "70vh";
				home.appendChild(footer);
			}
			else {
				alert("Error while loading the page");
			}
		})
		.catch(error => console.log(error));

}

function switchTheme() {
	if (document.getElementById("themeSwitch").checked === true) {
		document.getElementById("theme").href = "./assets/styles/dark.css";
	}
	else {
		document.getElementById("theme").href = "./assets/styles/light.css"
	}
}

function switchLanguage() {
	if (document.getElementById("langSwitch").checked === true) {
		langChoice = "it";
		document.cookie = `lang=${langChoice}`;
		loadLanguage("it");
	}
	else {
		langChoice = "en";
		document.cookie = `lang=${langChoice}`;
		loadLanguage("en");
	}
}

function loadLanguage(langName) {
	let langSet = (langName === "en") ? lang.en : lang.it;
	document.getElementById("fork").innerHTML = langSet.fork;
	document.getElementById("openData").innerHTML = langSet.openData;
	document.getElementById("About").innerHTML = langSet.about;
	document.getElementById("settings").innerHTML = langSet.settings;
	document.getElementById("login").innerHTML = langSet.log;
	if (location.pathname === "/") {
		document.getElementById("mainTitle").innerHTML = langSet.title;
		document.getElementById("cityInputText").placeholder = langSet.searchBox;
		document.getElementById("cityInputSubmit").innerHTML = langSet.search;
	}
	else if (location.pathname === "/about") {
		document.getElementById("aboutMessage").innerHTML = langSet.aboutMessage;
	}
	else if(location.pathname === "/earth"){
		weatherRequest();
	}
}