// Keyword list to look out for when in a web

// there must be a way to add API to this, if possible
const keywords = [
    "breaking", "urgent", "announcement", "launch", "update", "alert",
    "recall", "deal", "discount", "offer", "event", "release", "security",
    "breach", "hack", "data leak", "merger", "acquisition", "investment",
    "funding", "IPO", "closing", "strike", "crisis", "scandal", "lawsuit",
    "partnership", "collaboration", "shutdown", "outage", "incident",
    "promotion", "limited time", "deadline", "grant", "award", "winner",
    "result", "report", "forecast", "trend", "market", "cyberattack",
    "opportunity", "job", "career", "hiring", "vacancy", "sale", "urgent hiring",
    "emergency", "withdraw", "price cut", "expansion", "growth", "loss",
    "profit", "announcement", "restructuring", "layoff", "bankruptcy",
    "new product", "survey", "research", "warning", "protest", "investment opportunity"
];

// count and keep the keyword
const keywordCounts = {};
keywords.forEach(keyword => keywordCounts[keyword] = 0);

// function to check for keywords
function checkForKeywords(text) {
    if (!text || typeof text !== "string") return;
    const lowerText = text.toLowerCase()
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
        const matches = lowerText.match(regex);
        if (matches) {
            keywordCounts[keyword] += matches.length;
            console.log(`🔥 Found "${keyword}" ${matches.length} time(s) in: "${text.trim().substring(0, 100)}..."`)
        }
        // if (text.toLowerCase().includes(keyword.toLowerCase())) {
        //     console.log(`🔥 Keyword detected: "${keyword}" in: "${text.trim().substring(0, 100)}..."`);
        //     alert(`🔥 Keyword detected: "${keyword}"`);
        //}
    });
}

// making a function to count and take the top keyword
function topKeywords() {
    let keyWord = null;
    let maxCount = 0;

    for (const [keyword, count]) of Object.entries(keywordCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topKeyword = keyword;
        }
    }
}

// Running a scan on page
function scanInitialPage() {
    console.log("🚀 Running initial page scan...");
    const elements = document.querySelectorAll("body, body *:not(script):not(style):not(noscript)");
    elements.forEach(el => {
        if (el.innerText) checkForKeywords(el.innerText);
    });
    console.log("✅ Initial scan complete.");
}

// running a real-time monitor on the page itself
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                checkForKeywords(node.textContent);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                checkForKeywords(node.innerText);
            }
        });
    });
});

// start the algorithm
scanInitialPage();  // Initial scan
observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});
console.log("🟢 Real-time keyword listener is now active...");
