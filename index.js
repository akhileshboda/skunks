// First load the navigation
document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-import').innerHTML = data;

            // Now that the nav is loaded, add the event listener
            document.getElementById('openSettings').addEventListener('click', function(e) {
                // Prevent the default link behavior
                e.preventDefault();

                // Open settings in a popup window
                chrome.windows.create({
                    url: chrome.runtime.getURL('settings.html'),
                    type: 'popup',
                    width: 400,
                    height: 500
                });
            });
        });
});