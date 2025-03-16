// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse){
//         console.log(request.keyWords);
//         sendResponse({received: true});
//     }
// );

// var port = chrome.tabs.connect({name: "keyWords"});
// port.onMessage.addListener(function(msg){
//     if(msg.keyWords){
//         console.log("Received keywords: " + msg.keyWords);
//         port.postMessage({response: "keywords received"});
//     }
//     else {
//         console.log("Did not receive keywords");
//         port.postMessage({response: "did not receive keywords"});
//     }
// });

chrome.runtime.onConnect.addListener(function(port){
    console.assert(port.name == "keyWords");
    port.onMessage.addListener(function(msg){
        if(msg.keyWords){
            console.log("Received keywords: " + msg.keyWords);
            chrome.storage.local.set({keyWords: msg.keyWords});
            port.postMessage({response: "keywords received"});
        }
        else {
            console.log("Did not receive keywords");
            port.postMessage({response: "did not receive keywords"});
        }
        return true;
    });
});
