const workTime = 25 * 60;
const breakTime = 5 * 60;
let timeLeft = workTime;
let isWorking = true;
let timer;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const statusDisplay = document.getElementById("status");

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  statusDisplay.textContent = isWorking ? "focus" : "break";
  document.title = `${minutes}:${seconds} ${isWorking ? "🧠" : "☕"} | pomodor`;
};

const startTimer = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      isWorking = !isWorking;
      timeLeft = isWorking ? workTime : breakTime;
      updateDisplay();
      startButton.disabled = false;
      stopButton.disabled = true;
    }
  }, 1000);
};

const stopTimer = () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(timer);
  timer = null;
};

const resetTimer = () => {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  clearInterval(timer);
  timer = null;
  isWorking = true;
  timeLeft = workTime;
  updateDisplay();
};

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
