/**
 * Function to load the nav bar and listen for when the settings button is clicked
 */
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

                // Get screen dimension
                const screenWidth = window.screen.availWidth;
                const screenHeight = window.screen.availHeight;

                // Settings window dimensions
                const windowWidth = 400;
                const windowHeight = 500;

                // Calculate center screen position
                const x_axis = Math.round(screenWidth - windowWidth) / 2;
                const y_axis = Math.round(screenHeight - windowHeight) / 2;

                // Open settings in a popup window
                chrome.windows.create({
                    url: chrome.runtime.getURL('settings.html'),
                    type: 'popup',
                    width: windowWidth,
                    height: windowHeight,
                    left: x_axis,
                    top: y_axis
                });
            });
        });
});