export function bigFont() {

const sizeToggle = document.getElementById("sizeToggle");
const table = document.querySelector("table");

function manageBigFontClass(isBigFont) {
    if (isBigFont) {
        addBigFontClass();
    } else {
        removeBigFontClass();
    }   
}

function addBigFontClass() {
    table.classList = "big-font";
    localStorage.setItem("fontSize", "1"); 
}

function removeBigFontClass() {
table.classList.remove("big-font");
localStorage.setItem("fontSize", "0"); 
}

// Event listener for the toggle change
sizeToggle.addEventListener("change", () => {
    manageBigFontClass(sizeToggle.checked);
});

// Check `localStorage` on page load and set the initial state
window.addEventListener("DOMContentLoaded", () => {
    const isBigFont = localStorage.getItem("fontSize");
    if (isBigFont === "1") {
        sizeToggle.checked = true;
        manageBigFontClass(true);
    } else {
        sizeToggle.checked = false;
        manageBigFontClass(false); 
    }
});  
}

