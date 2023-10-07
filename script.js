const playButton = document.querySelector(".play");
const lapButton = document.querySelector(".lap");
const resetButton = document.querySelector(".reset");
const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");
const centiSecond = document.querySelector(".msec");
const laps = document.querySelector(".laps");

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let centiCounter = 0;
let lapItem = 0;
let interval;

const toggleButton = () => {
  lapButton.classList.toggle("hidden");
  resetButton.classList.toggle("hidden");
};

const startTimer = () => {
  interval = setInterval(() => {
    centiCounter++;
    if (centiCounter === 100) {
      centiCounter = 0;
      secCounter++;
      if (secCounter === 60) {
        secCounter = 0;
        minCounter++;
      }
    }
    updateDisplay();
  }, 10);
};

const updateDisplay = () => {
  minute.textContent = minCounter + " :";
  second.textContent = secCounter + " :";
  centiSecond.textContent = centiCounter;
};

const play = () => {
  if (!isPlay) {
    playButton.textContent = "Pause";
    startTimer();
    resetButton.classList.add("hidden");
  } else {
    playButton.textContent = "Play";
    clearInterval(interval);
  }
  isPlay = !isPlay;
  toggleButton();
};

const reset = () => {
  clearInterval(interval);
  playButton.textContent = "Play";
  clearInterval(interval);

  isPlay = false;
  secCounter = 0;
  minCounter = 0;
  centiCounter = 0;
  updateDisplay();
  toggleButton();
};

const lap = () => {
  if (isPlay) {
    lapItem++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapItem}: ${minCounter}:${secCounter}:${centiCounter}`;
    laps.appendChild(li);
  }
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

const lapClearButton = document.querySelector(".lap-clear-button");
lapClearButton.addEventListener("click", () => {
  lapItem = 0;
  const lapList = document.querySelector(".laps");
  laps.innerHTML = "";
});
