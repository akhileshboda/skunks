//if needed dynamically inject content script: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#dynamic-declarative
// function formatKeywords(keyWords){
//     return keyWords.replaceAll(/, /g, "")
// }

console.log("running content_script.js");

//document.body.style.backgroundColor = "blue";

//inputs keywords and formats it for youtube search query
//dont need to format title/desc - they will be searched as one big term
function formatKeywords(keyWords){
    return keyWords.replaceAll(/(, |,)/g, "|");
}

//outputs array of keywords in metadata of document
function getKeywords(){
    const keyWords = document.querySelector("meta[name='keywords']");
    const description = document.querySelector("meta[name='description']");
    const title = document.querySelector("title");

    if(keyWords){
        let keyWordsStr = keyWords.getAttribute("content");
        console.log("has keywords");
        console.log(keyWordsStr);
        console.log(typeof(keyWordsStr));
        console.log(formatKeywords(keyWordsStr));
        return formatKeywords(keyWordsStr);
    }
    else if (description) {
        console.log("has description");
        console.log(description.getAttribute("content"));
        return description.textContent;
    }
    else if (title) {
        console.log("has title");
        console.log(title.textContent);
        return title.textContent;
    }
    else {
        console.log("does not have title, description or keywords");
        return null;
    }
}

console.log(getKeywords());

// chrome.runtime.sendMessage(getKeywords);

var port = chrome.runtime.connect({name: "keywords"});
port.postMessage({keyWords: getKeywords()});
port.onMessage.addListener(function(msg){
    console.log(response);
    return true;
})

