export function gmtAdjuster() {

    const gmtToggle = document.getElementById("gmtToggle");

    // Save the choice in `localStorage`
    function cacheBasedOnToggle(isGmtPlus2) {
        if (isGmtPlus2) {
            localStorage.setItem("isGmtPlus2", "1");
        } else {
            localStorage.setItem("isGmtPlus2", "0");
        }
    }

    // Event listener for the toggle change
    gmtToggle.addEventListener("change", () => {
        cacheBasedOnToggle(gmtToggle.checked);
    });

    // Set the initial state from `localStorage`
    const savedFormat = localStorage.getItem("isGmtPlus2");
    if (savedFormat === "1") {
        gmtToggle.checked = true;
        cacheBasedOnToggle(true);
    } else {
        gmtToggle.checked = false;
        cacheBasedOnToggle(false);
    }
}

