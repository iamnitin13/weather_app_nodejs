const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherInfo = document.querySelector(".weather-info .info");
const city = document.querySelector("#cityoutput");
const descrip = document.querySelector("#description");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");

let overlay = document.getElementsByClassName("loading-overlay")[0];

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!search.value) {
    return;
  }

  const location = search.value;
  overlay.classList.toggle("is-active");

  fetch("/weather?address=" + location).then((response) => {
    overlay.classList.toggle("is-active");
    response.json().then((res) => {
      if (res.error) {
        const p = document.createElement("p");
        p.innerHTML = `Error: ${res.error}`;
        p.style.color = "red";
        weatherInfo.appendChild(p);
      } else {
        city.innerHTML = `Weather of <span>${res.city}<span>`;
        temp.innerHTML = `Temperature: <span>${res.temp} &#x2103</span>`;
        descrip.innerHTML = `Sky Conditions: <span>${res.description}<span>`;
        wind.innerHTML = `Wind Speed: <span>${res.wind} km/h<span>`;
      }
    });
  });
});

weatherForm.addEventListener("reset", (e) => {
  e.preventDefault();
  search.value = "";
  document.querySelectorAll("p").innerHTML = "";
  city.innerHTML = "";
  temp.innerHTML = "";
  descrip.innerHTML = "";
  wind.innerHTML = "";
});
