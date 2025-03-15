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
    "JS", "HTML", "CSS", "API", "UI", "UX", "SQL", "React", "Python", "JavaScript", "PHP", "Java", "C++",
    "C#", "C", "Bootstrap", "BS3", "BS4", "BS5", "MySQL", "Excel", "XML", "Django", "Numpy",
    "Pandas","Typescript", "TS", "Git", "MongoDB", "R", "Kotlin"
];

const keywordCounts = {};
keywords.forEach(keyword => keywordCounts[keyword] = 0);

let lastAlertTimestamp = 0;
let pendingAlertTimer = null;
const cooldown = 60000;

// Function to check a text string for keywords
function checkKeywords(text) {
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

// Function to extract and check metadata from the page
function checkMetadata() {
    console.log("Checking page metadata...");
    let foundAny = false;
    let metadataFound = false;

    // Check meta tags (keywords, description, title, etc.)
    const metaTags = document.querySelectorAll('meta[name="keywords"], meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]');

    if (metaTags.length > 0) {
        metadataFound = true;
        console.log(`Found ${metaTags.length} metadata tags to analyze`);

        metaTags.forEach(tag => {
            const content = tag.getAttribute('content');
            if (content && checkKeywords(content)) {
                foundAny = true;
            }
        });
    }

    // Check page title
    const pageTitle = document.title;
    if (pageTitle) {
        metadataFound = true;
        console.log("Checking page title");
        if (checkKeywords(pageTitle)) {
            foundAny = true;
        }
    }

    // Check schema.org metadata (JSON-LD)
    const jsonLdElements = document.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLdElements.length > 0) {
        metadataFound = true;
        console.log(`Found ${jsonLdElements.length} JSON-LD metadata blocks`);

        jsonLdElements.forEach(script => {
            try {
                const jsonData = JSON.parse(script.textContent);
                // Convert to string to check for keywords
                const jsonString = JSON.stringify(jsonData);
                if (checkKeywords(jsonString)) {
                    foundAny = true;
                }
            } catch (e) {
                console.log("Error parsing JSON-LD:", e.message);
            }
        });
    }

    return { foundKeywords: foundAny, hasMetadata: metadataFound };
}

function getTopKeyword() {
    let topKeyword = null;
    let maxCount = 0;

    for (const [keyword, count] of Object.entries(keywordCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topKeyword = keyword;
        }
    }
    return {keyword: topKeyword, count: maxCount};
}

function logTopKeyword() {
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
    const currentTime = Date.now();

    if (pendingAlertTimer) {
        clearTimeout(pendingAlertTimer);
        pendingAlertTimer = null;
    }

    if ((currentTime - lastAlertTimestamp) >= cooldown) {
        const {keyword, count} = getTopKeyword();

        if (keyword && count > 0) {
            alert(`🏆 Top keyword: "${keyword}" with ${count} occurrence(s)`);
            lastAlertTimestamp = currentTime;
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

    // First check metadata
    const { foundKeywords, hasMetadata } = checkMetadata();

    // If metadata has keywords or no metadata exists, scan page content
    let foundInContent = false;
    if (!foundKeywords || !hasMetadata) {
        console.log(hasMetadata ?
            "No keywords found in metadata, checking page content..." :
            "No metadata found, checking page content...");

        const elements = document.querySelectorAll("body, body *:not(script):not(style):not(noscript)");
        elements.forEach(el => {
            if (el.innerText && checkKeywords(el.innerText)) {
                foundInContent = true;
            }
        });
    } else {
        console.log("Keywords found in metadata, skipping content scan");
    }

    console.log("Scan complete");

    const anyFound = foundKeywords || foundInContent;
    if (anyFound) {
        logTopKeyword();
        showTopKeyword();
    }

    return anyFound;
}

const observer = new MutationObserver(mutations => {
    let foundAny = false;

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            // Check if it's a metadata element
            if (node.nodeName === 'META' ||
                (node.nodeName === 'SCRIPT' && node.getAttribute('type') === 'application/ld+json')) {
                // Re-check all metadata since it's hard to check just one
                const { foundKeywords } = checkMetadata();
                if (foundKeywords) {
                    foundAny = true;
                }
            }
            // Otherwise check normal content
            else if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                if (checkKeywords(node.textContent)) {
                    foundAny = true;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.innerText) {
                if (checkKeywords(node.innerText)) {
                    foundAny = true;
                }
            }
        });
    });

    if(foundAny) {
        logTopKeyword();
    }
});

console.log("Keyword monitoring system starting...");

scanPage();

observer.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});

console.log("Algorithm activated - monitoring metadata and content");

setInterval(() => {
    console.log("\nScheduled scan triggered");
    scanPage();
}, cooldown);