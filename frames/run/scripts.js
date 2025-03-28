import { data } from "./data.js";
import { banner } from "./banner.js";

const day = document.getElementById("day");
const profit = document.getElementById("profit");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const lastDayProfit = document.getElementById("last-day-profit");

day.textContent = data.nextDay;

profit.textContent = data.progress;
if (data.progress[0] === "-") {
  profit.classList.add("error");
  progressBar.classList.add("error");
}

const progressCalc = Math.round(
  parseFloat(data.progress.replace("€", "")) / 100
);
progress.textContent = "Прогресс " + progressCalc + "%";
progressBar.style.width = Math.abs(progressCalc) + "%";

lastDayProfit.textContent = data.lastDayProfit;
if (data.lastDayProfit[0] === "-") {
  lastDayProfit.classList.add("error");
}

const subtitleList = document.querySelector(".subtitle-list");
const items = document.querySelectorAll(".subtitle-list .subtitle-item");
let subtitletIndex = 0;
items[subtitletIndex].classList.add("visible");

const bannerWidget = document.querySelector(".banner-widget");
const bannerSlider = document.querySelector(".banner-slider");
const bannerSliderList = document.querySelectorAll(".banner-slide");
const bannerTitle = document.querySelector(".banner-title");
const bannerHref = document.querySelector(".banner-href");

let bannerIndex = 0;
const slideDuration = 5000; // 1 секунд для показа слайда баннера

function setBanner() {
  bannerWidget.style.backgroundColor = banner[bannerIndex].color;
  bannerTitle.innerHTML = banner[bannerIndex].title;
  bannerHref.innerHTML = banner[bannerIndex].href;

  setTimeout(() => {
    bannerSlider.style.transition = `left 100ms ease-in-out`;
    bannerSlider.style.left = "-100%";
    setTimeout(() => {
      bannerSlider.style.left = "0";
      bannerIndex = (bannerIndex + 1) % banner.length;
      setBanner();
    }, slideDuration);
  }, slideDuration);
}

setBanner();

const transitionInDuration = 1000; // 1 секунда для расширения
const transitionOutDuration = 2000; // 2 секунды для сужения
const displayDuration = 17000; // 17 секунд для показа элемента

function animate() {
  // Расширение до 100%
  subtitleList.style.transition = `width ${transitionInDuration}ms ease-in-out`;
  subtitleList.style.width = "100%";
  setTimeout(() => {
    // Задержка на показ элемента
    setTimeout(() => {
      // Сужение до 0%
      subtitleList.style.transition = `width ${transitionOutDuration}ms ease-in-out`;
      subtitleList.style.width = "0%";
      // После завершения анимации переключаем элемент
      setTimeout(() => {
        items[subtitletIndex].classList.remove("visible");
        subtitletIndex = (subtitletIndex + 1) % items.length;
        items[subtitletIndex].classList.add("visible");
        // Перезапуск анимации
        animate();
      }, transitionOutDuration);
    }, displayDuration);
  }, transitionInDuration);
}

animate();
