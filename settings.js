// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const colorRadios = document.querySelectorAll('input[name="colour"]');
    const fontSelect = document.getElementById('font');
    const fontSizeSlider = document.getElementById('fontsize');

    // Create font size value display element
    const fontSizeContainer = document.querySelector('.Font.Size');
    const fontSizeValue = document.createElement('span');
    fontSizeValue.id = 'fontSizeValue';
    fontSizeValue.style.marginLeft = '10px';
    fontSizeValue.textContent = fontSizeSlider.value + 'px';
    fontSizeContainer.appendChild(fontSizeValue);

    // Add save button
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.className = 'btn btn-primary';
    saveButton.style.marginTop = '20px';
    saveButton.style.marginLeft= '295px';
    saveButton.style.marginRight= '295px';
    saveButton.textContent = 'Save Settings';
    document.body.appendChild(saveButton);

    const container = document.createElement('div');
    container.style.textAlign = 'center';
    container.style.width = '100%'; // Make sure it spans the full width
    container.appendChild(saveButton);

// Add the container to the document
    document.body.appendChild(container);

    // Load saved settings if they exist
    loadSettings();

    // Apply settings to entire document initially
    applySettings();

    // Event listeners
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            applySettings(); // Apply settings to entire document when color changes
        });
    });

    fontSelect.addEventListener('change', function() {
        applySettings(); // Apply settings to entire document when font changes
    });

    fontSizeSlider.addEventListener('input', function() {
        // Update the display value while sliding
        fontSizeValue.textContent = this.value + 'px';
        applySettings(); // Apply settings to entire document while sliding
    });

    saveButton.addEventListener('click', function() {
        saveSettings();
        applySettings(); // Apply settings to entire document when saving
    });
    saveButton.addEventListener('click', function() {
        chrome.runtime.reload();
    });

    // Functions
    function getColorValues(colorName) {
        // Map color names to background and text colors
        const colorMap = {
            'default': { bg: '#FFFFFF', text: '#333333' },
            'pink': { bg: '#FFD6E7', text: '#ed82b8' },
            'blue': { bg: '#D6E4FF', text: '#0044CC' },
            'green': { bg: '#D6FFE4', text: '#006633' },
            'red': { bg: '#f26f61', text: '#692720' },
            'purple': { bg: '#E4D6FF', text: '#4400CC' },
            'yellow': { bg: '#fffcc2', text: '#869c40' },
            'orange': { bg: '#eba628', text: '#964b12' },
            'beige': { bg: '#f0eadd', text: '#78653c' },
            'bronze': { bg: '#bf9934', text: '#4a3704' }
        };

        return colorMap[colorName] || colorMap['default'];
    }

    function getFontFamily(fontValue) {
        const fontMap = {
            'default': 'Arial, sans-serif',
            'times': '"Times New Roman", serif',
            'mont': 'Montserrat, sans-serif',
            'comic': '"Comic Sans MS", cursive'
        };

        return fontMap[fontValue] || fontMap['default'];
    }


    function saveSettings() {
        const settings = {
            color: document.querySelector('input[name="colour"]:checked').value,
            font: fontSelect.value,
            fontSize: fontSizeSlider.value
        };

        // Save to localStorage with a simple check to verify it saved
        localStorage.setItem('tubeTutorSettings', JSON.stringify(settings));

        // If Chrome storage is available, use it too
        if (chrome && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set(settings, function() {
                console.log("Settings saved to Chrome storage");
            });
        }
        alert('Settings saved successfully!');

        // Check what was saved - for debugging
        console.log("Settings saved:", JSON.parse(localStorage.getItem('tubeTutorSettings')));
    }

    function loadSettings() {
        if (chrome && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get(['color', 'font', 'fontSize'], function(settings) {
                if (Object.keys(settings).length > 0) {
                    applySettingsToForm(settings);
                    updatePreview();
                    applySettings();
                }
            });
        } else {
            // Fallback to localStorage
            const savedSettings = localStorage.getItem('tubeTutorSettings');
            if (savedSettings) {
                applySettingsToForm(JSON.parse(savedSettings));
                updatePreview();
                applySettings();
            }
        }
    }

    function applySettingsToForm(settings) {
        // Apply color setting
        if (settings.color) {
            const colorRadio = document.querySelector(`input[name="colour"][value="${settings.color}"]`);
            if (colorRadio) colorRadio.checked = true;
        }

        // Apply font setting
        if (settings.font) {
            fontSelect.value = settings.font;
        }

        // Apply font size setting
        if (settings.fontSize) {
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
        }
    }

    function applySettings() {
        // Get current settings from form controls
        const currentColor = document.querySelector('input[name="colour"]:checked').value;
        const currentFont = document.getElementById('font').value;
        const currentFontSize = document.getElementById('fontsize').value;

        // Get the mapped values
        const colorValues = getColorValues(currentColor);
        const fontFamily = getFontFamily(currentFont);

        // Apply to the document
        document.body.style.fontFamily = fontFamily;
        document.body.style.fontSize = currentFontSize + 'px';
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.style.fontSize = currentFontSize + 'px';
        });
        document.body.style.backgroundColor = colorValues.bg;
        document.body.style.color = colorValues.text;

        console.log("Settings applied to document:", {
            color: currentColor,
            font: currentFont,
            fontSize: currentFontSize
        });
    }
});