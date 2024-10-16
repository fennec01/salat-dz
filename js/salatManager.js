import { data } from './data.js';

const today = getCurrentDate();
const todayTimes = data[today];
const tomorrow =  getCurrentDate(true);
const tomorrowFajrTime = data[tomorrow][0];
const prayerNames = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
const tableBody = document.getElementById("table-body");
const gmtToggle = document.getElementById("gmtToggle");
const downloadPwaButton = document.getElementById("downloadPwaButton");
const currentTimeElement = document.getElementById("current-time");
const currentDateElement = document.getElementById("current-date");


function getCurrentDate(isTommorow) {
    const today = new Date();
    if(isTommorow) today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(today.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}/${month}/${day}`;
}

// Function to generate rows dynamically
function generateTableRows() {
    tableBody.innerHTML = "";

    for (let i = 0; i < todayTimes.length; i++) {
        // Create a new row
        const row = document.createElement("tr");

        // Create a new cell for "Time Left"
        const timeLeftCell = document.createElement("td");
        timeLeftCell.textContent = "--:--:--"; // Static value
        row.appendChild(timeLeftCell);

        // Create a new cell for the time from the array
        const timeCell = document.createElement("td");
        timeCell.textContent = adjustTimeForGMT(todayTimes[i]);
        row.appendChild(timeCell);

        // Create a new cell for the prayer name
        const prayerCell = document.createElement("td");
        prayerCell.textContent = prayerNames[i];
        row.appendChild(prayerCell);

        // Append the row to the table body
        tableBody.appendChild(row);

        // Start countdown for this row
        startCountdown(timeCell, timeLeftCell);
    }
}

// Function to adjust time for GMT+1 if toggle is active
function adjustTimeForGMT(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    let adjustedHours = hours;

    // Check if GMT+1 is active
    if (gmtToggle.checked) {
        adjustedHours = (hours + 1) % 24; // Add 1 hour, wrap around if >= 24
    }

    return `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}`;
}

// Function to start the countdown timer
function startCountdown(timeCell, timeLeftCell) {
    const targetTime = getTargetTime(timeCell.textContent);
    // Set the interval to update every second
    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Function to update the countdown
    function updateCountdown() {
        const currentTime = new Date();
        const timeDiff = targetTime - currentTime;

        if (timeDiff <= 0) {
            clearInterval(intervalId); // Stop the timer when time is up
            timeLeftCell.textContent = "00:00:00";
            return;
        }

        const hours = Math.floor(timeDiff / 1000 / 60 / 60);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        // Format the time as hh:mm:ss
        timeLeftCell.textContent = `${String(hours).padStart(2, "0")}:${String(
            minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
}

// Function to get the target time (timeCell) as a Date object for today
function getTargetTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0,
        0
    );
    return targetTime;
}

// Function to update current time and date
function updateCurrentTimeAndDate() {
    const now = new Date();

    // Format the current time as hh:mm:ss
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Format the current date as YYYY/MM/DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");
    currentDateElement.textContent = `${day}/${month}/${year}`;
}

// Call the function to generate the rows
generateTableRows();
setTomorrowFajr();

// Update current time and date every second
updateCurrentTimeAndDate();
setInterval(updateCurrentTimeAndDate, 1000);

// Event listener to regenerate the table when GMT+1 toggle is activated/deactivated
gmtToggle.addEventListener("change", ()=>{
    generateTableRows();
    setTomorrowFajr();
});

//check pwa is installed
window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
  });
  
function disableInAppInstallPrompt() {
downloadPwaButton.setAttribute("hidden", "");
}

function setTomorrowFajr(){
    const tomorrowFajrElement = document.getElementById("tommorow-fajr-date");
    tomorrowFajrElement.textContent = adjustTimeForGMT(tomorrowFajrTime);
}

//pwa install prompt
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    downloadPwaButton.removeAttribute("hidden");
});

downloadPwaButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
            downloadPwaButton.setAttribute("hidden", "");
            console.log("User accepted the install prompt");
        } else {
            console.log("User dismissed the install prompt");
        }
        deferredPrompt = null;
    });
});
