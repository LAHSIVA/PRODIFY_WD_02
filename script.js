const btnStart = document.querySelector('.start');
const btnStop = document.querySelector('.stop');
const btnReset = document.querySelector('.reset');
const btnLap = document.querySelector('.lap');
const display = document.querySelector('.display');
const clock = document.querySelector('.clock');
const lapList = document.querySelector('.lap-list');

let hrs = min = sec = ms = 0,
  startTimer;

btnStart.addEventListener('click', () => {
  btnStart.classList.add('start-active');
  btnStop.classList.remove('stop-active');
  clock.classList.add('start-animation');
  btnLap.addEventListener('click', recordLap);

  startTimer = setInterval(() => {
    ms++;
    if (ms == 100) {
      sec++;
      ms = 0;
    }
    if (sec == 60) {
      min++;
      sec = 0;
    }
    if (min == 60) {
      hrs++;
      min = 0;
    }
    updateDisplay();
  }, 10);
});

btnStop.addEventListener('click', () => {
  btnStart.classList.remove('start-active');
  btnStop.classList.add('stop-active');
  clock.classList.remove('start-animation');
  clearInterval(startTimer);
});

btnReset.addEventListener('click', () => {
  hrs = min = sec = ms = 0;
  btnStart.classList.remove('start-active');
  btnStop.classList.remove('stop-active');
  clock.classList.remove('start-animation');
  clearInterval(startTimer);
  updateDisplay();
  clearLapList(); // Clear lap list on reset
});

function updateDisplay() {
  phrs = hrs < 10 ? '0' + hrs : hrs;
  pmin = min < 10 ? '0' + min : min;
  psec = sec < 10 ? '0' + sec : sec;
  pms = ms < 10 ? '0' + ms : ms;

  phrs = phrs.toString();
  pmin = pmin.toString();
  psec = psec.toString();
  pms = pms.toString();

  document.querySelectorAll('.hrs')[0].innerText = phrs[0];
  document.querySelectorAll('.hrs')[1].innerText = phrs[1];
  document.querySelectorAll('.min')[0].innerText = pmin[0];
  document.querySelectorAll('.min')[1].innerText = pmin[1];
  document.querySelectorAll('.sec')[0].innerText = psec[0];
  document.querySelectorAll('.sec')[1].innerText = psec[1];
  document.querySelectorAll('.ms')[0].innerText = pms[0];
  document.querySelectorAll('.ms')[1].innerText = pms[1];
}

function recordLap() {
  const lapTime = `${phrs}:${pmin}:${psec}.${pms}`;

  // Create a div for lap with a smaller font size
  const lapDiv = document.createElement('div');
  lapDiv.classList.add('lap-item');

  // Create a span for lap number with smaller font size
  const lapNumber = document.createElement('span');
  lapNumber.classList.add('lap-number');
  lapNumber.innerText = lapList.children.length + 1; // Lap number
  lapDiv.appendChild(lapNumber);

  // Create a span for lap time with smaller font size
  const lapItem = document.createElement('span');
  lapItem.classList.add('lap-time');
  lapItem.innerText = lapTime;
  lapList.appendChild(lapItem);

  // Append the lap div to lap list
  lapList.appendChild(lapDiv);
}

function clearLapList() {
  lapList.innerHTML = '';
}
