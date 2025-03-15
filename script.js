document.addEventListener("DOMContentLoaded", () => {
    const extensionName = chrome.runtime.getManifest().name;

    // Update the page title separately
    document.title = extensionName;

    // Update all elements with class "extension-name"
    document.querySelectorAll(".extension-name").forEach(element => {
        element.textContent = extensionName;
    });
});