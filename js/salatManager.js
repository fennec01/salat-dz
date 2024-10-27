import { data } from './data.js';

const today = getCurrentDate();
const todayTimes = data[today];
const tomorrow =  getCurrentDate(true);
const tomorrowFajrTime = data[tomorrow][0];
const prayerNames = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
const tableBody = document.getElementById("tableBody");
const downloadPwaButton = document.getElementById("downloadPwaButton");
const currentDateElement = document.getElementById("current-date");
const currentHijriDateElement = document.getElementById("current-hijri-date");

function getCurrentDate(isTommorow) {
    const today = new Date();
    if(isTommorow) today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(today.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}/${month}/${day}`;
}

function convertTo12Hour(time24) {
    // Split the input into hours and minutes
    let [hours, minutes] = time24.split(':').map(Number);
    
    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // Adjust 0 or 12 to 12-hour format
    
    // Format the result with leading zeros for hours and minutes if needed
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
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
        timeCell.classList = "h-24";
        timeCell.textContent = todayTimes[i];
        row.appendChild(timeCell);

        // Create a new cell for the time from the array
        const h12FromatCell = document.createElement("td");
        h12FromatCell.classList = "h-12";
        h12FromatCell.textContent =  convertTo12Hour(todayTimes[i]);
        row.appendChild(h12FromatCell);

        // Create a new cell for the prayer name
        const prayerCell = document.createElement("td");
        prayerCell.textContent = prayerNames[i];
        row.appendChild(prayerCell);

        // Append the row to the table body
        tableBody.appendChild(row);

        // Start countdown for this row
        startCountdown(timeCell, timeLeftCell);
    }
    //Add next fajr
    const row = document.createElement("tr");
    row.className = "table-active";
    const timeLeftCell = document.createElement("td");
    timeLeftCell.textContent = "--:--:--"; // Static value
    row.appendChild(timeLeftCell);
    const timeCell = document.createElement("td");
    timeCell.classList = "h-24";
    timeCell.textContent = tomorrowFajrTime;
    row.appendChild(timeCell);
    const h12timeCell = document.createElement("td");
    h12timeCell.classList = "h-12";
    h12timeCell.textContent = convertTo12Hour(tomorrowFajrTime);
    row.appendChild(h12timeCell);
    const prayerCell = document.createElement("td");
    prayerCell.textContent = "فجر الغد";
    row.appendChild(prayerCell);
    tableBody.appendChild(row);
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

// Function to update current date
function updateCurrentTimeAndDate() {
    const now = new Date();
    // Format the current date 
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");
    currentDateElement.textContent = `${day}/${month}/${year}`;


//  Hijri dater DZ
const formattedHijriDate = new Intl.DateTimeFormat('ar-DZ-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now());
    currentHijriDateElement.textContent = formattedHijriDate;
}

// Call the function to generate the rows
generateTableRows();

// Update current time and date every second
updateCurrentTimeAndDate();
setInterval(updateCurrentTimeAndDate, 1000);

//check pwa is installed
window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
  });
  
function disableInAppInstallPrompt() {
downloadPwaButton.setAttribute("hidden", "");
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
