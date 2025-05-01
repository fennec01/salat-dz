export function gmtAdjuster() {

    const gmtToggle = document.getElementById("gmtToggle");
//const tableBody = document.getElementById("tableBody");

// Function to update the class based on the toggle state
function cacheBasedOnToggle(isGmtPlus2) {
    if (isGmtPlus2) {
        //tableBody.classList = "h-12-system";
        localStorage.setItem("isGmtPlus2", "1"); // Save to localStorage
    } else {
        //tableBody.classList = "h-24-system";
        localStorage.setItem("isGmtPlus2", "0"); // Save to localStorage
    }
}

// Event listener for the toggle change
gmtToggle.addEventListener("change", () => {
    cacheBasedOnToggle(gmtToggle.checked);
});

// Check `localStorage` on page load and set the initial state
window.addEventListener("DOMContentLoaded", () => {
    const savedFormat = localStorage.getItem("isGmtPlus2");
    if (savedFormat === "1") {
        gmtToggle.checked = true;
        cacheBasedOnToggle(true);
    } else {
        gmtToggle.checked = false;
        cacheBasedOnToggle(false);
    }
});  
}

