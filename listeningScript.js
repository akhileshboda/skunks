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

const keywordCounts = {};
keywords.forEach(keyword => keywordCounts[keywword = 0]);

let lastAlertTime = 0;
let pendingAlertTimer = null;
const cooldown = 60000;

function checkKeyword(text) {
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
    let count = 0;

    for (const [keyword, count] of Object.entries(keywordCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topKeyword = keyword;
        }
    }
    return {keyword: topKeyword, count: maxCount};
}

function topKeyword() {
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

}