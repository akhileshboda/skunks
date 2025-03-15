// Function to perform a YouTube search using the provided keywords
function performYouTubeSearch(keywords) {
    // Clean up the keywords
    keywords = keywords.trim();
    if (!keywords) return;

    // Create YouTube search URL
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keywords)}`;

    // Open the search in a new tab
    chrome.tabs.create({ url: searchUrl });
}

// Function to get meta info from the active tab
function getActiveTabMetaInfo() {
    return new Promise((resolve, reject) => {
        // Get the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                reject('No active tab found');
                return;
            }

            const activeTab = tabs[0];

            // Request meta info from the content script in the active tab
            chrome.tabs.sendMessage(activeTab.id, { action: 'getMetaInfo' }, (response) => {
                if (chrome.runtime.lastError) {
                    // Handle potential errors (e.g., content script not loaded yet)
                    reject(chrome.runtime.lastError.message);
                } else if (response) {
                    resolve(response);
                } else {
                    reject('No response from content script');
                }
            });
        });
    });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // When popup requests search
    if (message.action === 'search') {
        performYouTubeSearch(message.keywords);
        sendResponse({ success: true });
    }

    // When popup requests meta info for current tab
    else if (message.action === 'getCurrentTabMetaInfo') {
        getActiveTabMetaInfo()
            .then(metaInfo => {
                sendResponse(metaInfo);
            })
            .catch(error => {
                console.error('Error getting meta info:', error);
                sendResponse({ error: 'Failed to get meta information' });
            });

        return true; // Required for asynchronous response
    }
});

// Initialize when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log('YouTube Keyword Search Extension installed');
});