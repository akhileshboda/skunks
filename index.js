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
                    width: 700,
                    height: 500,
                    left: Math.round((window.screen.availWidth - 700) / 2),
                    top:  Math.round((window.screen.availHeight - 500) / 2)
                });
            });
        });
});