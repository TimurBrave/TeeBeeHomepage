const hoursElement = document.getElementById('hours');
const colonElement = document.getElementById('colon');
const minutesElement = document.getElementById('minutes');
const amPmElement = document.getElementById('amPm');
const dayOfWeekElement = document.getElementById('dayOfWeek');
const monthElement = document.getElementById('month');
const dayElement = document.getElementById('day');
const toggleFormatButton = document.getElementById('toggleFormat');

let is24HourFormat = false;

toggleFormatButton.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateClock();
});

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'short' });
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();

    if (!is24HourFormat) {
        amPmElement.textContent = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    } else {
        amPmElement.textContent = '';
    }

    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    dayOfWeekElement.textContent = dayOfWeek;
    monthElement.textContent = month;
    dayElement.textContent = day;
}

function blinkColon() {
    colonElement.style.visibility = colonElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

setInterval(updateClock, 1000);
setInterval(blinkColon, 1000);

updateClock();
blinkColon();
