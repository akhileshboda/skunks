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
    saveButton.textContent = 'Save Settings';
    document.body.appendChild(saveButton);

    // Add preview section
    const previewContainer = document.createElement('div');
    previewContainer.id = 'preview';
    previewContainer.style.marginTop = '20px';
    previewContainer.style.padding = '15px';
    previewContainer.style.border = '1px solid #ddd';
    previewContainer.style.borderRadius = '4px';

    const previewHeading = document.createElement('h4');
    previewHeading.textContent = 'Preview';
    previewContainer.appendChild(previewHeading);

    const previewText = document.createElement('p');
    previewText.id = 'previewText';
    previewText.textContent = 'This is a preview of how your settings will look.';
    previewContainer.appendChild(previewText);

    document.body.appendChild(previewContainer);

    // Load saved settings if they exist
    loadSettings();

    // Initialize preview with current settings
    updatePreview();

    // Event listeners
    colorRadios.forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });

    fontSelect.addEventListener('change', updatePreview);

    fontSizeSlider.addEventListener('input', function() {
        // Update the display value while sliding
        fontSizeValue.textContent = this.value + 'px';
        updatePreview();
    });

    saveButton.addEventListener('click', saveSettings);

    // Functions
    function getColorValues(colorName) {
        // Map color names to background and text colors
        const colorMap = {
            'default': { bg: '#FFFFFF', text: '#333333' },
            'pink': { bg: '#FFD6E7', text: '#CC0066' },
            'blue': { bg: '#D6E4FF', text: '#0044CC' },
            'green': { bg: '#D6FFE4', text: '#006633' },
            'red': { bg: '#FFD6D6', text: '#CC0000' },
            'purple': { bg: '#E4D6FF', text: '#4400CC' },
            'yellow': { bg: '#FFFFD6', text: '#CC8800' },
            'orange': { bg: '#FFE4D6', text: '#CC4400' },
            'beige': { bg: '#F5F5DC', text: '#8B8970' },
            'bronze': { bg: '#CD7F32', text: '#FFFFFF' }
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

    function updatePreview() {
        const selectedColorValue = document.querySelector('input[name="colour"]:checked').value;
        const selectedColor = getColorValues(selectedColorValue);
        const selectedFont = getFontFamily(fontSelect.value);
        const selectedFontSize = fontSizeSlider.value;

        const previewText = document.getElementById('previewText');
        previewText.style.fontFamily = selectedFont;
        previewText.style.fontSize = `${selectedFontSize}px`;
        previewText.style.backgroundColor = selectedColor.bg;
        previewText.style.color = selectedColor.text;
        previewText.style.padding = '10px';
        previewText.style.borderRadius = '4px';
    }

    function saveSettings() {
        const settings = {
            color: document.querySelector('input[name="colour"]:checked').value,
            font: fontSelect.value,
            fontSize: fontSizeSlider.value
        };

        // Save to localStorage with a simple check to verify it saved
        localStorage.setItem('tubeTutorSettings', JSON.stringify(settings));

        // Check what was saved - for debugging
        console.log("Settings saved:", JSON.parse(localStorage.getItem('tubeTutorSettings')));
    }

    function loadSettings() {
        if (chrome && chrome.storage) {
            chrome.storage.sync.get(['color', 'font', 'fontSize'], function(settings) {
                applySettingsToForm(settings);
                applySettings();
            });
        } else {
            // Fallback to localStorage
            const savedSettings = localStorage.getItem('tubeTutorSettings');
            if (savedSettings) {
                applySettingsToForm(JSON.parse(savedSettings));
            }
            applySettings();
        }
    }

    // Function to apply settings to the extension (if this is a Chrome extension)
    function applySettingsToForm(settings) {
        // Apply color setting
        const colorRadio = document.querySelector(`input[name="colour"][value="${settings.color}"]`);
        if (colorRadio) colorRadio.checked = true;

        // Apply font setting
        if (settings.font && fontSelect.querySelector(`option[value="${settings.font}"]`)) {
            fontSelect.value = settings.font;
        }

        // Apply font size setting
        if (settings.fontSize) {
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
        }
    }

    // Add this function right after the applySettingsToExtension function
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
        document.body.style.backgroundColor = colorValues.bg;
        document.body.style.color = colorValues.text;
    }

// Then modify these parts of your existing code:

// After loadSettings() call:
    loadSettings();
// Add this line:
    applySettings();


// Modify the loadSettings function to call applySettings at the end:
    function loadSettings() {
        // ... existing code ...

        // Add this line at the end:
        applySettings();
    }
});