/* Theme toggle and shared navigation */

const THEME_STORAGE_KEY = "suvratha-portfolio-theme";

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
        navMenu.classList.toggle("active");
    }
}

function applyTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", selectedTheme);

    const button = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    if (button && icon) {
        icon.textContent = selectedTheme === "dark" ? "☀" : "☾";
        button.setAttribute(
            "aria-label",
            selectedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
        button.setAttribute(
            "title",
            selectedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
}

let savedTheme = "dark";

try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
        savedTheme = stored;
    }
} catch (error) {
    // Use dark mode if browser storage is unavailable.
}

applyTheme(savedTheme);

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const current =
                document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";

            applyTheme(next);

            try {
                localStorage.setItem(THEME_STORAGE_KEY, next);
            } catch (error) {
                // Theme switching still works without saved preferences.
            }
        });
    }

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            const navMenu = document.getElementById("navMenu");
            if (navMenu) {
                navMenu.classList.remove("active");
            }
        });
    });
});