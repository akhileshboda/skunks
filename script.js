document.addEventListener("DOMContentLoaded", () => {
    const extensionName = chrome.runtime.getManifest().name;

    // Update the page title separately
    document.title = extensionName;

    // Update all elements with class "extension-name"
    document.querySelectorAll(".extension-name").forEach(element => {
        element.textContent = extensionName;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("nav.html") // Fetch the navbar
        .then(response => response.text())
        .then(html => {
            document.getElementById("nav-import").innerHTML = html;
        })
        .catch(error => console.error("Error loading navigation:", error));
});

