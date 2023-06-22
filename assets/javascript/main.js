// here your apikey
const apiKey = "Your API Key";

const submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  try {
    // css for result
    let result = document.querySelector(".result");
    let box = document.querySelector(".box");
    result.style.display = "block";
    box.style.padding = "2rem";

    // get data from input
    let city = document.getElementById("city").value;
    const data = await fetchData(city);

    // showing data to result page
    showData(data);
  } catch (error) {
    console.log(error);
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
    let temp = document.querySelector(".temperature-number");
    let tempDesc = document.querySelector(".temperature-description");
    let humidity = document.querySelector(".percentage");
    let wind = document.querySelector(".speed");

    temp.innerHTML = Math.floor(data.main.temp);
    tempDesc.innerHTML = data.weather[0].description;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "Km/h";

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
    let result = document.querySelector(".result");
    result.style.display = "none";
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
