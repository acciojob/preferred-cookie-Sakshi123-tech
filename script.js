// Get references to the DOM elements
const form = document.querySelector("form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Helper function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Helper function to get a cookie value
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

// Apply the preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", `${savedFontSize}px`);
    fontSizeInput.value = savedFontSize; // Update input field
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    fontColorInput.value = savedFontColor; // Update input field
  }
}

// Save preferences when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;

  // Save the preferences to cookies
  setCookie("fontsize", fontSize, 365); // 365 days validity
  setCookie("fontcolor", fontColor, 365); // 365 days validity

  // Apply preferences instantly
  applyPreferences();
});

// Apply preferences on page load
applyPreferences();
