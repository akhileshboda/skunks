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
    "new product", "survey", "research", "warning", "protest", "investment opportunity",
    "JS", "HTML", "CSS", "API", "UI", "UX", "SQL", "React", "Python", "JavaScript"
];

//add like meta tag and look for keyword in meta tag
//split into array and look for keyword
//look at the url and see if its .edu, .org, or like .gov

//this algorithm stored keywords
const keywordCounts = {};
keywords.forEach(keyword => keywordCounts[keyword] = 0); // Fixed typo: keywword → keyword

let lastAlertTimestamp = 0; // Renamed from lastAlertTime for consistency
let pendingAlertTimer = null;
const cooldown = 60000;

function checkKeywords(text) { // Fixed function name: checkKeyword → checkKeywords
    if (!text || typeof text !== "string") {
        return false;
    }

    let foundAny = false;
    const lowerText = text.toLowerCase();

    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
        const matches = lowerText.match(regex);

        if (matches) {
            keywordCounts[keyword] += matches.length;
            console.log(`Found "${keyword}" ${matches.length} time(s) in: "${text.trim().substring(0, 100)}..."`);
            foundAny = true;
        }
    });

    return foundAny;
}

function getTopKeyword() {
    let topKeyword = null;
    let maxCount = 0; // Fixed variable name: count → maxCount

    for (const [keyword, count] of Object.entries(keywordCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topKeyword = keyword;
        }
    }
    return {keyword: topKeyword, count: maxCount};
}

function logTopKeyword() { // Renamed function: topKeyword → logTopKeyword
    const {keyword, count} = getTopKeyword();

    if (keyword && count > 0) {
        console.log(`Current top keyword: "${keyword}" with ${count} occurrence(s)`);
        return true;
    } else {
        console.log("No keywords found");
        return false;
    }
}

function showTopKeyword() {
    const currentTime = Date.now(); // Fixed typo: currenTime → currentTime

    // Fixed logic: only clear timer if it exists
    if (pendingAlertTimer) {
        clearTimeout(pendingAlertTimer);
        pendingAlertTimer = null;
    }

    // Fixed parentheses placement and variable name
    if ((currentTime - lastAlertTimestamp) >= cooldown) {
        const {keyword, count} = getTopKeyword(); // Fixed function name: getTopword → getTopKeyword

        if (keyword && count > 0) {
            alert(`🏆 Top keyword: "${keyword}" with ${count} occurrence(s)`);
            lastAlertTimestamp = currentTime; // Fixed typo: lasstAlertTimestamp → lastAlertTimestamp
            console.log(`Alert shown at ${new Date().toLocaleTimeString()}`);
        }
    } else {
        const remainingTime = cooldown - (currentTime - lastAlertTimestamp);
        console.log(`Alert cooldown: ${Math.round(remainingTime/1000)} seconds remaining`);

        pendingAlertTimer = setTimeout(() => {
            showTopKeyword();
        }, remainingTime);
    }
}

function scanPage() {
    console.log(`\nScanning page at ${new Date().toLocaleTimeString()}...`);
    let foundAny = false;

    const elements = document.querySelectorAll("body, body *:not(script):not(style):not(noscript)");
    elements.forEach(el => {
        if (el.innerText && checkKeywords(el.innerText)) { // Fixed function name
            foundAny = true;
        }
    });

    console.log("Scan complete");

    if (foundAny) {
        logTopKeyword(); // Fixed function name
        showTopKeyword();
    }
    return foundAny;
}

const observer = new MutationObserver(mutations => {
    let foundAny = false;

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                if (checkKeywords(node.textContent)) { // Fixed function name
                    foundAny = true;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.innerText) {
                if (checkKeywords(node.innerText)) { // Fixed function name
                    foundAny = true;
                }
            }
        });
    });

    if(foundAny) {
        logTopKeyword(); // Fixed function name
    }
});

console.log("Keyword monitoring system starting...");

scanPage();

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});

console.log("Algorithm activated");

setInterval(() => {
    console.log("Algorithm will be run in 1 min");
    scanPage();
}, cooldown);