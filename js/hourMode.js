const amPmToggle = document.getElementById("amPmToggle");
const tableBody = document.getElementById("tableBody");

// Function to update the class based on the toggle state
function updateClassBasedOnToggle(is12Hour) {
    if (is12Hour) {
        tableBody.classList = "h-12-system";
        localStorage.setItem("timeFormat", "12h"); // Save to localStorage
    } else {
        tableBody.classList = "h-24-system";
        localStorage.setItem("timeFormat", "24h"); // Save to localStorage
    }
}

// Event listener for the toggle change
amPmToggle.addEventListener("change", () => {
    updateClassBasedOnToggle(amPmToggle.checked);
});

// Check `localStorage` on page load and set the initial state
window.addEventListener("DOMContentLoaded", () => {
    const savedFormat = localStorage.getItem("timeFormat");
    if (savedFormat === "12h") {
        amPmToggle.checked = true;
        updateClassBasedOnToggle(true);
    } else {
        amPmToggle.checked = false;
        updateClassBasedOnToggle(false);
    }
});
