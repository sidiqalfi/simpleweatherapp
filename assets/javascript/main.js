// here your apikey
const apiKey = "Your API Key";

const submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  try {
    // css for main page
    let box = document.querySelector(".box");
    let main = document.querySelector(".main");
    box.style.padding = "2rem";
    main.style.display = "block";

    // get data from input
    let city = document.getElementById("city").value;
    const data = await fetchData(city);

    // showing data to result page
    showData(data);
  } catch (error) {
    console.error(error);
  }
});

// get data from API
async function fetchData(city) {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Show data to result page
function showData(data) {
  if (data.cod == 200) {
    let temperatureData = document.querySelector(".main-temperature-data");
    let temperatureDescription = document.querySelector(
      ".main-temperature-description"
    );
    let humidity = document.querySelector(".second-layout-data-percentage");
    let windSpeed = document.querySelector(".second-layout-data-speed");

    temperatureData.innerHTML = Math.floor(data.main.temp);
    temperatureDescription.innerHTML = data.weather[0].description;
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "Km/h";

    // hidden error page
    let error = document.querySelector(".error");
    error.style.display = "none";

    // change the weather image
    changeImage(data.weather[0].main);
  } else {
    // display the error page
    let error = document.querySelector(".error");
    error.style.display = "block";

    // hidden the result page
    let main = document.querySelector(".main");
    main.style.display = "none";
  }
}

function changeImage(data) {
  const imagePaths = {
    Clear: "assets/images/clear.png",
    Rain: "assets/images/rain.png",
    Mist: "assets/images/mist.png",
    Snow: "assets/images/snow.png",
    Clouds: "assets/images/cloud.png",
    Haze: "assets/images/cloud.png",
  };

  let image = document.querySelector(".weather-img");
  image.setAttribute("src", imagePaths[data] || "");
}
