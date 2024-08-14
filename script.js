// script.js
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 1000);
    isRunning = true;
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
}
