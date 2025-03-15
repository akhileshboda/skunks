function videoSearch(keywords) {
    keywords = keywords.trim();
    if (!keywords) {
        return
    }

    let searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(keywords)}`;

    chrome.tabs.create({url:videoSearch});
}

function getActiveTabMetaInfo() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs.length === 0) {
                reject
            }
        })
    })
}