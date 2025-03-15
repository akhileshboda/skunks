document.addEventListener('DOMContentLoaded', function() {
    // Load and apply settings
    function getColorValues(colorName) {
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

    function applySettings(settings) {
        const colorValues = getColorValues(settings.color);
        const fontFamily = getFontFamily(settings.font);

        document.body.style.fontFamily = fontFamily;
        document.body.style.fontSize = settings.fontSize + 'px';
        document.body.style.backgroundColor = colorValues.bg;
        document.body.style.color = colorValues.text;
    }

    // Load settings from storage and apply
    if (chrome && chrome.storage) {
        chrome.storage.sync.get(['color', 'font', 'fontSize'], function(settings) {
            if (settings.color && settings.font && settings.fontSize) {
                applySettings(settings);
            }
        });
    } else {
        // Fallback to localStorage for testing
        const savedSettings = localStorage.getItem('tubeTutorSettings');
        if (savedSettings) {
            applySettings(JSON.parse(savedSettings));
        }
    }
});