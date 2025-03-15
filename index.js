document.addEventListener("DOMContentLoaded", () => {
    const extensionName = chrome.runtime.getManifest().name;
    document.getElementById("extension-name").textContent = extensionName;
});