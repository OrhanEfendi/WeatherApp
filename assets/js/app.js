const iconImg = document.querySelector("#iconImg");
const currentTemp = document.querySelector("#currentTemp");
const cityName = document.querySelector("#cityName");
const weatherType = document.querySelector("#weatherType");
const inputValue = document.querySelector("#inputValue");
const btnEL = document.querySelector("#btnEL");
const throwErrorMsg = document.querySelector("#throwErrorMsg");
const humidImg = document.querySelector("#humidImg");
const windImg = document.querySelector("#windImg");
const windName = document.querySelector("#windName");
const windRes = document.querySelector("#windRes");
const humidName = document.querySelector("#humidName");
const humidRes = document.querySelector("#humidRes");
const featureDays1 = document.querySelector("#featureDays1");
const featureDays2 = document.querySelector("#featureDays2");
const featureDays3 = document.querySelector("#featureDays3");
const featureDays4 = document.querySelector("#featureDays4");
const featureDays5 = document.querySelector("#featureDays5");
const apiKey = "61c5ef4ea45235b2a6b0227f25d2232e";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
async function getWeatherCurrent(city) {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
    );
    const data = await result.json();
    console.log(data);
    console.log(data.sys.country);
    const temprature = `${Math.floor(data.main.temp)}°C`;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const wType = data.weather[0].main;
    currentTemp.innerHTML = temprature;
    iconImg.src = iconUrl;
    const cityCountry = `${data.name},${data.sys.country}`;
    cityName.innerHTML = cityCountry;
    weatherType.innerHTML = wType;

    const hRes = data.main["humidity"];
    humidRes.innerHTML = `${hRes}%`;
    humidName.innerHTML = "Humidity";
    const wSpeed = data.wind["speed"];
    windRes.innerHTML = `${wSpeed} km/h`;
    windName.innerHTML = "Wind Speed";
    humidImg.style.width = "50px";
    humidImg.style.height = "50px";
    windImg.style.width = "50px";
    windImg.style.height = "50px";
    humidImg.src = "./assets/images/humidity.png";
    windImg.src = "./assets/images/wind.png";
  } catch (error) {
    const errorMSg = "No such country could be found.";
    throwErrorMsg.innerHTML = `${errorMSg}`;
    cityName.innerHTML = "";
    weatherType.innerHTML = "";
    currentTemp.innerHTML = "";
    iconImg.src = "";
    humidRes.innerHTML = ``;
    humidName.innerHTML = "";
    windRes.innerHTML = ``;
    windName.innerHTML = "";
    humidImg.style.width = "";
    humidImg.style.height = "";
    windImg.style.width = "";
    windImg.style.height = "";
    humidImg.src = "";
    windImg.src = "";
    featureDays1.innerHTML = "";
    featureDays2.innerHTML = "";
    featureDays3.innerHTML = "";
    featureDays4.innerHTML = "";
    featureDays5.innerHTML = "";
    setTimeout(function () {
      throwErrorMsg.innerHTML = "";
    }, 1000);
  }
}

btnEL.addEventListener("click", async function () {
  const cityVal = inputValue.value;
  await getWeatherCurrent(cityVal);
  await getWeatherAllDays(cityVal);
  inputValue.value = "";
});

async function getWeatherAllDays(cityAll) {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityAll}&APPID=${apiKey}&units=metric`
    );
    const data = await result.json();
    // console.log("AllDays", data);

    let list = data.list;
    const current = new Date();
    const currentDay = current.getDate();
    let newDaylist = list.filter(function (item, index) {
      if (
        parseInt(item["dt_txt"].slice(8, 10)) !== currentDay &&
        (item["dt_txt"].endsWith("03:00:00") ||
          item["dt_txt"].endsWith("9:00:00") ||
          item["dt_txt"].endsWith("15:00:00"))
      ) {
        return item;
      }
      return false;
    });
    console.log(newDaylist);
    const arr_next_first_day = newDaylist.slice(0, 3);

    const arr_next_second_day = newDaylist.slice(3, 6);

    const arr_next_third_day = newDaylist.slice(6, 9);

    const arr_next_fourth_day = newDaylist.slice(9, 12);

    const arr_next_fifth_day = newDaylist.slice(12, 15);
    console.log(arr_next_fifth_day);
    arrayDays(arr_next_first_day, featureDays1);
    arrayDays(arr_next_second_day, featureDays2);
    arrayDays(arr_next_third_day, featureDays3);
    arrayDays(arr_next_fourth_day, featureDays4);
    arrayDays(arr_next_fifth_day, featureDays5);
  } catch (err) {
    console.log("Error");
  }
}

function arrayDays(arr, htmlTags) {
  let date = new Date(arr[0].dt_txt.slice(0, 10));
  console.log(date);
  console.log(date.getDay());
  let dateWeek = daysOfWeek[date.getDay()];
  console.log(dateWeek);
  htmlTags.innerHTML = `<div class="currentDay d-flex flex-column align-items-center">
  <p class="h1 text-white">${dateWeek}</p>

  <div class="p-2 row">
    <div class="gap-2 d-flex flex-column align-items-center col-4">
      <p class="text-white">${arr[0].dt_txt.slice(11, 16)}</p>
      <img width="20" height="20" src='https://openweathermap.org/img/wn/${
        arr[0].weather[0].icon
      }@4x.png' alt="" />
      <p class="text-white">${Math.floor(arr[0].main["temp"])}°C</p>
    </div>
    <div class="gap-2 d-flex flex-column align-items-center col-4">
      <p class="text-white">${arr[1].dt_txt.slice(11, 16)}</p>
      <img width="20" height="20" src='https://openweathermap.org/img/wn/${
        arr[1].weather[0].icon
      }@4x.png' alt="" />
      <p class="text-white">${Math.floor(arr[0].main["temp"])}°C</p>
    </div>
    <div class="gap-2 d-flex flex-column align-items-center col-4">
      <p class="text-white">${arr[2].dt_txt.slice(11, 16)}</p>
      <img width="20" height="20" src='https://openweathermap.org/img/wn/${
        arr[2].weather[0].icon
      }@4x.png' alt="" />
      <p class="text-white">${Math.floor(arr[0].main["temp"])}°C</p>
    </div>
  </div>
</div>`;
}
