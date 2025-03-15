document.addEventListener('DOMContentLoaded', function() {
    // Load and apply settings
    function getColorValues(colorName) {
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

    function applySettings(settings) {
        const colorValues = getColorValues(settings.color);
        const fontFamily = getFontFamily(settings.font);

        document.body.style.fontFamily = fontFamily;
        document.body.style.fontSize = settings.fontSize + 'px';
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.style.fontSize = settings.fontSize + 'px';
        });
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